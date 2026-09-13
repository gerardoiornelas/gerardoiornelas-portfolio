#!/usr/bin/env node
// Internal repo-authoring tool. Not part of the portable `uig` skill distributed
// from src/pages/uig.tsx — see knowledge/context.md for that boundary.
//
// Checks that the committed OKF context bundle is present and well-formed before
// a commit ships: knowledge/context.md exists with the expected frontmatter,
// knowledge/okf.yaml parses as YAML, and files changed in the working tree that
// touch knowledge-relevant areas have a same-day receipt or context update.

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

const repoRoot = path.resolve(__dirname, "..")
const contextPath = path.join(repoRoot, "knowledge", "context.md")
const okfPath = path.join(repoRoot, "knowledge", "okf.yaml")
const receiptsDir = path.join(repoRoot, "knowledge", "receipts")

let failed = false

function fail(message) {
  console.error(`[okf:validate] FAIL — ${message}`)
  failed = true
}

function ok(message) {
  console.log(`[okf:validate] ok — ${message}`)
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  const fields = {}
  for (const line of match[1].split("\n")) {
    const fieldMatch = line.match(/^([a-zA-Z_]+):\s*(.*)$/)
    if (fieldMatch) fields[fieldMatch[1]] = fieldMatch[2]
  }
  return fields
}

function checkContext() {
  if (!fs.existsSync(contextPath)) {
    fail(`missing ${path.relative(repoRoot, contextPath)}`)
    return
  }
  const raw = fs.readFileSync(contextPath, "utf8")
  const frontmatter = parseFrontmatter(raw)
  if (!frontmatter) {
    fail("knowledge/context.md has no frontmatter block")
    return
  }
  const required = ["title", "type", "updated", "status"]
  const missing = required.filter((field) => !frontmatter[field])
  if (missing.length) {
    fail(`knowledge/context.md frontmatter missing field(s): ${missing.join(", ")}`)
    return
  }
  ok("knowledge/context.md present with required frontmatter")
}

function checkOkfYaml() {
  if (!fs.existsSync(okfPath)) {
    fail(`missing ${path.relative(repoRoot, okfPath)}`)
    return
  }
  const raw = fs.readFileSync(okfPath, "utf8")
  // Minimal structural check without a YAML dependency: every non-comment,
  // non-blank top-level or nested line must look like `key:` or `key: value`.
  const lines = raw.split("\n").filter((line) => line.trim() && !line.trim().startsWith("#"))
  const malformed = lines.filter((line) => !/^\s*[-]?\s*[A-Za-z0-9_.]+:\s*.*$/.test(line))
  if (malformed.length) {
    fail(`knowledge/okf.yaml has malformed line(s): ${malformed.join(" | ")}`)
    return
  }
  if (!/app_id:/.test(raw) || !/graphify:/.test(raw)) {
    fail("knowledge/okf.yaml missing required keys (app_id, graphify)")
    return
  }
  ok("knowledge/okf.yaml is present and structurally valid")
}

function checkReceiptsForKnowledgeTouchingChanges() {
  let changed = []
  try {
    changed = execSync("git diff --cached --name-only", { cwd: repoRoot, encoding: "utf8" })
      .split("\n")
      .filter(Boolean)
  } catch {
    ok("skipped staged-change check (not in a git repository or no commits yet)")
    return
  }
  const knowledgeTouching = changed.filter(
    (file) => file.startsWith("docs/compound-engineering/") || file.startsWith("plans/uigate/")
  )
  if (!knowledgeTouching.length) {
    ok("no staged changes require a receipt")
    return
  }
  const today = new Date().toISOString().slice(0, 10)
  const hasReceiptsDir = fs.existsSync(receiptsDir)
  const todaysReceipt = hasReceiptsDir
    ? fs.readdirSync(receiptsDir).some((file) => file.startsWith(today))
    : false
  const contextStaged = changed.includes("knowledge/context.md")
  if (!todaysReceipt && !contextStaged) {
    fail(
      `staged change(s) touch ${knowledgeTouching.join(", ")} but neither a ${today}-*.md receipt nor knowledge/context.md is staged`
    )
    return
  }
  ok("staged knowledge-touching change has a receipt or context update")
}

checkContext()
checkOkfYaml()
checkReceiptsForKnowledgeTouchingChanges()

if (failed) {
  console.error("\n[okf:validate] One or more checks failed.")
  process.exit(1)
}

console.log("\n[okf:validate] All checks passed.")
