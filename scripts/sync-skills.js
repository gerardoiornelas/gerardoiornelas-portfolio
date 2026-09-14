#!/usr/bin/env node
// Sync repo skill sources, the usage hook, and the uig-usage command to their
// machine-global live copies.
//  - skills/<name>/SKILL.md   -> ~/.claude/skills/<name>/SKILL.md
//  - scripts/uig-stop-hook.js -> ~/.uig/uig-stop-hook.js (SessionEnd hook)
//  - scripts/uig-usage.js      -> ~/.uig/bin/uig-usage (the `uig-usage` command,
//                                 symlinked into a PATH bin dir)
// Run after editing a repo skill source, the hook, or the usage ledger;
// /uig-update runs this.
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

// The uig-usage command (scripts/uig-usage.js) is executable when run directly,
// so symlinking it onto PATH yields a bare `uig-usage` command in any shell.
const cliSrc = path.join(root, "scripts", "uig-usage.js")
const cliDest = path.join(uigBase, "bin", "uig-usage")
if (fs.existsSync(cliSrc)) {
  const cliDir = path.dirname(cliDest)
  fs.mkdirSync(cliDir, { recursive: true })
  const prev = fs.existsSync(cliDest) ? fs.readFileSync(cliDest, "utf8") : null
  fs.copyFileSync(cliSrc, cliDest)
  fs.chmodSync(cliDest, 0o755)
  const changed = prev !== fs.readFileSync(cliDest, "utf8")
  console.log(
    (changed ? "updated " : "unchanged ") +
      "uig-usage -> " +
      cliDest.replace(home, "~")
  )
  linkOnPath(cliDest, home)
}

// Create ~/.local/bin/uig-usage -> <cliDest> (or the first writable PATH dir) so
// the command resolves without editing shell profiles. Never clobbers an existing
// unrelated file; a stale symlink is replaced. Silently skips if nothing suitable.
function linkOnPath(target, home) {
  const dirs = (process.env.PATH || "").split(":").filter(Boolean)
  const preferred = path.join(home, ".local", "bin")
  const candidate =
    dirs.includes(preferred) && isWritable(preferred)
      ? preferred
      : dirs.find(isWritable)
  if (!candidate) return
  const link = path.join(candidate, "uig-usage")
  let stat = null
  try {
    stat = fs.lstatSync(link)
  } catch {
    // does not exist yet
  }
  if (stat) {
    if (stat.isSymbolicLink()) {
      try {
        if (fs.readlinkSync(link) === target) return // already correct
      } catch {}
      try {
        fs.unlinkSync(link)
      } catch {
        return
      }
    } else {
      return // a real file; never clobber it
    }
  }
  try {
    fs.symlinkSync(target, link)
    console.log("linked uig-usage -> " + link)
  } catch {
    console.log("warn: could not symlink uig-usage into " + candidate)
  }
}
function isWritable(dir) {
  try {
    fs.accessSync(dir, fs.constants.W_OK)
    return true
  } catch {
    return false
  }
}
