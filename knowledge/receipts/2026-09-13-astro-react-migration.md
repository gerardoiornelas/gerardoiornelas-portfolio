---
title: Gatsby to Astro and React with visual parity
type: task-receipt
status: partial
intent: Replace Gatsby with Astro and React while preserving the visitor experience.
sources:
  - astro.config.mjs
  - package.json
  - package-lock.json
  - README.md
  - .nvmrc
  - tsconfig.json
  - src/layouts/Document.astro
  - src/lib/site.tsx
  - src/lib/page-styles.tsx
  - src/lib/image.tsx
  - src/lib/markdown.mjs
  - src/lib/content.ts
  - src/lib/types.ts
  - src/pages/index.astro
  - src/pages/blog/index.astro
  - src/pages/blog/[slug].astro
  - src/pages/uig.astro
  - src/views/uig.tsx
  - src/components/Blog/Blog.tsx
  - src/components/Blog/BlogCard.tsx
  - src/components/BlogPostTemplate/BlogPostTemplate.tsx
  - src/components/Contact/Contact.tsx
  - src/components/UIGates/UIGates.tsx
  - src/templates/blog-post.tsx
  - scripts/site-content.test.mjs
  - scripts/site-browser.mjs
  - scripts/clean-site.mjs
  - scripts/validate-okf.js
  - scripts/validate-okf.test.js
  - knowledge/context.md
  - knowledge/okf.yaml
  - knowledge/reference.md
  - knowledge/lessons/uig-consistency.md
  - knowledge/evidence/2026-09-13-astro-react-migration.json
authorization:
  state: delegated
  source: Principal requested replacing Gatsby with Astro React while keeping the visitor experience indistinguishable.
  scope: Scoped local framework migration, compatibility fixes, verification, and knowledge updates; existing working-tree changes preserved.
  valid_until: Completion of this migration task or principal revocation; no deployment or push authorized.
acceptance:
  status: partial
  human_review: pending
  reviewer: Codex automated checks; principal visual review outstanding.
  evidence:
    - Gatsby production baseline build passed before changes; Astro build passes and generates the same 24 pages.
    - All 13 articles have identical rendered HTML and 160-character excerpts compared with the Gatsby baseline.
    - All 48 desktop/mobile route comparisons match text, heading geometry, and normalized SEO metadata.
    - Browser suite passes all routes, image decoding, hydration, navigation/history, anchors, both downloads, and native POST interception at both viewport widths.
    - Astro development smoke checks return HTTP 200 for the homepage and an article with correct titles and no browser errors.
    - npm test passes 2 content checks; npm run typecheck passes; npm run okf:test passes all 14 checks.
    - Detailed comparison results and limits are recorded in knowledge/evidence/2026-09-13-astro-react-migration.json.
aar:
  expected: A framework replacement with the same pages, content, layout, interactions, and public URLs.
  actual: Astro renders the retained React and MUI pages with verified automated parity; human visual acceptance remains pending.
  difference: Initial parity tests caught archive excerpt length, slashless navigation rejection, Emotion hydration on route changes, and Astro form interception; all were corrected before final verification.
  learning: Preserve per-surface excerpt lengths, extract Emotion critical CSS into the head for client navigation, and opt native contact forms out of Astro interception.
---

The implementation keeps the React 18/MUI 5 components, theme, fonts, copy, and downloadable skills. `src/pages/` now contains Astro routes; the React page bodies and metadata moved to `src/views/`. The existing locally modified UI-GATES page was preserved. The validator still covers its original path and also covers its new route and React view; its authority and acceptance requirements are unchanged.

Astro loads Markdown at build time and generates responsive WebP images. The established Remark dialect is retained because comparison proved that it produces byte-identical article HTML. Home cards use 200-character excerpts, the archive uses 180, and article descriptions use 160, with the same word-boundary pruning. The original manifest icons, robots policy, analytics ID, and static assets are retained. Generated asset URLs change; original image content does not.

The configuration resolves MUI icons through their ESM entrypoints and prebundles the remaining CommonJS dependencies for development. The ESM scroll component is excluded from that prebundle to keep a single React runtime.

The build still writes `public/`. Hosting needs Node 22.12+ and the `npm run build` command. At initial verification, no deployment, commit, push, or real form submission had been performed. Netlify form delivery and final human acceptance remain outside the completed automated checks.

## Verification

[Machine-readable evidence](../evidence/2026-09-13-astro-react-migration.json) records the 48 route comparisons, article hashes, screenshot differences, and browser results. The Gatsby baseline and full screenshots are local artifacts under `/private/tmp/portfolio-gatsby-baseline-public` and `/private/tmp/portfolio-parity`; they are not committed. Reproducible checks are documented in [README](../../README.md).

Pixel comparisons are exact for the hero, practices, and UI-GATES sections at both widths, the complete UI-GATES and blog archive pages, and the mobile blog/contact sections. Remaining differences include external YouTube thumbnails and minor image encoding/lazy-loading variation; this is not a claim that every pixel or every browser has been certified identical. Browser tests exercise controls rather than relying solely on screenshots.

Graph refresh uses local AST extraction plus source-backed host additions for Astro routes and this migration's knowledge. The installed Graphify parser has incomplete Astro syntax support; its optional automatic semantic backend failed because its provider package is absent. The graph remains a retrieval aid, with those limitations recorded, rather than evidence of site correctness.

## After Action Review

**Expected:** swap Gatsby for Astro/React without a visitor-visible redesign or broken links and controls.

**Actual:** the Astro build, type checks, content checks, browser interactions, and desktop/mobile parity comparisons pass. Required principal visual review is still pending.

**Difference:** preserving component JSX alone was insufficient. Archive queries used a different excerpt length; strict trailing-slash enforcement broke existing links; inline Emotion styles conflicted on client navigation; and Astro changed the native form POST encoding. The migration now preserves all four behaviors. Remote video thumbnails vary between captures and are not controlled by this repository.

**Learning:** for this site's future framework changes, use source-derived content hashes and browser navigation/form checks alongside screenshots. Keep Emotion's extracted head styles, distinct excerpt lengths, and native form behavior unless a separately authorized product change calls for changing them.

## Publication authorization

The principal subsequently requested “commit and push” in this task. That instruction authorizes committing this reviewed migration and its referenced pending knowledge/tooling bundle to `main` and pushing to the existing `origin` repository. The earlier local-only authorizations remain historical records of their implementation scope. This publication instruction does not assert that the pending human visual acceptance has occurred.
