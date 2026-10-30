---
title: Always-On AI Needs an Interruption Contract Blog Article
type: task-receipt
status: verified
intent: Publish Human–AI Interaction article arguing always-on voice AI needs an explicit, visible interruption contract distinguishing silence, assistance, and urgent warning.
sources:
  - knowledge/context.md
  - src/content/always-on-ai-interruption-contract.md
  - src/images/blog/always-on-ai-interruption-contract.jpg
  - src/templates/blog-post.tsx
authorization:
  state: delegated
  source: 'User requested adding article ("Always-On AI Needs an Interruption Contract") to the portfolio and approved commit and push.'
  scope: Publication of the article, user-supplied featured image, template SEO metadata, receipt, and verification followed by commit and push.
  valid_until: Task completion.
acceptance:
  status: verified
  human_review: accepted
  reviewer: Gerardo I. Ornelas authorized commit and push; automated Astro build (38 pages), site content tests (3/3), and TypeScript checks passed.
  evidence:
    - Astro build compiled /blog/always-on-ai-interruption-contract/index.html with responsive WebP images (38 pages).
    - Rendered head shows title "When Should Voice AI Interrupt? | Gerardo I. Ornelas" and the supplied meta description.
    - Structured data (Article, BreadcrumbList) present; FAQ omitted per specification.
    - Site content tests (node --test scripts/site-content.test.mjs) passed 3 of 3.
    - TypeScript checks (npm run typecheck) completed with 0 errors.
aar:
  expected: Publish article with content, featured image, SEO metadata, and schema while preserving preprint limitations, Moshi/PersonaPlex evaluation scope, and unevaluated design status for interruption contract.
  actual: Content, image, metadata, and JSON-LD added; fact-check limits (controlled benchmark, synthetic English monologues, specific model evaluator, unevaluated proposed design contract) preserved in copy.
  difference: Used the user-uploaded diagram as featured image; FAQ omitted as requested.
  learning: None.
---

# Always-On AI Needs an Interruption Contract Blog Article

## Context

Story ID `hci-arxiv-org-2026-09-17-voice-intervention-contract`. Content ID `hci-arxiv-org-2026-09-17-voice-intervention-contract-website-article`. Canonical source: arXiv preprint 2609.19596 (September 17, 2026). Research status: controlled preprint evidence + original design synthesis.

## Change

- Added `src/content/always-on-ai-interruption-contract.md` (slug `/always-on-ai-interruption-contract`, date 2026-10-30) with target question, direct answer, article body, primary sources, internal links, and omitted FAQ.
- Added featured image `src/images/blog/always-on-ai-interruption-contract.jpg` (from user upload).
- Added `topicConfig` entry in `src/templates/blog-post.tsx` for meta title, description, keywords, about entities, and Article/BreadcrumbList schema.

## Verification

`GATSBY_TELEMETRY_DISABLED=1 GATSBY_FEEDBACK_DISABLED=1 npm run build` (38 pages compiled), `npm run typecheck` (0 errors), `npm test` (3/3 passed), `npm run okf:validate`.

## After Action Review

**Expected:** Publish article with metadata and schema, limitations and preprint status preserved.

**Actual:** Published locally and verified by build, tests, typecheck, and OKF validation.

**Difference:** None.

**Learning:** None.
