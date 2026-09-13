---
title: Experience-derived receipt learning first slice
type: task-receipt
status: verified-with-environment-limit
intent: Implement automatic receipt experience capture, repeated-correction
  lesson proposals, gated live retrieval, and a controlled transfer evaluator.
sources:
  - .gitignore
  - package.json
  - scripts/validate-okf.js
  - scripts/create-okf-receipt.js
  - scripts/uig-learning.js
  - scripts/uig-learning-cli.js
  - scripts/uig-learning.test.js
  - docs/compound-engineering/receipt-learning.md
  - knowledge/context.md
  - knowledge/okf.yaml
  - knowledge/receipt-authoring.md
authorization:
  state: gated
  source: User Implement following the explicit six-step experience-learning plan
    and proposed first slice.
  scope: Local receipt-learning tooling, lifecycle gates, evaluation accounting,
    tests, and knowledge. No live candidate promotion or external model
    experiment.
  valid_until: Completion of this implementation and local verification.
acceptance:
  status: verified-with-environment-limit
  human_review: not-required
  reviewer: Implementing agent reviewing local code and tests
  evidence:
    - All 12 proposed files passed staged-bundle receipt coverage and whitespace validation using a temporary index; actual Git index untouched. Local experience store exclusion verified with git check-ignore.
    - Actual implementation receipt captured by the recorder in discovery mode and reviewed; zero candidates generated from one successful attempt. Missing usage remains unavailable, not zero.
    - "npm run okf:test: 29 tests passed, including six unseen matched fixtures,
      real receipt hook, distinct-task learning, redaction, selective reuse,
      approval, retirement, expiry, source invalidation, per-lesson transfer
      attribution and accounting boundaries."
    - Synthetic fixture counters test arithmetic only; no actual coding-agent
      efficiency or live transfer claim follows from these tests. No learned
      lesson seeded or approved in the real store.
    - CLI help exercised; source whitespace and proposed-index validation are
      checked before completion.
    - No site UI or rendering changed; site build not required for this internal
      tool slice. Graph refresh uses the available local fallback if the default
      semantic backend remains unavailable.
aar:
  expected: Repeated verified receipt corrections create persistent candidates;
    only evaluated and explicitly approved lessons influence later live tasks;
    failed tasks and full known overhead remain in evaluation.
  actual: Learning lifecycle implemented with a local ignored event store, shared
    structured validator diagnostics, automatic instrumented receipt hooks,
    versioned candidates, and six-pair controlled evaluation. 29 tests passed.
  difference: Fixture-based transfer is verified; a real authorized model-agent
    evaluation is still required before claiming demonstrated experiential
    learning or new token savings. Local approval/review records are
    attestations, not authenticated identity.
  learning: Bound memory to the schema and governing source versions. Do not learn
    human-review waivers, infer approval, credit unused lessons, or treat
    unavailable telemetry as zero. Retain concise source-bound guidance and
    require independent review of behavioral transfer.
---

# Task receipt

## After Action Review

See the structured aar answers and acceptance evidence above.
