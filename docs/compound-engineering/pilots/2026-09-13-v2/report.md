# Receipt and startup comparison — 2026-09-13

The candidate used **12.61% fewer total worker tokens** (1,884,423 versus 2,156,421), with all twelve runs passing the same automated checks. It improved five of six matched pairs. The original 20% reduction target was not met. This is evidence for retaining the two changes as a provisional workflow improvement, not proof of generalized or autonomous learning.

## Matched results

Negative change means fewer candidate tokens. Totals include input, cached input counted once, and output, including within-worker retries and receipt/learning work.

| Task | Repetition | Baseline | Candidate | Change | Automated result |
| --- | ---: | ---: | ---: | ---: | --- |
| ui | 1 | 539,113 | 452,964 | -15.98% | Both pass |
| validator | 1 | 291,311 | 288,134 | -1.09% | Both pass |
| docs | 1 | 245,310 | 187,048 | -23.75% | Both pass |
| ui | 2 | 576,258 | 462,667 | -19.71% | Both pass |
| validator | 2 | 327,703 | 282,109 | -13.91% | Both pass |
| docs | 2 | 176,726 | 211,501 | +19.68% | Both pass |

| Measure | Baseline | Candidate |
| --- | ---: | ---: |
| Total worker tokens | 2,156,421 | 1,884,423 |
| Input tokens including cache | 2,142,112 | 1,871,950 |
| Cached input subset | 1,960,704 | 1,664,128 |
| Uncached input | 181,408 | 207,822 |
| Output tokens | 14,309 | 12,473 |
| Shell commands | 57 | 70 |
| Failed commands, including expected red regression tests | 10 | 12 |
| Summed worker elapsed seconds | 732.72 | 613.99 |

Aggregated by task, candidate tokens decreased 17.91% for UI, 7.88% for validator, and 5.57% for documentation. The second documentation pair regressed 19.68%. Uncached input increased 14.56%, so this result does not establish billing-cost or quota savings. Command counts also increased: the generator adds an authoring sequence even when total model-context usage falls.

## Controlled setup

Twelve sequential disposable runs: three tasks, two repetitions, order reversed in repetition two. Both variants used gpt-6-astra with medium reasoning, the same CLI, current application/validator/generator code, current receipt template, lessons, and acceptance requirements. CLI and source hashes are preserved in [manifest.json](manifest.json).

Baseline: broader startup context and mandatory architecture reading, with manual receipt creation. Candidate: task-routed startup and receipt generation through okf:receipt. Baseline authority and build safeguards were held equal; only startup guidance and receipt method were treated. The generator and its tests existed in both variants, but baseline workers were instructed not to use the generator for receipt authoring. This isolates the joint workflow effect, not each component independently. The shared new receipt schema means this is not a test of the older pending-acceptance bug.

Tasks: exact UI download-label substitution with preserved handler and filename plus build; duplicate receipt-source rejection with a red/green regression; adding an exact build-troubleshooting sentence to three documents while preserving existing content. Disposable patches were not promoted to application source.

The user explicitly approved the frozen 273-file, 32.9 MB payload after automatic review required payload-specific approval. All 273 source hashes were unchanged through the runs. Only approved source files were copied; node_modules was shared read-only. Workers were restricted to local shell/file tools, with no deployment, push, external messaging, or changes to the trial HEAD. Existing tests could create temporary Git fixture commits.

## Verification and accounting

Artifact reviews were frozen before token totals were unsealed. All twelve passed scope, receipt coverage, required checks, graph-attempt, and receipt-method checks. UI changes were exact source substitutions and all four generated pages contained the requested label. All four validator outputs additionally passed independent duplicate/unique fixtures and a separate npm run okf:test run (15 tests each). Documentation diffs were manually reviewed for preservation of commands, authority, and verification rules.

The initial docs reviewer was too strict about harmless headings, lesson pointers, and punctuation. It was corrected before unsealing tokens; the changes and rationale are preserved in [reviewer-notes.md](reviewer-notes.md). No worker patch was changed or rerun by the reviewer. [reviews.json](reviews.json) contains artifact-review results; [review-freeze.json](review-freeze.json) hashes the original full local review records.

Actual telemetry comes from Codex exec JSONL turn.completed.usage. All twelve completed with exit zero and available telemetry; no timeout or incomplete trial was dropped. Cached tokens are a subset of input, not an additional charge in these totals. Parent orchestration, initial implementation, and reviewer model tokens are unavailable and excluded; this is a worker-token comparison, not end-to-end organizational accounting.

## Limits and decision

Human UI acceptance remains pending for all four UI trials. Graph refresh was attempted in each trial but semantic extraction failed because the installed backend dependency was unavailable; both variants recorded this limitation. Full operational acceptance is therefore not established. Two repetitions per task are exploratory and task-specific, with no statistical generalization. Lessons were fixed across runs; the experiment did not test an agent learning across trials.

Retain the receipt generator and task-routed startup provisionally: correctness held and aggregate total-worker tokens decreased. Do not advertise a 20% reduction, general cost savings, or autonomous learning. The next measurement should separate the two components and include fresh task types before promoting a general efficiency rule. No further experiment is automatically scheduled or authorized by this report.

## Evidence

[Measured results](results.json), [independent tests](independent-tests.json), [approved payload](payload-manifest.json), [runner](run-pilot.py), [reviewer](review-run.js), and [summarizer](summarize.py). Full temporary transcripts, diffs, prompts, and disposable workspaces remain under /tmp/uig-token-comparison-v2; raw transcripts are not added to startup context. Rerunning requires a fresh verified snapshot and appropriate authorization; saved runner paths refer to this local experiment.
