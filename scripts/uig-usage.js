// Out-of-the-box usage ledger for the portable uig skill.
// The skill itself and a Claude Code SessionEnd hook append JSONL events to a
// global log (~/.uig/tracking.jsonl by default). This module reads that log and
// counts this repository's task receipts, so `stats` reports real all-time usage
// instead of only the instrumented evaluation harness.
//
// Event schema (append-only JSONL, one object per line):
//   {"event":"run-start",    "at":"<ISO8601>","source":"skill","skill":"uig","repo":"<cwd basename>"}
//   {"event":"run-complete", "at":"<ISO8601>","source":"skill","skill":"uig","repo":"<cwd basename>",
//    "receipts":["<paths>"],"gated":["<ids>"],"promoted":["<lesson ids>"]}
//   {"event":"session-usage","at":"<ISO8601>","source":"hook","session_id":"...","cwd":"...",
//    "has_uig":true,"input_tokens":n,"output_tokens":n,"cached_input_tokens":n,"total":n}
//
// `total` follows the harness convention: input + output tokens. Cache tokens are
// reported separately (cached_input_tokens) and never silently double-counted.
const fs = require("fs")
const { homedir } = require("os")
const path = require("path")

class Usage {
  constructor(options = {}) {
    this.directory =
      options.directory ||
      process.env.UIG_USAGE_DIR ||
      path.join(homedir(), ".uig")
    this.log = path.join(this.directory, "tracking.jsonl")
  }
  // Append one event; used directly by the skill and hook, and by tests.
  record(event) {
    fs.mkdirSync(this.directory, { recursive: true })
    fs.appendFileSync(this.log, JSON.stringify(event) + "\n", "utf8")
    return event
  }
  events() {
    const file = this.log
    if (!fs.existsSync(file)) return []
    return fs
      .readFileSync(file, "utf8")
      .split(/\r?\n/)
      .filter(Boolean)
      .map(line => {
        try {
          return JSON.parse(line)
        } catch {
          return { event: "malformed" }
        }
      })
  }
  receipts(root) {
    const dir = path.join(root, "knowledge", "receipts")
    if (!fs.existsSync(dir)) return []
    return fs
      .readdirSync(dir)
      .filter(f => f.endsWith(".md"))
      .sort()
  }
  summarize(root) {
    const events = this.events()
    const malformed = events.filter(e => e.event === "malformed").length
    const valid = events.filter(e => e.event !== "malformed")
    const starts = valid.filter(
      e => e.event === "run-start" && e.source === "skill"
    )
    const completes = valid.filter(
      e => e.event === "run-complete" && e.source === "skill"
    )
    const sessions = valid.filter(
      e => e.event === "session-usage" && e.source === "hook"
    )
    const uigSessions = sessions.filter(s => s.has_uig)
    const measured = uigSessions.filter(s => Number.isSafeInteger(s.total))
    const repoName = path.basename(root)
    const receipts = this.receipts(root)
    return {
      log: this.log,
      runs_started: starts.length,
      runs_completed: completes.length,
      completed_in_this_repo: completes.filter(e => e.repo === repoName).length,
      receipts_written: receipts.length,
      gated_approvals: completes.reduce(
        (n, e) => n + (Array.isArray(e.gated) ? e.gated.length : 0),
        0
      ),
      sessions_seen: sessions.length,
      uig_sessions: uigSessions.length,
      measured_uig_sessions: measured.length,
      tokens_measured: measured.reduce((n, s) => n + s.total, 0),
      malformed,
      first_event_at: valid[0]?.at || null,
    }
  }
}

module.exports = { Usage }
