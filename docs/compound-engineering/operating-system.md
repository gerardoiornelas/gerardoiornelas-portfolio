# UI-GATES Operating System

## Purpose

UI-GATES is Violetek's authority-aware operating model for a one-person, AI-native organization. It ensures that each meaningful change leaves the organization with stronger context, evidence, and reusable knowledge. Compound Engineering is its software-engineering playbook.

It is not permission to automate without limits. The defining rule is:

> Reasoning proposes. Authority decides.

Gerardo is the principal. Agents are a workforce operating under bounded, time-sensitive delegations.

## Architecture

```text
Principal (Gerardo)
        │ creates
        ▼
      Intent ───────────────► Knowledge
        │                         ▲
        ▼                         │ learns
  Orchestrator                    │
        │                          │
        ▼                          │
     Agent ── proposes ──► Action  │
                              │     │
                              ▼     │
                  UI-GATE / Authority Plane
                       │ allow · deny · escalate
                       ▼
                    Execute → Verify → Receipt
```

UI-GATE runs vertically through every layer. It answers one question at the moment of action:

> Is this actor authorized to perform this action, on this resource, under this intent, right now?

## Core primitives

| Primitive | Meaning |
| --- | --- |
| Principal | The human who owns objectives, risk decisions, and delegated authority. |
| Intent | A time-bounded statement of an objective, constraints, success evidence, and allowed domain. |
| Agent | A reasoning actor that can inspect, plan, propose, and execute only when authorized. |
| Capability | What an agent could technically do. Capability is not authority. |
| Authority | What an agent is currently allowed to do within a scope and intent. |
| Action | A proposed concrete operation with resource scope, impact, risk, and requested authority. |
| Policy | A reusable constraint that determines how authority is evaluated. |
| Receipt | Evidence of an authorized execution and its verification. |
| Knowledge | Reusable, verified learning from completed work. |
| Decision | A durable tradeoff that future work should understand. |
| Evidence | Verifiable observation supporting a claim, decision, or receipt. |

## Intent

Every consequential flow begins with a named intent. Work without an active intent may be observed or explored, but it must not cause consequential effects.

```yaml
intent:
  id: INT-YYYY-NNNN
  principal: gerardo
  objective: Improve a defined outcome for one project.
  project: project-slug
  desired_outcomes:
    - measurable outcome one
  constraints:
    - no production writes without explicit approval
    - no customer-data export
  success_evidence:
    - relevant regression checks pass
    - named human or agent review is complete
  expires: YYYY-MM-DD
```

## Authority states

| State | Meaning | Examples |
| --- | --- | --- |
| Observe | The agent may inspect and reason but cannot change state. | read, search, analyze, plan |
| Delegated | Pre-authorized within the intent's exact scope. | modify local source, run tests, update project knowledge |
| Gated | Requires an execution-time principal decision. | merge, deploy, external communication, infrastructure, production data |
| Prohibited | Cannot be authorized by this workflow. | expose secrets, disable audit, expand own authority, alter authority records |

Authority is bounded by actor, action, resource, intent, time, and policy. Possession of a credential never implies authorization.

## Operating cycle

This is the same nine-step loop defined in [`ui-gates-canon.md`](ui-gates-canon.md): `Intent → Discover → Plan → Propose → UI-GATE → Execute → Verify → Receipt → Synthesize`.

0. **Intent** — the principal states the objective, constraints, success evidence, and expiry.
1. **Discover** — understand the problem and existing project knowledge.
2. **Plan** — define the smallest vertical slices and acceptance evidence.
3. **Propose** — state the exact action, affected scope, risk, and requested authority.
4. **UI-GATE** — the authority plane allows, denies, or escalates the proposal at execution time.
5. **Execute** — perform only the authorized action. After each step, record Expected/Actual/Delta; on a delta, return to Plan and address the root cause before retrying.
6. **Verify** — gather proportionate evidence from tests, live UI, review, or other named checks.
7. **Receipt** — preserve evidence of the authorized execution and its verification, including the discrepancy analysis: why actual differed from intended.
8. **Synthesize** — promote durable learning into the appropriate knowledge level.

Execution never implies authorization.

The final three steps close the loop with the **After Action Review** protocol — the public, institution-owned four-question review:

1. **What was supposed to happen?** — Intent + Plan.
2. **What actually happened?** — Verify.
3. **Why was there a difference?** — the Receipt's discrepancy analysis.
4. **What will we do differently?** — Synthesize's promotion decision, or a procedural fix proposed back through the loop.

A loop that closes without answering all four questions has not closed. A procedural lesson — a fix to the skill or rules that govern future work — rides the same Propose → UI-GATE → Execute path as a **gated** change, because it alters how future authority is evaluated.

## Action proposal

```yaml
proposal:
  intent: INT-YYYY-NNNN
  agent: codex
  action: repository.write
  scope:
    - src/report/scoring.ts
  reason: Correct a weighting defect supported by the named fixture results.
  impact: Changes report score calculation.
  risk: medium
  requested_authority: repository.write
  verification:
    - affected unit and regression tests
    - review against three fixtures
```

## Execution receipt

Every meaningful execution produces a receipt. It lets a future person or agent explain why work happened, whether it was authorized, and what evidence supports its result.

```yaml
receipt:
  id: RCP-YYYY-NNNN
  intent: INT-YYYY-NNNN
  task: TASK-NNN
  agent: codex
  proposed_action: repository.write
  scope:
    - src/report/scoring.ts
  authority:
    state: delegated
    source: intent delegation
    policy: UIGATE-DEV-02
  executed_at: ISO-8601 timestamp
  result:
    commit: git-sha
  verification:
    regression: pass
    coherence: 96
  observations: # per-step Execute log; omit for a single-step loop
    - expected: <planned outcome of the step>
      actual: <raw result: test/log/diff/browser state>
      delta: <gap from expected, or "none">
  discrepancy_analysis: # AAR: why actual differed from intended
    expected: <from the intent's success_evidence>
    actual: <summarized from the verification results>
    root_cause: <supported cause, no discrepancy, or cause unknown>
  learning_action: # AAR: what this loop will do differently
    sustain: <promoted to which knowledge level>
    improve: <corrective; a procedural fix to the skill/rules is gated>
  provenance:
    session: session-id
```

## Knowledge promotion

Avoid turning project memory into an agent-generated junk drawer. Promote material only when it earns a higher level:

```text
Ephemeral → Task → Decision → Knowledge → Canon
```

- **Ephemeral**: a local observation, useful only while working.
- **Task**: information needed to complete or resume a specific item.
- **Decision**: a tradeoff that future implementation should understand.
- **Knowledge**: a pattern reusable across multiple tasks.
- **Canon**: stable principle governing multiple projects or authority domains.

Every promotion must include context, a decision or claim, supporting evidence, and explicit reuse guidance.

## First proving-ground slice

Run the first complete cycle in a single project before migrating broad knowledge or operating multiple agents:

1. Create one intent.
2. Have one agent produce one scoped action proposal.
3. Evaluate it through UI-GATE.
4. Execute an allowed local change.
5. Verify it.
6. Save the execution receipt.
7. Promote one warranted lesson.

Only then expand into knowledge migration, multi-agent orchestration, automated verification, broader delegated authority, and cross-project operation.

## Authorization and acceptance

Delegated work proceeds within existing approved scope without repeated permission questions. Gated actions require explicit principal approval before execution. Prohibited actions stop; propose a permissible alternative. Changes to governing rules, permissions, verification requirements, or completion criteria require explicit approval.

Record authorization before execution: intent, principal decision or delegation source, action/resource scope, and validity boundary. Recheck it when scope, actor, conditions, or expiry change, or authority is revoked. Acceptance records the reviewer and result evidence after execution; it never retroactively authorizes work. An approved request to implement a concrete proposal satisfies that proposal's gate.
