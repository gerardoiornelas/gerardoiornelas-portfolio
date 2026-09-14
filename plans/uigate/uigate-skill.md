---
name: ui-gates
description: Use this skill for authority-aware agentic work — any task that should be bounded by an explicit intent, pass through an execution-time authority decision, and leave verifiable evidence and reusable learning behind. Triggers include "UI-GATES", "UI-GATE", "gated agentic", "human-in-the-loop development", or requests for a methodical, human-validated agentic build. Within software delivery this specializes into Compound Engineering: decomposing requirements into agent-ready tickets with human UI validation checkpoints. Do NOT use for exploratory or read-only work — UI-GATES governs consequential action, not observation.
version: 0.2.0
updated: 2026-09-13
---

# UI-GATES

**UI-GATES** — User-Intent Gated Agentic Task Execution & Synthesis — is the authority-aware operating system for agentic work. See [`docs/compound-engineering/ui-gates-canon.md`](../../docs/compound-engineering/ui-gates-canon.md) and [`docs/compound-engineering/operating-system.md`](../../docs/compound-engineering/operating-system.md) for the full canon this skill implements.

**Core principle**: Reasoning proposes. Authority decides. Verified work synthesizes into reusable knowledge.

## The canonical loop

```text
Intent → Discover → Plan → Propose → UI-GATE → Execute → Verify → Receipt → Synthesize
```

1. **Intent** — the principal (the human) states the objective, constraints, success evidence, allowed domain, and expiry. Work without an active intent may be observed or explored but must not cause consequential effects.
2. **Discover** — read repository instructions and task-relevant committed knowledge before proposing anything.
3. **Plan** — define the smallest vertical slice of work and the evidence that will prove it worked.
4. **Propose** — name the exact action, resource scope, reason, impact, risk, and requested authority.
5. **UI-GATE** — the authority plane allows, denies, or escalates the proposal at execution time. This is the one question UI-GATE exists to answer: *is this actor authorized to perform this action, on this resource, under this intent, right now?*
6. **Execute** — perform only the authorized action. Execution never implies authorization.
7. **Verify** — gather evidence proportionate to risk: tests, live UI validation, review, security checks, or explicit human judgment.
8. **Receipt** — preserve evidence of the authorized execution and its verification, including the discrepancy analysis — why actual differed from intended.
9. **Synthesize** — promote only warranted learning into committed knowledge: `Ephemeral → Task → Decision → Knowledge → Canon`.

The last three steps close the loop with the **After Action Review** (AAR) — the public four-question review: (1) what was supposed to happen (Intent + Plan), (2) what actually happened (Verify), (3) why was there a difference (the Receipt's discrepancy analysis), and (4) what will be done differently (Synthesize: sustain what worked, improve what did not). A loop that does not answer all four has not closed. A procedural lesson — a fix that would change this skill or the rules that govern future work — is not executed directly: it becomes a normal proposal through UI-GATE and is **gated** by default, because it alters how future authority is evaluated.

## Authority states

| State | Meaning | Examples |
| --- | --- | --- |
| Observe | The agent may inspect and reason but cannot change state. | read, search, analyze, plan |
| Delegated | Pre-authorized within the intent's exact scope. | modify local source, run tests, update project knowledge |
| Gated | Requires an execution-time principal decision. | merge, deploy, external communication, infrastructure, production data |
| Prohibited | Cannot be authorized by this workflow. | expose secrets, disable audit, expand own authority, alter authority records |

Possession of a credential never implies authorization. Authority is bounded by actor, action, resource, intent, time, and policy.

---

## Compound Engineering: the coding specialization

Use small, independently verifiable tickets. Authorization precedes execution; acceptance follows verification. Select the acceptance profile in the plan:

- **Delegated:** routine scoped work proceeds through agreed automated checks; continue within the active intent after acceptance evidence passes.
- **UI acceptance:** name the human interaction and expected result; stop at that checkpoint until the principal accepts it.
- **Consequential:** prepare the concrete action, then obtain approval before merge, deploy, external communication, or production changes.

Backend tickets may demonstrate correctness through fixtures, API responses, or command output. Add regression evidence when changing shared behavior. A failed check stops dependent work. Do not expand scope to repair unrelated failures.

### Ticket template

```yaml
ticket: FEAT-001
intent: <active objective and reference>
depends_on: []
proposal:
  action: <operation>
  resources: [<exact paths or resources>]
  risk: <low, medium, high with reason>
authorization:
  state: <delegated or gated>
  source: <existing delegation or explicit principal approval>
  scope: <approved action and resource boundary>
  valid_until: <expiry or task completion boundary>
acceptance:
  profile: <delegated, UI acceptance, consequential>
  reviewer: <agent or named human>
  evidence: [<required check and expected result>]
```

Execute only after authorization is established. Report human checkpoints as `FEAT-XXX AWAITING ACCEPTANCE`; report failed evidence as `FEAT-XXX BLOCKED`. A successful ticket records acceptance evidence and a receipt before dependent work continues. Human acceptance does not grant unspecified future authority.

## Authorization and acceptance

Delegated work proceeds within existing approved scope without repeated permission questions. Gated actions require explicit principal approval before execution. Prohibited actions stop; propose a permissible alternative. Changes to governing rules, permissions, verification requirements, or completion criteria require explicit approval.

Record authorization before execution: intent, principal decision or delegation source, action/resource scope, and validity boundary. Recheck it when scope, actor, conditions, or expiry change, or authority is revoked. Acceptance records the reviewer and result evidence after execution; it never retroactively authorizes work. An approved request to implement a concrete proposal satisfies that proposal's gate.

## Compact discovery and learning

Read applicable instructions and required context first, then the project's lesson index. Load only lessons whose applicability matches the task, then affected source and dependencies. Expand retrieval when evidence is missing. Do not load all receipts or rebuild a graph merely to start a routine task; still perform required refreshes after material changes.

A receipt records this execution. A lesson records an evidence-backed reusable action with applicability, limits, and provenance. Deduplicate before adding a lesson; supersede outdated lessons. No discrepancy, cause unknown, and no new durable learning are valid outcomes. Never infer a cause just to complete an AAR.

Learning may improve retrieval, navigation, and verified implementation patterns. Changes to permissions, mandatory verification, or completion criteria remain gated. Measure total tokens through accepted completion, including retries and learning overhead; never remove required checks to meet a token target.
