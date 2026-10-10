---
title: De-prioritize UI-GATES from the landing page
type: task-receipt
status: partial
intent: Remove the UI-GATES homepage segment and retire the /uig/ route per principal decision, retargeting references to the open-source GitHub repository.
sources:
  - src/components/ScrollContainer/ScrollContainer.tsx
  - src/components/Home/Home.tsx
  - src/components/Projects/Projects.api.ts
  - src/views/index.tsx
  - src/views/authority-layer.tsx
  - src/views/compound-engineering.tsx
  - src/pages/uig.astro
  - src/views/uig.tsx
  - knowledge/context.md
authority: Principal decision recorded on Jira WUN-24 (2026-10-09): (1) remove the #uigates landing segment entirely, (2) retire /uig/ with redirect to https://github.com/gerardoiornelas/uigates.
evidence:
  - "npm run build: 30 pages built, complete (2026-10-09)"
  - "npm test: 2/2 passing, 0 failing (2026-10-09)"
  - "public/index.html contains no id=\"uigates\" segment and no href=\"/uig/\" references"
  - "public/uig/index.html serves meta-refresh + JS redirect to github.com/gerardoiornelas/uigates with fallback link"
  - "authority-layer, compound-engineering, Home CTA, and Projects card all retargeted to GitHub"
acceptance: Partial - automated verification (build, tests, built-HTML checks) passing; production deploy and human visual acceptance pending.
notes: Baseline evidence: Astro refactor already complete (commit 8ef4633); homepage had been made MORE UI-GATES-centric by ca2b9e5 (2026-09-06), which this change reverses per principal decision. The /uig/ source view (src/views/uig.tsx) is retained in-repo for provenance but no longer routed; the redirect stub (src/pages/uig.astro) replaces the routed page.
