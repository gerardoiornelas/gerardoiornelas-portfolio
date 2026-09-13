---
title: Freeze receipt-learning evaluation against the amended decision rule
type: task-receipt
status: partial
intent: Implement the accepted amendment to the real-agent receipt-learning
  evaluation plan — the frozen primary-claim rule, a deterministic
  recoverability attestation, honest timeout handling, blinded disposable
  stores, and a safe-by-default operational runner.
sources:
  - runner.cjs
  - scripts/uig-recoverability.js
  - scripts/uig-recoverability.test.js
  - scripts/uig-runner.test.js
  - scripts/uig-learning.js
  - scripts/uig-learning.test.js
  - scripts/uig-learning-cli.js
  - package.json
  - docs/compound-engineering/receipt-learning.md
  - knowledge/context.md
  - knowledge/okf.yaml
authorization:
  state: delegated
  source: User requested implement after the amendment and its critical review
    were analyzed and jointly accepted.
  scope: Local evaluator, recoverability attestation tool, operational runner,
    protocol documentation and tests. No deployment, commit of real-agent trial
    patches, live lesson approval, or external model runs.
  valid_until: Completion of this local implementation slice.
acceptance:
  status: partial
  human_review: pending
  reviewer: Implementing agent ran automated local verification; principal
    visual acceptance of the change set outstanding
  evidence:
    - "npm run okf:test: 49 tests passed across validator, receipt helper,
      learning lifecycle, recoverability grading, and runner (payload drift
      detection, case validation, control blinding, smoke, safe dry-run)."
    - "npm run okf:validate: staged-bundle receipt coverage and structure
      passed on the working bundle before staging; final staged check rerun
      before commit."
    - "evaluate now reports primary_supported, complete_accepted,
      rework_improvement_pairs, rework_regression_pairs, no_rework_regression,
      inconclusive_reasons, claim_altitude and allowed_claim; any recorded
      limitation or incomplete telemetry keeps the primary inconclusive."
    - "uig-recoverability.js grades explicit/partial/unclear via sentence
      co-occurrence, pins payload_sha256 by path and content (a drift test
      caught and fixed the original path-list-only hash), and only downgrades
      a claim."
    - "runner.cjs verifies payload digests, smoke-checks each task's intended
      failing fixture in disposable stores, provisions blinded control stores,
      and records wall-clock timeouts as limitations, never token estimates.
      No codex model was invoked; dry-run/smoke/provision are synthetic
      fixture exercises."
aar:
  expected: The accepted amendment is encoded in the evaluator, tooling,
    protocol docs, wiring, and the operational runner, with passing local tests.
  actual: All evaluator fields, the recoverability attestation (content-pinned),
    limitation/timeout semantics, rework-regression retirement, blinded
    provisioning, and safe dry-run runner are implemented and covered by tests.
  difference: Principal human acceptance is pending. No real-agent evaluation or
    oracle comparison has run; the deferred oracle contract is documented but
    not yet exercised. Recoverability grades and runner behavior are fixture
    evidence, not measured coding-agent evidence.
  learning: A frozen primary-claim rule must be computed by the evaluator itself
    (not described in a report); recoverability downgrades claims by intent; and
    operational runners must be safe by default with explicit escalation.
---

# Task receipt

## After Action Review

See the structured aar answers and acceptance evidence above.

