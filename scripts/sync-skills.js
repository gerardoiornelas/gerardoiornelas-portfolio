#!/usr/bin/env node
// Copy repo skill sources (skills/<name>/SKILL.md) to the Claude Code installed
// skill directory (~/.claude/skills/<name>/SKILL.md), the live copies /uig and
// /compound-engineering invoke. Run after editing a repo skill source.
const fs = require("fs")
const path = require("path")
const root = path.resolve(__dirname, "..")
const skillsDir = path.join(root, "skills")
const home = process.env.HOME || process.env.USERPROFILE
const destBase = path.join(home, ".claude", "skills")
const results = []
if (!fs.existsSync(skillsDir)) {
  console.error("No skills/ directory at " + skillsDir)
  process.exit(1)
}
for (const name of fs.readdirSync(skillsDir)) {
  const src = path.join(skillsDir, name, "SKILL.md")
  if (!fs.existsSync(src) || !fs.statSync(src).isFile()) continue
  const dest = path.join(destBase, name, "SKILL.md")
  const prev = fs.existsSync(dest) ? fs.readFileSync(dest, "utf8") : null
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(src, dest)
  results.push({
    name,
    dest: dest.replace(home, "~"),
    changed: prev !== fs.readFileSync(dest, "utf8"),
  })
}
if (!results.length) {
  console.error("No skills found under " + skillsDir)
  process.exit(1)
}
for (const r of results) {
  console.log((r.changed ? "updated " : "unchanged ") + r.name + " -> " + r.dest)
}
