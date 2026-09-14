---
name: compound-engineering
description: Use this skill to turn agent-assisted software work into a reusable engineering asset. Use it for meaningful features, fixes, migrations, and experiments that deserve planning, validation, review, and a durable lesson.
---

# Compound Engineering

## Principle

Every meaningful change should leave the project easier to change than it was before. Do not merely deliver code: leave behind a clear decision, validated behavior, and a reusable lesson.

## The loop

1. **Frame** — State the user outcome, constraints, risks, and how success will be observed. Search existing project knowledge before inventing a solution.
2. **Plan** — Write an implementation-ready plan with the smallest vertical slices, dependencies, acceptance checks, and rollback or failure behavior.
3. **Build** — Implement one validated slice at a time. Keep scope faithful to the plan; record any decision that changes it.
4. **Prove** — Verify behavior in the appropriate surface: automated checks, the live UI, security review, or an explicit human checkpoint. Do not mistake a passing build for proof of user value.
5. **Improve** — Simplify fresh code and review it against the plan. Remove duplication, clarify ownership, and address material findings before the next change.
6. **Compound** — Capture the reusable lesson in project knowledge. Write the context, decision, evidence, and future guidance so the next agent begins smarter.

## Operating rules

- Prefer a small, tested, observable slice over broad speculative implementation.
- Use UI-GATE for user-facing work: stop after each visual slice and wait for explicit validation before stacking more behavior on top.
- Separate evidence from assumptions. Label open questions and never silently convert them into facts.
- Preserve local conventions unless the plan explicitly changes them.
- If a discovery changes the plan, update the plan before continuing implementation.
- A cycle is complete only when the learning has a durable home.

## Required artifacts

Store durable project learning under `docs/compound/`:

- `plans/` — outcome, constraints, slices, acceptance checks, and decisions
- `solutions/` — confirmed patterns and recurring fixes
- `decisions/` — durable tradeoffs with alternatives and consequences
- `validation/` — evidence of checks, UI validation, and known limits

## Compound note template

```md
# [Short, searchable lesson]

## Context
What changed, and why did it matter?

## Decision
What did we choose? What alternatives were rejected?

## Evidence
What was tested, observed, or measured? What remains unproven?

## Reuse
When should a future engineer apply this? Link relevant code and artifacts.
```

## Completion signal

End each cycle with:

`COMPOUND COMPLETE — outcome proved, decisions recorded, next loop grounded.`
