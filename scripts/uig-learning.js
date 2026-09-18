// Internal, local experience memory. Evidence records are not an authorization service.
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")
const YAML = require("yaml")
const { receiptStructure } = require("./validate-okf")
const sha = value => crypto.createHash("sha256").update(value).digest("hex")
const canonical = value =>
  Array.isArray(value)
    ? value.map(canonical)
    : value && typeof value === "object"
    ? Object.fromEntries(
        Object.keys(value)
          .sort()
          .map(key => [key, canonical(value[key])])
      )
    : value
const digest = value => sha(JSON.stringify(canonical(value)))
const clone = value => JSON.parse(JSON.stringify(value))
const ensure = (condition, message) => {
  if (!condition) throw Error(message)
}
const text = value =>
  typeof value === "string" &&
  value.trim().length >= 3 &&
  !/^(todo|pending|tbd|n\/a|\.{3}|<.*>|\[.*\])$/i.test(value.trim())
const id = value => {
  ensure(
    typeof value === "string" && /^[a-z0-9][a-z0-9-]{2,79}$/.test(value),
    "invalid identifier"
  )
  return value
}
const phases = [
  "discovery",
  "lesson-creation",
  "selection",
  "evaluation",
  "maintenance",
]
const dependencies = [
  "scripts/validate-okf.js",
  "scripts/create-okf-receipt.js",
  "scripts/uig-learning.js",
  "scripts/uig-recoverability.js",
  "knowledge/templates/template-receipt.md",
  "docs/compound-engineering/ui-gates-canon.md",
  "docs/compound-engineering/operating-system.md",
]
const enums = new Set([
  "verified",
  "verified-with-environment-limit",
  "partial",
  "failed",
  "blocked",
  "outcome-unknown",
  "pending",
  "accepted",
  "not-required",
  "task-receipt",
])
const fields = [
  "type",
  "status",
  "intent",
  "sources",
  "acceptance.status",
  "acceptance.human_review",
  "acceptance.evidence",
  "aar.expected",
  "aar.actual",
  "aar.difference",
  "aar.learning",
]
function snapshot(data) {
  return Object.fromEntries(
    fields.map(field => {
      const value = field.split(".").reduce((v, key) => v?.[key], data)
      let shape = { kind: value == null ? "missing" : typeof value }
      if (Array.isArray(value))
        shape = { kind: "array", nonempty: value.length > 0 }
      else if (typeof value === "string")
        shape = { kind: text(value) ? "text" : "empty-or-placeholder" }
      if (
        [
          "type",
          "status",
          "acceptance.status",
          "acceptance.human_review",
        ].includes(field) &&
        enums.has(value)
      )
        shape = { kind: "enum", value }
      return [field, shape]
    })
  )
}
function diagnostic(data) {
  try {
    receiptStructure(
      `---\n${YAML.stringify(data)}---\n## After Action Review\n`
    )
    return null
  } catch (error) {
    return {
      code: error.code || "invalid-structure",
      field: error.field || "receipt",
    }
  }
}
function authority(value) {
  ensure(
    value && ["principal", "source", "scope"].every(k => text(value[k])),
    "explicit principal, source and scope required"
  )
  ensure(
    Date.parse(value.expires_at) > Date.now(),
    "authority expired or invalid"
  )
  return clone(value)
}
function telemetry(file) {
  if (!file) return { kind: "unavailable", total: null }
  const raw = fs.readFileSync(file, "utf8"),
    events = raw
      .trim()
      .split(/\r?\n/)
      .map(line => JSON.parse(line))
  const turns = events.filter(e => e.type === "turn.completed")
  const starts = events.filter(e => e.type === "turn.started").length
  const lastTurn = events.filter(e => e.type.startsWith("turn.")).at(-1)
  if (
    !turns.length ||
    (starts && starts !== turns.length) ||
    lastTurn?.type !== "turn.completed" ||
    events.some(e => ["turn.failed", "error"].includes(e.type))
  )
    return { kind: "incomplete", total: null, sha256: sha(raw) }
  let input = 0,
    output = 0,
    cached = 0
  for (const { usage: u } of turns) {
    ensure(
      u &&
        [u.input_tokens, u.output_tokens, u.cached_input_tokens].every(
          n => Number.isSafeInteger(n) && n >= 0
        ),
      "invalid or incomplete usage counters"
    )
    ensure(
      u.cached_input_tokens <= u.input_tokens,
      "cached input exceeds total input"
    )
    input += u.input_tokens
    output += u.output_tokens
    cached += u.cached_input_tokens
  }
  ensure(
    Number.isSafeInteger(input + output),
    "usage total exceeds safe integer range"
  )
  return {
    kind: "actual",
    input,
    output,
    cached,
    total: input + output,
    sha256: sha(raw),
  }
}
class Learning {
  constructor(root, directory = path.join(root, ".uig-learning")) {
    this.root = root
    this.directory = directory
  }
  put(kind, key, value) {
    id(key)
    const dir = path.join(this.directory, kind)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(
      path.join(dir, key + ".json"),
      JSON.stringify(value, null, 2) + "\n",
      { flag: "wx" }
    )
    return value
  }
  get(kind, key) {
    return JSON.parse(
      fs.readFileSync(
        path.join(this.directory, kind, id(key) + ".json"),
        "utf8"
      )
    )
  }
  all(kind) {
    const dir = path.join(this.directory, kind)
    return fs.existsSync(dir)
      ? fs
          .readdirSync(dir)
          .filter(f => f.endsWith(".json"))
          .sort()
          .map(f => this.get(kind, f.slice(0, -5)))
      : []
  }
  hashes() {
    return Object.fromEntries(
      dependencies.map(file => [
        file,
        sha(fs.readFileSync(path.join(this.root, file))),
      ])
    )
  }
  fresh(lesson) {
    return digest(lesson.dependencies) === digest(this.hashes())
  }
  lesson(key) {
    const lesson = this.get("lessons", key)
    ensure(
      "lesson-" + digest(lesson.body).slice(0, 24) === key,
      "lesson content digest mismatch"
    )
    return lesson
  }
  // History is plain files, so anyone who can write a file can append an event. The
  // state is therefore never read from the last event alone: the history is replayed,
  // and every step must be backed by the artifact the real transition leaves behind
  // (an evaluated event by a stored plan and report naming this lesson version; an
  // approved event by an approval bound to this lesson's content). An event that
  // cannot be backed makes the whole lesson "invalid-history", which nothing uses.
  // Limit: this raises the bar from one forged file to a mutually consistent set of
  // forged files. Closing that needs an approval signed with a key the agent cannot
  // read, which this local store does not have.
  audit(key) {
    let lesson
    try {
      lesson = this.lesson(key)
    } catch (error) {
      return { state: "invalid-history", reason: error.message }
    }
    let state = "candidate",
      evidence = null
    for (const [index, event] of this.all("history/" + id(key)).entries()) {
      if (state === "retired") break // terminal: nothing recorded later can revive it
      const fault = this.fault(lesson, state, event)
      if (fault)
        return { state: "invalid-history", reason: `event ${index}: ${fault}` }
      state = event.state
      evidence = event.evidence
    }
    return { state, evidence }
  }
  fault(lesson, from, event) {
    try {
      const evidence = event.evidence || {}
      if (event.state === "retired")
        return text(evidence.reason) ? null : "retirement without a reason"
      if (event.state === "evaluated") {
        if (from !== "candidate") return `evaluated from ${from}`
        const planId = id(evidence.plan_id),
          plan = this.get("plans", planId),
          report = this.get("evaluations", planId)
        if (report.plan_sha256 !== digest(plan))
          return "evaluation is for a different plan"
        if (report.transfer_supported !== true)
          return "evaluation did not support transfer"
        // A plan may cover several lessons; only one that itself showed transfer earns this.
        if (!(report.lesson_transfer_pairs?.[lesson.id] >= 2))
          return "evaluation showed no transfer for this lesson"
        return null
      }
      if (event.state === "approved") {
        if (from !== "evaluated") return `approved from ${from}`
        if (evidence.body_sha256 !== digest(lesson.body))
          return "approval is for different lesson content"
        const approval = evidence.approval
        if (
          !approval ||
          !["principal", "source", "scope"].every(k => text(approval[k])) ||
          !Number.isFinite(Date.parse(approval.expires_at))
        )
          return "approval lacks principal, source, scope or expiry"
        return null
      }
      return `unknown state ${event.state}`
    } catch (error) {
      return `unverifiable: ${error.message}`
    }
  }
  state(key) {
    return this.audit(key).state
  }
  // A lesson may be planned or supplied only while its history is intact and unretired.
  usable(key) {
    return ["candidate", "evaluated", "approved"].includes(this.state(key))
  }
  transition(key, state, evidence) {
    const history = this.all("history/" + id(key))
    return this.put(
      "history/" + key,
      "event-" + String(history.length).padStart(6, "0"),
      { state, evidence, at: new Date().toISOString() }
    )
  }
  retrieve({ family, codes = [] }) {
    ensure(
      family === "receipt-authoring",
      "only receipt-authoring is supported"
    )
    const selected = this.all("lessons")
      .map(l => this.lesson(l.id))
      .filter(l => {
        const audited = this.audit(l.id)
        return (
          audited.state === "approved" &&
          Date.parse(audited.evidence.approval.expires_at) > Date.now() &&
          this.fresh(l.body) &&
          (!codes.length || codes.includes(l.body.trigger.code))
        )
      })
    // A fixed cap bounds startup context; no whole-history injection.
    return selected
      .slice(0, 3)
      .map(l => ({ id: l.id, version: digest(l.body), body: l.body }))
  }
  start(input) {
    id(input.task_id)
    ensure(
      input.family === "receipt-authoring",
      "only receipt-authoring is supported"
    )
    ensure(
      ["discovery", "live", "control", "treatment"].includes(input.mode),
      "invalid run mode"
    )
    if (input.mode === "discovery")
      ensure(
        !this.all("plans").some(p => p.tasks.includes(input.task_id)),
        "task reserved for heldout evaluation"
      )
    let selected = [],
      plan = null
    if (["control", "treatment"].includes(input.mode)) {
      plan = this.get("plans", input.plan_id)
      authority(plan.authorization)
      ensure(plan.tasks.includes(input.task_id), "task not in frozen holdout")
      ensure(
        digest(plan.dependencies) === digest(this.hashes()),
        "evaluation source changed"
      )
      ensure(
        !this.all("runs").some(
          r =>
            r.plan_id === plan.id &&
            r.task_id === input.task_id &&
            r.mode === input.mode
        ),
        "duplicate evaluation arm"
      )
      if (input.mode === "treatment") {
        ensure(
          plan.lessons.every(l => this.usable(l.id)),
          "evaluation lesson retired or invalid"
        )
        selected = plan.lessons
      }
    } else if (input.mode === "live") selected = this.retrieve(input)
    const run = {
      id: "run-" + crypto.randomUUID(),
      task_id: input.task_id,
      family: input.family,
      mode: input.mode,
      plan_id: plan?.id || null,
      lessons: selected,
      dependencies: this.hashes(),
      at: new Date().toISOString(),
    }
    this.put("runs", run.id, run)
    return {
      ...run,
      guidance: selected.map(l => ({
        lesson_id: l.id,
        trigger: l.body.trigger,
        corrections: l.body.corrections,
        caution:
          "Apply only to the same diagnostic and matching before-state. Supply task-specific evidence yourself; this lesson cannot authorize work.",
      })),
    }
  }
  assertRun(runId) {
    const run = this.get("runs", runId)
    if (run.plan_id) authority(this.get("plans", run.plan_id).authorization)
    for (const lesson of run.lessons) {
      ensure(this.usable(lesson.id), "supplied lesson retired or invalid")
      if (run.mode === "live") {
        const audited = this.audit(lesson.id)
        ensure(audited.state === "approved", "live lesson no longer approved")
        authority(audited.evidence.approval)
      }
    }
    ensure(
      !this.all("outcomes").some(o => o.run_id === runId),
      "run already finished"
    )
    ensure(
      digest(run.dependencies) === digest(this.hashes()),
      "source changed during run"
    )
    return run
  }
  record(runId, data, success) {
    this.assertRun(runId)
    const error = diagnostic(data)
    ensure(!success || !error, "cannot record invalid receipt as success")
    const attempts = this.all("attempts/" + runId)
    return this.put(
      "attempts/" + runId,
      "attempt-" + String(attempts.length).padStart(6, "0"),
      {
        run_id: runId,
        success,
        diagnostic: error,
        snapshot: snapshot(data),
        at: new Date().toISOString(),
      }
    )
  }
  propose() {
    const groups = new Map()
    for (const run of this.all("runs").filter(r => r.mode === "discovery")) {
      const attempts = this.all("attempts/" + run.id)
      for (let i = 0; i < attempts.length; i++) {
        const failed = attempts[i]
        if (
          failed.success ||
          !failed.diagnostic ||
          failed.diagnostic.field.startsWith("authorization")
        )
          continue
        const fixed = attempts.slice(i + 1).find(a => a.success)
        if (!fixed) continue
        // Never learn a repair that invents or waives human acceptance.
        if (
          digest(failed.snapshot["acceptance.human_review"]) !==
          digest(fixed.snapshot["acceptance.human_review"])
        )
          continue
        const corrections = fields
          .filter(f => digest(failed.snapshot[f]) !== digest(fixed.snapshot[f]))
          .map(field => ({
            field,
            before: failed.snapshot[field],
            after: fixed.snapshot[field],
          }))
        if (!corrections.length) continue
        const trigger = {
          ...failed.diagnostic,
          family: run.family,
          context: Object.fromEntries(
            fields
              .filter(f => failed.snapshot[f].kind === "enum")
              .map(f => [f, failed.snapshot[f]])
          ),
        }
        const key = digest({
          trigger,
          corrections,
          dependencies: run.dependencies,
        })
        const group = groups.get(key) || {
          trigger,
          corrections,
          dependencies: run.dependencies,
          evidence: new Map(),
        }
        group.evidence.set(run.task_id, {
          task_id: run.task_id,
          run_id: run.id,
          failed_attempt: i,
          successful_attempt: attempts.indexOf(fixed),
        })
        groups.set(key, group)
      }
    }
    const result = []
    for (const group of groups.values()) {
      if (group.evidence.size < 2) continue
      const evidence = [...group.evidence.values()].sort((a, b) =>
        a.task_id.localeCompare(b.task_id)
      )
      // Identity excludes accumulated evidence, so repeated proposal deduplicates the same lesson.
      const body = {
        trigger: group.trigger,
        corrections: group.corrections,
        dependencies: group.dependencies,
      }
      const key = "lesson-" + digest(body).slice(0, 24)
      if (!this.all("lessons").some(l => l.id === key))
        this.put("lessons", key, {
          id: key,
          body,
          evidence,
          created_at: new Date().toISOString(),
        })
      result.push(this.lesson(key))
    }
    return result
  }
  plan(input) {
    id(input.id)
    ensure(
      Array.isArray(input.tasks) &&
        input.tasks.length >= 6 &&
        new Set(input.tasks).size === input.tasks.length,
      "at least six distinct holdout tasks required"
    )
    input.tasks.forEach(id)
    ensure(
      text(input.model) && input.settings && typeof input.settings === "object",
      "frozen model and settings required"
    )
    ensure(
      Array.isArray(input.checks) &&
        input.checks.includes("receipt-valid") &&
        input.checks.includes("authority-review") &&
        new Set(input.checks).size === input.checks.length,
      "freeze required receipt-valid and authority-review checks"
    )
    ensure(
      Array.isArray(input.lesson_ids) &&
        input.lesson_ids.length > 0 &&
        input.lesson_ids.length <= 3 &&
        new Set(input.lesson_ids).size === input.lesson_ids.length,
      "select one to three distinct lessons"
    )
    const trainingTasks = new Set(
      this.all("runs")
        .filter(r => r.mode === "discovery")
        .map(r => r.task_id)
    )
    ensure(
      input.tasks.every(t => !trainingTasks.has(t)),
      "holdout overlaps discovery tasks"
    )
    ensure(
      Array.isArray(input.human_review_required) &&
        input.human_review_required.every(t => input.tasks.includes(t)),
      "declare holdout human-review requirements"
    )
    if (input.recoverability !== undefined) {
      ensure(
        input.recoverability &&
          typeof input.recoverability === "object" &&
          text(input.recoverability.payload_sha256) &&
          text(input.recoverability.summary) &&
          Array.isArray(input.recoverability.corrections) &&
          input.recoverability.corrections.length > 0 &&
          input.recoverability.corrections.every(
            c =>
              text(c.field) &&
              ["explicit", "partial", "unclear"].includes(c.grade)
          ),
        "recoverability attestation must grade every correction against the pinned payload"
      )
    }
    const lessons = input.lesson_ids.map(key => {
      const l = this.lesson(key)
      ensure(
        this.usable(key) && this.fresh(l.body),
        "lesson retired, invalid or stale"
      )
      return { id: key, version: digest(l.body), body: l.body }
    })
    return this.put("plans", input.id, {
      id: input.id,
      tasks: input.tasks,
      model: input.model,
      settings: clone(input.settings),
      checks: input.checks,
      human_review_required: input.human_review_required,
      lessons,
      recoverability: input.recoverability
        ? clone(input.recoverability)
        : null,
      dependencies: this.hashes(),
      authorization: authority(input.authorization),
      at: new Date().toISOString(),
    })
  }
  artifact(file) {
    ensure(text(file), "review evidence file required")
    return { path: path.resolve(file), sha256: sha(fs.readFileSync(file)) }
  }
  unusedTelemetry(usage) {
    if (!usage.sha256) return
    const used = [
      ...this.all("outcomes").map(x => x.usage),
      ...this.all("costs").map(x => x.usage),
    ]
    ensure(
      !used.some(u => u.sha256 === usage.sha256),
      "telemetry already counted"
    )
  }
  finish(runId, input) {
    const run = this.get("runs", runId)
    ensure(
      !this.all("outcomes").some(o => o.run_id === runId),
      "run already finished"
    )
    ensure(
      digest(run.dependencies) === digest(this.hashes()),
      "source changed during run"
    )
    ensure(
      ["accepted", "failed", "pending"].includes(input.acceptance) &&
        text(input.reviewer),
      "reviewer and acceptance required"
    )
    ensure(
      ["accepted", "pending", "not-required"].includes(input.human_review),
      "human review status required"
    )
    if (input.limitation !== undefined)
      ensure(text(input.limitation), "limitation must be descriptive")
    ensure(
      !(input.acceptance === "accepted" && input.human_review === "pending"),
      "pending human review cannot be accepted"
    )
    if (run.plan_id) {
      const plan = this.get("plans", run.plan_id)
      ensure(
        input.model === plan.model &&
          digest(input.settings) === digest(plan.settings),
        "model/settings differ from frozen plan"
      )
      if (plan.human_review_required.includes(run.task_id))
        ensure(
          input.human_review !== "not-required",
          "required human review cannot be skipped"
        )
    }
    const required = run.plan_id
      ? this.get("plans", run.plan_id).checks
      : ["receipt-valid", "authority-review"]
    ensure(
      required.every(k => typeof input.checks?.[k] === "boolean"),
      "required check result missing"
    )
    const attempts = this.all("attempts/" + runId)
    ensure(attempts.length > 0, "no observed receipt attempts")
    ensure(
      input.checks["receipt-valid"] === attempts.at(-1).success,
      "receipt check contradicts observed final attempt"
    )
    ensure(
      input.acceptance !== "accepted" || required.every(k => input.checks[k]),
      "failed checks cannot be accepted"
    )
    const applied = input.applied_lessons || []
    ensure(
      Array.isArray(applied) &&
        new Set(applied).size === applied.length &&
        applied.every(key => run.lessons.some(l => l.id === key)),
      "applied lesson was not supplied"
    )
    const usage = telemetry(input.usage_jsonl)
    this.unusedTelemetry(usage)
    return this.put("outcomes", runId, {
      run_id: runId,
      acceptance: input.acceptance,
      human_review: input.human_review,
      reviewer: input.reviewer,
      checks: input.checks,
      applied_lessons: applied,
      review_evidence: this.artifact(input.review_evidence),
      usage,
      failures: attempts.filter(a => !a.success).length,
      limitation: input.limitation || null,
      at: new Date().toISOString(),
    })
  }
  cost(planId, phase, input) {
    this.get("plans", planId)
    ensure(phases.includes(phase), "invalid overhead phase")
    const usage =
      input.kind === "no-model"
        ? { kind: "no-model", total: 0, reason: input.reason }
        : telemetry(input.usage_jsonl)
    if (usage.kind === "no-model")
      ensure(text(usage.reason), "explain zero model usage")
    this.unusedTelemetry(usage)
    return this.put("costs", "cost-" + digest([planId, phase]).slice(0, 32), {
      plan_id: planId,
      phase,
      usage,
    })
  }
  evaluate(planId) {
    const plan = this.get("plans", planId)
    ensure(
      digest(plan.dependencies) === digest(this.hashes()),
      "evaluation source changed"
    )
    const runs = this.all("runs").filter(r => r.plan_id === planId),
      outcomes = this.all("outcomes")
    const pair = (taskId, mode) => {
      const run = runs.find(r => r.task_id === taskId && r.mode === mode)
      const outcome = outcomes.find(o => o.run_id === run?.id)
      ensure(outcome, `missing ${mode} outcome for ${taskId}`)
      const attempts = run ? this.all("attempts/" + run.id) : []
      const first = attempts.findIndex(a => a.success)
      return {
        run,
        outcome,
        attempts: attempts.length,
        first_success_index: first === -1 ? null : first + 1,
        telemetry: outcome.usage.kind,
        tokens:
          typeof outcome.usage.total === "number" ? outcome.usage.total : null,
      }
    }
    const pairs = plan.tasks.map(taskId => ({
      task_id: taskId,
      control: pair(taskId, "control"),
      treatment: pair(taskId, "treatment"),
    }))
    const accepted = o =>
      o.acceptance === "accepted" && plan.checks.every(k => o.checks[k])
    const outcomeOf = arm => arm.outcome
    const quality = pairs.every(
      p => accepted(outcomeOf(p.control)) && accepted(outcomeOf(p.treatment))
    )
    const regressions = pairs
      .filter(
        p => accepted(outcomeOf(p.control)) && !accepted(outcomeOf(p.treatment))
      )
      .map(p => p.task_id)
    const transferPairs = pairs.filter(
      p =>
        accepted(outcomeOf(p.treatment)) &&
        outcomeOf(p.treatment).applied_lessons.length &&
        outcomeOf(p.treatment).failures < outcomeOf(p.control).failures
    ).length
    // Rework is measured on the record: failed attempts and first-success index.
    const improvementPairs = pairs.filter(
      p =>
        accepted(outcomeOf(p.treatment)) &&
        outcomeOf(p.treatment).failures < outcomeOf(p.control).failures
    ).length
    const regressionPairs = pairs
      .filter(p => {
        const controlOk = accepted(outcomeOf(p.control))
        if (controlOk && !accepted(outcomeOf(p.treatment))) return true
        if (!controlOk) return false
        return (
          accepted(outcomeOf(p.treatment)) &&
          outcomeOf(p.treatment).failures > outcomeOf(p.control).failures
        )
      })
      .map(p => p.task_id)
    const lessonTransfer = Object.fromEntries(
      plan.lessons.map(lesson => [
        lesson.id,
        pairs.filter(
          p =>
            accepted(outcomeOf(p.treatment)) &&
            outcomeOf(p.treatment).applied_lessons.includes(lesson.id) &&
            outcomeOf(p.treatment).failures < outcomeOf(p.control).failures
        ).length,
      ])
    )
    const costs = phases.map(phase =>
      this.all("costs").find(c => c.plan_id === planId && c.phase === phase)
    )
    // A complete pair needs both arms finished, complete actual telemetry, and
    // no recorded limitation (wall-clock timeouts). Timeouts never cap tokens.
    const complete = pairs.every(p =>
      [p.control, p.treatment].every(
        a => a.telemetry === "actual" && !a.outcome.limitation
      )
    )
    const complete_accepted = complete && quality
    const primary_supported =
      complete_accepted && regressionPairs.length === 0 && improvementPairs >= 2
    const inconclusive_reasons = []
    if (!primary_supported) {
      if (!complete_accepted)
        inconclusive_reasons.push(
          "not all pairs are accepted with complete telemetry and no limitation"
        )
      if (regressionPairs.length)
        inconclusive_reasons.push(
          "rework regression on task(s): " + regressionPairs.join(", ")
        )
      if (improvementPairs < 2)
        inconclusive_reasons.push("fewer than two pairs with improved receipt rework")
    }
    // The recoverability grade only downgrades a claim, never upgrades it.
    const grades = plan.recoverability?.corrections || []
    const claim_altitude =
      grades.some(c => ["explicit", "partial"].includes(c.grade))
        ? "guidance-effect"
        : grades.length && grades.every(c => c.grade === "unclear")
          ? "unverified-novelty"
          : "not-assessed"
    const overheadKnown = costs.every(
      c => c && ["actual", "no-model"].includes(c.usage.kind)
    )
    const totals = complete
      ? {
          control: pairs.reduce((n, p) => n + p.control.tokens, 0),
          treatment: pairs.reduce((n, p) => n + p.treatment.tokens, 0),
        }
      : null
    const overhead = overheadKnown
      ? costs.reduce((n, c) => n + c.usage.total, 0)
      : null
    const net =
      totals && overhead !== null
        ? totals.control - totals.treatment - overhead
        : null
    const report = {
      plan_id: planId,
      plan_sha256: digest(plan),
      lessons: plan.lessons.map(l => ({ id: l.id, version: l.version })),
      pairs,
      quality_preserved: quality,
      transfer_pairs: transferPairs,
      lesson_transfer_pairs: lessonTransfer,
      retirement_recommended:
        regressions.length > 0 || (net !== null && net <= 0),
      transfer_supported: quality && transferPairs >= 2,
      totals,
      overhead_tokens: overhead,
      net_tokens_saved: net,
      token_savings_supported: quality && transferPairs >= 2 && net > 0,
      complete_pairs: complete,
      complete_accepted,
      rework_improvement_pairs: improvementPairs,
      rework_regression_pairs: regressionPairs,
      no_rework_regression: regressionPairs.length === 0,
      primary_supported,
      inconclusive_reasons,
      claim_altitude,
      allowed_claim: primary_supported ? claim_altitude : null,
      limits: [
        "Review and approval records require truthful human attribution; local files do not authenticate a principal.",
        "Applied lessons are reviewer-attested; inspect hashed review artifacts before claiming behavioral transfer.",
        "This evaluates receipt authoring, not model weight training or general coding ability.",
        "Repeated tasks are excluded by ID; reviewers must also verify semantic novelty of holdout tasks.",
        "Any timeout, missing final trace, or zero-candidate induction makes the primary result inconclusive; completed pairs are still reported descriptively.",
        "A wall-clock timeout does not cap or estimate token usage; unavailable or incomplete telemetry stays unknown, never zero.",
        "Reduced receipt rework alone is not token savings; token claims require complete measured telemetry and known overhead.",
        "The frozen recoverability grade only downgrades the claim altitude; absence of an explicit repair in the payload never by itself proves novel knowledge.",
      ],
    }
    this.put("evaluations", planId, report)
    for (const l of plan.lessons) {
      if (regressionPairs.length)
        this.transition(l.id, "retired", {
          plan_id: planId,
          reason: "Treatment acceptance or rework regressed",
          tasks: regressionPairs,
        })
      else if (
        report.transfer_supported &&
        lessonTransfer[l.id] >= 2 &&
        this.state(l.id) === "candidate"
      )
        this.transition(l.id, "evaluated", { plan_id: planId })
    }
    return report
  }
  stats(key) {
    this.lesson(key)
    const runs = this.all("runs").filter(r => r.lessons.some(l => l.id === key))
    const outcomes = this.all("outcomes").filter(o =>
      runs.some(r => r.id === o.run_id)
    )
    const actual = outcomes.filter(o => o.usage.kind === "actual")
    return {
      supplied_runs: runs.length,
      finished_runs: outcomes.length,
      live_runs: runs.filter(r => r.mode === "live").length,
      reported_applications: outcomes.filter(o =>
        o.applied_lessons.includes(key)
      ).length,
      accepted_applications: outcomes.filter(
        o => o.acceptance === "accepted" && o.applied_lessons.includes(key)
      ).length,
      receipt_failures: outcomes.reduce((n, o) => n + o.failures, 0),
      measured_runs: actual.length,
      total_run_tokens:
        actual.length === outcomes.length && outcomes.length
          ? actual.reduce((n, o) => n + o.usage.total, 0)
          : null,
    }
  }
  summary() {
    const runs = this.all("runs")
    const outcomes = this.all("outcomes")
    const lessons = this.all("lessons")
    const plans = this.all("plans")
    const costs = this.all("costs")
    const attempts = runs.reduce(
      (n, r) => n + this.all("attempts/" + r.id).length,
      0
    )
    const byMode = {}
    for (const r of runs) byMode[r.mode] = (byMode[r.mode] || 0) + 1
    const finished = new Set(outcomes.map(o => o.run_id))
    const byAcceptance = {}
    let limitations = 0
    let failures = 0
    for (const o of outcomes) {
      byAcceptance[o.acceptance] = (byAcceptance[o.acceptance] || 0) + 1
      if (o.limitation) limitations++
      failures += o.failures
    }
    const byState = {}
    let stale = 0
    for (const l of lessons) {
      const state = this.state(l.id)
      byState[state] = (byState[state] || 0) + 1
      if (state !== "retired" && !this.fresh(this.lesson(l.id).body)) stale++
    }
    // Token accounting follows the contract: unavailable telemetry stays
    // unknown, never zero; only actual telemetry is measured.
    const actualOutcomes = outcomes.filter(o => o.usage.kind === "actual")
    const measuredTokens = actualOutcomes.reduce(
      (n, o) => n + (o.usage.total || 0),
      0
    )
    const unknownOutcomes = outcomes.filter(
      o => o.usage.kind === "unavailable"
    ).length
    const knownCosts = costs.filter(c => c.usage.kind !== "unavailable")
    const overheadTokens = knownCosts.reduce(
      (n, c) => n + (c.usage.total || 0),
      0
    )
    return {
      runs: {
        total: runs.length,
        by_mode: byMode,
        finished: finished.size,
        pending: runs.length - finished.size,
      },
      attempts,
      outcomes: {
        total: outcomes.length,
        by_acceptance: byAcceptance,
        limitations,
        failures,
      },
      lessons: { total: lessons.length, by_state: byState, stale },
      plans: { total: plans.length },
      costs: { phases: costs.length, unknown: costs.length - knownCosts.length },
      tokens: {
        measured: measuredTokens,
        known_outcomes: actualOutcomes.length,
        unknown_outcomes: unknownOutcomes,
        complete_telemetry:
          outcomes.length > 0 && actualOutcomes.length === outcomes.length,
        overhead: overheadTokens,
      },
    }
  }
  approve(key, approval) {
    ensure(
      this.state(key) === "evaluated",
      "only an evaluated lesson can be approved"
    )
    ensure(this.fresh(this.lesson(key).body), "lesson is stale")
    return this.transition(key, "approved", {
      approval: authority(approval),
      body_sha256: digest(this.lesson(key).body),
    })
  }
  retire(key, reason) {
    this.lesson(key)
    ensure(text(reason), "retirement reason required")
    return this.transition(key, "retired", { reason })
  }
}
module.exports = { Learning, telemetry, snapshot, diagnostic }
