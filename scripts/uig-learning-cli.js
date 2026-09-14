#!/usr/bin/env node
const fs = require("fs")
const path = require("path")
const { Learning } = require("./uig-learning")
const { Usage } = require("./uig-usage")
const help = `Local UI-GATES receipt learning (no model calls, commits or deployments):
  npm run uig:learn -- start run.json
  npm run uig:learn -- propose
  npm run uig:learn -- plan evaluation.json
  npm run uig:learn -- finish RUN_ID outcome.json
  npm run uig:learn -- cost PLAN_ID PHASE cost.json
  npm run uig:learn -- evaluate PLAN_ID
  npm run uig:learn -- approve LESSON_ID approval.json
  npm run uig:learn -- retire LESSON_ID "reason"
  npm run uig:learn -- list
  npm run uig:learn -- usage
  npm run uig:learn -- stats

start returns a run ID and bounded guidance. Use UIG_LEARNING_RUN=RUN_ID with
okf:receipt for automatic recording. Discovery requires two distinct corrected
tasks before proposing a candidate. Candidates are never live-approved automatically.
plan freezes six or more unseen tasks, checks, model/settings, and lesson versions.
Approval files must record an actual principal decision, never inferred approval.
See docs/compound-engineering/receipt-learning.md for input schemas and limits.
`
const learning = new Learning(path.resolve(__dirname, ".."))
const read = file => JSON.parse(fs.readFileSync(file, "utf8"))
function main(args) {
  const [command, ...rest] = args
  if (!command || command === "--help") return help
  const arity = {
    start: 1,
    propose: 0,
    plan: 1,
    finish: 2,
    cost: 3,
    evaluate: 1,
    approve: 2,
    retire: 2,
    list: 0,
    usage: 0,
    stats: 0,
  }
  if (!(command in arity) || rest.length !== arity[command]) throw Error(help)
  switch (command) {
    case "start":
      return learning.start(read(rest[0]))
    case "propose":
      return learning.propose()
    case "plan":
      return learning.plan(read(rest[0]))
    case "finish":
      return learning.finish(rest[0], read(rest[1]))
    case "cost":
      return learning.cost(rest[0], rest[1], read(rest[2]))
    case "evaluate":
      return learning.evaluate(rest[0])
    case "approve":
      return learning.approve(rest[0], read(rest[1]))
    case "retire":
      return learning.retire(...rest)
    case "list":
      return learning.all("lessons").map(l => ({
        id: l.id,
        state: learning.state(l.id),
        stale: !learning.fresh(learning.lesson(l.id).body),
        evidence: l.evidence,
        usage: learning.stats(l.id),
      }))
    case "usage":
      return usageReport(learning.root)
    case "stats":
      return [
        `USAGE — auto-tracked, all-time (global ${new Usage().log})`,
        usageReport(learning.root),
        "",
        "HARNESS — instrumented evaluation only (.uig-learning/, NOT usage)",
        formatStats(learning.summary()),
      ].join("\n")
  }
}

function usageReport(root) {
  return formatUsage(new Usage().summarize(root))
}

function formatUsage(u) {
  return [
    `runs started:       ${u.runs_started}`,
    `runs completed:     ${u.runs_completed}  (${u.completed_in_this_repo} in this repo)`,
    `receipts written:    ${u.receipts_written}  (this repo, knowledge/receipts/)`,
    `gated approvals:     ${u.gated_approvals}`,
    `sessions (hook):     ${u.sessions_seen} seen, ${u.uig_sessions} ran uig`,
    `tokens measured:     ${u.tokens_measured} across ${u.measured_uig_sessions} uig session(s) (input+output; cache reported separately)`,
    `first event:         ${u.first_event_at || "none yet"}`,
    `malformed lines:     ${u.malformed}`,
  ].join("\n")
}

function formatStats(s) {
  const mode = Object.entries(s.runs.by_mode)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ") || "none"
  const acceptance = Object.entries(s.outcomes.by_acceptance)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ") || "none"
  const state = Object.entries(s.lessons.by_state)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ") || "none"
  const tokenState = s.tokens.complete_telemetry
    ? `${s.tokens.measured} total from ${s.tokens.known_outcomes} outcome(s) with actual telemetry`
    : `${s.tokens.measured} measured from ${s.tokens.known_outcomes} outcome(s): ${s.tokens.unknown_outcomes} unavailable outcome(s) never counted as zero`
  return [
    `runs:      ${s.runs.total} total [${mode}]  finished ${s.runs.finished}, pending ${s.runs.pending}`,
    `attempts:  ${s.attempts}`,
    `outcomes:  ${s.outcomes.total} total [${acceptance}]  failures ${s.outcomes.failures}, limitations ${s.outcomes.limitations}`,
    `lessons:   ${s.lessons.total} total [${state}]  stale ${s.lessons.stale}`,
    `plans:     ${s.plans.total} frozen`,
    `costs:     ${s.costs.phases} phase(s) recorded${s.costs.unknown ? `, ${s.costs.unknown} unknown (uncounted)` : ""}`,
    `tokens:    ${tokenState}`,
    `overhead:  ${s.tokens.overhead} measured token(s)`,
  ].join("\n")
}
try {
  const result = main(process.argv.slice(2))
  console.log(
    typeof result === "string" ? result : JSON.stringify(result, null, 2)
  )
} catch (error) {
  console.error(`[uig:learn] ${error.message}`)
  process.exitCode = 1
}
