const test = require("node:test")
const assert = require("node:assert/strict")
const fs = require("fs")
const os = require("os")
const path = require("path")
const { execFileSync, spawnSync } = require("child_process")
const YAML = require("yaml")
const { validate } = require("./validate-okf")
const receipt = "knowledge/receipts/2020-01-01-example.md"
const target = "src/views/uig.tsx"
const data = () => ({
  title: "Example receipt",
  type: "task-receipt",
  status: "verified",
  intent: "Implement scoped change",
  sources: [target],
  authorization: {
    state: "gated",
    source: "Principal approved implementation",
    scope: target,
    valid_until: "Task completion",
  },
  acceptance: {
    status: "verified",
    reviewer: "Test agent",
    evidence: ["Regression suite passed"],
  },
  aar: {
    expected: "Correct output",
    actual: "Correct output verified",
    difference: "No discrepancy observed",
    learning: "No new durable lesson",
  },
})
const render = d =>
  `---\n${YAML.stringify(
    d
  )}---\n## After Action Review\nSee structured answers above.\n`
function fixture() {
  return {
    "knowledge/context.md":
      '---\ntitle: Context\ntype: architecture\nupdated: "2026-09-13"\nstatus: active\n---\n',
    "knowledge/okf.yaml":
      'okf_version: "0.3"\napp_id: example\ncontext: context.md\nstatus: active\ngraphify:\n  scope: .\n  refresh: graphify . --update\nlessons: lessons/index.md\n',
    "knowledge/lessons/index.md": "# Lessons",
    [target]: "source",
    [receipt]: render(data()),
  }
}
function run(files, names = [target, receipt]) {
  return validate({
    read: file => {
      if (!(file in files)) throw Error("missing file")
      return files[file]
    },
    changed: names.map(file => ({ file, deleted: !(file in files) })),
  })
}
test("valid older receipt covers exact changed source", () =>
  assert.deepEqual(run(fixture()), []))
test("unstaged or unrelated receipt cannot cover change", () => {
  assert.ok(run(fixture(), [target]).length)
  const f = fixture(),
    d = data()
  d.sources = ["knowledge/context.md"]
  f[receipt] = render(d)
  assert.ok(run(f).length)
})
test("empty headings and missing authorization fail", () => {
  const f = fixture()
  f[receipt] =
    "---\ntitle: receipt\n---\n## After Action Review\nWhy was there a difference\nWhat will we do differently"
  assert.ok(run(f).length)
})
test("placeholder AAR, missing evidence and prohibited authority fail", () => {
  for (const mutate of [
    d => (d.aar.learning = "TODO"),
    d => (d.acceptance.evidence = []),
    d => (d.authorization.state = "prohibited"),
  ]) {
    const f = fixture(),
      d = data()
    mutate(d)
    f[receipt] = render(d)
    assert.ok(run(f).length)
  }
})
test("invalid YAML and duplicate keys fail", () => {
  for (const yaml of ["app_id: [", "app_id: first\napp_id: second"]) {
    const f = fixture()
    f["knowledge/okf.yaml"] = yaml
    assert.ok(run(f).length)
  }
})
test("deletion needs coverage; receipt can cover deleted source", () => {
  const f = fixture()
  delete f[target]
  assert.deepEqual(run(f), [])
  delete f[receipt]
  assert.ok(run(f).length)
})
test("historical unchanged receipts are not revalidated", () => {
  const f = fixture()
  f[receipt] = "old receipt"
  assert.deepEqual(run(f, []), [])
})
test("CLI validates index, not unstaged repairs; fails outside Git", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "okf-test-"))
  const git = (...args) =>
    execFileSync("git", args, { cwd: root, stdio: "pipe" })
  try {
    for (const [file, raw] of Object.entries(fixture())) {
      fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
      fs.writeFileSync(path.join(root, file), raw)
    }
    fs.mkdirSync(path.join(root, "scripts"))
    fs.copyFileSync(
      __dirname + "/validate-okf.js",
      root + "/scripts/validate-okf.js"
    )
    const invoke = () =>
      spawnSync(process.execPath, [root + "/scripts/validate-okf.js"], {
        encoding: "utf8",
        env: {
          ...process.env,
          NODE_PATH: path.resolve(__dirname, "../node_modules"),
        },
      })
    assert.equal(invoke().status, 1)
    fs.writeFileSync(root + "/" + receipt, "historical receipt")
    git("init", "-q")
    git("add", ".")
    git(
      "-c",
      "user.name=Test",
      "-c",
      "user.email=test@example.invalid",
      "commit",
      "-qm",
      "fixture"
    )
    fs.writeFileSync(root + "/" + target, "x".repeat(2 * 1024 * 1024))
    fs.writeFileSync(root + "/" + receipt, render({ ...data(), aar: {} }))
    git("add", target, receipt)
    fs.writeFileSync(root + "/" + receipt, render(data()))
    assert.equal(invoke().status, 1)
    git("add", receipt)
    fs.writeFileSync(root + "/" + receipt, "invalid unstaged")
    assert.equal(invoke().status, 0)
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

test("distributed skill preserves the authority and learning contract", () => {
  const download = fs.readFileSync(
    path.resolve(__dirname, "../skills/uig/SKILL.md"),
    "utf8"
  )
  for (const file of [
    "docs/compound-engineering/ui-gates-canon.md",
    "docs/compound-engineering/operating-system.md",
    "plans/uigate/uigate-skill.md",
  ]) {
    const raw = fs.readFileSync(path.resolve(__dirname, "..", file), "utf8")
    for (const rule of [
      "Gated actions require explicit principal approval before execution.",
      "Prohibited actions stop",
      "completion criteria require explicit approval.",
    ]) {
      assert.ok(raw.includes(rule), file + ": " + rule)
      assert.ok(download.includes(rule), "download: " + rule)
    }
  }
  assert.ok(download.includes("never retroactively authorizes"))
  assert.ok(download.includes("load only applicable lessons"))
})
