const test = require("node:test")
const assert = require("node:assert/strict")
const fs = require("fs")
const os = require("os")
const path = require("path")
const { gradeRecoverability, sentences, fieldTokens } = require("./uig-recoverability")

function setup(t, files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "uig-recover-"))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  for (const [name, raw] of Object.entries(files)) {
    const file = path.join(root, name)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, raw)
  }
  return root
}
const lesson = () => ({
  id: "lesson-x",
  body: {
    trigger: { code: "human-review-pending" },
    corrections: [
      { field: "status", after: { value: "partial" } },
      { field: "acceptance.status", after: { value: "partial" } },
    ],
  },
})
const manifest = (root, files) => ({
  files: files.map(name => ({ path: name })).concat(
    [{ path: "missing.md" }, { path: "missing2.md" }]
  ),
})
const grade = (root, files) =>
  gradeRecoverability({ manifest: manifest(root, files), lesson: lesson(), root })

test("sentence boundaries and field tokens tokenize deterministically", () => {
  assert.deepEqual(
    sentences("Line one.\n\nLine two!"),
    [
      { line: 1, text: "Line one." },
      { line: 3, text: "Line two!" },
    ]
  )
  assert.deepEqual(fieldTokens("acceptance.status"), ["acceptance", "status"])
})

test("recoverability grades explicit, partial and unclear corrections with excerpts", t => {
  const root = setup(t, {
    "docs.md": [
      "If a receipt still carries a pending human-review state, set its status to",
      "partial and the acceptance status to partial as well.",
      "",
      "Nothing here explains the receipt schema.",
    ].join("\n"),
  })
  const r = grade(root, ["docs.md"])
  assert.equal(r.automated, true)
  assert.match(r.method, /sentence co-occurrence/)
  const byField = Object.fromEntries(r.corrections.map(c => [c.field, c]))
  // "status to partial and the acceptance status to partial" is one sentence:
  // it co-occurs field, required value, and the trigger words.
  assert.equal(byField.status.grade, "explicit")
  assert.equal(byField.status.excerpts[0].file, "docs.md")
  assert.ok(byField.status.excerpts[0].text.includes("partial"))
  // acceptance.status likewise appears in the same sentence.
  assert.equal(byField["acceptance.status"].grade, "explicit")
  assert.match(r.summary, /2 explicit/)
})

test("partial grade reports field and value without the diagnostic trigger", t => {
  const root = setup(t, {
    "schema.md":
      "Known statuses include partial; a receipt's acceptance.status may also be partial.",
  })
  const r = grade(root, ["schema.md"])
  assert.deepEqual(
    r.corrections.map(c => c.grade),
    ["partial", "partial"]
  )
  assert.match(r.summary, /2 partial/)
})

test("payload files that never mention a correction yield unclear grades and cap nothing", t => {
  const root = setup(t, {
    "notes.md": "Receipt authoring is recorded in the knowledge store.",
  })
  const r = grade(root, ["notes.md"])
  assert.deepEqual(
    r.corrections.map(c => c.grade),
    ["unclear", "unclear"]
  )
  assert.match(r.summary, /No payload file explains any correction/)
  assert.match(r.summary, /claim altitude stays unverified/)
})

test("missing payload files are recorded rather than treated as explanatory", t => {
  const root = setup(t, {})
  const r = grade(root, [])
  assert.deepEqual(
    r.corrections.map(c => c.grade),
    ["unclear", "unclear"]
  )
  assert.ok(r.corrections.every(c => c.excerpts.length === 0))
})

test("payload sha256 pins the manifest so later content changes are detectable", t => {
  const root = setup(t, {
    "docs.md":
      "Set status to partial and acceptance.status to partial on a human-review-pending diagnosis.",
  })
  const first = grade(root, ["docs.md"])
  fs.appendFileSync(path.join(root, "docs.md"), "\n// drift\n")
  const second = grade(root, ["docs.md"])
  assert.equal(first.payload_sha256.length, 64)
  assert.notEqual(first.payload_sha256, second.payload_sha256)
})

test("trigger words must land in the same sentence as field and value", t => {
  const root = setup(t, {
    "a.md": "A human-review-pending diagnosis is being tracked for this task.",
    "b.md":
      "Set the status to partial and the acceptance.status to partial here.",
  })
  const r = grade(root, ["a.md", "b.md"])
  // The trigger sentence lacks the corrected fields and the value sentence
  // lacks the trigger, so neither correction earns explicit.
  assert.deepEqual(
    r.corrections.map(c => c.grade),
    ["partial", "partial"]
  )
  assert.ok(r.corrections.every(c => c.excerpts.length === 1))
})

test("a numeric or boolean required value still grades through its tokens", t => {
  const root = setup(t, {
    "docs.md":
      "A human-review-pending trigger requires status partial on the receipt.",
  })
  const lessonNumeric = () => ({
    ...lesson(),
    body: {
      trigger: { code: "human-review-pending" },
      corrections: [
        { field: "attempts", after: { value: 0 } },
        { field: "enabled", after: { value: true } },
      ],
    },
  })
  const r = gradeRecoverability({
    manifest: manifest(root, ["docs.md"]),
    lesson: lessonNumeric(),
    root,
  })
  assert.equal(r.corrections[0].grade, "unclear")
  assert.equal(r.corrections[1].grade, "unclear")
})

test("no corrections is reported as such and keeps the claim altitude unverified", t => {
  const root = setup(t, { "docs.md": "Receipt status partial." })
  const r = gradeRecoverability({
    manifest: manifest(root, ["docs.md"]),
    lesson: { id: "lesson-x", body: { corrections: [] } },
    root,
  })
  assert.equal(r.corrections.length, 0)
  assert.match(r.summary, /no corrections/)
})
