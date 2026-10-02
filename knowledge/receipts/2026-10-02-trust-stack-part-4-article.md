---
title: The Trust Stack Part IV Blog Article
type: task-receipt
status: partial
intent: Publish Part IV of The Trust Stack series examining capability-based provenance and scoped execution-time authority.
sources:
  - knowledge/context.md
  - src/content/beyond-the-badge-capability-based-provenance.md
  - src/images/blog/beyond-the-badge-capability-based-provenance.jpg
  - src/templates/blog-post.tsx
authorization:
  state: delegated
  source: 'User requested adding Part IV of The Trust Stack series ("Beyond the Badge: Capability-Based Provenance") to the portfolio.'
  scope: Scoped publication of Trust Stack Part IV blog post, featured image, template metadata, receipt, and verification.
  valid_until: Task completion.
acceptance:
  status: partial
  human_review: pending
  reviewer: Automated Astro build, unit tests, and TypeScript checks passed; principal visual review pending.
  evidence:
    - Astro build successfully compiled all pages including /blog/beyond-the-badge-capability-based-provenance/index.html with responsive WebP images.
    - Site content tests (node --test scripts/site-content.test.mjs) passed 2 of 2 tests with stable distinct routes and excerpts.
    - TypeScript checks (npm run typecheck) completed cleanly with 0 errors.
    - Structured data (Article, BreadcrumbList, FAQPage) validated in rendered HTML head.
aar:
  expected: Publish Part IV of The Trust Stack series with article content, featured image, SEO metadata, and FAQ schema.
  actual: Content, image, metadata, and JSON-LD schema added and verified via Astro build, tests, and typecheck.
  difference: None.
  learning: None.
---

# The Trust Stack Part IV Blog Article

## Context

Published Part IV of V in The Trust Stack series: "Beyond the Badge: Capability-Based Provenance", exploring how provenance records origin and history while explicit capabilities govern permitted actions at consequential execution boundaries.

## Change

- Added `src/content/beyond-the-badge-capability-based-provenance.md` with complete article content, target question, direct answer, sources, FAQs, and internal links.
- Added featured image `src/images/blog/beyond-the-badge-capability-based-provenance.jpg` illustrating the consequential boundary where capability cards are inspected and authority is evaluated before execution.
- Configured JSON-LD schema (Article, BreadcrumbList, FAQPage) and SEO metadata overrides in `src/templates/blog-post.tsx`.

## Verification

- Verified via Astro build (`npm run build`), unit tests (`npm run test`), TypeScript check (`npm run typecheck`), and OKF validation (`npm run okf:validate`).

## After Action Review

**Expected:** Publish Part IV of The Trust Stack series with article content, featured image, SEO metadata, and FAQ schema.

**Actual:** Content, image, metadata, and JSON-LD schema added and verified via Astro build, tests, and typecheck.

**Difference:** None.

**Learning:** None.
