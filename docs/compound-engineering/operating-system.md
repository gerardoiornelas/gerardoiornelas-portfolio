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

1. **Discover** — understand the problem and existing project knowledge.
2. **Plan** — define the smallest vertical slices and acceptance evidence.
3. **Propose** — state the exact action, affected scope, risk, and requested authority.
4. **Authorize** — UI-GATE allows, denies, or escalates the proposal at execution time.
5. **Execute** — perform only the authorized action.
6. **Verify** — gather proportionate evidence from tests, live UI, review, or other named checks.
7. **Commit** — preserve the verified change and its provenance.
8. **Synthesize** — promote durable learning into the appropriate knowledge level.

Execution never implies authorization.

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
