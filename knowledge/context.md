---
title: Gerardo I. Ornelas Portfolio Context
type: architecture
updated: 2026-09-13
status: active
sources: [AGENTS.md, knowledge/reference.md]
---

# Working context

This Astro + React repository owns Gerardo I. Ornelas’s public portfolio. Crittora leads mortgage AI governance; WUN/XEO Labs is the separate AI visibility practice; APP research connects them. Reasoning proposes; authority decides.

Read the touched source and only the matching references below. Expand if the task crosses boundaries or evidence is missing. Repository source and approved decisions outrank generated Graphify retrieval. Never commit secrets, private user data, or production receipts.

| Task | Read next |
| --- | --- |
| UI-GATES public copy, loop, authority, or portable skill | `docs/compound-engineering/ui-gates-canon.md` and `knowledge/lessons/uig-consistency.md` |
| UI-GATES workflow, gates, receipts, or learning behavior | Canon above and `docs/compound-engineering/operating-system.md` |
| Public positioning or social content | `docs/authority-engine.md`; for social, `docs/social-editorial-system.md` |
| Site framework, builds, routes, or migration parity | `README.md` and `knowledge/receipts/2026-09-13-astro-react-migration.md` |
| Learning from receipt failures or evaluating lessons | `docs/compound-engineering/receipt-learning.md`; `npm run uig:learn -- --help`; `npm run uig:learn -- stats` prints token usage and learning lifecycle totals; `npm run uig:recover -- --help` grades a frozen payload's recoverability |
| Creating a receipt | `npm run okf:receipt -- --help`; `knowledge/receipt-authoring.md` only if needed |
| Validator or receipt generator changes | `scripts/validate-okf.js`, affected helper/tests; run `npm run okf:test` |
| Evaluating token efficiency | `docs/compound-engineering/pilots/2026-09-13-v2/report.md` |
| Other lessons or historical context | `knowledge/lessons/index.md` or `knowledge/reference.md`, only as needed |

Astro routes live in `src/pages/`; React page bodies and metadata live in `src/views/`. `static/` supplies public assets and `npm run build` writes `public/`. The existing React/MUI design, Markdown dialect, route slugs, forms, and downloadable skills are preserved.

The `/uig/#learning` section documents the local receipt-learning implementation, fixture evidence, and pending real-agent evaluation. The `/uig/` download is a portable Markdown skill, not an enforced runtime control plane. UI-GATES is the operating system; UI-GATE is the execution-time authority decision; Compound Engineering is its coding playbook.

Follow `AGENTS.md` for authorization, required validation, and OKF/graph refresh before commit or push. `okf:validate` checks staged content; with an empty index it checks only the working bundle. A structurally valid receipt does not prove authorization, evidence truth, or human acceptance. Record pending human review as partial. The first pilot did not meet the token-reduction target; the follow-up comparison found 12.61% fewer worker tokens with all automated checks passing. See `docs/compound-engineering/pilots/2026-09-13-v2/report.md` when evaluating efficiency; human/full operational acceptance remains pending.
