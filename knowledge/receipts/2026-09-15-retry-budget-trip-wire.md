---
title: Retry-budget trip wire for authorization and receipts
type: task-receipt
status: partial
intent: "Close the two structural gaps named against the Harness Engineering
  framework (Permissions/budgets, Trip wires): a retry budget field on
  authorization that is actually enforced, not just described in prose, per
  Gerardo's direction to build a system that executes on the promise rather than
  a visualization layer."
sources:
  - scripts/validate-okf.js
  - scripts/validate-okf.test.js
  - docs/compound-engineering/operating-system.md
  - docs/compound-engineering/ui-gates-canon.md
  - plans/uigate/uigate-skill.md
  - skills/uig/SKILL.md
  - knowledge/templates/template-receipt.yaml
  - knowledge/templates/template-receipt.md
  - knowledge/receipt-authoring.md
authorization:
  state: delegated
  source: "Explicit principal direction in conversation: \"let's not worry about
    opencode, we want a system that executes on the promise of what we are
    saying\" — scoped to closing the Permissions/Trip-wire gap identified
    against the Harness Engineering diagram, within existing OKF tooling
    conventions."
  scope: scripts/validate-okf.js and its test, the four canon/skill mirrors of the
    authorization schema, and the two receipt templates.
  valid_until: Task completion.
acceptance:
  status: partial
  human_review: pending
  reviewer: Claude Sonnet 5
  evidence:
    - "npm run okf:test: 66/66 passing, including 4 new trip-wire tests and the
      existing cross-file consistency test"
    - "npm run okf:validate: working bundle passes"
  retries: 0
aar:
  expected: A deterministic, testable enforcement mechanism for at least one of
    the two named gaps (Permissions or Trip wires), consistent with this repo's
    existing schema/validator/test pattern, not a new subsystem.
  actual: Added an optional authorization.budget.max_retries field and
    acceptance.retries field to the receipt schema. validate-okf.js now fails
    structural validation when acceptance.retries exceeds
    authorization.budget.max_retries unless the receipt shows
    authorization.state=gated and acceptance.human_review=accepted. Mirrored the
    rule's description into both canon docs, the internal skill plan, and the
    distributed skill, and updated both receipt templates. All tests pass.
  difference: "No discrepancy: the mechanism landed as scoped, reusing the
    existing optional-field pattern (mirrors acceptance.human_review's own
    optional-with-branch-validation style) rather than introducing new
    machinery."
  learning: This closes the "Permissions" half of the gap concretely (a budget
    that is enforced, not just documented) and a commit-time slice of "Trip
    wires" (a receipt cannot silently exceed its budget). It does not close
    live, mid-session enforcement (e.g. a Claude Code PreToolUse hook that halts
    a session in real time when a retry budget is blown) — that remains open and
    was deliberately deferred pending a decision on thresholds and blast radius,
    since it would affect how sessions run, not just how receipts validate.
---

# Task receipt

## After Action Review

See the structured aar answers and acceptance evidence above.
