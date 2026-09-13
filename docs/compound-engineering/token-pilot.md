# Token-efficiency pilot

Objective: fewer total tokens per accepted task without weakening correctness, authority boundaries, or mandatory verification. The initial 20% reduction is a hypothesis, not a measured result.

Use at least three representative tasks: a UI change with human acceptance, a backend/validator correction, and a documentation consistency change. Run baseline and compact-retrieval workflows from matching isolated starting commits, using the same model, settings, task prompt, and acceptance checklist. Alternate run order and repeat pairs to expose variation. Do not deploy or publish pilot outputs. Approve consequential actions separately.

Collect actual per-run telemetry when the host exposes it. Count all input (including cached input), output, retries, agent/tool-model work, and lesson-writing overhead through acceptance. Record cache tokens separately without counting them twice. If telemetry is unavailable, record null; estimates must be labeled and excluded from measured token-savings claims. Tool output bytes and file reads are diagnostics, not token measurements. Account-wide usage percentages cannot measure a task.

Use `knowledge/templates/template-token-run.json` for each run in temporary task output, not the startup knowledge bundle. For each matched accepted pair calculate `(baseline total - candidate total) / baseline total`; report individual results and aggregate totals, failures, and acceptance rate. Never drop failed attempts from a task's eventual total. If a task never passes, report the failure rather than claiming savings for it. Include graph refresh overhead when required by the repository.

Acceptance: identical required checks pass; human checkpoints are honored; no unauthorized actions; a repeated comparison supports the target reduction. Have the reviewer examine diffs and evidence before seeing token counts. Current state: the [2026-09-13 pilot](pilots/2026-09-13/report.md) completed twelve worker trials. Revised total worker tokens increased 32.1%; receipt conformance improved. The reduction target was not met, and full operational/human acceptance is not established.

Learn only from observed repetition: add or refine a compact lesson when it prevents a repeated search or proven failed approach; otherwise record no new lesson. Verify applicability against source, deduplicate, and supersede outdated guidance. Learning never silently changes permissions or acceptance requirements.
