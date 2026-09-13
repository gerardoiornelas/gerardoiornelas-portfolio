---
title: Controlled receipt and startup token comparison
type: task-receipt
status: verified-with-environment-limit
intent: Measure identical tasks with broad/manual versus task-routed/generated
  receipt workflows, including retries and equivalent verification.
sources:
  - docs/compound-engineering/pilots/2026-09-13-v2/baseline-agents.md
  - docs/compound-engineering/pilots/2026-09-13-v2/baseline-context.md
  - docs/compound-engineering/pilots/2026-09-13-v2/independent-tests.json
  - docs/compound-engineering/pilots/2026-09-13-v2/independent-tests.py
  - docs/compound-engineering/pilots/2026-09-13-v2/manifest.json
  - docs/compound-engineering/pilots/2026-09-13-v2/normalize-shell.py
  - docs/compound-engineering/pilots/2026-09-13-v2/payload-manifest.json
  - docs/compound-engineering/pilots/2026-09-13-v2/report.md
  - docs/compound-engineering/pilots/2026-09-13-v2/results.json
  - docs/compound-engineering/pilots/2026-09-13-v2/review-freeze.json
  - docs/compound-engineering/pilots/2026-09-13-v2/review-run.js
  - docs/compound-engineering/pilots/2026-09-13-v2/reviewer-notes.md
  - docs/compound-engineering/pilots/2026-09-13-v2/reviews.json
  - docs/compound-engineering/pilots/2026-09-13-v2/run-pilot.py
  - docs/compound-engineering/pilots/2026-09-13-v2/summarize.py
  - knowledge/context.md
  - knowledge/okf.yaml
authorization:
  state: gated
  source: User Approved after explicit review of the frozen 273-file, 32.9 MB
    payload for twelve disposable trials through the existing Codex model
    service.
  scope: Approved payload hash
    132c64c1b0370fe4d8b27d9b7a8d966ed3079592d8c3ea5aa5f481c51ccc5719; twelve
    trials, artifact review, local report and warranted knowledge. No promotion
    of trial patches, commit, push or deployment.
  valid_until: Completion of this approved comparison and local reporting.
acceptance:
  status: verified-with-environment-limit
  human_review: not-required
  reviewer: Parent agent reviewed artifacts before unsealing usage
  evidence:
    - Parent validation passed for all 52 proposed files using an isolated Git index, including whitespace checks; real index unchanged. Report totals and frozen review hashes independently verified.
    - Parent code graph refreshed; default semantic backend unavailable, so scoped report/document semantic refresh uses the Graphify host-agent fallback. Existing UIGates.tsx parser warning remains.
    - All 12 trials exit zero, actual telemetry available, all 12 automated
      reviews passed; reviews frozen before usage unsealed.
    - All four validator outputs passed independent duplicate/unique fixtures
      and separate 15-test suites. Four UI builds and exact source changes
      passed automated review; human UI acceptance remains pending.
    - "273 approved source hashes unchanged through the experiment. Candidate
      1884423 total worker tokens versus baseline 2156421: 12.61% reduction;
      five of six pairs improved; original 20% target not met."
    - Default graph backend unavailable in trials; graph attempts and build
      retries counted. Parent/reviewer model usage excluded because unavailable.
      See report for limits and reviewer-check correction.
aar:
  expected: Reduce total worker tokens while holding application code, tests,
    schema, lessons, model, and automated acceptance equal.
  actual: All automated outcomes passed; joint workflow treatment reduced
    aggregate worker tokens by 12.61%, while uncached input and shell calls
    increased.
  difference: Below the 20% target; second docs pair regressed. Two repetitions do
    not identify individual mechanism contributions or establish generalization.
    Human UI and full graph acceptance remain open.
  learning: Retain the two changes provisionally based on this bounded comparison.
    Do not equate lower total tokens with lower billing cost or autonomous
    learning; isolate mechanisms and fresh tasks before generalizing.
---

# Task receipt

## After Action Review

See the structured aar answers and acceptance evidence above.
