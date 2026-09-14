---
title: Ship the uig-usage command
type: task-receipt
date: 2026-09-13
status: partial
intent: >-
  Remove the need to type the npm incantation for the usage report. The principal
  should be able to run a bare `uig-usage` command in any shell, get the same
  all-time ledger plus this repo's receipts, and also have a /uig-usage slash
  command inside Claude Code.
sources:
  - scripts/uig-usage.js
  - scripts/uig-learning-cli.js
  - scripts/sync-skills.js
  - package.json
  - .claude/commands/uig-usage.md
  - .claude/commands/uig-update.md
  - knowledge/context.md
  - knowledge/lessons/uig-consistency.md
authorization:
  state: delegated
  source: >-
    Principal said the usage report should not require `npm run uig:learn --
    usage` and must be a plain `uig-usage` command.
  scope: >-
    Local repo edits plus installing and symlinking the command at
    ~/.uig/bin/uig-usage and ~/.local/bin/uig-usage on this machine, matching the
    previously approved machine-global tracking setup. No commit or push in this
    slice.
  valid_until: Completion of this local slice.
acceptance:
  status: partial
  human_review: pending
  reviewer: >-
    Implementing agent ran automated local verification; principal visual
    acceptance outstanding
  evidence:
    - >-
      npm run okf:test passed 62, including the unmodified uig-usage module suite.
    - >-
      node --check clean on scripts/uig-usage.js, scripts/uig-learning-cli.js, and
      scripts/sync-skills.js.
    - >-
      npm run skills:sync installed and symlinked the command; which uig-usage
      resolves to ~/.local/bin/uig-usage.
    - >-
      uig-usage in the repo printed the ledger with 15 receipts; uig-usage from
      /tmp printed 0 receipts and the same global runs, confirming cwd-relative
      receipt counting and a global store.
    - >-
      npm run uig:usage prints the same report as the bare command (parity).
aar:
  expected: >-
    A bare `uig-usage` command on PATH that reads the global ledger, counts the
    current repo's receipts, and matches the existing usage report, with an npm
    alias and a /uig-usage slash command as fallbacks.
  actual: >-
    Implemented. scripts/uig-usage.js is now directly executable (main guard adds
    the CLI), formatUsage moved there and is shared by uig-learning-cli, skills:sync
    installs the copy at ~/.uig/bin/uig-usage, creates the ~/.local/bin symlink via
    a fixed linkOnPath, package.json gained uig:usage, and a /uig-usage slash
    command documents the report.
  difference: >-
    The first linkOnPath implementation tried to unlink a not-yet-existing path and
    bailed, so the symlink was silently never created; it was rewritten to lstat
    the link and only replace an existing stale symlink. No change to the ledger
    schema or report semantics.
  learning: >-
    Sustain: one module remains both the reader and the command (executable via a
    require.main guard), so the ledger, formatter, and CLI stay in one place and
    skills:sync is the single install path. Improve: treat symlink creation as an
    install step that must be observable in the sync output, and re-run `which`
    after any linkOnPath change before calling the installation verified.
---

# Ship the uig-usage command

## Context

The earlier work made the ledger real but left the report behind `npm run
uig:learn -- usage`. The principal wants a plain `uig-usage` command — no npm
prefix — plus a consistent in-session fallback.

## Change

- `scripts/uig-usage.js` — `#!/usr/bin/env node`, exported `formatUsage(u)` shared
  with the learning CLI, and a `require.main === module` guard that prints the
  ledger for the current working directory.
- `scripts/uig-learning-cli.js` — imports `formatUsage` from uig-usage instead of
  carrying a duplicate copy.
- `scripts/sync-skills.js` — installs `scripts/uig-usage.js` as
  `~/.uig/bin/uig-usage` (chmod 755) and symlinks it onto PATH (preferring
  `~/.local/bin`), replacing only stale symlinks and never clobbering real files.
- `package.json` — `uig:usage` script for parity when the command is not installed.
- `.claude/commands/uig-usage.md` — new `/uig-usage` slash command that runs the
  report and reports it honestly.
- `.claude/commands/uig-update.md`, `knowledge/context.md`,
  `knowledge/lessons/uig-consistency.md` — document the command and the sync
  surface.

## Evidence

- 62 tests pass; syntax checks clean on the three changed scripts.
- `npm run skills:sync`: `linked uig-usage -> ~/.local/bin/uig-usage`; `which
  uig-usage` resolves; repo run shows 15 receipts; `/tmp` run shows 0 receipts
  with the same global ledger; `npm run uig:usage` matches the bare command.

## After Action Review

1. **What was supposed to happen?** — A bare `uig-usage` command on PATH reading
   the global ledger plus the current repo's receipts, with npm and slash-command
   fallbacks, all installed by the existing sync.
2. **What actually happened?** — The command resolves and produces the correct
   cwd-relative report everywhere it was tested, the sync installs and links it,
   and all 62 tests still pass.
3. **Why was there a difference?** — One bug and one design note: `linkOnPath`
   bailed on the missing link instead of creating it (fixed to lstat and replace),
   and `formatUsage` was shared to prevent a second copy drifting out of sync.
4. **What will we do differently?** — Verify symlink creation in the sync output
   after touching it; keep the CLI inside the reader module so schema and report
   never diverge.

## Reuse

Edit `scripts/uig-usage.js` (schema, formatter, or CLI behavior), then
`npm run skills:sync` (or `/uig-update`) to refresh `~/.uig/bin/uig-usage` and the
PATH symlink. `uig-usage` prints the ledger; `npm run uig:usage` and `/uig-usage`
are the fallbacks.
