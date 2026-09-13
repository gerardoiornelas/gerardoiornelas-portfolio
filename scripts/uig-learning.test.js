const test = require("node:test")
const assert = require("node:assert/strict")
const fs = require("fs")
const os = require("os")
const path = require("path")
const { execFileSync, spawnSync } = require("child_process")
const { Learning, telemetry } = require("./uig-learning")
const { createReceipt } = require("./create-okf-receipt")
const ROOT = path.resolve(__dirname, "..")
function setup(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "uig-learning-test-"))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  for (const file of [
    "scripts/validate-okf.js",
    "scripts/create-okf-receipt.js",
    "scripts/uig-learning.js",
    "scripts/uig-recoverability.js",
    "knowledge/context.md",
    "knowledge/okf.yaml",
    "knowledge/lessons/index.md",
    "knowledge/templates/template-receipt.md",
    "docs/compound-engineering/ui-gates-canon.md",
    "docs/compound-engineering/operating-system.md",
  ]) {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
    fs.copyFileSync(path.join(ROOT, file), path.join(root, file))
  }
  fs.mkdirSync(path.join(root, "knowledge/receipts"), { recursive: true })
  fs.writeFileSync(path.join(root, "source.txt"), "source")
  fs.writeFileSync(
    path.join(root, "review.txt"),
    "Fixture reviewer confirmed receipt authoring; this is synthetic test evidence."
  )
  execFileSync("git", ["init", "-q", root])
  return { root, learning: new Learning(root) }
}
const approval = () => ({
  principal: "Fixture principal",
  source: "Explicit fixture-only approval",
  scope: "Synthetic local test",
  expires_at: new Date(Date.now() + 86400000).toISOString(),
})
const data = () => ({
  title: "Fixture receipt",
  type: "task-receipt",
  status: "verified",
  intent: "Receipt schema task",
  sources: ["source.txt"],
  authorization: {
    state: "delegated",
    source: "SECRET-AUTH-TEXT",
    scope: "Receipt fixture only",
    valid_until: "Current fixture task",
  },
  acceptance: {
    status: "verified",
    human_review: "pending",
    reviewer: "Fixture reviewer",
    evidence: ["SECRET-EVIDENCE-TEXT"],
  },
  aar: {
    expected: "Valid receipt",
    actual: "Fixture schema validated",
    difference: "Human review is still pending in represented task",
    learning: "Do not infer acceptance",
  },
})
function repair(input, lesson) {
  // Generic fixture consumer: applies observed enum corrections, never a hand-written solution.
  const result = structuredClone(input)
  for (const correction of lesson.body.corrections) {
    assert.equal(correction.after.kind, "enum")
    const keys = correction.field.split("."),
      leaf = keys.pop()
    const target = keys.reduce((v, k) => v[k], result)
    assert.equal(target[leaf], correction.before.value)
    target[leaf] = correction.after.value
  }
  return result
}
function teach(env, task) {
  const run = env.learning.start({
    task_id: task,
    family: "receipt-authoring",
    mode: "discovery",
  })
  const input = data(),
    slug = "2026-09-13-" + task
  assert.throws(
    () => createReceipt(env.root, slug, input, { learningRun: run.id }),
    /pending human/
  )
  input.status = input.acceptance.status = "partial"
  createReceipt(env.root, slug, input, { learningRun: run.id })
  return run
}
function trained(env) {
  teach(env, "discovery-one")
  teach(env, "discovery-two")
  return env.learning.propose()[0]
}
function planned(env, lesson, overrides = {}) {
  return env.learning.plan({
    id: "evaluation-one",
    tasks: Array.from({ length: 6 }, (_, i) => "holdout-" + i),
    model: "fixture-model",
    settings: { effort: "fixed" },
    checks: ["receipt-valid", "authority-review"],
    human_review_required: [],
    lesson_ids: [lesson.id],
    authorization: approval(),
    ...overrides,
  })
}
function usage(env, key, amount) {
  const file = path.join(env.root, key + ".jsonl")
  fs.writeFileSync(
    file,
    JSON.stringify({
      type: "turn.completed",
      fixture_id: key,
      usage: {
        input_tokens: amount,
        cached_input_tokens: 5,
        output_tokens: 10,
      },
    }) + "\n"
  )
  return file
}
function finishInput(env, run, extra = {}) {
  return {
    acceptance: "accepted",
    human_review: "not-required",
    reviewer: "Independent fixture reviewer",
    checks: { "receipt-valid": true, "authority-review": true },
    review_evidence: path.join(env.root, "review.txt"),
    applied_lessons: run.lessons.map(l => l.id),
    model: "fixture-model",
    settings: { effort: "fixed" },
    ...extra,
  }
}
function runPairs(env, lesson, plan, { tokens = false, pending = false } = {}) {
  for (const task of plan.tasks)
    for (const mode of ["control", "treatment"]) {
      const run = env.learning.start({
        task_id: task,
        family: "receipt-authoring",
        mode,
        plan_id: plan.id,
      })
      const input = data()
      input.title = "Unseen fixture " + task
      if (mode === "control") env.learning.record(run.id, input, false)
      const fixed = repair(input, lesson)
      env.learning.record(run.id, fixed, true)
      env.learning.finish(
        run.id,
        finishInput(env, run, {
          acceptance:
            pending && task === plan.tasks[0] && mode === "treatment"
              ? "pending"
              : "accepted",
          ...(tokens
            ? {
                usage_jsonl: usage(
                  env,
                  task + "-" + mode,
                  mode === "control" ? 100 : 50
                ),
              }
            : {}),
        })
      )
    }
}
test("automatic receipt hook records failures and fixes, redacts content, and requires repeated distinct tasks", t => {
  const env = setup(t)
  teach(env, "discovery-one")
  assert.deepEqual(env.learning.propose(), [])
  teach(env, "discovery-two")
  const lessons = env.learning.propose()
  assert.equal(lessons.length, 1)
  assert.equal(lessons[0].body.trigger.code, "human-review-pending")
  assert.deepEqual(
    lessons[0].body.corrections.map(c => [c.field, c.after.value]),
    [
      ["status", "partial"],
      ["acceptance.status", "partial"],
    ]
  )
  assert.equal(env.learning.propose()[0].id, lessons[0].id)
  assert.equal(env.learning.all("lessons").length, 1)
  const serialized = JSON.stringify([
    ...env.learning
      .all("runs")
      .flatMap(r => env.learning.all("attempts/" + r.id)),
    ...lessons,
  ])
  assert.ok(!serialized.includes("SECRET-"))
  assert.deepEqual(env.learning.retrieve({ family: "receipt-authoring" }), [])
  assert.throws(
    () => env.learning.approve(lessons[0].id, approval()),
    /evaluated/
  )
})
test("same task repeated cannot masquerade as independent experience; authority corrections are excluded", t => {
  const env = setup(t)
  for (let i = 0; i < 2; i++) {
    const r = env.learning.start({
      task_id: "same-task",
      family: "receipt-authoring",
      mode: "discovery",
    })
    env.learning.record(r.id, data(), false)
    const d = data()
    d.status = d.acceptance.status = "partial"
    env.learning.record(r.id, d, true)
  }
  assert.deepEqual(env.learning.propose(), [])
  for (const task_id of ["auth-one", "auth-two"]) {
    const r = env.learning.start({
        task_id,
        family: "receipt-authoring",
        mode: "discovery",
      }),
      d = data()
    d.status = d.acceptance.status = "partial"
    d.authorization.state = "prohibited"
    env.learning.record(r.id, d, false)
    d.authorization.state = "delegated"
    env.learning.record(r.id, d, true)
  }
  assert.deepEqual(env.learning.propose(), [])
})
test("six unseen matched fixtures demonstrate transfer, then require explicit approval before live reuse", t => {
  const env = setup(t),
    lesson = trained(env),
    plan = planned(env, lesson)
  assert.throws(
    () =>
      planned(env, lesson, {
        id: "overlap-plan",
        tasks: ["discovery-one", ...plan.tasks.slice(1)],
      }),
    /overlaps/
  )
  assert.throws(
    () =>
      env.learning.start({
        task_id: plan.tasks[0],
        family: "receipt-authoring",
        mode: "discovery",
      }),
    /reserved/
  )
  runPairs(env, lesson, plan)
  const report = env.learning.evaluate(plan.id)
  assert.equal(report.transfer_pairs, 6)
  assert.equal(report.transfer_supported, true)
  assert.equal(report.totals, null)
  assert.equal(report.token_savings_supported, false)
  assert.equal(env.learning.state(lesson.id), "evaluated")
  assert.deepEqual(env.learning.retrieve({ family: "receipt-authoring" }), [])
  assert.throws(
    () => env.learning.approve(lesson.id, { ...approval(), source: "" }),
    /explicit/
  )
  env.learning.approve(lesson.id, approval())
  const next = env.learning.start({
    task_id: "later-task",
    family: "receipt-authoring",
    mode: "live",
  })
  assert.equal(next.lessons[0].id, lesson.id)
  assert.equal(next.guidance[0].corrections[0].after.value, "partial")
  assert.deepEqual(
    env.learning.retrieve({
      family: "receipt-authoring",
      codes: ["unrelated"],
    }),
    []
  )
  env.learning.retire(lesson.id, "Fixture lesson superseded")
  assert.deepEqual(env.learning.retrieve({ family: "receipt-authoring" }), [])
})
test("source changes invalidate lesson reuse and active evaluations", t => {
  const env = setup(t),
    lesson = trained(env),
    plan = planned(env, lesson)
  runPairs(env, lesson, plan)
  env.learning.evaluate(plan.id)
  env.learning.approve(lesson.id, approval())
  fs.appendFileSync(
    path.join(env.root, "scripts/validate-okf.js"),
    "\n// changed schema\n"
  )
  assert.deepEqual(env.learning.retrieve({ family: "receipt-authoring" }), [])
  assert.throws(() => planned(env, lesson, { id: "later-plan" }), /stale/)
  assert.throws(() => env.learning.evaluate(plan.id), /source changed/)
})
test("evaluation counts all arms and overhead before supporting token savings", t => {
  const env = setup(t),
    lesson = trained(env),
    plan = planned(env, lesson)
  runPairs(env, lesson, plan, { tokens: true })
  for (const phase of [
    "discovery",
    "lesson-creation",
    "selection",
    "evaluation",
    "maintenance",
  ])
    env.learning.cost(plan.id, phase, {
      kind: "no-model",
      reason: "Synthetic fixture arithmetic only; no model called",
    })
  const r = env.learning.evaluate(plan.id)
  assert.equal(r.totals.control, 660)
  assert.equal(r.totals.treatment, 360)
  assert.equal(r.net_tokens_saved, 300)
  assert.equal(r.token_savings_supported, true)
  assert.equal(r.pairs.length, 6)
})
test("unknown overhead and pending outcomes prevent savings and promotion; regression suspends lessons", t => {
  const env = setup(t),
    lesson = trained(env),
    plan = planned(env, lesson)
  runPairs(env, lesson, plan, { tokens: true, pending: true })
  const r = env.learning.evaluate(plan.id)
  assert.equal(r.totals.control, 660)
  assert.equal(r.overhead_tokens, null)
  assert.equal(r.quality_preserved, false)
  assert.equal(r.token_savings_supported, false)
  assert.equal(env.learning.state(lesson.id), "retired")
  assert.throws(() => env.learning.approve(lesson.id, approval()), /evaluated/)
})
test("refuses missing arms, duplicates, weakened checks, changed model, invented reuse, and skipped human review", t => {
  const env = setup(t),
    lesson = trained(env)
  assert.throws(
    () => planned(env, lesson, { checks: ["receipt-valid"] }),
    /freeze required/
  )
  const plan = planned(env, lesson, { human_review_required: ["holdout-0"] })
  const input = {
      task_id: plan.tasks[0],
      family: "receipt-authoring",
      mode: "treatment",
      plan_id: plan.id,
    },
    run = env.learning.start(input)
  assert.throws(() => env.learning.start(input), /duplicate/)
  env.learning.record(run.id, repair(data(), lesson), true)
  assert.throws(
    () => env.learning.finish(run.id, finishInput(env, run)),
    /cannot be skipped/
  )
  assert.throws(
    () =>
      env.learning.finish(
        run.id,
        finishInput(env, run, { human_review: "pending" })
      ),
    /cannot be accepted/
  )
  assert.throws(
    () =>
      env.learning.finish(
        run.id,
        finishInput(env, run, { human_review: "accepted", model: "different" })
      ),
    /model\/settings/
  )
  assert.throws(
    () =>
      env.learning.finish(
        run.id,
        finishInput(env, run, {
          human_review: "accepted",
          checks: { "receipt-valid": true },
        })
      ),
    /missing/
  )
  assert.throws(
    () =>
      env.learning.finish(
        run.id,
        finishInput(env, run, {
          human_review: "accepted",
          applied_lessons: ["invented"],
        })
      ),
    /not supplied/
  )
  assert.throws(() => env.learning.evaluate(plan.id), /missing/)
})
test("telemetry never double-counts cache, rejects duplicate imports and cannot turn incomplete logs into zeros", t => {
  const env = setup(t),
    lesson = trained(env),
    plan = planned(env, lesson)
  const file = usage(env, "unique-usage", 100)
  assert.equal(telemetry(file).total, 110)
  env.learning.cost(plan.id, "discovery", { usage_jsonl: file })
  assert.throws(
    () => env.learning.cost(plan.id, "evaluation", { usage_jsonl: file }),
    /already counted/
  )
  fs.appendFileSync(file, JSON.stringify({ type: "turn.failed" }) + "\n")
  assert.equal(telemetry(file).total, null)
  assert.equal(telemetry().total, null)
  fs.writeFileSync(
    file,
    JSON.stringify({
      type: "turn.completed",
      usage: { input_tokens: 10, cached_input_tokens: 11, output_tokens: 1 },
    })
  )
  assert.throws(() => telemetry(file), /exceeds/)
})
test("receipt hook refuses finished run before writing another receipt", t => {
  const env = setup(t),
    run = teach(env, "completed-task")
  env.learning.finish(run.id, finishInput(env, run))
  const d = data()
  d.status = d.acceptance.status = "partial"
  assert.throws(
    () =>
      createReceipt(env.root, "2026-09-13-another", d, { learningRun: run.id }),
    /already finished/
  )
  assert.ok(
    !fs.existsSync(
      path.join(env.root, "knowledge/receipts/2026-09-13-another.md")
    )
  )
})
test("CLI describes local operation and rejects malformed commands without mutation", () => {
  const command = path.join(ROOT, "scripts/uig-learning-cli.js")
  const help = spawnSync(process.execPath, [command, "--help"], {
    encoding: "utf8",
  })
  assert.equal(help.status, 0)
  assert.match(help.stdout, /no model calls/)
  assert.equal(
    spawnSync(process.execPath, [command, "unknown"], { encoding: "utf8" })
      .status,
    1
  )
})
test("pending final telemetry turn and measured overhead prevent false efficiency claims", t => {
  const env = setup(t),
    lesson = trained(env),
    plan = planned(env, lesson)
  const file = usage(env, "unfinished", 100)
  fs.appendFileSync(file, JSON.stringify({ type: "turn.started" }) + "\n")
  assert.equal(telemetry(file).total, null)
  runPairs(env, lesson, plan, { tokens: true })
  env.learning.cost(plan.id, "discovery", {
    usage_jsonl: usage(env, "discovery-cost", 400),
  })
  for (const phase of [
    "lesson-creation",
    "selection",
    "evaluation",
    "maintenance",
  ])
    env.learning.cost(plan.id, phase, {
      kind: "no-model",
      reason: "Fixture phase makes no model calls",
    })
  const r = env.learning.evaluate(plan.id)
  assert.equal(r.net_tokens_saved, -110)
  assert.equal(r.token_savings_supported, false)
  assert.equal(r.retirement_recommended, true)
})
test("expired and revoked authority prevents live guidance use", t => {
  const env = setup(t),
    lesson = trained(env),
    plan = planned(env, lesson)
  runPairs(env, lesson, plan)
  env.learning.evaluate(plan.id)
  assert.throws(
    () =>
      env.learning.approve(lesson.id, {
        ...approval(),
        expires_at: "2000-01-01",
      }),
    /expired/
  )
  env.learning.approve(lesson.id, approval())
  const run = env.learning.start({
    task_id: "live-before-retirement",
    family: "receipt-authoring",
    mode: "live",
  })
  env.learning.retire(lesson.id, "Principal withdrew approval")
  assert.throws(() => env.learning.assertRun(run.id), /retired/)
})
test("does not learn to waive pending human review as a schema shortcut", t => {
  const env = setup(t)
  for (const task_id of ["waiver-one", "waiver-two"]) {
    const run = env.learning.start({
        task_id,
        family: "receipt-authoring",
        mode: "discovery",
      }),
      d = data()
    env.learning.record(run.id, d, false)
    d.acceptance.human_review = "not-required"
    env.learning.record(run.id, d, true)
  }
  assert.deepEqual(env.learning.propose(), [])
})
test("reuse statistics distinguish supplied, applied, accepted and missing usage", t => {
  const env = setup(t),
    lesson = trained(env),
    plan = planned(env, lesson)
  runPairs(env, lesson, plan)
  const stats = env.learning.stats(lesson.id)
  assert.equal(stats.supplied_runs, 6)
  assert.equal(stats.accepted_applications, 6)
  assert.equal(stats.live_runs, 0)
  assert.equal(stats.measured_runs, 0)
  assert.equal(stats.total_run_tokens, null)
})
test("an unused co-selected lesson does not inherit another lesson's evaluation", t => {
  const env = setup(t),
    first = trained(env)
  for (const task_id of ["mismatch-one", "mismatch-two"]) {
    const run = env.learning.start({
        task_id,
        family: "receipt-authoring",
        mode: "discovery",
      }),
      d = data()
    d.acceptance.human_review = "not-required"
    d.acceptance.status = "partial"
    env.learning.record(run.id, d, false)
    d.status = "partial"
    env.learning.record(run.id, d, true)
  }
  const second = env.learning.propose().find(l => l.id !== first.id)
  const plan = planned(env, first, { lesson_ids: [first.id, second.id] })
  for (const task of plan.tasks)
    for (const mode of ["control", "treatment"]) {
      const run = env.learning.start({
        task_id: task,
        family: "receipt-authoring",
        mode,
        plan_id: plan.id,
      })
      if (mode === "control") env.learning.record(run.id, data(), false)
      env.learning.record(run.id, repair(data(), first), true)
      env.learning.finish(
        run.id,
        finishInput(env, run, {
          applied_lessons: mode === "treatment" ? [first.id] : [],
        })
      )
    }
  const report = env.learning.evaluate(plan.id)
  assert.equal(report.lesson_transfer_pairs[second.id], 0)
  assert.equal(env.learning.state(first.id), "evaluated")
  assert.equal(env.learning.state(second.id), "candidate")
})
function pairArm(env, lesson, plan, task, mode, { failures = 0, limitation } = {}) {
  const run = env.learning.start({
    task_id: task,
    family: "receipt-authoring",
    mode,
    plan_id: plan.id,
  })
  if (mode === "control") env.learning.record(run.id, data(), false)
  for (let i = 0; i < failures; i++) env.learning.record(run.id, data(), false)
  env.learning.record(run.id, repair(data(), lesson), true)
  env.learning.finish(
    run.id,
    finishInput(env, run, {
      usage_jsonl: usage(
        env,
        task + "-" + mode + "-" + failures,
        mode === "control" ? 100 : 50
      ),
      ...(limitation ? { limitation } : {}),
    })
  )
  return run
}
test("complete measured evaluation supports the primary claim only without rework regression", t => {
  const env = setup(t),
    lesson = trained(env),
    plan = planned(env, lesson)
  runPairs(env, lesson, plan, { tokens: true })
  for (const phase of [
    "discovery",
    "lesson-creation",
    "selection",
    "evaluation",
    "maintenance",
  ])
    env.learning.cost(plan.id, phase, {
      kind: "no-model",
      reason: "Synthetic fixture only; no model called",
    })
  const r = env.learning.evaluate(plan.id)
  assert.equal(r.complete_pairs, true)
  assert.equal(r.complete_accepted, true)
  assert.equal(r.quality_preserved, true)
  assert.equal(r.rework_improvement_pairs, 6)
  assert.deepEqual(r.rework_regression_pairs, [])
  assert.equal(r.no_rework_regression, true)
  assert.equal(r.primary_supported, true)
  assert.deepEqual(r.inconclusive_reasons, [])
  assert.equal(r.claim_altitude, "not-assessed")
  assert.equal(r.allowed_claim, "not-assessed")
  assert.equal(env.learning.state(lesson.id), "evaluated")
})
test("a recorded wall-clock limitation keeps completed arms descriptive but makes the primary inconclusive", t => {
  const env = setup(t),
    lesson = trained(env),
    plan = planned(env, lesson)
  for (const task of plan.tasks)
    for (const mode of ["control", "treatment"])
      pairArm(env, lesson, plan, task, mode, {
        limitation:
          task === plan.tasks[0] && mode === "treatment"
            ? "Wall-clock timeout after the first failed receipt attempt"
            : undefined,
      })
  const r = env.learning.evaluate(plan.id)
  assert.equal(r.pairs.length, 6)
  assert.equal(r.complete_pairs, false)
  assert.equal(r.complete_accepted, false)
  assert.equal(r.primary_supported, false)
  assert.equal(r.totals, null)
  assert.equal(r.allowed_claim, null)
  assert.ok(r.inconclusive_reasons.length >= 1)
  assert.equal(env.learning.state(lesson.id), "evaluated")})
test("rework regression on one accepted arm blocks the primary claim and suspends the lesson", t => {
  const env = setup(t),
    lesson = trained(env),
    plan = planned(env, lesson)
  for (const task of plan.tasks)
    for (const mode of ["control", "treatment"])
      pairArm(env, lesson, plan, task, mode, {
        failures: task === plan.tasks[0] && mode === "treatment" ? 2 : 0,
      })
  const r = env.learning.evaluate(plan.id)
  assert.equal(r.complete_pairs, true)
  assert.equal(r.complete_accepted, true)
  assert.deepEqual(r.rework_regression_pairs, [plan.tasks[0]])
  assert.equal(r.no_rework_regression, false)
  assert.equal(r.rework_improvement_pairs, 5)
  assert.equal(r.primary_supported, false)
  assert.equal(
    r.inconclusive_reasons[0],
    "rework regression on task(s): " + plan.tasks[0]
  )
  assert.equal(r.allowed_claim, null)
  assert.equal(env.learning.state(lesson.id), "retired")
})
test("finish validates and stores a descriptive limitation", t => {
  const env = setup(t)
  const run = env.learning.start({
    task_id: "limited-task",
    family: "receipt-authoring",
    mode: "discovery",
  })
  const d = data()
  d.status = d.acceptance.status = "partial"
  env.learning.record(run.id, d, true)
  assert.throws(
    () =>
      env.learning.finish(
        run.id,
        finishInput(env, run, { limitation: "   " })
      ),
    /limitation must be descriptive/
  )
  env.learning.finish(
    run.id,
    finishInput(env, run, {
      limitation: "Wall-clock timeout after the first failed attempt",
    })
  )
  const outcome = env.learning
    .all("outcomes")
    .find(o => o.run_id === run.id)
  assert.equal(
    outcome.limitation,
    "Wall-clock timeout after the first failed attempt"
  )
})
test("recoverability attestation is validated at plan freeze and only caps the claim altitude", t => {
  const env = setup(t),
    lesson = trained(env)
  const attestation = over => ({
    payload_sha256: "f".repeat(64),
    summary: "Frozen payload explains the required receipt repair.",
    corrections: [{ field: "status", grade: "explicit" }],
    ...over,
  })
  assert.throws(
    () =>
      planned(env, lesson, {
        id: "bad-sha",
        recoverability: attestation({ payload_sha256: "" }),
      }),
    /recoverability attestation/
  )
  assert.throws(
    () =>
      planned(env, lesson, {
        id: "bad-empty",
        recoverability: attestation({ corrections: [] }),
      }),
    /recoverability attestation/
  )
  assert.throws(
    () =>
      planned(env, lesson, {
        id: "bad-grade",
        recoverability: attestation({
          corrections: [{ field: "status", grade: "verified" }],
        }),
      }),
    /recoverability attestation/
  )
  // Primary unsupported but explicit payload grades: altitude never upgrades the claim.
  const raw = planned(env, lesson, {
    id: "explicit-plain",
    recoverability: attestation(),
  })
  runPairs(env, lesson, raw, {})
  const unclaimed = env.learning.evaluate(raw.id)
  assert.equal(unclaimed.claim_altitude, "guidance-effect")
  assert.equal(unclaimed.allowed_claim, null)
  // Primary supported with explicit payload grades keeps the guidance-effect ceiling.
  const full = planned(env, lesson, {
    id: "explicit-token",
    recoverability: attestation(),
  })
  runPairs(env, lesson, full, { tokens: true })
  for (const phase of [
    "discovery",
    "lesson-creation",
    "selection",
    "evaluation",
    "maintenance",
  ])
    env.learning.cost(full.id, phase, {
      kind: "no-model",
      reason: "Synthetic fixture only; no model called",
    })
  const r = env.learning.evaluate(full.id)
  assert.equal(r.claim_altitude, "guidance-effect")
  assert.equal(r.allowed_claim, "guidance-effect")
})
test("an all-unclear recoverability payload caps any claim at unverified-novelty", t => {
  const env = setup(t),
    lesson = trained(env),
    plan = planned(env, lesson, {
      id: "opaque-payload",
      recoverability: {
        payload_sha256: "e".repeat(64),
        summary: "No payload file co-occurs with the corrected fields.",
        corrections: [
          { field: "status", grade: "unclear" },
          { field: "acceptance.status", grade: "unclear" },
        ],
      },
    })
  runPairs(env, lesson, plan, { tokens: true })
  const r = env.learning.evaluate(plan.id)
  assert.equal(r.claim_altitude, "unverified-novelty")
  assert.equal(r.allowed_claim, "unverified-novelty")
})
