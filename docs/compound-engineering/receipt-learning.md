# UI-GATES receipt learning

This internal tool implements experience-derived memory for **receipt authoring**. It does not retrain a model or alter the portable `/uig/` skill. Run `npm run uig:learn -- --help` for commands. Local records live in ignored `.uig-learning/`; no model calls, external uploads, task commits, or deployments are performed by these commands.

## Learning contract

Within an instrumented task, `okf:receipt` automatically records each parsed receipt attempt, its structural diagnostic, and whether receipt creation succeeded. Snapshots retain field shapes and a fixed set of safe status values, not arbitrary intent, evidence, source paths, or authority text. Invalid YAML is rejected before this hook and is not learned in this slice. File-system/source-existence failures are recorded as unsuccessful attempts but do not produce structural lessons.

`propose` compares failed snapshots with a later successful snapshot. The same diagnostic, context, and observed correction must occur in **two distinct discovery task IDs**. Candidates contain observed field corrections, exact source hashes, and references to both attempts. Arbitrary replacement text is never synthesized or copied; a nonempty evidence-field correction means “supply the current task's real evidence,” not reuse another task's evidence. Authorization-field corrections and repairs that change the human-review state are excluded. Duplicate candidates retain the same content-derived identifier.

Only `discovery` runs produce candidates. `live` runs retrieve at most three applicable approved lessons; optional diagnostic codes narrow selection. `control` runs receive no lessons. `treatment` runs receive only lessons frozen in an authorized evaluation plan, including unevaluated candidates for that bounded experiment. Evaluation outputs cannot feed discovery automatically.

A lesson with only `candidate` state is never auto-approved; `evaluate` promotes it to `evaluated` only when observed transfer is preserved, and a rework regression (a treatment arm that needed equal or more failed attempts than its control) retires the evaluated lessons conservatively. `approve` requires a current principal decision with a source and scope. Approval records are local attestations, not authenticated principal identities: operators must record actual decisions, and reviewers must inspect the referenced evidence. Do not infer approval from passing tests, this implementation's approval, or tool access.

Every receipt attempt checks source freshness and any supplied lesson's current authority. Validator, generator, learning code, receipt template, canon, or operating-system changes invalidate reuse. Expired approvals are excluded. Retirement takes effect on active instrumented runs too. An acceptance or rework regression in a controlled evaluation retires the evaluated lessons conservatively; token regressions are flagged for review. Revised guidance requires new evidence and evaluation, not editing an approved lesson in place.

## Record experience

Create a run input such as `/tmp/receipt-run.json`:

```json
{
  "task_id": "unique-receipt-task",
  "family": "receipt-authoring",
  "mode": "discovery"
}
```

Run `npm run uig:learn -- start /tmp/receipt-run.json`. Keep the returned `id` for the whole task, including repairs. Set `UIG_LEARNING_RUN` to that ID on each existing `npm run okf:receipt -- YYYY-MM-DD-slug /tmp/receipt.yaml` invocation. This instruments both failure and success without extra manual logging. An uninstrumented receipt command retains its existing behavior.

Use `mode: live` for subsequent tasks with approved guidance. `start` returns lesson IDs, content versions, diagnostics, before/after field shapes, and explicit cautions. The coding agent must check the matching diagnostic and before-state before using a correction. Suggestions cannot authorize work, supply evidence, or change required acceptance.

After two independently corrected discovery tasks, run `npm run uig:learn -- propose`. This creates candidates; it does not approve them. “Successful” here means the receipt passed validation and was written, not that every underlying UI or production task was accepted.

## Freeze a controlled evaluation

Prepare a JSON plan with this shape. Replace all example values with a concrete reviewed experiment and actual authorization before starting:

```json
{
  "id": "receipt-evaluation-one",
  "tasks": ["fresh-task-1", "fresh-task-2", "fresh-task-3", "fresh-task-4", "fresh-task-5", "fresh-task-6"],
  "model": "exact-model-used-by-the-runner",
  "settings": { "reasoning_effort": "medium" },
  "checks": ["receipt-valid", "authority-review", "task-specific-regression"],
  "human_review_required": [],
  "lesson_ids": ["lesson-ID-FROM-PROPOSE"],
  "authorization": {
    "principal": "actual principal",
    "source": "reference to actual approval of this experiment",
    "scope": "these tasks, payload, runner and model destination",
    "expires_at": "replace with actual future expiry"
  }
}
```

`npm run uig:learn -- plan /tmp/evaluation.json` freezes the model/settings, checks, task IDs, lesson versions, and dependencies. At least six distinct tasks are required. Discovery task IDs cannot overlap; new discovery runs cannot use reserved holdout IDs. A reviewer must additionally verify semantic novelty: renaming an old task does not make it unseen.

Before the plan is frozen, the evaluation payload is pinned and a recoverability attestation is graded. Use the deterministic local tool:

```sh
node scripts/uig-recoverability.js \
  --payload /path/to/payload-manifest.json \
  --lesson /path/to/candidate-lesson.json \
  --root . --out /tmp/recoverability.json
```

`payload_sha256` pins each manifest file by path **and content**, so later drift in any pinned file changes the digest even when the path list is unchanged. Feed the attestation's `payload_sha256`, `summary`, and `corrections` into the plan's `recoverability` field; `plan` validates that every correction carries a field and one of `explicit`, `partial`, or `unclear`. The attestation grades, for each learned correction, whether a payload sentence co-occurs the corrected field, the required value, and the diagnostic trigger:

- `explicit` — one sentence explains field, value, and trigger together;
- `partial` — field and value co-occur without the trigger;
- `unclear` — no payload text explains the correction.

Absence of an explicit repair never by itself proves novel knowledge. The recovered grade only **caps** the claim altitude at evaluation time: any `explicit`/`partial` correction keeps the ceiling at `guidance-effect`; an all-`unclear` attestation drops it to `unverified-novelty`; a plan without an attestation is `not-assessed`. The recoverability grade can downgrade a claim, never upgrade it.

The frozen, scrubbed routing documents and diagnostics become the shared comparison context: both arms receive **identical** instructions, and the final docs are frozen before the recoverability assessment runs so the comparison cannot move the target after the fact. Authority rules are preserved from the canon: the receipt authoring task being evaluated decides what a human must still review; the learner never learns to waive pending human review as a schema shortcut.

Provision separate disposable stores so evaluation evidence cannot contaminate learning:

- **Workspace/store isolation.** Each arm runs in its own disposable checkout and `.uig-learning` store inside a scratch directory. Smoke-check runs happen in their own disposable stores so their (intentionally failing) receipts cannot be attributed to a discovery task and become candidate evidence. Delete the disposable stores after import; keep the smoke intent — each task's first intended attempt must still fail.
- **Blinding.** Control agents must be unable to read the candidate lesson or any plan containing its content. The external runner provisions a snapshot of the frozen store; control arms see a snapshot with the lesson body and any plan-with-its-content stripped, while treatment arms and the recorder see the full frozen snapshot. Verify the frozen snapshot before each run and after each finish.
- **No promotion of trial patches.** Model trial patches from the evaluation are not committed to the repo. The runner records them as review artifacts only.

The correct **oracle comparison is deferred to a separate run**, not folded into this evaluation: a correctly hand-written repair is an oracle, while an arbitrary hint is a different comparator. Freeze the oracle comparison — all six tasks, condition `treatment ≤ oracle` in receipt rework — **before** inspecting any holdout results. Do not select "decisive pairs" after observing the data.

Run both `control` and `treatment` for each task, using `start` with the same `family`, `task_id`, and `plan_id`. The tool refuses duplicate arms. The external coding-agent runner must hold source, model/settings, task prompt, and acceptance equal, alternate arm order, and isolate workspaces. It is responsible for supplying returned guidance to the agent and setting the receipt environment variable. This CLI is the recorder/evaluator, not a model launcher or sandbox manager. External model runs still require their applicable authorization.

Human requirements belong to the **receipt-authoring task being evaluated**. Add any task IDs requiring a human to `human_review_required`; those tasks cannot be completed with `human_review: not-required`. A receipt may itself represent a partial underlying task; correcting its structure does not accept that underlying task.

## Close runs and account for cost

After independent review, pass `finish RUN_ID /tmp/outcome.json`:

```json
{
  "acceptance": "accepted",
  "human_review": "not-required",
  "reviewer": "actual reviewer",
  "checks": { "receipt-valid": true, "authority-review": true, "task-specific-regression": true },
  "review_evidence": "/absolute/path/to/reviewer-artifact.json",
  "applied_lessons": [],
  "model": "exact-model-used-by-the-runner",
  "settings": { "reasoning_effort": "medium" },
  "usage_jsonl": "/absolute/path/to/complete-codex-run.jsonl"
}
```

Use `failed` or `pending` honestly; never label required pending human review accepted. All frozen checks need explicit results, and the receipt-valid result must match the final recorded attempt. `applied_lessons` lists only supplied IDs actually used, backed by the reviewer artifact (for example a diff and command trace). The artifact is hashed. Reported model/settings must match the plan, but this local tool cannot independently authenticate which remote model ran.

If an arm was cut short — typically a wall-clock timeout after a first failed attempt — record a descriptive `limitation` (for example `"wall-clock timeout after the first failed receipt attempt"`). A recorded limitation makes the primary result **inconclusive** while the completed pairs remain descriptively reported. A wall-clock timeout does **not** cap or estimate token usage; unavailable or incomplete telemetry stays unknown, never zero. Reduced receipt rework alone is not token savings.

Codex `turn.completed.usage` input plus output is counted, including retries in that trace; cached input is reported separately and never added twice. A missing, failed, or unfinished trace cannot become zero usage. Reusing the exact same telemetry file across cost/run records is rejected. Supply the entire run trace, not its cheapest successful turn. Reviewers remain responsible for detecting omitted or relabeled trace fragments.

Record each overhead phase with `cost PLAN_ID PHASE /tmp/cost.json`: `discovery`, `lesson-creation`, `selection`, `evaluation`, and `maintenance`. Use `{"usage_jsonl":"/absolute/path/to/phase.jsonl"}` for actual model telemetry, or `{"kind":"no-model","reason":"actual reason this phase made no model calls"}` only for a deterministic phase with zero model use. If selection is already counted in run input, document that allocation and record no *additional* model usage; do not count it twice. Include discovery runs and reviewer/model work here when they are outside arm traces. Unknown overhead blocks net-savings support. Capture all phases before evaluating; unobserved future maintenance is not covered by the claim.

`evaluate PLAN_ID` requires both finished arms for every frozen task, preserves failed/pending outcomes, and emits per-pair results, observed transfer, known token totals, overhead, net savings, rework counts, and a claim gate. An immutable evaluation cannot be overwritten. Freeze reviewer artifacts before importing/unsealing telemetry in the external runner; this CLI stores counters at finish and does not itself blind a reviewer.

The **primary claim** is supported only when every pair is accepted with complete actual telemetry and no recorded limitation, no arm shows a rework regression, and at least two pairs improve receipt rework (`complete_accepted && no_rework_regression && rework_improvement_pairs >= 2`). Receipt rework is measured on the record: failed attempts plus the first-success index. Any timeout, missing final trace, or incomplete telemetry makes the primary result **inconclusive**; completed pairs are still reported descriptively with `inconclusive_reasons`. If discovery produced no candidates at all, the result is an **induction gate failure**, not a measured effect.

`primary_supported` unlocks `allowed_claim`, which is the recoverability `claim_altitude` (`guidance-effect`, `unverified-novelty`, or `not-assessed`) — the recoverability grade only caps the claim, never upgrades it. `transfer_supported` requires all paired tasks accepted and at least two treatment pairs with reported lesson use and fewer receipt failures; this is bounded, reviewer-attested transfer evidence. `token_savings_supported` additionally requires complete actual arm telemetry, measured overhead across every phase, and positive net tokens saved. It is not statistical proof, billing savings, or model self-training. The supported public-claim sentence stays scoped: *"In this frozen receipt-authoring benchmark, guidance extracted from two discovery tasks reduced failed receipt submissions on at least two of six held-out tasks, with no observed acceptance or rework regression."* Add a token-reduction claim only if the complete measured usage supports it.

## Promote, monitor, retire

After reviewing an evaluated candidate, use `approve LESSON_ID /tmp/approval.json` with the same principal/source/scope/expiry shape as the plan authorization. An inconclusive primary evaluation does not by itself authorize live reuse; approval is a separate principal decision. `list` shows state, staleness, provenance, supplied/applied runs, accepted applications, receipt failures, and available token totals. It distinguishes live reuse counts from all supplied runs; run totals alone are not a causal savings estimate. Use `retire LESSON_ID "supported reason"` to withdraw obsolete guidance. Automatic dependency checks stop stale reuse even before retirement is recorded.

Keep raw local memory out of Git and mandatory startup context. Promote only a reviewed, compact result and its provenance to committed knowledge. The store is designed for one writer per task/store; exclusive writes reject conflicting or duplicate records rather than silently overwriting evidence. Back up `.uig-learning/` explicitly when persistence across machines is needed.

## Implemented evidence and remaining claim gate

`npm run okf:test` exercises the automatic hook, repeated-experience extraction, six distinct heldout fixture pairs, live-approval gate, retirement, source invalidation, missing arms, human-review checks, overhead arithmetic, the primary-claim gate (limitations and rework regressions), and the recoverability attestation (explicit/partial/unclear grading, content-pinned payload hashes). The generic fixture consumer applies learned enum corrections rather than a prewritten repair rule. Synthetic counter fixtures test accounting; they are not measured coding-agent usage.

No live lesson is seeded or approved by this implementation. The previous 12.61% workflow comparison did not test learned memory. Before public copy claims measured experiential learning, run and review a real authorized agent comparison using this loop. The intended supported claim remains scoped: UI-GATES derives reusable receipt-authoring lessons from verified experience, applies approved lessons later, and evaluates whether they help.
