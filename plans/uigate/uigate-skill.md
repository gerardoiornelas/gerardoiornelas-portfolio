---
name: ui-gates
description: Use this skill for authority-aware agentic work — any task that should be bounded by an explicit intent, pass through an execution-time authority decision, and leave verifiable evidence and reusable learning behind. Triggers include "UI-GATES", "UI-GATE", "gated agentic", "human-in-the-loop development", or requests for a methodical, human-validated agentic build. Within software delivery this specializes into Compound Engineering: decomposing requirements into agent-ready tickets with human UI validation checkpoints. Do NOT use for exploratory or read-only work — UI-GATES governs consequential action, not observation.
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
8. **Receipt** — preserve evidence of the authorized execution and its verification so a future agent can trace the decision.
9. **Synthesize** — promote only warranted learning into committed knowledge: `Ephemeral → Task → Decision → Knowledge → Canon`.

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

Compound Engineering applies the UI-GATES loop to repository work — planning, coding, testing, reviewing, and synthesizing lessons. Within the **Plan → Propose → Execute** portion of the loop, use the feature-ticket pattern below so that every consequential UI-facing change is human-validated before the next one is proposed.

**Rule**: The agent builds one thing. The human sees it working (Verify). The human approves (UI-GATE closes). The agent proposes the next thing.

### Requirement decomposition

Break the Plan step's scoped slice into atomic, independently testable features. Each feature must:

- Do exactly one thing
- Be visually verifiable by a human (something appears, changes, or responds in the UI)
- Have zero hidden dependencies on unbuilt features
- Be labeled: FEAT-001, FEAT-002, etc.

### Dependency map

```text
FEAT-003 → requires [FEAT-001, FEAT-002]
FEAT-001 → INDEPENDENT
```

### Implementation phases

- Phase 1 must contain only INDEPENDENT features
- No phase may begin until every feature in the previous phase has passed its human validation (its UI-GATE)
- Each phase must produce a visually testable UI state — never queue backend-only phases unless a UI stub is built in the same phase
- Prefer thin vertical slices (UI + logic + data together) over horizontal layers (all backend first)

### Feature tickets

Each ticket is one Propose → Execute → Verify cycle:

```
---
FEAT-XXX: [Feature Name]
Phase: [N]
Depends on: [FEAT-YYY, FEAT-ZZZ or NONE]

PROPOSAL (Propose):
- Resource scope: [exact files / components / routes]
- Reason: [why this change, tied to the active intent]
- Risk: [low / medium / high]
- Requested authority: [delegated / gated]

AGENT INSTRUCTIONS (Execute):
- [Precise, unambiguous build steps written for an AI coding agent]
- Use imperative language: "Create", "Add", "Wire", "Return"
- Reference exact file paths, component names, or API routes when known
- End with: "Do not proceed past this ticket until human validation is complete."

HUMAN VALIDATION CHECKLIST (Verify / UI-GATE):
□ [Specific visual action the human performs]
□ [Exact expected result]
□ [Edge case to test]
□ [Confirm: "Mark FEAT-XXX VALIDATED before agent continues"]

DEFINITION OF DONE (Receipt):
- All checklist items pass
- No console errors during validation
- Human has explicitly marked this feature VALIDATED
---
```

### Agent rules

Paste at the top of every new agent session:

```
You are implementing [Project Name]. The active ticket is FEAT-XXX.
Do not build ahead of the active ticket.
Do not refactor completed tickets unless instructed.
After completing this ticket, stop and output: "FEAT-XXX COMPLETE — AWAITING HUMAN VALIDATION"
Do not continue until the human responds: "FEAT-XXX VALIDATED — PROCEED TO FEAT-YYY"
```

### Validation log template

```
| Ticket   | Feature | Status                              | Notes |
|----------|---------|-------------------------------------|-------|
| FEAT-001 | ...     | ⬜ Pending / ✅ Validated / ❌ Failed |       |
```

### Planning rules

1. **UI-first sequencing**: every phase ends with something a human can see and click.
2. **One ticket, one concern**: never bundle two features into one ticket.
3. **Fail fast surfaces**: if a feature can break visually, the validation checklist must test that break explicitly.
4. **No assumed state**: agent instructions must not assume any state that hasn't been built and validated in a prior ticket.
5. **Stop signals are mandatory**: every ticket ends with a hard stop. The agent must not auto-continue.
6. **Regression awareness**: when a new ticket touches a component used by a validated ticket, add a regression check to the new ticket's checklist.

### What this is not

- Not a testing framework — it is a delivery sequencing methodology inside UI-GATES
- Not slow — the gate takes minutes, the rework it prevents takes days
- Not Claude-specific — the methodology works with any AI coding agent

---

## Terminology

| Term | Definition |
| --- | --- |
| UI-GATES | The umbrella system: intent, authority, execution, verification, receipts, and durable learning. |
| UI-GATE | The execution-time authority decision inside UI-GATES: allow, deny, or escalate. |
| Compound Engineering | The UI-GATES software-engineering playbook applying the loop to repository work. |
| Intent | A time-bounded statement of objective, constraints, success evidence, and allowed domain. |
| Receipt | Evidence of an authorized execution and its verification. |
| Ticket | A single atomic feature with a proposal, agent instructions, and a validation checklist. |
| Phase | A group of tickets built sequentially before a phase-level review. |
| Validation | The human act of visually confirming a feature works as specified and marking it VALIDATED. |
| Stop signal | The mandatory output from the agent indicating it is awaiting human validation. |
