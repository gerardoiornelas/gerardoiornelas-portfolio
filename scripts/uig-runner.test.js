const test = require("node:test")
const assert = require("node:assert/strict")
const fs = require("fs")
const os = require("os")
const path = require("path")
const { spawnSync, execFileSync } = require("child_process")
const { payloadSha, seedStore, isolationViolation, verify } = require("../runner.cjs")
const ROOT = path.resolve(__dirname, "..")
const RUNNER = path.join(ROOT, "runner.cjs")

function tmp(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "uig-runner-"))
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }))
  return dir
}
// A minimal workspace that is enough for create-okf-receipt.js to run inside a
// subprocess: scripts, knowledge, templates, and the yaml dependency.
function fixtureWorkspace(t) {
  const ws = path.join(tmp(t), "workspace")
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
    fs.mkdirSync(path.dirname(path.join(ws, file)), { recursive: true })
    fs.copyFileSync(path.join(ROOT, file), path.join(ws, file))
  }
  fs.mkdirSync(path.join(ws, "knowledge/receipts"), { recursive: true })
  fs.mkdirSync(path.join(ws, "node_modules"), { recursive: true })
  // yaml must resolve inside the disposable checkout like it does in this repo.
  fs.symlinkSync(path.join(ROOT, "node_modules/yaml"), path.join(ws, "node_modules/yaml"), "dir")
  fs.writeFileSync(path.join(ws, "source.txt"), "source")
  fs.writeFileSync(path.join(ws, "review.txt"), "Fixture reviewer confirmed the repair.")
  execFileSync("git", ["init", "-q", ws])
  return ws
}
function receiptData() {
  return {
    title: "Fixture receipt",
    type: "task-receipt",
    status: "verified",
    intent: "Receipt schema task",
    sources: ["source.txt"],
    authorization: {
      state: "delegated",
      source: "Fixture-only authorization",
      scope: "Fixture only",
      valid_until: "Fixture task",
    },
    acceptance: {
      status: "verified",
      human_review: "pending",
      reviewer: "Fixture reviewer",
      evidence: ["Fixture evidence"],
    },
    aar: {
      expected: "Valid receipt",
      actual: "Fixture schema validated",
      difference: "Human review pending in fixture",
      learning: "No inference",
    },
  }
}
function writeFixtureReceipt(dir, name, mutate) {
  const d = receiptData()
  d.status = d.acceptance.status = "partial"
  if (mutate) mutate(d)
  const file = path.join(dir, name + ".yaml")
  fs.writeFileSync(file, require("yaml").stringify(d))
  return file
}
function caseSlug(i) {
  return "holdout-task-" + i
}
function makeConfig(t, ws) {
  const dir = tmp(t)
  const manifest = {
    files: [
      "scripts/validate-okf.js",
      "scripts/create-okf-receipt.js",
      "source.txt",
      "review.txt",
    ].map(file => ({ path: file })),
  }
  const loaded = manifest.files.map(entry => ({
    path: entry.path,
    raw: fs.readFileSync(path.join(ws, entry.path), "utf8"),
  }))
  const cases = Array.from({ length: 6 }, (_, i) => {
    const slug = caseSlug(i)
    const first = writeFixtureReceipt(dir, slug + "-first", d => {
      d.status = d.acceptance.status = "verified" // intended structural failure
    })
    const fixed = writeFixtureReceipt(dir, slug + "-fixed")
    fs.writeFileSync(path.join(dir, slug + "-prompt.txt"), "Task prompt " + i)
    return { id: slug, prompt: path.join(dir, slug + "-prompt.txt"), first_receipt: first, fixed_receipt: fixed }
  })
  const configFile = path.join(dir, "config.json")
  fs.writeFileSync(
    configFile,
    JSON.stringify(
      {
        workspace: ws,
        scratch: path.join(dir, "scratch"),
        plan: "runner-fixture-plan",
        cases,
        payload: {
          manifest: path.join(dir, "manifest.json"),
          root: ws,
          expected_sha256: payloadSha(loaded),
        },
      },
      null,
      2
    )
  )
  fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest))
  return configFile
}
function cli(args) {
  return spawnSync(process.execPath, [RUNNER, ...args], { encoding: "utf8" })
}

test("payload verification catches content drift on any pinned file", t => {
  const ws = fixtureWorkspace(t)
  const dir = tmp(t)
  const manifest = { files: [{ path: "source.txt" }] }
  const loaded = [{ path: "source.txt", raw: fs.readFileSync(path.join(ws, "source.txt"), "utf8") }]
  const config = {
    payload: { manifest: path.join(dir, "manifest.json"), root: ws, expected_sha256: payloadSha(loaded) },
  }
  fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest))
  assert.deepEqual(verify(config).files, ["source.txt"])
  fs.appendFileSync(path.join(ws, "source.txt"), "\n// drift\n")
  assert.throws(() => verify(config), /drifted/)
})

test("cases validation requires six distinct tasks with real fixtures", t => {
  const ws = fixtureWorkspace(t)
  const dir = tmp(t)
  const first = writeFixtureReceipt(dir, "one-first", d => { d.status = "verified" })
  const { validateCases } = require("../runner.cjs")
  assert.throws(() => validateCases({}), /at least six/)
  assert.throws(
    () =>
      validateCases({
        cases: Array.from({ length: 6 }, (_, i) => ({
          id: "dup-" + (i % 2),
          prompt: path.join(dir, "missing.txt"),
          first_receipt: first,
        })),
      }),
    /distinct/
  )
  assert.throws(
    () =>
      validateCases({
        cases: Array.from({ length: 6 }, (_, i) => ({
          id: caseSlug(i),
          prompt: path.join(dir, "missing-prompt.txt"),
          first_receipt: first,
        })),
      }),
    /prompt/
  )
})

test("control seeding blinds candidate content while treatment sees it", t => {
  const store = path.join(tmp(t), "store")
  const lessonDir = path.join(store, "lessons")
  fs.mkdirSync(lessonDir, { recursive: true })
  fs.writeFileSync(
    path.join(lessonDir, "lesson-abc.json"),
    JSON.stringify({ id: "lesson-abc", body: { trigger: { code: "human-review-pending" }, corrections: [] } })
  )
  const planDir = path.join(store, "plans")
  fs.mkdirSync(planDir, { recursive: true })
  fs.writeFileSync(
    path.join(planDir, "plan-1.json"),
    JSON.stringify({ id: "plan-1", lessons: [{ id: "lesson-abc", body: { corrections: [{ field: "status" }] } }] })
  )
  const dest = tmp(t)
  seedStore(store, path.join(dest, "treatment"), { control: false })
  // Treatment legitimately sees the candidate content (that is the point of the
  // arm); only control stores must be clean.
  assert.match(
    isolationViolation(path.join(dest, "treatment")),
    /lesson body present/
  )
  seedStore(store, path.join(dest, "control"), { control: true })
  const control = path.join(dest, "control")
  // Control gets no lesson records at all and plan lesson bodies are stripped.
  assert.ok(!fs.existsSync(path.join(control, "lessons")))
  const plan = JSON.parse(fs.readFileSync(path.join(control, "plans/plan-1.json"), "utf8"))
  assert.ok(plan.lessons.every(l => !l.body))
  assert.equal(isolationViolation(control), null)
})

test("CLI smoke and provision run against disposable stores and enforce six cases", t => {
  const ws = fixtureWorkspace(t)
  const configFile = makeConfig(t, ws)
  const smoke = cli(["smoke", configFile])
  assert.equal(smoke.status, 0, smoke.stderr)
  assert.match(smoke.stdout, /smoke checks passed/)
  const provision = cli(["provision", configFile])
  assert.equal(provision.status, 0, provision.stderr)
  assert.match(provision.stdout, /12 blinded arms/)
  const scratch = path.dirname(configFile) + "/scratch"
  const manifest = JSON.parse(fs.readFileSync(path.join(scratch, "provisioning.json"), "utf8"))
  assert.equal(manifest.arms.length, 12)
  const control = manifest.arms.find(a => a.mode === "control")
  assert.equal(isolationViolation(control.store), null)
})

test("CLI run dry-run prints codex invocations and never requires --exec", t => {
  const ws = fixtureWorkspace(t)
  const configFile = makeConfig(t, ws)
  const dry = cli(["run", configFile])
  assert.equal(dry.status, 0, dry.stderr)
  assert.match(dry.stdout, /\[runner:dry-run\]/)
  assert.match(dry.stdout, /codex/)
})
