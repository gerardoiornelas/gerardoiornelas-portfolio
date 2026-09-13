const test = require("node:test")
const assert = require("node:assert/strict")
const fs = require("fs")
const os = require("os")
const path = require("path")
const { execFileSync, spawnSync } = require("child_process")
const { createReceipt } = require("./create-okf-receipt")
const { frontmatter, validate } = require("./validate-okf")
const root = path.resolve(__dirname, "..")
function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "uig-receipt-test-"))
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }))
  fs.mkdirSync(path.join(dir, "knowledge/receipts"), { recursive: true })
  fs.mkdirSync(path.join(dir, "knowledge/lessons"), { recursive: true })
  for (const file of [
    "knowledge/context.md",
    "knowledge/okf.yaml",
    "knowledge/lessons/index.md",
  ])
    fs.copyFileSync(path.join(root, file), path.join(dir, file))
  fs.writeFileSync(path.join(dir, "source.txt"), "fixture")
  execFileSync("git", ["init", "-q", dir])
  return dir
}
const data = () => ({
  title: "Test receipt",
  type: "task-receipt",
  status: "partial",
  intent: "Implement requested fixture",
  sources: ["source.txt"],
  authorization: {
    state: "delegated",
    source: "User requested local implementation",
    scope: "Fixture source only",
    valid_until: "End of current task",
  },
  acceptance: {
    status: "partial",
    human_review: "pending",
    reviewer: "Test agent",
    evidence: [
      "Fixture test passed; requested human UI acceptance remains outstanding",
    ],
  },
  aar: {
    expected: "Validated fixture",
    actual: "Checks passed; human acceptance outstanding",
    difference: "Human has not reviewed UI",
    learning: "Do not infer human acceptance from automated checks",
  },
})
test("generator creates a valid partial record without inventing acceptance, and refuses overwrite", t => {
  const dir = fixture(t),
    input = data()
  const file = createReceipt(dir, "2026-09-13-example", input)
  const read = source => fs.readFileSync(path.join(dir, source), "utf8")
  assert.deepEqual(frontmatter(read(file)), input)
  assert.deepEqual(validate({ read, changed: [{ file }] }), [])
  assert.throws(() => createReceipt(dir, "2026-09-13-example", input), /EEXIST/)
})
test("pending human acceptance cannot be labeled verified", t => {
  const dir = fixture(t),
    input = data()
  input.status = input.acceptance.status = "verified"
  assert.throws(
    () => createReceipt(dir, "2026-09-13-example", input),
    /pending human review requires partial/
  )
  assert.deepEqual(fs.readdirSync(path.join(dir, "knowledge/receipts")), [])
  input.acceptance.human_review = "accepted"
  assert.doesNotThrow(() => createReceipt(dir, "2026-09-13-example", input))
})
test("rejects placeholders, malformed paths, missing sources, unsafe names and invalid dates", t => {
  const dir = fixture(t)
  for (const mutate of [
    d => (d.authorization.source = ""),
    d => (d.acceptance.evidence = []),
    d => (d.aar.actual = "TODO"),
    d => (d.sources = ["../outside.txt"]),
    d => (d.sources = ["knowledge/../source.txt"]),
    d => (d.sources = ["C:\\source.txt"]),
    d => (d.sources = ["absent.txt"]),
    d => (d.acceptance.human_review = "maybe"),
  ]) {
    const input = data()
    mutate(input)
    assert.throws(() => createReceipt(dir, "2026-09-13-invalid", input))
  }
  for (const slug of [
    "../outside",
    "2026-02-30-invalid",
    "2026-09-13-space here",
  ])
    assert.throws(() => createReceipt(dir, slug, data()))
  assert.deepEqual(fs.readdirSync(path.join(dir, "knowledge/receipts")), [])
})
test("tracks explicit deleted sources without gathering unrelated deletions", t => {
  const dir = fixture(t)
  fs.writeFileSync(path.join(dir, "knowledge/unrelated.md"), "unrelated")
  execFileSync("git", ["add", "source.txt", "knowledge/unrelated.md"], {
    cwd: dir,
  })
  fs.unlinkSync(path.join(dir, "source.txt"))
  fs.unlinkSync(path.join(dir, "knowledge/unrelated.md"))
  const file = createReceipt(dir, "2026-09-13-deletion", data())
  assert.deepEqual(
    frontmatter(fs.readFileSync(path.join(dir, file), "utf8")).sources,
    ["source.txt"]
  )
})
test("CLI init defaults to incomplete authority and partial acceptance; refuses overwrite", t => {
  const dir = fixture(t),
    output = path.join(dir, "input.yaml")
  const cli = args =>
    spawnSync(
      process.execPath,
      [path.join(root, "scripts/create-okf-receipt.js"), ...args],
      { encoding: "utf8" }
    )
  assert.equal(cli(["--init", output]).status, 0)
  const YAML = require("yaml"),
    input = YAML.parse(fs.readFileSync(output, "utf8"))
  assert.equal(input.authorization.state, "")
  assert.equal(input.acceptance.human_review, "pending")
  assert.equal(input.status, "partial")
  assert.equal(cli(["--init", output]).status, 1)
  assert.match(cli(["--help"]).stdout, /does not stage, commit or push/)
})
