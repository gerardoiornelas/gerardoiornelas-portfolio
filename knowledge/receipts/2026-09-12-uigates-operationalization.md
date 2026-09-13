---
title: UI-GATES canonical-loop reconciliation and tooling scaffold
type: task-receipt
date: 2026-09-12
status: verified
sources:
  - plans/uigate/uigate-skill.md
  - docs/compound-engineering/operating-system.md
  - docs/compound-engineering/ui-gates-canon.md
  - src/pages/uig.tsx
  - src/components/UIGates/UIGates.tsx
  - knowledge/templates/template-intent.yaml
  - knowledge/templates/template-receipt.yaml
  - scripts/validate-okf.js
  - package.json
---

# UI-GATES canonical-loop reconciliation and tooling scaffold

## Context

Validating the "UI-GATES System Hardening & Operationalization Plan" against the repository surfaced three divergent published loops: the public `/uig/` page (7 steps), `ui-gates-canon.md` (9 steps), and `operating-system.md`'s Operating cycle (8 steps, different verbs). The plan itself conflated two of these. Gerardo chose the 9-step `ui-gates-canon.md` sequence as the single target for the whole system.

## Change

- Reconciled `src/pages/uig.tsx` (downloadable skill content, narrative loop section, and workflow diagram) to `Intent → Discover → Plan → Propose → UI-GATE → Execute → Verify → Receipt → Synthesize`.
- Reconciled `src/components/UIGates/UIGates.tsx` (the homepage's "UI-GATES OPERATING LOOP" section, rendered via `ScrollContainer` on `/`) to the same 9-step sequence — it had the old 7-step version and was missed in the first pass. Re-tiled the grid from a 7-wide row to a 3×3 grid for readability at 9 items.
- Reconciled `docs/compound-engineering/operating-system.md`'s Operating cycle to the same 9-step sequence and terminology (`UI-GATE` not `Authorize`, `Receipt` not `Commit`), with an explicit cross-reference to `ui-gates-canon.md`.
- Rewrote `plans/uigate/uigate-skill.md` in place from the narrow "UI-Gated Agentic Task Engineering" ticket methodology to the full UI-GATES canon, preserving the FEAT-XXX ticket/checklist templates as the Compound Engineering coding-phase pattern (mapped explicitly onto Plan → Propose → Execute → Verify → Receipt).
- Added `knowledge/templates/template-intent.yaml` and `knowledge/templates/template-receipt.yaml`.
- Added `scripts/validate-okf.js` and `npm run okf:validate` / `npm run okf:sync`, explicitly commented and documented as internal repo-authoring tooling — not part of the portable `uig` skill distributed from `src/pages/uig.tsx` — to avoid contradicting the public claim that the distributable is not an enforced control plane.
- `template-receipt.yaml`'s `RCP-YYYY-NNNN` id is documented as optional internal metadata only; existing and future receipt filenames keep the `YYYY-MM-DD-slug.md` convention already in use.

## Evidence

- `npm run okf:validate` passes cleanly against current repo state.
- Manually staged `plans/uigate/uigate-skill.md` and `docs/compound-engineering/operating-system.md` to confirm the script's staged-change check fires as designed, then unstaged.
- `GATSBY_TELEMETRY_DISABLED=1 npm run build` succeeds twice (before and after the `UIGates.tsx` fix), generating `/`, `/uig/`, and all other static pages.
- Served the build locally and visually confirmed both the `/uig/` page and the homepage's UI-GATES section render the correct 9-step loop with no console errors.

## Reuse

Any future edit to the UI-GATES loop must update all four sources together: `docs/compound-engineering/ui-gates-canon.md` (source of truth), `docs/compound-engineering/operating-system.md`, `src/pages/uig.tsx`, and `src/components/UIGates/UIGates.tsx` (homepage). `plans/uigate/uigate-skill.md` should be checked too since it now restates the same loop. A `grep -rn "isGate\|steps = \[" src` or a search for the loop step labels is the fastest way to find every copy before the next edit.
