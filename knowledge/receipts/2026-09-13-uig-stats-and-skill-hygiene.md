---
title: Add stats reporting and converge UI-GATES skill surfaces
type: task-receipt
status: partial
intent: Add a stats/stat surface to the UI-GATES learning tool showing token
  usage and learning lifecycle totals, and implement the documented skill
  hygiene fixes (dead link, divergent copies, promotion-ladder drift, missing
  version markers, the installed-skill gap in the consistency lesson).
sources:
  - scripts/uig-learning.js
  - scripts/uig-learning-cli.js
  - scripts/uig-learning.test.js
  - src/views/uig.tsx
  - docs/compound-engineering/ui-gates-canon.md
  - docs/compound-engineering/operating-system.md
  - plans/uigate/uigate-skill.md
  - knowledge/lessons/uig-consistency.md
authorization:
  state: delegated
  source: User requested "implement this fix, i also want a stats or stat flag
    for uig to show token usage and or learnings", with clarifying answers
    electing a dedicated aggregate subcommand, tokens + learnings together,
    human-readable output, and the Knowledge ladder spelling.
  scope: Local edits: learning store aggregate summary, CLI stats command,
    tests, and documentation/skill surface convergence. No deployment,
    commit, or external publication.
  valid_until: Completion of this local implementation slice.
acceptance:
  status: partial
  human_review: pending
  reviewer: Implementing agent ran automated local verification; principal
    visual acceptance of the change set outstanding
  evidence:
    - "npm run okf:test: 54 tests passed (5 new: empty-store summary,
      lifecycle-and-telemetry summary, unknown-telemetry summary, limitation
      counting, CLI stats smoke)."
    - "npm run okf:validate: working bundle passed."
    - "npm run uig:learn -- stats: emits the eight-line human-readable report
      (runs/attempts/outcomes/lessons/plans/costs/tokens/overhead) on the live
      store and honors the token contract — 1 unavailable outcome is reported
      as never-counted-zero, never as a fabricated zero."
    - "All skill surfaces now carry version 0.2.0 / updated 2026-09-13, the
      canonical ladder Ephemeral → Task → Decision → Knowledge → Canon, and
      the same authority/learning contract phrases; committed uig.tsx download
      and installed ~/.claude/skills/uig/SKILL.md align on every contract
      phrase. The dead ui-gates/SKILL.md link is removed."
aar:
  expected: The stats subcommand reports only measured telemetry plus lifecycle
    totals, and the six skill surfaces converge on one canonical short skill.
  actual: summary() aggregates runs/attempts/outcomes/lessons/plans/costs/
    tokens with actual-only token measurement; the CLI stats command and
    help text are wired; five fixture tests pass. All five audit findings
    (dead link, divergent copies, ladder drift, missing versioning, installed
    lesson gap) are addressed and verified.
  difference: One test expectation was wrong at first — the lifecycle fixture
    honestly counts 14 runs, not 12, because lesson training leaves two
    discovery runs pending each with a recorded failed attempt. Corrected to
    the true accounting (14 runs, 22 attempts, 2 pending), matching store
    semantics. Principal human acceptance is pending; no commit or push issued.
  improvement: Reuse the recorded-failed-attempt semantics documented here
    when writing future summary fixtures — discovery runs count attempts and
    stay pending until finished.
---
