const test = require("node:test")
const assert = require("assert")
const fs = require("fs")
const os = require("os")
const path = require("path")
const { Usage } = require("./uig-usage")

function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "uig-usage-"))
  const repo = path.join(dir, "repo")
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }))
  return { usage: new Usage({ directory: path.join(dir, "store") }), repo }
}

function writeReceipts(repo, names) {
  const dir = path.join(repo, "knowledge", "receipts")
  fs.mkdirSync(dir, { recursive: true })
  for (const n of names)
    fs.writeFileSync(path.join(dir, n), "# " + n + "\n", "utf8")
}

test("empty store reports zeros and no receipts", t => {
  const { usage, repo } = fixture(t)
  const s = usage.summarize(repo)
  assert.equal(s.runs_started, 0)
  assert.equal(s.runs_completed, 0)
  assert.equal(s.receipts_written, 0)
  assert.equal(s.gated_approvals, 0)
  assert.equal(s.tokens_measured, 0)
  assert.equal(s.measured_uig_sessions, 0)
  assert.equal(s.malformed, 0)
  assert.equal(s.first_event_at, null)
})

test("records run start and completion events with receipts and gated actions", t => {
  const { usage, repo } = fixture(t)
  writeReceipts(repo, ["2026-09-13-a.md", "2026-09-13-b.md"])
  usage.record(
    { event: "run-start", at: "2026-09-13T00:00:00Z", source: "skill", skill: "uig", repo: path.basename(repo) }
  )
  usage.record(
    {
      event: "run-complete",
      at: "2026-09-13T01:00:00Z",
      source: "skill",
      skill: "uig",
      repo: path.basename(repo),
      receipts: ["knowledge/receipts/2026-09-13-a.md"],
      gated: ["merge-portfolio", "external-message"],
      promoted: [],
    }
  )
  const s = usage.summarize(repo)
  assert.equal(s.runs_started, 1)
  assert.equal(s.runs_completed, 1)
  assert.equal(s.completed_in_this_repo, 1)
  assert.equal(s.receipts_written, 2)
  assert.equal(s.gated_approvals, 2)
  assert.equal(s.first_event_at, "2026-09-13T00:00:00Z")
})

test("completions in other repos are not counted as in-this-repo", t => {
  const { usage, repo } = fixture(t)
  usage.record(
    { event: "run-complete", at: "2026-09-13T00:00:00Z", source: "skill", skill: "uig", repo: "another-repo" }
  )
  const s = usage.summarize(repo)
  assert.equal(s.runs_completed, 1)
  assert.equal(s.completed_in_this_repo, 0)
})

test("malformed lines are skipped and counted, never fatal", t => {
  const { usage, repo } = fixture(t)
  fs.mkdirSync(path.dirname(usage.log), { recursive: true })
  fs.appendFileSync(usage.log, "{not json}\n", "utf8")
  usage.record({ event: "run-start", at: "2026-09-13T00:00:00Z", source: "skill", skill: "uig", repo: "repo" })
  const s = usage.summarize(repo)
  assert.equal(s.runs_started, 1)
  assert.equal(s.malformed, 1)
})

test("hook session-usage: counts uig sessions and measures only real token totals", t => {
  const { usage, repo } = fixture(t)
  usage.record({ event: "session-usage", at: "a", source: "hook", session_id: "s1", has_uig: true, input_tokens: 1000, output_tokens: 500, cached_input_tokens: 200, total: 1500 })
  usage.record({ event: "session-usage", at: "b", source: "hook", session_id: "s2", has_uig: false, input_tokens: 700, output_tokens: 300, cached_input_tokens: 0, total: 1000 })
  usage.record({ event: "session-usage", at: "c", source: "hook", session_id: "s3", has_uig: true, input_tokens: null, output_tokens: null, cached_input_tokens: null, total: null })
  const s = usage.summarize(repo)
  assert.equal(s.sessions_seen, 3)
  assert.equal(s.uig_sessions, 2)
  assert.equal(s.measured_uig_sessions, 1)
  assert.equal(s.tokens_measured, 1500)
})
