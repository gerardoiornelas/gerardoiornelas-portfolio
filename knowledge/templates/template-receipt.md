---
title: ""
type: task-receipt
status: partial
intent: ""
sources: []
authorization:
  state: ""
  source: ""
  scope: ""
  valid_until: ""
  # budget: { max_retries: 2 } # optional; exceeding it requires state: gated and human_review: accepted
acceptance:
  status: partial
  human_review: pending
  reviewer: ""
  evidence: []
  # retries: 0 # optional; count of Execute -> Verify cycles before this receipt
aar:
  expected: ""
  actual: ""
  difference: ""
  learning: ""
---

# Task receipt

## After Action Review

The structured `aar` fields answer intended outcome, actual outcome, supported discrepancy analysis, and next learning action. Replace all empty values before use. No discrepancy, cause unknown, and no new durable learning are valid when warranted. Evidence entries must name checks and results; link supporting artifacts when available. Sources must name exact repository paths covered by this receipt.

Start with `npm run okf:receipt -- --init /tmp/task-receipt.yaml`. Pending human review uses `partial` in both status fields and `acceptance.human_review: pending`; it is not completion. Set human_review to accepted only after the human actually accepts, or not-required when the task has no human acceptance requirement. The reviewer identifies the evidence reviewer, not an assumed human approver.
