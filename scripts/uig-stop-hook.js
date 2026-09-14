#!/usr/bin/env node
// Claude Code hook (SessionEnd or Stop) that records one line per session into
// the global uig usage log (~/.uig/tracking.jsonl). It captures real token usage
// from the session transcript and tags whether the session ran the uig skill, so
// `npm run uig:learn -- stats` shows trustworthy tokens instead of zeros.
//
// Strictly best-effort: every path exits 0, so the hook can never fail, stall, or
// refuse a session. Recording happens once per session (guarded by a marker file)
// and is skipped when the transcript is missing, unreadable, or larger than
// MAX_TRANSCRIPT_BYTES. Token totals follow the harness convention
// (input + output; cache tokens are reported separately and not double-counted).
const fs = require("fs")
const os = require("os")
const path = require("path")

const BASE = process.env.UIG_USAGE_DIR || path.join(os.homedir(), ".uig")
const LOG = path.join(BASE, "tracking.jsonl")
const MARKER_DIR = path.join(BASE, "sessions")
const MAX_TRANSCRIPT_BYTES = 64 * 1024 * 1024

// Markers that indicate a session ran the portable uig skill. Detection is
// best-effort and only widens what counts as a uig session.
const UIG_MARKERS = [
  '"skill":"uig"', // Skill tool invocation for the uig skill
  "UI-GATES COMPLETE", // the loop's closing line
  "uig-update", // the /uig-update slash command
  "<command-name>uig", // a /uig slash command block
]

function detectUig(text) {
  return UIG_MARKERS.some(m => text.includes(m))
}

// Sum per-message usage across the transcript. A retried or replayed message
// reuses the same message.id and is counted once, so retries never inflate totals.
function countUsage(text) {
  const seen = new Set()
  let input = 0
  let output = 0
  let cacheRead = 0
  let cacheCreate = 0
  let lines = 0
  for (const line of text.split("\n")) {
    if (!line.includes('"usage"')) continue
    let entry
    try {
      entry = JSON.parse(line)
    } catch {
      continue
    }
    const message = entry.message
    const u = message && message.usage
    if (!u || typeof u !== "object") continue
    const id = message.id
    if (id) {
      if (seen.has(id)) continue
      seen.add(id)
    }
    input += u.input_tokens || 0
    output += u.output_tokens || 0
    cacheRead += u.cache_read_input_tokens || 0
    cacheCreate += u.cache_creation_input_tokens || 0
    lines++
  }
  return {
    input_tokens: input,
    output_tokens: output,
    cached_input_tokens: cacheRead + cacheCreate,
    total: input + output, // harness convention: cache reported separately
    usage_lines: lines,
  }
}

function readStdin() {
  let result = ""
  const buf = Buffer.alloc(65536)
  for (;;) {
    let chunk
    try {
      chunk = fs.readSync(0, buf, 0, buf.length, null)
    } catch {
      return ""
    }
    if (chunk <= 0) break
    result += buf.toString("utf8", 0, chunk)
    if (result.length > 4 * 1024 * 1024) return ""
  }
  return result
}

function main() {
  let hook = {}
  try {
    hook = JSON.parse(readStdin() || "{}")
  } catch {
    return 0
  }
  const sessionId = hook.session_id
  const transcriptPath = hook.transcript_path
  if (!sessionId || !transcriptPath) return 0
  // Record each session exactly once, even if the hook fires again or a second
  // hook event is registered.
  const marker = path.join(MARKER_DIR, path.basename(sessionId) + ".hook")
  if (fs.existsSync(marker)) return 0
  try {
    fs.mkdirSync(MARKER_DIR, { recursive: true })
    fs.writeFileSync(marker, new Date().toISOString() + "\n", "utf8")
  } catch {
    return 0
  }
  let text = ""
  try {
    if (fs.statSync(transcriptPath).size > MAX_TRANSCRIPT_BYTES) return 0
    text = fs.readFileSync(transcriptPath, "utf8")
  } catch {
    return 0
  }
  const event = {
    event: "session-usage",
    at: new Date().toISOString(),
    source: "hook",
    session_id: sessionId,
    cwd: hook.cwd || null,
    has_uig: detectUig(text),
    hook_event: hook.hook_event_name || null,
    ...countUsage(text),
  }
  try {
    fs.mkdirSync(BASE, { recursive: true })
    fs.appendFileSync(LOG, JSON.stringify(event) + "\n", "utf8")
  } catch {
    return 0
  }
  return 0
}

if (require.main === module) process.exit(main())

module.exports = { detectUig, countUsage, main, UIG_MARKERS, BASE, LOG }
