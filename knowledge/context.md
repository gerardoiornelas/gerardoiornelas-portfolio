---
title: Gerardo I. Ornelas Portfolio Context
type: architecture
description: Operating context for the public portfolio, governed AI, trusted visibility, UI-GATES, and Compound Engineering pages.
resource: .
created: 2026-09-01
updated: 2026-09-01
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
- `docs/compound-engineering/` contains the UI-GATES architecture and its Compound Engineering coding playbook.
- Graphify outputs are generated navigation aids. They must not override repository source, approved decisions, or executable code.
- Promote only warranted learning: ephemeral observation → task context → decision → reusable pattern → canon.
- Do not place secrets, credentials, private user data, or production receipts in committed knowledge.
- For public copy and social work, treat `docs/authority-engine.md` as the
  current positioning canon and `docs/social-editorial-system.md` as the
  editorial operating model.

## Validation

Run `npm run build` for meaningful site changes. The Gatsby build may need telemetry disabled in restricted environments: `GATSBY_TELEMETRY_DISABLED=1 npm run build`.

## Graph Refresh

Refresh the repository graph after material code, documentation, or architecture changes:

```bash
graphify . --update
```
