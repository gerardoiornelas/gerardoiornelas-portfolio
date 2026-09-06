---
title: UI-GATES marketing-page correction
type: task-receipt
date: 2026-09-01
status: verified-with-environment-limit
sources:
  - src/pages/uig.tsx
  - src/components/Navigation/Navigation.api.ts
  - docs/compound-engineering/ui-gates-canon.md
  - docs/compound-engineering/operating-system.md
---

# UI-GATES marketing-page correction

## Context

The public `/uig/` page described the earlier, narrower UI-validation ticket methodology. It needed to match the approved canon: UI-GATES is the complete authority-aware learning system, while UI-GATE is its execution-time authority plane.

## Change

- Reframed the page around intent, proposal, UI-GATE authorization, evidence, receipts, and knowledge promotion.
- Preserved live UI validation as one form of verification rather than the definition of UI-GATE.
- Added the canonical UI-GATES / UI-GATE / Compound Engineering distinction, portable `uig` skill download, and public UIGATES repository link.
- Updated navigation to label the page UI-GATES.
- Expanded the UI-GATES name, clarified that its current public form is an operating system and portable skill, and aligned the public learning ladder with the canon.
- Made the public UIGATES repository the primary hero call to action; the downloadable skill remains a secondary convenience action.
- Replaced the obsolete terminal-and-ticket mockup with a truthful HTML workflow diagram and an explicit note that the download does not install a runtime control panel.

## Evidence

- `GATSBY_TELEMETRY_DISABLED=1 npm run build` generated `/uig/` and all 22 static pages successfully.
- Gatsby's final feedback-config write could not access the sandboxed global path `/Users/ornelastechnologies/.config/gatsby/`; this occurred after static-page generation and is unrelated to the page implementation.

## Reuse

Public copy about UI-GATES must preserve the canonical distinction in `docs/compound-engineering/ui-gates-canon.md`: reasoning proposes, authority decides, and verified work synthesizes into reusable knowledge.
