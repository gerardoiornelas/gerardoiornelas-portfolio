#!/usr/bin/env node
// Sync repo skill sources and the usage hook to the machine's live copies.
//  - skills/<name>/SKILL.md  ->  ~/.claude/skills/<name>/SKILL.md (installed skills)
//  - scripts/uig-stop-hook.js -> ~/.uig/uig-stop-hook.js (registered SessionEnd hook)
// Run after editing a repo skill source or the hook; /uig-update runs this.
const fs = require("fs")
const path = require("path")
const root = path.resolve(__dirname, "..")
const skillsDir = path.join(root, "skills")
const home = process.env.HOME || process.env.USERPROFILE
const destBase = path.join(home, ".claude", "skills")
const uigBase = path.join(home, ".uig")
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
// The usage hook is registered in ~/.claude/settings.json (SessionEnd). Keep the
// installed copy in sync so a repo fix to the hook is live after skills:sync.
const hookSrc = path.join(root, "scripts", "uig-stop-hook.js")
const hookDest = path.join(uigBase, "uig-stop-hook.js")
if (fs.existsSync(hookSrc)) {
  fs.mkdirSync(uigBase, { recursive: true })
  const prev = fs.existsSync(hookDest) ? fs.readFileSync(hookDest, "utf8") : null
  fs.copyFileSync(hookSrc, hookDest)
  const changed = prev !== fs.readFileSync(hookDest, "utf8")
  console.log(
    (changed ? "updated " : "unchanged ") +
      "uig-stop-hook.js -> " +
      hookDest.replace(home, "~")
  )
}
