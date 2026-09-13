---
title: Measured UI-GATES token-efficiency pilot
type: task-receipt
status: verified-with-environment-limit
intent: Run the explicitly approved 12-trial allowlisted pilot, review outputs
  before token totals, and refine only warranted learning.
sources:
  - docs/compound-engineering/token-pilot.md
  - knowledge/context.md
  - knowledge/okf.yaml
  - knowledge/lessons/gatsby-build.md
  - docs/compound-engineering/pilots/2026-09-13/independent-tests.json
  - docs/compound-engineering/pilots/2026-09-13/manifest.json
  - docs/compound-engineering/pilots/2026-09-13/normalize-shell.py
  - docs/compound-engineering/pilots/2026-09-13/payload-manifest.json
  - docs/compound-engineering/pilots/2026-09-13/report.md
  - docs/compound-engineering/pilots/2026-09-13/results.json
  - docs/compound-engineering/pilots/2026-09-13/review-run.js
  - docs/compound-engineering/pilots/2026-09-13/reviews.json
  - docs/compound-engineering/pilots/2026-09-13/run-pilot.py
  - docs/compound-engineering/pilots/2026-09-13/summarize.py
authorization:
  state: delegated
  source: Principal approved the exact 268-file payload and OpenAI Codex
    destination after the automated review rejected the earlier whole-repository
    batch.
  scope: Twelve local disposable trials, local review/reporting, and
    evidence-backed lesson refinement; no trial patch promotion, commit, push,
    or deployment.
  valid_until: Completion of this approved pilot and local report.
acceptance:
  status: verified-with-environment-limit
  reviewer: Codex independent artifact review; principal human UI check requested
    and still pending.
  evidence:
    - All 12 Codex trials completed with actual turn.completed usage; artifact
      reviews were recorded before usage unsealing.
    - "Automated review: revised 6/6, baseline 4/6. All requested implementation
      outputs passed; baseline UI receipt statuses failed the current schema."
    - All four validator outputs passed independent fixtures and separate
      ten-test suite reruns.
    - "Total worker tokens: baseline 1,862,570; revised 2,459,607 (+32.1%). Four
      mutually passing pairs: revised +4.1%. Target not met."
    - Original 268-file source payload remained unchanged during trials; exact
      hashes verified before report and lesson edits.
    - Every trial attempted graph refresh once; semantic backend unavailable.
      Human and full operational acceptance are not established.
    - Report source data and review hashes are saved under
      docs/compound-engineering/pilots/2026-09-13; raw events and trial copies
      remain in /tmp/uig-token-pilot.
aar:
  expected: Determine whether the revised workflow reduces tokens by at least 20%
    with unchanged acceptance quality.
  actual: Total worker tokens increased 32.1%; receipt conformance improved. No
    token-efficiency success claim is justified.
  difference: More UI interactions and context replay, an incomplete Gatsby
    lesson, pending-acceptance schema mismatch, and ambiguous no-commit fixture
    wording contributed to the observed outcomes; turn-total telemetry cannot
    attribute exact costs per action.
  learning: Refined the Gatsby lesson with the temporary XDG config remedy
    observed in all four UI runs. Proposed pending-acceptance schema and
    startup-context improvements remain unimplemented. No new governing rule or
    efficiency claim promoted.
---

# Token-efficiency pilot

## After Action Review

The structured answers above distinguish the measured failure to meet the token target from improved receipt-schema conformance. Full operational acceptance and human UI acceptance remain pending. See the linked report for methodology, confounds, evidence, and the proposed next iteration.
