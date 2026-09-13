#!/usr/bin/env node
// Internal authoring check, not an authorization engine or part of the portable skill.
const fs = require("fs")
const path = require("path")
const { execFileSync } = require("child_process")
const YAML = require("yaml")

const meaningful = value =>
  typeof value === "string" &&
  value.trim().length >= 3 &&
  !/^(tbd|todo|pending|n\/a|\.{3}|<.*>|\[.*\])$/i.test(value.trim())
const list = value =>
  Array.isArray(value) && value.length > 0 && value.every(meaningful)
const receiptPath = file => /^knowledge\/receipts\/.*\.md$/.test(file)
const governed = file =>
  /^(docs\/compound-engineering\/|plans\/uigate\/|knowledge\/|src\/components\/UIGates\/)/.test(
    file
  ) ||
  [
    "AGENTS.md",
    "src/pages/uig.tsx",
    "src/pages/uig.astro",
    "src/views/uig.tsx",
    "scripts/validate-okf.js",
    "scripts/validate-okf.test.js",
    "scripts/create-okf-receipt.js",
    "scripts/create-okf-receipt.test.js",
    "scripts/uig-learning.js",
    "scripts/uig-learning-cli.js",
    "scripts/uig-learning.test.js",
    "scripts/uig-recoverability.js",
    "scripts/uig-recoverability.test.js",
    "scripts/uig-runner.test.js",
    "runner.cjs",
    "package.json",
    "package-lock.json",
  ].includes(file)

function frontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (!match) throw Error("missing YAML frontmatter")
  return YAML.parse(match[1])
}
function fail(code, field, message) {
  throw Object.assign(new Error(message), { code, field })
}
function receiptStructure(raw) {
  function requireFields(object, fields, prefix) {
    for (const field of fields)
      if (!meaningful(object?.[field]))
        fail(
          "required-field",
          prefix ? `${prefix}.${field}` : field,
          `missing or placeholder ${field}`
        )
  }
  const data = frontmatter(raw)
  requireFields(data, ["title", "type", "status", "intent"], "")
  if (data.type !== "task-receipt")
    fail("receipt-type", "type", "type must be task-receipt")
  if (!list(data.sources))
    fail(
      "sources-required",
      "sources",
      "sources must list exact repository paths"
    )
  requireFields(
    data.authorization,
    ["state", "source", "scope", "valid_until"],
    "authorization"
  )
  if (!["delegated", "gated"].includes(data.authorization.state))
    fail(
      "authority-state",
      "authorization.state",
      "execution requires delegated or approved gated authority"
    )
  requireFields(data.acceptance, ["status", "reviewer"], "acceptance")
  if (
    ![
      "verified",
      "verified-with-environment-limit",
      "failed",
      "partial",
      "blocked",
      "outcome-unknown",
    ].includes(data.acceptance.status)
  )
    fail("acceptance-status", "acceptance.status", "invalid acceptance.status")
  if (data.acceptance.human_review !== undefined) {
    if (
      !["pending", "accepted", "not-required"].includes(
        data.acceptance.human_review
      )
    )
      fail(
        "human-review-status",
        "acceptance.human_review",
        "invalid acceptance.human_review"
      )
    if (data.acceptance.human_review === "pending" && data.status !== "partial")
      fail(
        "human-review-pending",
        "status",
        "pending human review requires partial status"
      )
  }
  if (data.status !== data.acceptance.status)
    fail("status-mismatch", "status", "status must match acceptance.status")
  if (!list(data.acceptance.evidence))
    fail(
      "evidence-required",
      "acceptance.evidence",
      "acceptance.evidence must name checks and results"
    )
  requireFields(
    data.aar,
    ["expected", "actual", "difference", "learning"],
    "aar"
  )
  if (!/^## After Action Review\s*$/m.test(raw))
    fail("aar-section", "aar", "missing After Action Review section")
  return data
}
function validate({
  read,
  changed,
  exists = file => {
    read(file)
    return true
  },
}) {
  const errors = []
  function check(file, fn) {
    try {
      fn(read(file))
    } catch (error) {
      errors.push(`${file}: ${error.message}`)
    }
  }
  function requireFields(object, fields) {
    for (const field of fields)
      if (!meaningful(object?.[field]))
        throw Error(`missing or placeholder ${field}`)
  }
  check("knowledge/context.md", raw =>
    requireFields(frontmatter(raw), ["title", "type", "updated", "status"])
  )
  check("knowledge/okf.yaml", raw => {
    const data = YAML.parse(raw)
    requireFields(data, ["okf_version", "app_id", "context", "status"])
    requireFields(data.graphify, ["refresh"])
    if (typeof data.graphify.scope !== "string" || !data.graphify.scope.trim())
      throw Error("missing graphify.scope")
    if (data.lessons !== "lessons/index.md")
      throw Error("lessons must route to lessons/index.md")
    read("knowledge/lessons/index.md")
  })
  const covered = new Set()
  for (const { file, deleted } of changed.filter(
    item => receiptPath(item.file) && !item.deleted
  )) {
    check(file, raw => {
      const data = receiptStructure(raw)
      for (const source of data.sources) {
        if (
          path.posix.isAbsolute(source) ||
          source.includes("\\") ||
          source.split("/").some(part => ["..", ".", ""].includes(part))
        )
          throw Error(`invalid source path: ${source}`)
        if (!changed.some(item => item.file === source && item.deleted))
          if (!exists(source)) throw Error(`missing source: ${source}`)
      }
      data.sources.forEach(source => covered.add(source))
    })
  }
  for (const { file } of changed) {
    if (
      governed(file) &&
      !covered.has(file) &&
      !(receiptPath(file) && !changed.find(item => item.file === file).deleted)
    ) {
      errors.push(
        `${file}: requires an added/modified staged receipt listing this exact path in sources`
      )
    }
  }
  return errors
}
function main() {
  const root = path.resolve(__dirname, "..")
  const git = args =>
    execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
  try {
    const changed = git([
      "diff",
      "--cached",
      "--no-renames",
      "--name-only",
      "-z",
    ])
      .split("\0")
      .filter(Boolean)
    const deleted = new Set(
      git([
        "diff",
        "--cached",
        "--no-renames",
        "--diff-filter=D",
        "--name-only",
        "-z",
      ]).split("\0")
    )
    // No staged change: check only the working bundle, explicitly not commit readiness.
    const read = changed.length
      ? file => git(["show", `:${file}`])
      : file => fs.readFileSync(path.join(root, file), "utf8")
    const errors = validate({
      read,
      exists: changed.length
        ? file => {
            git(["cat-file", "-e", `:${file}`])
            return true
          }
        : file => fs.existsSync(path.join(root, file)),
      changed: changed.map(file => ({ file, deleted: deleted.has(file) })),
    })
    errors.forEach(error => console.error(`[okf:validate] FAIL — ${error}`))
    if (errors.length) process.exitCode = 1
    else
      console.log(
        changed.length
          ? "[okf:validate] Staged bundle and receipt structure passed; human evidence review remains required."
          : "[okf:validate] Working bundle passed; no staged changes, so commit receipts were not checked."
      )
  } catch (error) {
    console.error(`[okf:validate] FAIL — ${error.message}`)
    process.exitCode = 1
  }
}
if (require.main === module) main()
module.exports = { validate, frontmatter, receiptStructure }
