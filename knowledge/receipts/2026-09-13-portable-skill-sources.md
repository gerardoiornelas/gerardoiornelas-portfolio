---
title: Move the portable skills out of TSX into editable repo sources with a sync command
type: task-receipt
date: 2026-09-13
status: partial
intent: Make the uig and compound-engineering skills plain editable markdown instead of
  fragile strings embedded in React view template literals, served by the site and synced
  to the installed Claude Code skill directory via a single command.
sources:
  - skills/uig/SKILL.md
  - skills/compound-engineering/SKILL.md
  - src/views/uig.tsx
  - src/views/compound-engineering.tsx
  - scripts/sync-skills.js
  - package.json
  - scripts/validate-okf.test.js
  - knowledge/lessons/uig-consistency.md
  - knowledge/context.md
  - plans/uigate/uigate-page.html
authorization:
  state: delegated
  source: User requested "fix source code, fix skill, then make it available for me
    to update", with clarifying answers electing to move the skill out of the TSX
    embedding and to a repo-file-plus-sync-script layout.
  scope: "Local edits: new skills/ sources, view refactors to raw imports, the sync
    script, tests and docs updates. No commit, push, or deployment beyond the
    principal's later resolution of the flagged items."
  valid_until: Completion of this local slice.
acceptance:
  status: partial
  human_review: pending
  reviewer: Implementing agent ran automated local verification; principal visual
    acceptance outstanding
  evidence:
    - "npm run typecheck: clean (Astro client types cover raw imports)."
    - "npm run build: 24 pages build with both skills served from skills md files."
    - "npm run okf:test: 54 passed, including the updated distributed-skill contract
      test that asserts the authority and learning phrases on skills/uig/SKILL.md."
    - "npm run skills:sync: uig unchanged and compound-engineering updated; both
      installed copies byte-identical to their repo sources afterwards."
    - "skills/compound-engineering/SKILL.md verified as a verbatim extraction of the
      old template literal once its backtick escapes were removed."
aar:
  expected: The two skills live as editable markdown files; the site downloads them
    via raw imports; one npm command propagates edits to the installed skill
    directory; the contract test guards the new source file.
  actual: Refactor complete and verified. Editing skills/uig/SKILL.md now updates the
    /uig download at build time and the installed copy after npm run skills:sync.
  difference: A third, older embedded copy existed at plans/uigate/uigate-page.html.
    It was not routed or deployed. The principal instructed resolution of the
    flagged items; the legacy page was removed with git rm (recoverable from git
    history) so no dormant divergent copy remains. The receipt itself initially
    failed schema checks (missing aar.learning, missing the body After Action Review
    section, and a colon-space in the scope value) which the validator correctly
    rejected before coverage registered; those were fixed.
  learning: "Sustain: skills live as committed plain markdown under skills/ with one
    sync command to the installed directory; keep the validator's exact receipt
    schema in mind (aar.learning plus the body After Action Review section) when
    authoring future receipts, and quote any YAML value that contains a colon and
    space. Improve: audit dormant standalone artifacts under plans/ for divergent
    copies whenever the active skill surfaces change."
---

# Portable skill sources

## Context

The short uig skill and the compound-engineering skill were embedded as markdown
inside template literals in React views (`src/views/uig.tsx` and
`src/views/compound-engineering.tsx`), which made them fragile to edit (no
backticks or `${}` allowed) and impossible to sync cleanly to the installed
Claude Code skill directory. The request was to move them to plain editable
markdown and make updates reach the live skill via one command.

## Change

- `skills/uig/SKILL.md` and `skills/compound-engineering/SKILL.md` — new committed
  plain-markdown sources of truth (compound-engineering extracted verbatim).
- `src/views/uig.tsx` and `src/views/compound-engineering.tsx` — embedded literals
  removed; both now import the skill via a raw asset import.
- `scripts/sync-skills.js` and the `skills:sync` npm script — copy every
  `skills/<name>/SKILL.md` to `~/.claude/skills/<name>/SKILL.md`.
- `scripts/validate-okf.test.js` — contract test now reads `skills/uig/SKILL.md`.
- `knowledge/lessons/uig-consistency.md` and `knowledge/context.md` — point at the
  new source and the sync command.
- `plans/uigate/uigate-page.html` — removed: superseded divergent skill copy.

## Evidence

- `npm run typecheck` clean; `npm run build` completes 24 pages.
- `npm run okf:test` 54 passed.
- `npm run skills:sync` leaves installed uig unchanged and brings
  compound-engineering into byte-identical alignment.
- `npm run okf:validate` passes on the staged bundle after the receipt was brought
  to the current schema.

## After Action Review

1. **What was supposed to happen?** — Move both skills out of TSX string literals
   into committed markdown, serve them to the site at build time, and propagate
   edits to the installed skill directory with one command.
2. **What actually happened?** — Both skills live in `skills/`, both views import
   them, the sync command works and was executed, the contract test guards the new
   file, and the legacy divergent copy was removed after the principal resolved the
   flags. All automated verification passes.
3. **Why was there a difference?** — The main gap was process, not code: the staged
   receipt initially failed the current schema (missing aar.learning, missing the
   body After Action Review section, and a colon-space in the scope value), which
   blocked coverage registration until corrected. A dormant legacy copy in
   plans/ that the earlier surface scans had not flagged was found and retired.
4. **What will we do differently?** — Sustain the single-source layout and the sync
   command. For future receipts, match the validator's exact schema up front,
   including quoting YAML values containing a colon and space. For future surface
   audits, scan dormant standalone artifacts under plans/ as well as the active
   copies.

## Reuse

Any future edit to a portable skill goes through `skills/<name>/SKILL.md`, then
`npm run skills:sync` for the installed copy, then a normal commit for the site
download. The consistency lesson (`knowledge/lessons/uig-consistency.md`) encodes
the surface list and the sync check.
