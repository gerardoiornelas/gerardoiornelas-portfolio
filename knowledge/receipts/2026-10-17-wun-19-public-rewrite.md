---
title: WUN-19 evidence-led public rewrite and Research & Field Notes integration
type: task-receipt
date: 2026-10-17
status: verified
intent: Integrate WUN-19 public capability claim corrections and status-labeled Research & Field Notes routes onto main while preserving WUN-24 /uig/ GitHub redirect and newer main articles/cards.
sources:
  - knowledge/context.md
  - scripts/site-browser.mjs
  - scripts/site-content.test.mjs
  - src/components/About/About.tsx
  - src/components/Blog/Blog.tsx
  - src/components/BlogPostTemplate/BlogPostTemplate.tsx
  - src/components/Navigation/Navigation.api.ts
  - src/components/Projects/Projects.api.ts
  - src/components/UIGates/UIGates.tsx
  - src/content/verifiably-human-part-1.md
  - src/content/verifiably-human-part-2.md
  - src/content/verifiably-human-part-3.md
  - src/lib/markdown.mjs
  - src/lib/types.ts
  - src/pages/blog/[slug].astro
  - src/pages/corrections.astro
  - src/pages/research.astro
  - src/pages/research/trust-stack.astro
  - src/pages/research/verifiably-human.astro
  - src/templates/blog-post.tsx
  - src/views/author/gerardo-i-ornelas.tsx
  - src/views/authority-layer.tsx
  - src/views/blog/index.tsx
  - src/views/compound-engineering.tsx
  - src/views/corrections.tsx
  - src/views/index.tsx
  - src/views/manifesto.tsx
  - src/views/research.tsx
  - src/views/trust-stack-research.tsx
  - src/views/uig.tsx
  - src/views/verifiably-human-research.tsx
  - static/llms-full.txt
  - static/llms.txt
authorization:
  state: gated
  source: Principal approval from Gerardo in chat (ask_question response on 2026-10-17 authorizing integration onto main, push to origin/main, and closing Jira WUN-19).
  scope: Integrate WUN-19 changes onto main, preserve WUN-24 /uig/ GitHub redirect and newer main changes, verify build/tests/OKF/graph, push to origin/main, and transition Jira WUN-19 to Done.
  valid_until: Completion of WUN-19 merge, push, and Jira closure.
acceptance:
  status: verified
  human_review: accepted
  reviewer: Principal (Gerardo I. Ornelas) approved reconciliation and release plan; automated verification passed.
  evidence:
    - TypeScript typecheck passed (`npm run typecheck`).
    - Site content and markdown tests passed, 3 of 3 (`npm test`), including Verifiably Human research status, corrections, and disclosure state across all 19 published articles.
    - Astro production build passed (`npm run build`), generating 35 static pages including `/research/`, `/research/verifiably-human/`, `/research/trust-stack/`, and `/corrections/` while preserving `/uig/` redirect to `https://github.com/gerardoiornelas/uigates`.
    - Staged OKF bundle and receipt structure validated (`npm run okf:validate`).
aar:
  expected: Public pages separate commercial positioning, arguments, implementations, experiments, findings, corrections, and unknown states while reconciling WUN-19 with WUN-24 (`/uig/` GitHub redirect) and newer `main` articles.
  actual: Integrated WUN-19 article metadata, capability-claim bounding, Research & Field Notes hub (`/research/`), body-of-work pages (`/research/verifiably-human/`, `/research/trust-stack/`), and public correction log (`/corrections/`) onto `main`, with UI-GATES measured findings (`#measured`, `#research`) hosted inline on `/research/` and external UI-GATES links pointing to `https://github.com/gerardoiornelas/uigates`.
  difference: Between the initial WUN-19 branch (`a1f4598`) and integration onto `main` (`3188bcf`), WUN-24 converted `/uig/` into a GitHub redirect and two new articles (`ai-rehearsal-after-interface`, `digital-ownership-without-exit`) plus XEO/WUN cards were added on `main`. Reconciliation preserved `main`'s `/uig/` redirect and hosted the UI-GATES measured findings directly on `/research/`.
  learning: When reconciling a long-lived feature branch with subsequent canon/route architecture changes on `main`, preserve the newer route redirection contract (`/uig/` -> GitHub) and relocate required inline evidence sections (`#measured`, `#research`) to the active research hub (`/research/`).
---

# WUN-19 evidence-led public rewrite and Research & Field Notes integration

Source: https://violetek-37043527.atlassian.net/browse/WUN-19.

This change integrates the WUN-19 capability-claim corrections and the Research & Field Notes information architecture onto `main`:

- **Bounded capability claims:** Public copy across the homepage, About, Projects, Authority Layer, Compound Engineering, Manifesto, Author profile, and `llms.txt` / `llms-full.txt` separates commercial positioning, architectural proposals, repository implementations, and measured evaluation outcomes.
- **Research & Field Notes hub (`/research/`):** Organizes public work across three territories (Runtime Authority, Content & Identity Provenance, AI Visibility & Operating Model) and four status-labeled bodies of work (`Verifiably Human`, `The Trust Stack`, `Runtime Authority essays`, and `UI-GATES & Compound Engineering`), including inline `#measured` and `#research` evidence sections for UI-GATES while preserving `/uig/` as a redirect to `https://github.com/gerardoiornelas/uigates` per WUN-24.
- **Body-of-work and correction routes:** Adds `/research/verifiably-human/`, `/research/trust-stack/`, and `/corrections/`.
- **Article metadata & schema discipline:** Extends markdown frontmatter and `BlogPostTemplate` with `territory`, `series`, `part`, `status`, `updated`, `corrections`, `aiAssistance`, `sources`, and visible-only `FAQPage` JSON-LD schema.

## After Action Review

Expected: Reconcile and land WUN-19 on `main` without regressing WUN-24's `/uig/` redirect, newer `main` articles, or theme/card updates.
Actual: Reconciled all 39 touched and added files on `main`, verified `npm run typecheck`, `npm test`, and `npm run build` (35 pages), updated the OKF bundle, and prepared `main` for push and Jira closure.
Delta: `/uig/` was converted to a GitHub redirect on `main` after the WUN-19 branch was cut; inline UI-GATES measured findings (`#measured`, `#research`) were placed on `/research/` and UI-GATES links were pointed to GitHub (`https://github.com/gerardoiornelas/uigates`) without referencing unpushed local commit SHAs.
Learning: Verify external commit references against remote branches before publishing links, and keep public research hubs self-contained when companion routes redirect to external repositories.
