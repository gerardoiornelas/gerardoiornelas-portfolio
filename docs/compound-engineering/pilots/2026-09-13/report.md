# UI-GATES token-efficiency pilot — 2026-09-13

The revised workflow did **not** meet the target of 20% fewer tokens. Across twelve runs it consumed **2,459,607 total worker tokens versus 1,862,570 baseline tokens: 32.1% more**. Across the four matched pairs where both variants passed automated review, it consumed **4.1% more**. This is an exploratory result, not a validated efficiency improvement.

## Comparison

Positive change means the revised workflow used more tokens. Totals include input (including cached input), output, retries within the run, receipt writing, and learning work. Cached input and reasoning output are subsets and are not added twice.

| Task | Repetition | Baseline tokens | Revised tokens | Change | Automated review |
| --- | --- | ---: | ---: | ---: | --- |
| ui | 1 | 342,565 | 668,550 | +95.16% | Baseline receipt fails |
| validator | 1 | 288,672 | 320,717 | +11.10% | Both pass |
| docs | 1 | 241,890 | 266,146 | +10.03% | Both pass |
| ui | 2 | 419,608 | 645,652 | +53.87% | Baseline receipt fails |
| validator | 2 | 343,585 | 352,260 | +2.52% | Both pass |
| docs | 2 | 226,250 | 206,282 | -8.83% | Both pass |

The revised workflow passed automated code/documentation and receipt review in **6/6 runs**, versus **4/6 baseline runs**. All twelve requested implementation changes passed their task-specific checks. The two baseline UI runs correctly left human acceptance pending, but used statuses the current receipt validator rejects. This is a receipt-schema compatibility issue, not a failed UI implementation. It prevents treating those two pairs as equally completed work.

All four validator outputs passed the independent duplicate/unique-source fixtures and a separate reviewer rerun of their ten-test suites. All UI source changes were the exact one-label substitution; the filename, MIME type, handler, layout code, and authority language were preserved. All documentation changes stayed within the requested files plus permitted receipts/learning.

**Human acceptance is pending.** A representative built UI was opened at `http://127.0.0.1:8913/uig/` for the principal to inspect and click. No human result has been inferred from the request to run the pilot. All twelve runs attempted graph refresh once and encountered the missing semantic-backend dependency. Full operational acceptance is therefore not established for either variant.

## What the measurements show

- Baseline: 1,847,473 input tokens (1,634,304 cached) plus 15,097 output tokens.
- Revised: 2,444,627 input tokens (2,249,088 cached) plus 14,980 output tokens.
- Revised uncached input was 195,539 versus 213,169 baseline: 8.3% lower. That does not change the total-token result and is not a pricing or quota claim.
- Baseline executed 57 shell commands; revised executed 67. The UI pairs account for the largest token increases. More context-bearing interactions and receipt checks are plausible contributors, but the CLI only exposed turn-total usage; this pilot cannot assign exact token costs to individual reads.
- UI builds required four total baseline attempts and five revised attempts. The existing lesson addressed telemetry/feedback but missed fresh-workspace global-config writes. All four UI runs succeeded after using a temporary `XDG_CONFIG_HOME`.
- One baseline validator run interpreted “no commits” as also forbidding disposable test-fixture commits, and spent extra work adapting a temporary test harness. This prompt ambiguity is a confound, not evidence of an inherent workflow advantage.

## Method and limits

The principal explicitly approved the exact 268-file allowlist and its model-service destination before trials. Manifest SHA-256: `055f59d3dfe1892c56e0ff5ef85f36b531eeb5b15cfe832ddb68176c385de51d`. No original source payload changed during the trials; trial patches remain in disposable copies. No deployment, push, or canonical-distribution modification occurred.

The same implementation snapshot, configured `gpt-6-astra` model, medium reasoning, bundled Codex CLI `0.154.0-alpha.6.2`, and task acceptance requirements were used. The baseline used the prior full workflow and an empty lesson index; the revised workflow used the new instructions and two lessons. Baseline startup context omitted the new compact-retrieval section. Other current doctrine, implementation, test suite, templates, and receipts were held equal. This measures a **workflow/retrieval treatment on current code**, not a complete historical-version A/B test. Current receipts could expose prior learning if retrieved by either variant.

Two repetitions reversed baseline/revised execution order. Input caching was observed, not reset; OS/dependency caches and latency were not controlled. The source manifest records file hashes; per-run starting commits differ because the workflow treatment differs. Global skill/plugin startup context was shared and substantial: a separate READY smoke test consumed 20,358 input tokens, excluded from trial totals.

Usage comes directly from each successful `codex exec --json` run's `turn.completed.usage` record ([official non-interactive documentation](https://learn.chatgpt.com/docs/non-interactive-mode)). All twelve turns completed, with no missing usage records or timed-out runs. Artifact reviews were saved before totals were unsealed. Reviewer helpers initially mishandled trailing newlines and compound shell commands; those review-only defects were corrected against raw artifacts before unsealing. Worker outputs were not changed to make them pass.

Parent orchestration, experiment setup, independent reviewer work, and initial lesson-development tokens are not included in worker totals because complete task-level telemetry for that work was unavailable. Consequently these numbers are **worker-attempt totals**, not all-in organizational tokens per fully accepted task. No baseline repair turns were run after review; failed receipt attempts remain in the totals. Do not use the successful subset alone to claim savings.

## Follow-up

1. Retain the authority and receipt-quality improvements, but do not promote a token-efficiency claim.
2. Refine only the Gatsby lesson with the repeatedly verified temporary-config remedy. This refinement is recorded after the frozen experiment and has not itself been benchmarked.
3. Propose a clear pending-human-acceptance receipt state and a deterministic draft/validation command. Avoid requiring an agent to repeatedly rediscover schema details to represent an honest pending outcome.
4. Clarify the next pilot prompt: prohibit commits to the trial repository while explicitly allowing isolated fixture commits used by existing tests. Keep the acceptance checks identical.
5. Test a smaller startup context and batched targeted retrieval in a new approved iteration. Measure all-in tokens, receipt conformance, and rework together; do not skip verification to improve counts.

## Evidence

- [Measured run data](results.json), [frozen automated reviews](reviews.json), and [independent test results](independent-tests.json).
- [Approved file allowlist](payload-manifest.json) and [source/model manifest](manifest.json).
- [Runner](run-pilot.py), [review helper](review-run.js), [shell normalization](normalize-shell.py), and [usage summarizer](summarize.py). These preserve the executed setup, including local absolute paths; re-running requires a newly reviewed payload and current hashes.
- Raw JSONL events, diffs, receipts, prompts, and independent-test logs: `/tmp/uig-token-pilot/`. Event and review hashes are recorded in results.json; temporary raw artifacts may not survive system cleanup.
