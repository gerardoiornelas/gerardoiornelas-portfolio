#!/usr/bin/env node
// Local authoring helper. Caller supplies authority, evidence and acceptance.
const fs = require("fs")
const path = require("path")
const { execFileSync } = require("child_process")
const YAML = require("yaml")
const { validate, frontmatter } = require("./validate-okf")

const help = `Usage:
  npm run okf:receipt -- --init /tmp/task-receipt.yaml
  npm run okf:receipt -- YYYY-MM-DD-slug /tmp/task-receipt.yaml

Fill the YAML with actual authorization, exact source paths, check results,
reviewer and four AAR answers. No Git-wide source discovery or invented evidence.
Pending human review: status and acceptance.status = partial;
acceptance.human_review = pending. Use accepted only after actual human acceptance,
or not-required when applicable. Partial records do not close the task.
The same validator checks the completed input before creating a receipt.
For an instrumented task, set UIG_LEARNING_RUN to the ID returned by uig:learn start.
Each receipt attempt is then recorded locally with redacted field shapes.
Existing files are never overwritten. This command does not stage, commit or push.
`
function writeReceipt(root, slug, data) {
  if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    throw Error("receipt name must be YYYY-MM-DD-slug")
  const date = slug.slice(0, 10)
  if (
    Number.isNaN(Date.parse(date)) ||
    new Date(date).toISOString().slice(0, 10) !== date
  )
    throw Error("receipt name contains an invalid date")
  const file = `knowledge/receipts/${slug}.md`
  const raw = `---\n${YAML.stringify(
    data
  )}---\n\n# Task receipt\n\n## After Action Review\n\nSee the structured aar answers and acceptance evidence above.\n`
  // Missing sources are permitted only for actual tracked deletions, as in the index validator.
  const deleted = new Set(
    execFileSync("git", ["ls-files", "--deleted", "-z"], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
      .split("\0")
      .filter(Boolean)
  )
  const errors = validate({
    read: source =>
      source === file ? raw : fs.readFileSync(path.join(root, source), "utf8"),
    exists: source => fs.existsSync(path.join(root, source)),
    changed: [
      { file },
      ...[...deleted]
        .filter(
          source =>
            Array.isArray(data?.sources) && data.sources.includes(source)
        )
        .map(source => ({ file: source, deleted: true })),
    ],
  })
  if (errors.length) throw Error(errors.join("\n"))
  fs.writeFileSync(path.join(root, file), raw, { flag: "wx" })
  return file
}
function createReceipt(
  root,
  slug,
  data,
  { learningRun = process.env.UIG_LEARNING_RUN } = {}
) {
  if (!learningRun) return writeReceipt(root, slug, data)
  const { Learning } = require("./uig-learning")
  const learning = new Learning(root)
  learning.assertRun(learningRun)
  let file
  try {
    file = writeReceipt(root, slug, data)
  } catch (error) {
    learning.record(learningRun, data, false)
    throw error
  }
  learning.record(learningRun, data, true)
  return file
}
function main(args) {
  const root = path.resolve(__dirname, "..")
  if (!args.length || (args.length === 1 && args[0] === "--help")) {
    console.log(help)
    return
  }
  if (args.length !== 2) throw Error(help)
  if (args[0] === "--init") {
    const template = frontmatter(
      fs.readFileSync(
        path.join(root, "knowledge/templates/template-receipt.md"),
        "utf8"
      )
    )
    fs.writeFileSync(args[1], YAML.stringify(template), { flag: "wx" })
    console.log(
      `Created incomplete input: ${args[1]}. Fill every required field before generating.`
    )
    return
  }
  const file = createReceipt(
    root,
    args[0],
    YAML.parse(fs.readFileSync(args[1], "utf8"))
  )
  console.log(
    `Created ${file}. Structure checked; evidence and required human acceptance still require review.`
  )
}
if (require.main === module) {
  try {
    main(process.argv.slice(2))
  } catch (error) {
    console.error(`[okf:receipt] ${error.message}`)
    process.exitCode = 1
  }
}
module.exports = { createReceipt }
