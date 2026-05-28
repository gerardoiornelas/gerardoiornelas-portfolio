---
name: ui-gate
description: Use this skill when the user wants to build software using the UI-GATE methodology (UI-Gated Agentic Task Engineering). Triggers include: any mention of "UI-GATE", "gated agentic", "human-in-the-loop development", or requests to create an implementation plan where a human validates each feature before the agent proceeds. Also use when the user asks to decompose software requirements into agent-ready tickets with UI validation checkpoints, or wants a methodical agentic build plan where nothing ships blind. Do NOT use for general software architecture, code review, or agentic tasks that do not involve sequential human-validated feature delivery.
---

# UI-GATE: UI-Gated Agentic Task Engineering

UI-GATE is a structured agentic development methodology where every feature must pass a human UI validation checkpoint before the agent is allowed to proceed to the next ticket. Nothing ships blind. Nothing stacks on top of unvalidated work.

**Core principle**: The agent builds one thing. You see it working. You approve. The agent builds the next thing.

---

## Your output structure

Produce the following sections in order when given software requirements:

### 1. Requirement decomposition

Break every requirement into atomic, independently testable features. Each feature must:

- Do exactly one thing
- Be visually verifiable by a human (something appears, changes, or responds in the UI)
- Have zero hidden dependencies on unbuilt features
- Be labeled: FEAT-001, FEAT-002, etc.

### 2. Dependency map

List which features must exist before each feature can be built:

```
FEAT-003 → requires [FEAT-001, FEAT-002]
FEAT-001 → INDEPENDENT
```

### 3. Implementation phases

Group features into sequential phases. Rules:

- Phase 1 must contain only INDEPENDENT features
- No phase may begin until all features in the previous phase are HUMAN VALIDATED
- Each phase must produce a visually testable UI state — never queue backend-only phases unless a UI stub is built in the same phase
- Prefer thin vertical slices (UI + logic + data together) over horizontal layers (all backend first)

### 4. Feature tickets

For each feature, produce a ticket in this exact format:

```
---
FEAT-XXX: [Feature Name]
Phase: [N]
Depends on: [FEAT-YYY, FEAT-ZZZ or NONE]

AGENT INSTRUCTIONS:
- [Precise, unambiguous build steps written for an AI coding agent]
- Use imperative language: "Create", "Add", "Wire", "Return"
- Reference exact file paths, component names, or API routes when known
- End with: "Do not proceed past this ticket until human validation is complete."

HUMAN VALIDATION CHECKLIST:
□ [Specific visual action the human performs]
□ [Exact expected result]
□ [Edge case to test]
□ [Confirm: "Mark FEAT-XXX VALIDATED before agent continues"]

DEFINITION OF DONE:
- All checklist items pass
- No console errors during validation
- Human has explicitly marked this feature VALIDATED
---
```

### 5. Agent rules

Emit this block for the human to paste at the top of every new agent session:

```
You are implementing [Project Name]. The active ticket is FEAT-XXX.
Do not build ahead of the active ticket.
Do not refactor completed tickets unless instructed.
After completing this ticket, stop and output: "FEAT-XXX COMPLETE — AWAITING HUMAN VALIDATION"
Do not continue until the human responds: "FEAT-XXX VALIDATED — PROCEED TO FEAT-YYY"
```

### 6. Validation log template

```
| Ticket   | Feature | Status                              | Notes |
|----------|---------|-------------------------------------|-------|
| FEAT-001 | ...     | ⬜ Pending / ✅ Validated / ❌ Failed |       |
```

---

## Planning rules

1. **UI-first sequencing**: Every phase ends with something a human can see and click. Never queue backend-only phases unless a UI stub is built in the same phase.
2. **One ticket, one concern**: Never bundle two features into one ticket. If you feel the urge, split it.
3. **Fail fast surfaces**: If a feature can break visually, the validation checklist must test that break explicitly.
4. **No assumed state**: Agent instructions must not assume any state that hasn't been built and validated in a prior ticket.
5. **Stop signals are mandatory**: Every ticket ends with a hard stop. The agent must not auto-continue.
6. **Regression awareness**: When a new ticket touches a component used by a validated ticket, add a regression check to the new ticket's checklist.

---

## What UI-GATE is not

- It is not a testing framework — it is a delivery sequencing methodology
- It is not slow — the gate takes minutes, the rework it prevents takes days
- It is not only for Claude — the methodology works with any AI coding agent

---

## Terminology

| Term        | Definition                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------ |
| Gate        | The human UI validation checkpoint between tickets                                         |
| Ticket      | A single atomic feature with agent instructions and a validation checklist                 |
| Phase       | A group of tickets that can be built sequentially before a phase-level review              |
| Validation  | The human act of visually confirming a feature works as specified and marking it VALIDATED |
| Stop signal | The mandatory output from the agent indicating it is awaiting human validation             |
