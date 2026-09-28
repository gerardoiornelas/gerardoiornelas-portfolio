---
title: Why Autonomous Systems Need Controls That Push Back Blog Article
type: task-receipt
status: partial
intent: Publish blog article analyzing physically stateful interfaces, dynamic affordances, and human agency in autonomous systems.
sources:
  - knowledge/context.md
  - src/content/autonomous-systems-controls-that-push-back.md
  - src/images/blog/autonomous-systems-controls-that-push-back.jpg
  - src/templates/blog-post.tsx
authorization:
  state: delegated
  source: 'User requested adding the new article "Why Autonomous Systems Need Controls That Push Back" to the portfolio.'
  scope: Scoped publication of autonomous systems controls blog post, featured image, template metadata, receipt, and verification.
  valid_until: Task completion.
acceptance:
  status: partial
  human_review: pending
  reviewer: Automated Astro build, unit tests, and TypeScript checks passed; principal visual review pending.
  evidence:
    - Astro build successfully compiled all pages including /blog/autonomous-systems-controls-that-push-back/index.html with responsive WebP images.
    - Site content tests (node --test scripts/site-content.test.mjs) passed 2 of 2 tests with stable distinct routes and excerpts.
    - TypeScript checks (npm run typecheck) completed cleanly with 0 errors.
    - Structured data (Article, BreadcrumbList, FAQPage) validated in rendered HTML head.
aar:
  expected: Publish new blog article with content, featured diagram image, SEO metadata, and FAQ schema.
  actual: Content, image, metadata, and JSON-LD schema added and verified via Astro build, tests, and typecheck.
  difference: None.
  learning: None.
---

# Why Autonomous Systems Need Controls That Push Back Blog Article

## Context

Published new blog article exploring why autonomous and automated systems need controls that push back, analyzing Physically Stateful Interfaces (Goedicke et al., 2026), bi-directional initiative flow, feedforward affordances, execution-time intervention, and coupling human intent to machine action.

## Change

- Added `src/content/autonomous-systems-controls-that-push-back.md` with complete article content, target question, direct answer, sources, FAQs, and internal links.
- Added featured image `src/images/blog/autonomous-systems-controls-that-push-back.jpg` illustrating the Architectural Authority toggle between HUMAN and SYSTEM control planes across REQUEST, RESIST, and OVERRIDE positions.
- Configured JSON-LD schema (Article, BreadcrumbList, FAQPage) and SEO metadata overrides in `src/templates/blog-post.tsx`.
- Created task receipt and updated `knowledge/context.md`.

## Verification

- Verified via Astro build (`npm run build`), unit tests (`npm run test`), and TypeScript check (`npm run typecheck`).

## After Action Review

**Expected:** Publish new blog article with content, featured diagram image, SEO metadata, and FAQ schema.

**Actual:** Content, image, metadata, and JSON-LD schema added and verified via Astro build, tests, and typecheck.

**Difference:** None.

**Learning:** None.
