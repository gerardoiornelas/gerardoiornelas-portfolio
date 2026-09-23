---
title: The Trust Stack Part III Blog Article
type: task-receipt
status: partial
intent: Publish Part III of The Trust Stack series examining hardware capture attestation and the silicon root of trust.
sources:
  - knowledge/context.md
  - src/content/trust-stack-hardware-capture-attestation.md
  - src/images/blog/trust-stack-hardware-capture-attestation.jpg
  - src/templates/blog-post.tsx
authorization:
  state: delegated
  source: 'User requested adding Part III of The Trust Stack series ("The Silicon Root of Trust: What Secure Capture Can—and Cannot—Prove") to the portfolio.'
  scope: Scoped publication of Trust Stack Part III blog post, featured image, template metadata, receipt, and verification.
  valid_until: Task completion.
acceptance:
  status: partial
  human_review: pending
  reviewer: Automated Astro build, unit tests, and TypeScript checks passed; principal visual review pending.
  evidence:
    - Astro build successfully compiled all pages including /blog/trust-stack-hardware-capture-attestation/index.html with responsive WebP images.
    - Site content tests (node --test scripts/site-content.test.mjs) passed 2 of 2 tests with stable distinct routes and excerpts.
    - TypeScript checks (npm run typecheck) completed cleanly with 0 errors.
    - Structured data (Article, BreadcrumbList, FAQPage) validated in rendered HTML head.
aar:
  expected: Publish Part III of The Trust Stack series with article content, featured image, SEO metadata, and FAQ schema.
  actual: Content, image, metadata, and JSON-LD schema added and verified via Astro build, tests, and typecheck.
  difference: None.
  learning: None.
---

# The Trust Stack Part III Blog Article

## Context

Published Part III of V in The Trust Stack series: "The Silicon Root of Trust: What Secure Capture Can—and Cannot—Prove", exploring how hardware-backed capture attestation anchors media origin to a physical sensor without determining scene truth, consent, or authorized downstream use.

## Change

- Added `src/content/trust-stack-hardware-capture-attestation.md` with complete article content, target question, direct answer, sources, FAQs, and internal links.
- Added featured image `src/images/blog/trust-stack-hardware-capture-attestation.jpg` illustrating the boundary where hardware sensor attestation (device and timeline anchored) stops before truth, consent, and authority.
- Configured JSON-LD schema (Article, BreadcrumbList, FAQPage) and SEO metadata overrides in `src/templates/blog-post.tsx`.

## Verification

- Verified via Astro build (`npm run build`), unit tests (`npm run test`), and TypeScript check (`npm run typecheck`).

## After Action Review

**Expected:** Publish Part III of The Trust Stack series with article content, featured image, SEO metadata, and FAQ schema.

**Actual:** Content, image, metadata, and JSON-LD schema added and verified via Astro build, tests, and typecheck.

**Difference:** None.

**Learning:** None.
