---
name: uig
description: Run the UI-GATES authority-aware learning workflow for meaningful work that needs repository knowledge, explicit intent, verification evidence, and reusable learning. Use when the user invokes /uig or asks to run UI-GATES. Do NOT use for exploratory or read-only questions — UI-GATES governs consequential, authorized work.
version: 0.4.0
updated: 2026-09-14
---

# UIG — UI-GATES short entrypoint

`uig` is the short, portable command identity for **UI-GATES**: User-Intent Gated Agentic Task Execution & Synthesis.

> Reasoning proposes. Authority decides. Verified work synthesizes into reusable knowledge.

## The canonical loop

`Intent → Discover → Plan → Propose → UI-GATE → Execute → Verify → Receipt → Synthesize`

1. **Intent** — the principal states the objective, constraints, success evidence, allowed domain, and expiry. Work without an active intent may be observed but must not cause consequential effects.
2. **Discover** — read repository instructions and task-relevant committed knowledge before proposing anything.
3. **Plan** — define the smallest scoped slice and the evidence that will prove it worked.
4. **Propose** — name the exact action, affected resource, reason, impact, risk, requested authority, and verification plan.
5. **UI-GATE** — at execution time the gate allows, denies, or escalates the proposal. It answers whether this actor may perform this action on this resource under this intent now.
6. **Execute** — perform only the authorized action. Execution never implies authorization. After each execution step, record an observation — Expected, Actual, Delta — before moving on. On a delta, do not retry immediately: return to Plan to address the root cause, and re-propose only if the revision changes the requested authority or scope.
7. **Verify** — gather evidence proportionate to risk: tests, live UI validation, review, security checks, or explicit human judgment.
8. **Receipt** — preserve evidence of the authorized execution and its verification, including the discrepancy analysis of why actual differed from intended.
9. **Synthesize** — promote only warranted learning into committed knowledge: `Ephemeral → Task → Decision → Knowledge → Canon`. Close the loop with the After Action Review: what was supposed to happen, what actually happened, why the difference, and what will be done differently.

Read required context, then a compact lesson index when available; load only applicable lessons and affected source. Expand retrieval when evidence is missing.

## Authority states

| State | Meaning | Examples |
| --- | --- | --- |
| observe | inspect and reason; cannot change state | read, search, analyze, plan |
| delegated | pre-authorized within the intent's exact scope | modify local source, run tests, update project knowledge |
| gated | requires an execution-time principal decision | merge, deploy, external communication, production changes |
| prohibited | cannot be authorized by this workflow | expose secrets, disable audit, expand own authority, alter authority records |

Possession of a credential never implies authorization. Reuse valid authorization within its scope; recheck on changed scope, actor, conditions, expiry, or revocation. Gated actions require explicit principal approval before execution. Prohibited actions stop; propose a permissible alternative. Acceptance records evidence after execution and never retroactively authorizes work. Changes to governing rules, permissions, verification requirements, or completion criteria require explicit approval.

## Usage and help

- Invoke this skill as `/uig` or by asking to run UI-GATES.
- Repository tooling help: `npm run uig:learn -- --help`, `npm run uig:recover -- --help`, `npm run okf:receipt -- --help`. `npm run uig:learn -- stats` prints real all-time usage from the global tracking file plus instrumented evaluation totals.
- Extended doctrine: the canon (`docs/compound-engineering/ui-gates-canon.md`) and operating system (`docs/compound-engineering/operating-system.md`) when present in a checkout.

## Automatic tracking (out-of-the-box)

This skill records its own usage with no setup, so real all-time numbers exist
alongside the instrumented evaluation harness. On every run:

1. On invocation, before beginning work, append one line to the global usage log
   at `~/.uig/tracking.jsonl` (create the file and parent directory if missing):

   `{"event":"run-start","at":"<ISO8601>","source":"skill","skill":"uig","repo":"<cwd basename>"}`

2. When the loop closes, immediately before the `UI-GATES COMPLETE` closing
   line, append a completion line:

   `{"event":"run-complete","at":"<ISO8601>","source":"skill","skill":"uig","repo":"<cwd basename>","receipts":["<receipt paths>"],"gated":["<gated action ids>"],"promoted":["<lesson ids>"]}`

Rules: record only what actually happened — never invent events, receipt paths,
approvals, or lessons. Never log secrets, credentials, or private data; this is
a usage ledger, not a knowledge store. Writing is best-effort: if the log cannot
be written, continue the work and still close with the completion line. Tracking
never grants authority, replaces a receipt, or gates work.

## Stop conditions

Stop and ask the principal when an action is gated or prohibited, material constraints are unknown, authoritative knowledge conflicts, or required verification fails or cannot run.

## Completion

Report the result, verification evidence, authority state, receipt location, and learning promoted. End with:

`UI-GATES COMPLETE — outcome verified, provenance recorded, next work grounded.`
