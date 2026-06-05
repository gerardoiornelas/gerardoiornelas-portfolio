# Plan: `gerardoiornelas/uig` — AIDD Fork with Runtime-Enforced Per-Ticket UI-GATE

## 1. Decision Summary

Fork `paralleldrive/aidd` into a new public repo `gerardoiornelas/uig`. Keep AIDD's runtime, CLI model, and project bootstrap flow, but add one load-bearing constraint:

- `/execute` may run exactly one active `FEAT-XXX` ticket per invocation
- after that ticket completes, execution halts in the runtime
- the next ticket cannot start until a human runs `/validate FEAT-XXX`

UI-GATE is the product brand. AIDD is the substrate. The fork is intentionally independent and may diverge permanently, with quarterly upstream re-sync review.

This v1 is intentionally narrow:

- gate granularity is `per-ticket` only
- evidence capture is required for UI tickets
- the fork owns its gate policy assets and does not depend on this portfolio repo at runtime

Out of scope for v1:

- per-phase gating
- gate disable switches such as `"none"`
- upstreaming to AIDD
- changes to AIDD's SudoLang server framework beyond adding a fork-owned policy block

---

## 2. What Changes From The Prior Draft

This revision fixes four structural problems in the previous plan:

1. The gate is no longer defined as "parse one exact stdout string and hope."
2. Config has one source of truth: `.uig/config.json`.
3. V1 scope is coherent: per-ticket only, no granularity matrix.
4. The fork vendors its own UI-GATE policy file instead of referencing `plans/uigate/uigate-skill.md` at runtime.

The stop signal still exists as a human-readable convention, but it is no longer the enforcement mechanism. The runtime boundary is the enforcement mechanism.

---

## 3. Acceptance Criteria

| # | Criterion | Verification |
|---|---|---|
| AC-1 | `npx uig init` scaffolds a project with all AIDD files plus `.uig/` | Scaffold and inspect output |
| AC-2 | Existing AIDD commands still run unless they intentionally interact with the new gate | Smoke test `/discover`, `/task`, `/execute`, `/review`, `/log`, `/commit`, `/user-test`, `/run-test` |
| AC-3 | `/execute` runs only the current active ticket and halts before dispatching the next ticket | Run against a 3-ticket task; observe only ticket 1 executes |
| AC-4 | A second `/execute` invocation refuses to proceed while `.uig/pending.json` shows `AWAITING_HUMAN` | Run `/execute` twice without validation; second run exits with gate message |
| AC-5 | `npx uig validate FEAT-001` marks the ticket validated, appends to the logs, and unblocks ticket 2 | Validate and rerun `/execute` |
| AC-6 | `npx uig validate FEAT-001 --skip --reason "..."` records a skipped decision and unblocks the next ticket, including when evidence capture failed | Manual verification |
| AC-7 | The validation log exists as both Markdown and JSON and stays schema-consistent | `jq .` on JSON and render Markdown |
| AC-8 | A ticket cannot be marked `validated` unless `.uig/evidence/FEAT-XXX/` contains required evidence files | Delete evidence and confirm `/validate` refuses |
| AC-9 | JSON log entries include SHA-256 hashes for evidence files, and integrity mismatches are detectable later | Validate, edit a file, rerun integrity check |
| AC-10 | The fork documents upstream merge policy in `FORK.md`, including expected recurring conflict zones if any | Review doc after first upstream merge rehearsal |
| AC-11 | The README and this portfolio's `/uig` page link to `gerardoiornelas/uig` and explain "UI-GATE is the brand, AIDD is the substrate" | Visual review |
| AC-12 | End-to-end gate flow passes on a 3-ticket demo UI project | Full manual run |

Ship threshold for v1:

- AC-3, AC-4, AC-5, AC-6, AC-8, AC-9, AC-12 must pass end-to-end

---

## 4. Runtime Model

### 4.1 Principle

The gate must be enforced by the fork's execution loop, not by prompt wording.

That means `/execute` must resolve the active ticket before starting the agent run, and it must never hand the runtime more than one executable ticket at a time.

### 4.2 Enforced Boundary

The fork will introduce a ticket resolver that:

- reads the current task plan
- determines the next executable ticket
- checks `.uig/pending.json`
- dispatches exactly one ticket payload into the underlying AIDD execution flow
- exits after that ticket's run completes, regardless of whether more tickets exist

This makes the human gate structural. Even if the model outputs extra text, the runtime has no next ticket queued.

### 4.3 Stop Signal

The stop signal remains useful:

`FEAT-XXX COMPLETE - AWAITING HUMAN VALIDATION`

But in v1 it is only:

- a UX convention
- a log/event marker
- a secondary assertion in tests

It is not the primary lock.

### 4.4 Resolver Contract

`ticket-resolver.js` is the load-bearing enforcement seam. Its contract must be explicit before implementation begins.

Inputs:

- the current task plan artifact produced by `/task`
- `.uig/pending.json`, if it exists
- the validation log, for prior terminal decisions if needed

Resolver assumptions for v1:

- the task plan must contain a linear ordered list of `FEAT-XXX` tickets
- v1 does not support branching execution or parallel ticket lanes
- "next executable ticket" means the first ticket in plan order that does not already have a terminal decision of `VALIDATED` or `SKIPPED`

Initialization behavior:

- if `.uig/pending.json` does not exist on first run, initialize it as `IDLE`
- if no task plan artifact exists, `/execute` exits with a clear operator error
- if the task plan contains no parseable `FEAT-XXX` tickets, `/execute` exits with a clear operator error

Blocking behavior:

- if `pending.json.status` is `AWAITING_HUMAN`, return no ticket and surface the gate message
- if `pending.json.status` is `EXECUTING`, treat this as an interrupted prior run and require explicit operator review via `gate-status`
- if `pending.json.status` is `FAILED`, do not auto-advance; allow `/validate FEAT-XXX --skip --reason "..."` or explicit remediation

Outputs:

- `ticket`: the single `FEAT-XXX` ticket to dispatch now, or `null`
- `reason`: `READY`, `AWAITING_HUMAN`, `FAILED`, `NO_TASK_PLAN`, `NO_PARSEABLE_TICKETS`, or `ALREADY_COMPLETE`

Non-goals for v1:

- dependency graph resolution
- sibling ticket arbitration
- per-phase execution
- automatic recovery from malformed task plans

---

## 5. Files And Ownership

### 5.1 Project Runtime State

Every initialized project gets:

- `.uig/config.json`
- `.uig/pending.json`
- `.uig/validation.log.md`
- `.uig/validation.log.json`
- `.uig/evidence/`

### 5.2 Config Source Of Truth

Only `.uig/config.json` is authoritative in v1.

Initial shape:

```json
{
  "gateMode": "per-ticket",
  "skipAllowed": true,
  "devServerUrl": "http://localhost:3000",
  "evidence": {
    "type": "ui",
    "requiredFiles": ["screenshot.png", "page.html", "console.log"]
  }
}
```

Notes:

- `gateMode` is fixed to `"per-ticket"` in v1
- no project-root `uig.config.json`
- no `"per-phase"` or `"none"` values in v1

### 5.3 Pending State

Example `.uig/pending.json`:

```json
{
  "ticket": "FEAT-001",
  "status": "AWAITING_HUMAN",
  "awaitingSince": "2026-06-05T18:00:00.000Z",
  "decision": null
}
```

Allowed statuses:

- `IDLE`
- `EXECUTING`
- `AWAITING_HUMAN`
- `VALIDATED`
- `SKIPPED`
- `FAILED`

### 5.4 Fork-Owned Policy Asset

The fork should vendor its own policy file, for example:

- `assets/ui-gate-policy.md`

That file may be derived from `plans/uigate/uigate-skill.md`, but the fork must own and version it locally.

---

## 6. Implementation Plan

### Phase 0 - Fork Setup

1. Fork `paralleldrive/aidd` to `gerardoiornelas/uig`
2. Rename package metadata and CLI entrypoints from `aidd` to `uig`
3. Add `upstream` remote
4. Tag the fork point
5. Add `FORK.md` with:
   - fork relationship
   - divergence policy
   - quarterly re-sync cadence
   - expected conflict zones after the first rehearsal merge

### Phase 1 - Gate Core

6. Add `lib/gate/state-machine.js`
7. Add `lib/gate/pending-store.js`
8. Add `lib/gate/validation-log.js`
9. Add `lib/gate/ticket-resolver.js`
10. Add `lib/gate/evidence-hasher.js`
11. Add `lib/gate/evidence-integrity.js`
12. Add contributor docs for:
   - resolver contract
   - pending state lifecycle
   - validation log schema

Responsibilities:

- `state-machine.js`: valid transitions only
- `pending-store.js`: read/write `.uig/pending.json`
- `validation-log.js`: append Markdown and JSON in one transaction boundary
- `ticket-resolver.js`: choose the next executable ticket and ensure only one ticket is dispatched
- `evidence-hasher.js`: hash captured evidence
- `evidence-integrity.js`: compare current hashes to recorded hashes

### Phase 2 - `/execute` Integration

13. Locate AIDD's execution entrypoint for task/ticket dispatch
14. Introduce a fork-owned wrapper around that entrypoint
15. Before any agent run:
   - read `pending.json`
   - if status is `AWAITING_HUMAN`, exit with: `Gate active: FEAT-XXX is awaiting human validation. Run \`npx uig validate FEAT-XXX\`.`
16. Resolve the next ticket from the task plan
17. Dispatch only that ticket into the underlying AIDD execution flow
18. Mark state `EXECUTING` at start
19. After the run completes:
   - capture evidence
   - write `AWAITING_HUMAN`
   - append a pending row/event to the logs
   - exit without dispatching another ticket

Implementation requirement:

- do not rely on agent stdout parsing to decide whether ticket N+1 may start

### Phase 3 - `/validate` Command

20. Add `bin/commands/validate.js`
21. Command shape:

```bash
npx uig validate FEAT-001
npx uig validate FEAT-001 --skip --reason "route copy is approved for now"
```

22. Validation flow:
   - confirm `pending.json` matches the requested ticket
   - if the operator requested `--skip`, require `--reason` and allow skip even when evidence capture failed or evidence files are missing
   - if the operator requested approval, confirm evidence directory exists and required files exist
   - display evidence for approval flows
   - prompt human for decision
   - on approve: hash files, append validated entry, update `pending.json`
   - on fail: append failed entry, keep gate closed
   - on skip: require `--reason`, append skipped entry, unblock next ticket

23. Add `bin/commands/gate-status.js`

Outputs:

- active ticket
- current state
- waiting duration
- last decision

### Phase 4 - Evidence Capture

24. Add Playwright dependency to the fork
25. Add `lib/gate/evidence-capture.js`
26. For UI tickets, capture into `.uig/evidence/FEAT-XXX/`:
   - `screenshot.png`
   - `page.html`
   - `console.log`

Optional in v1:

- `network.har`

Rationale:

- keep required evidence small enough to be reliable
- avoid making HAR capture a ship blocker if it complicates bootstrap

27. Evidence capture inputs:
   - ticket id
   - `primaryRoute`
   - `devServerUrl`

28. Evidence capture behavior:
   - open `devServerUrl + primaryRoute`
   - wait for stable load condition
   - capture required files
   - subscribe to `console.error` and `pageerror` during the capture window
   - if any `console.error` or `pageerror` events fire, fail the capture and attach the errors to the ticket failure record
   - if capture fails, mark ticket `FAILED` and keep gate closed

### Phase 5 - Documentation And Portfolio Surface

29. Update fork `README.md`
30. Add `.uig/config.json` schema documentation
31. Update [src/pages/uig.tsx](/Users/ornelastechnologies/Documents/Git/violetek/gerardoiornelas-portfolio/src/pages/uig.tsx:1020) to link to `github.com/gerardoiornelas/uig`
32. Replace the current "Built with UI-GATE" proof block with copy that distinguishes:
   - UI-GATE methodology
   - UI-GATE fork
   - AIDD substrate
   - while preserving the "112 atomic features / zero compounding failures" proof claim as evidence that the methodology worked in practice

---

## 7. Test Plan

### Unit

- `state-machine.test.js`
- `pending-store.test.js`
- `validation-log.test.js`
- `ticket-resolver.test.js`
- `evidence-hasher.test.js`
- `evidence-integrity.test.js`
- `validate-refuses-without-evidence.test.js`

Required assertions:

- invalid transitions are rejected
- JSON and Markdown logs stay aligned
- resolver never returns ticket 2 while ticket 1 awaits validation
- integrity mismatch is flagged after evidence mutation

### Integration

- `execute-dispatches-one-ticket.test.js`
- `execute-blocks-while-awaiting-human.test.js`
- `validate-unblocks-next-ticket.test.js`
- `skip-with-reason-unblocks.test.js`
- `evidence-capture-on-completion.test.js`
- `evidence-capture-failure-keeps-gate-closed.test.js`
- `skip-with-missing-evidence-unblocks.test.js`

Required assertions:

- `/execute` dispatches one ticket per invocation
- rerunning `/execute` without validation is a no-op with a gate message
- `/validate` updates both logs and unlocks the next ticket
- `/validate --skip --reason "..."` works even when required evidence files are missing after a failed capture

### End-to-End

E2E-1:

- scaffold a 3-ticket UI project
- run `/discover`
- run `/task`
- run `/execute`
- confirm only FEAT-001 ran
- validate FEAT-001
- rerun `/execute`
- repeat through FEAT-003

E2E-2:

- run the same workflow on a multi-route demo project
- confirm `primaryRoute` evidence matches the active ticket

### Upstream Merge Rehearsal

This replaces the vague "re-syncs cleanly" claim.

Success condition:

- `git fetch upstream`
- `git merge upstream/main` is rehearsed on a clean branch
- any recurring conflicts are documented in `FORK.md`

That is the real maintainability test for an intentional fork.

---

## 8. Risks And Mitigations

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R-1 | Upstream AIDD changes execution internals and the wrapper no longer intercepts the correct boundary | High | High | Keep integration tests load-bearing; rehearse upstream merge quarterly |
| R-2 | The fork drifts into prompt-only enforcement again | Medium | High | Treat `ticket-resolver.js` as the primary enforcement seam; test that only one ticket is ever dispatched |
| R-3 | Evidence capture is flaky and blocks legitimate work | Medium | Medium | Keep required evidence minimal in v1; mark ticket `FAILED` with explicit operator guidance |
| R-4 | Validation becomes theater | Medium | Medium | Require evidence files and hash them; consider dwell-time friction in v2 |
| R-5 | Fork identity confusion | Medium | Medium | Package name `uig`, CLI `uig`, README says "UI-GATE powered by AIDD" |
| R-6 | Only the author understands the gate semantics | Medium | High | Ship contributor docs in Phase 1 for resolver contract, pending state, and log schema |

---

## 9. ADR

### Decision

Ship `gerardoiornelas/uig` as a long-term independent fork of `paralleldrive/aidd` with a runtime-enforced per-ticket human validation gate.

### Why

The product claim is "nothing ships blind." That claim is only defensible if the runtime can never dispatch ticket N+1 before a human decision on ticket N.

### Rejected Alternatives

- Prompt-only stop parsing: rejected as too brittle
- Configurable granularity in v1: rejected to keep the first release coherent
- Runtime dependency on this portfolio repo's skill file: rejected because the fork must own its policy assets
- Snapshot with no upstream review: rejected because the maintenance risk becomes invisible instead of managed

### Consequences

- Positive: the gate claim is technically honest
- Negative: the fork owns more runtime surface area than a thin plugin would
- Neutral: upstream merge work becomes a scheduled cost of the product

---

## 10. Pre-Ship Checklist

1. Fork boots with `npx uig init`
2. `/execute` dispatches exactly one ticket
3. `/execute` refuses to continue while `AWAITING_HUMAN`
4. `/validate` requires evidence for approval, but `--skip --reason` remains usable when capture failed
5. Evidence hashes are written into JSON log
6. E2E 3-ticket demo passes
7. `FORK.md` documents upstream merge rehearsal
8. Portfolio `/uig` page links to the fork

---

## 11. Changelog

- v0.4 (2026-06-05) - Added a resolver contract, promoted skip-with-reason into the ship threshold, allowed skip when evidence capture failed, added capture-time failure on `console.error` and `pageerror`, moved contributor docs into Phase 1, and preserved the "112 atomic features / zero compounding failures" proof claim in the `/uig` page update.
- v0.3 (2026-06-05) - Rewrote the plan to remove scope contradictions, make `.uig/config.json` the only config source, narrow v1 to per-ticket only, vendor the policy asset into the fork, and replace prompt-string enforcement with a runtime-owned one-ticket dispatch boundary.
- v0.2 (2026-06-05) - User decision: skip v1 (CLI prompt or `/user-test` extension), ship v1.5 (Playwright evidence capture) as the v1 release. Visual validation is now structural, not optional.
- v0.1 (2026-06-05) - Initial draft from planning session.
