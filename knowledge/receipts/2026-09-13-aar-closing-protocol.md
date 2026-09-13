---
title: AAR closing protocol made native to the UI-GATES loop
type: task-receipt
date: 2026-09-13
status: verified
sources:
  - docs/compound-engineering/ui-gates-canon.md
  - docs/compound-engineering/operating-system.md
  - knowledge/templates/template-receipt.yaml
  - plans/uigate/uigate-skill.md
  - src/pages/uig.tsx
  - src/components/UIGates/UIGates.tsx
  - knowledge/context.md
  - scripts/validate-okf.js
---

# AAR closing protocol made native

## Context

Validated a public guide on self-improving agents (theactionableai.com, `aar-loop`, built on the Army After Action Review and Reflexion research) against UI-GATES. The guide's mechanism — run a four-question review after a session, get a numbered fix plan, approve before writing, and load the lesson next time — is a meta-sibling of UI-GATES's `Synthesize` step: it improves *how the agent works* rather than *what the project knows*.

Gerardo chose to import the **protocol, not the tool**: the Army After Action Review is a public, institution-owned method (no license, no dependency, no vendor), so UI-GATES can adopt it natively. The AAR is not a tenth step — Verify → Receipt → Synthesize already *are* the four answers; making it native means naming it in the canon, completing the receipt schema with the two missing answers, and enforcing it with the existing linter.

## Change

- `docs/compound-engineering/ui-gates-canon.md` — added the **Closing protocol** section: the four AAR questions mapped onto the loop's existing steps, the "not a tenth step" rule, and the rule that a procedural fix to the skill/rules rides Propose → UI-GATE → Execute as a **gated** change.
- `docs/compound-engineering/operating-system.md` — Operating cycle steps 6–8 now carry the AAR mapping; added the closing-protocol note after the cycle; the Execution receipt example gained `discrepancy_analysis` and `learning_action`.
- `knowledge/templates/template-receipt.yaml` — receipt schema now includes `discrepancy_analysis` (AAR Q3: expected / actual / root cause) and `learning_action` (AAR Q4: sustain / improve), with the note that committed Markdown receipts carry an `## After Action Review` section.
- `plans/uigate/uigate-skill.md` — loop steps 7–9 restate the AAR mapping; added the closing-protocol paragraph and an Agent-rules note: a lesson that would change the skill/rules is a *proposal, not an edit*.
- `src/pages/uig.tsx` — downloadable skill content, loop descriptions (07–09), and a closing-protocol caption under the operating loop; the distributed artifact now carries the protocol.
- `src/components/UIGates/UIGates.tsx` (homepage section) — step descriptions for Verify / Receipt / Synthesize reflect the AAR; caption added under the operating-loop grid.
- `scripts/validate-okf.js` — new check `checkReceiptsCloseTheLoop`: a receipt staged today must include the `## After Action Review` section with the discrepancy analysis and learning action. Receipts are now the AAR's native enforcement point.
- `knowledge/context.md` — updated date, the public-diagram line corrected to the nine-step loop (had the pre-reconciliation seven-step wording), and the sources/templates lines document the closing protocol.

## Evidence

- `npm run okf:validate` passes: context present, okf.yaml valid, staged knowledge-touching change covered by a same-day receipt, and the staged receipt closes the loop (this receipt carries the `## After Action Review` section).
- `GATSBY_TELEMETRY_DISABLED=1 npm run build` succeeds, generating `/`, `/uig/`, and all static pages.

## After Action Review

1. **What was supposed to happen?** — Adopt the four-question After Action Review as the native closing protocol of UI-GATES: canon statement, completed receipt schema, linter enforcement, and consistent restatement across all copies of the loop, without adding a tenth step or any external tool.
2. **What actually happened?** — All eight sources were updated consistently; the linter gained the closure check; the new receipt was written *inside* the protocol it introduces and passes the linter; the production build succeeds.
3. **Why was there a difference?** — Difference from ideal: the first pass found the recipe risk of *importing* the aar-loop vendor skill and of adding a step, which the "not a tenth step" and "gated procedural fix" rules address. Root cause of the gap that existed before this change: UI-GATES's meta-layer (how the system improves its own procedure) was implicit and unenforced — Synthesize promoted domain knowledge but nothing required a session to reflect on its own execution.
4. **What will we do differently?** — Sustain: the AAR is now first-class in the canon, the receipt schema, the linter, and the public copy, and remains a protocol (not a product). Improve: enforce the closure check by having every future consequential receipt carry an `## After Action Review` section; remember the rule that a procedural fix to the skill/rules is a **gated** proposal, never a direct agent edit, because it alters how future authority is evaluated.

## Reuse

Any future edit to the UI-GATES loop must keep all four copies consistent (`ui-gates-canon.md` as source of truth, plus `operating-system.md`, `src/pages/uig.tsx`, `src/components/UIGates/UIGates.tsx`, and check `plans/uigate/uigate-skill.md`) — and must close its own receipt with the After Action Review (`npm run okf:validate` enforces it). The AAR maps the loop's tail: Intent answers what was supposed to happen, Verify what actually happened, the receipt the difference, and Synthesize the change. A fix to the skill/rules rides the normal proposal path as a gated change.
