---
title: Where Should AI End in Creative Work Blog Article
type: task-receipt
status: partial
intent: Publish blog article analyzing the 5-year digital painters study, longitudinal agency partitioning, and revisable creative boundaries.
sources:
  - knowledge/context.md
  - src/content/where-should-ai-end-creative-work.md
  - src/images/blog/where-should-ai-end-creative-work.jpg
  - src/templates/blog-post.tsx
authorization:
  state: delegated
  source: User requested adding the new article 'Where Should AI End in Creative Work? The Boundary Should Stay Revisable' and instructed commit and push.
  scope: Scoped publication of creative agency boundaries blog post, featured image, template metadata, receipt, and push to origin repository.
  valid_until: Task completion.
acceptance:
  status: partial
  human_review: pending
  reviewer: Automated Astro build, unit tests, and TypeScript checks passed; principal visual review pending.
  evidence:
    - Astro build successfully compiled all 26 pages including /blog/where-should-ai-end-creative-work/index.html with responsive WebP images.
    - Site content tests (node scripts/site-content.test.mjs) passed 2 of 2 tests with stable distinct routes and excerpts.
    - TypeScript checks (node node_modules/typescript/bin/tsc --noEmit) completed cleanly with 0 errors.
    - Structured data (Article, BreadcrumbList, FAQPage) validated in rendered HTML head.
aar:
  expected: Publish new blog article with content, featured workflow image, SEO metadata, and FAQ schema.
  actual: Content, image, metadata, and JSON-LD schema added and verified via Astro build, tests, and typecheck.
  difference: None.
  learning: None.
---

# Where Should AI End in Creative Work Blog Article

## Context

Published new blog article exploring where AI should end in creative work, introducing "longitudinal agency partitioning", human-only zones, explicit authorship declarations, and revisable delegation boundaries based on a five-year study of 17 digital painters (Meng et al., 2026).

## Change

- Added `src/content/where-should-ai-end-creative-work.md` with full article content, target question, direct answer, sources, FAQs, and internal links.
- Added featured image `src/images/blog/where-should-ai-end-creative-work.jpg` illustrating workflow stages (REFERENCE → SKETCH → COMPOSITION → BACKGROUND → FINAL PASS) with movable boundary gates and pressure indicator.
- Configured JSON-LD schema (Article, BreadcrumbList, FAQPage) and SEO metadata overrides in `src/templates/blog-post.tsx`.

## Verification

- Verified via Astro build (`ASTRO_TELEMETRY_DISABLED=1 node node_modules/astro/bin/astro.mjs build`), unit tests (`node scripts/site-content.test.mjs`), and TypeScript check (`node node_modules/typescript/bin/tsc --noEmit`).

## After Action Review

**Expected:** Publish new blog article with content, featured workflow image, SEO metadata, and FAQ schema.

**Actual:** Content, image, metadata, and JSON-LD schema added and verified via Astro build, tests, and typecheck.

**Difference:** None.

**Learning:** None.
