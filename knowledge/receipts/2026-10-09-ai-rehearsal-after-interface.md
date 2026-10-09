---
title: AI as Rehearsal Blog Article
type: task-receipt
status: partial
intent: Publish Human–AI Interaction article examining AI as rehearsal and transfer beyond the interface.
sources:
  - knowledge/context.md
  - src/content/ai-rehearsal-after-interface.md
  - src/images/blog/ai-rehearsal-after-interface.jpg
  - src/templates/blog-post.tsx
authorization:
  state: delegated
  source: 'User requested adding article ("The Interface Ended. The Interaction Didn’t.") to the portfolio.'
  scope: Scoped publication of AI rehearsal blog post, featured image, template metadata, receipt, and verification.
  valid_until: Task completion.
acceptance:
  status: partial
  human_review: pending
  reviewer: Automated Astro build, unit tests, and TypeScript checks passed; principal visual review pending.
  evidence:
    - Astro build successfully compiled all pages including /blog/ai-rehearsal-after-interface/index.html with responsive WebP images.
    - Site content tests (node --test scripts/site-content.test.mjs) passed 2 of 2 tests with stable distinct routes and excerpts.
    - TypeScript checks (npm run typecheck) completed cleanly with 0 errors.
    - Structured data (Article, BreadcrumbList, FAQPage) validated in rendered HTML head.
aar:
  expected: Publish Human–AI Interaction article with content, featured image, SEO metadata, and FAQ schema.
  actual: Content, image, metadata, and JSON-LD schema added and verified via Astro build, tests, and typecheck.
  difference: None.
  learning: None.
---

# AI as Rehearsal Blog Article

## Context

Published Human–AI Interaction article "The Interface Ended. The Interaction Didn’t." (AI as Rehearsal: What Happens After the Interface), exploring how a voice-based AI discussion partner in a preregistered field experiment increased voluntary contributions in later class sessions by 31%, shifting the HCI focus toward afterlife metrics and transfer beyond the interface.

## Change

- Added `src/content/ai-rehearsal-after-interface.md` with complete article content, target question, direct answer, afterlife metrics (Transfer, Dependence, Distribution, Quality, Fade), sources, FAQs, and internal links.
- Added featured image `src/images/blog/ai-rehearsal-after-interface.jpg` illustrating the interface boundary between low-stakes rehearsal with AI and high-stakes transfer in the human room.
- Configured JSON-LD schema (Article, BreadcrumbList, FAQPage) and SEO metadata overrides in `src/templates/blog-post.tsx`.

## Verification

- Verified via Astro build (`npm run build`), unit tests (`npm run test`), TypeScript check (`npm run typecheck`), and OKF validation (`npm run okf:validate`).

## After Action Review

**Expected:** Publish Human–AI Interaction article with content, featured image, SEO metadata, and FAQ schema.

**Actual:** Content, image, metadata, and JSON-LD schema added and verified via Astro build, tests, and typecheck.

**Difference:** None.

**Learning:** None.
