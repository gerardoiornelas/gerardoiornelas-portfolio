---
title: The Trust Stack Part II Blog Article
type: task-receipt
status: partial
intent: Publish Part II of The Trust Stack series examining proof of personhood vs. proof of authority.
sources:
  - src/content/trust-stack-proof-of-personhood-vs-authority.md
  - src/images/blog/trust-stack-proof-of-personhood-vs-authority.jpg
  - src/templates/blog-post.tsx
authorization:
  state: delegated
  source: User requested adding Part II of The Trust Stack series to the portfolio and subsequently instructed commit and push.
  scope: Scoped publication of Trust Stack Part II blog post, featured image, template metadata, receipt, and push to origin repository.
  valid_until: Task completion.
acceptance:
  status: partial
  human_review: pending
  reviewer: Automated Astro build, unit tests, and TypeScript checks passed; principal visual review pending.
  evidence:
    - Astro build successfully compiled all 25 pages including /blog/trust-stack-proof-of-personhood-vs-authority/index.html with responsive WebP images.
    - Site content tests (node --test scripts/site-content.test.mjs) passed 2 of 2 tests with stable distinct routes and excerpts.
    - TypeScript checks (npm run typecheck) completed cleanly with 0 errors.
    - Structured data (Article, BreadcrumbList, FAQPage) validated in rendered HTML head.
aar:
  expected: Publish Part II of The Trust Stack series with article content, featured image, SEO metadata, and FAQ schema.
  actual: Content, image, metadata, and JSON-LD schema added and verified via Astro build, tests, and typecheck.
  difference: None.
  learning: None.
---

# The Trust Stack Part II Blog Article

## Context

Published Part II of V in The Trust Stack series: "Proof of Personhood Is Not Proof of Authority", exploring why proof of personhood distinguishes humans from bots but cannot grant authority or determine permitted actions.

## Change

- Added `src/content/trust-stack-proof-of-personhood-vs-authority.md` with full article content, target question, direct answer, sources, FAQs, and internal links.
- Added featured image `src/images/blog/trust-stack-proof-of-personhood-vs-authority.jpg` illustrating the boundary between Human Verified / Personhood and Authority (Context is Not Permission).
- Configured JSON-LD schema (Article, BreadcrumbList, FAQPage) and SEO metadata overrides in `src/templates/blog-post.tsx`.

## Verification

- Verified via Astro build (`ASTRO_TELEMETRY_DISABLED=1 npm run build`), unit tests (`npm run test`), and TypeScript check (`npm run typecheck`).

## After Action Review

**Expected:** Publish Part II of The Trust Stack series with article content, featured image, SEO metadata, and FAQ schema.

**Actual:** Content, image, metadata, and JSON-LD schema added and verified via Astro build, tests, and typecheck.

**Difference:** None.

**Learning:** None.
