---
title: Gerardo I. Ornelas Portfolio Context
type: architecture
description: Operating context for the public portfolio, governed AI, trusted visibility, UI-GATES, and Compound Engineering pages.
resource: .
created: 2026-09-01
updated: 2026-09-13
tags: [app-context, portfolio, authority-layer, ui-gates, gatsby]
generated: false
verified: repository-reviewed
status: active
sources: []
---

# Gerardo I. Ornelas Portfolio Context

## Use This Context First

Read `AGENTS.md`, this page, `package.json`, and each touched route or component before making a change. For UI-GATES terminology and architecture, also read `docs/compound-engineering/ui-gates-canon.md` and `docs/compound-engineering/operating-system.md`.

## Boundary

This repository owns Gerardo I. Ornelas's public portfolio and published thought
leadership on governed AI and trusted visibility. The public site leads with
mortgage AI governance through Crittora, presents AI visibility as a separate
WUN/XEO Labs practice, and uses APP research as the connecting doctrine. The
site must preserve the distinction between reasoning and authority: reasoning
proposes; authority decides.

## Knowledge Rules

- `knowledge/` is the committed app-local OKF context bundle and must remain concise, current, and directly useful to future agents.
- **Commit & Push Requirement**: Always update and verify the OKF context (`knowledge/context.md`, `knowledge/okf.yaml`, and relevant receipts/notes) and refresh the knowledge graph before committing and pushing changes.
- `docs/compound-engineering/` contains the UI-GATES architecture and its Compound Engineering coding playbook.
- Graphify outputs are generated navigation aids. They must not override repository source, approved decisions, or executable code.
- Promote only warranted learning: ephemeral observation → task context → decision → reusable pattern → canon.
- Do not place secrets, credentials, private user data, or production receipts in committed knowledge.
- For public copy and social work, treat `docs/authority-engine.md` as the
  current positioning canon and `docs/social-editorial-system.md` as the
  editorial operating model.

## UI-GATES Public Surface

- `/uig/` (`src/pages/uig.tsx`) is the public UI-GATES entrypoint. It must preserve the canon: UI-GATES is the full operating system; UI-GATE is its execution-time authority decision; Compound Engineering is the software-engineering playbook.
- The canonical distributable source is `https://github.com/gerardoiornelas/uigates`. The downloadable `uig` artifact is a portable Markdown skill, not a runtime dashboard, ticket engine, or enforced control plane.
- Public diagrams must depict the skill-guided workflow—Intent → Discover → Plan → Propose → UI-GATE → Execute → Verify → Receipt → Synthesize—and must not imply that a user receives UI controls or automatic runtime enforcement. Public copy may name the After Action Review as the loop's closing protocol (it is a public, institution-owned method, not a control plane).
- The receipt for the public page is `knowledge/receipts/2026-09-01-ui-gates-page.md`.
- `docs/compound-engineering/ui-gates-canon.md` is the single source of truth for the nine-step loop (`Intent → Discover → Plan → Propose → UI-GATE → Execute → Verify → Receipt → Synthesize`) and its closing protocol — the After Action Review that animates Verify → Receipt → Synthesize (what was supposed to happen, what actually happened, why the difference, what will be done differently). `operating-system.md`, `src/pages/uig.tsx`, `src/components/UIGates/UIGates.tsx` (homepage section), and `plans/uigate/uigate-skill.md` must all restate the same loop; see `knowledge/receipts/2026-09-12-uigates-operationalization.md` for the reconciliation and a note on how to find every copy, and `knowledge/receipts/2026-09-13-aar-closing-protocol.md` for the closing protocol.

## Templates and Internal Tooling

- `knowledge/templates/template-intent.yaml` and `knowledge/templates/template-receipt.yaml` are schema templates for intents and receipts. Receipt filenames stay `YYYY-MM-DD-slug.md`; the template's `RCP-YYYY-NNNN` id is optional internal metadata, not a filename convention. A receipt closes the loop with the After Action Review: the intent answers what was supposed to happen, the verification answers what actually happened, and the receipt records the discrepancy analysis (why the difference) and the learning action (what will be done differently). Committed receipts carry these as an `## After Action Review` section.
- `scripts/validate-okf.js` (`npm run okf:validate`, `npm run okf:sync`) is internal repo-authoring tooling that checks the OKF bundle is present and that knowledge-touching staged changes carry a receipt or context update. It is **not** part of the portable `uig` skill distributed from `/uig/` — do not describe it in public copy as part of the distributable.

## Validation

Run `npm run build` for meaningful site changes. The Gatsby build may need telemetry disabled in restricted environments: `GATSBY_TELEMETRY_DISABLED=1 npm run build`.

## Graph Refresh

Refresh the repository graph after material code, documentation, or architecture changes:

```bash
graphify . --update
```
