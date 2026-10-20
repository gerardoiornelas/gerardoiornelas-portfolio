---
title: AI Search Exploration Mode Blog Article
type: task-receipt
status: partial
intent: Publish Human–AI Interaction article arguing AI search needs distinct exploration and resolution modes.
sources:
  - knowledge/context.md
  - src/content/ai-search-form-the-question.md
  - src/images/blog/ai-search-form-the-question.jpg
  - src/templates/blog-post.tsx
authorization:
  state: delegated
  source: 'User requested adding article ("AI Search Should Help You Form the Question, Not Just Answer It") to the portfolio.'
  scope: Scoped publication of the article, user-supplied featured image, template SEO metadata, receipt, and verification. No commit or push.
  valid_until: Task completion.
acceptance:
  status: partial
  human_review: pending
  reviewer: Automated Astro build, site content tests, and TypeScript checks passed; principal visual review pending.
  evidence:
    - Astro build compiled /blog/ai-search-form-the-question/index.html with responsive WebP images (36 pages).
    - Rendered head shows title "Why AI Search Needs an Exploration Mode" and the supplied meta description.
    - Structured data (Article, BreadcrumbList, FAQPage) present; FAQ is visible in the article body.
    - Site content tests (node --test scripts/site-content.test.mjs) passed 3 of 3.
    - TypeScript checks (npm run typecheck) completed with 0 errors.
aar:
  expected: Publish article with content, featured image, SEO metadata, and schema while preserving study limitations.
  actual: Content, image, metadata, and JSON-LD added; fact-check limits (preprint, N=16, two 15-minute tasks, 771-paper corpus, mixed inquiry ratings, no long-term claims) preserved in copy.
  difference: Supplied featured image is the user's upload rather than the brief's PROMPT → ANSWER composition; Google redirect wrappers on source URLs were replaced with direct URLs; internal link to the rehearsal article normalized with a trailing slash.
  learning: None.
---

# AI Search Exploration Mode Blog Article

## Context

Story ID `hci-arxiv-org-2026-10-07-question-formation-needs-wandering`. Canonical source: Liu et al., "Feeling Wistful" (arXiv 2610.10890), a small preprint research probe.

## Change

- Added `src/content/ai-search-form-the-question.md` (slug `/ai-search-form-the-question`, date 2026-10-20) with target question, direct answer, article body, primary sources, internal links, and visible FAQ.
- Added featured image `src/images/blog/ai-search-form-the-question.jpg` (user-supplied).
- Added `topicConfig` entry in `src/templates/blog-post.tsx` for meta title, description, keywords, about entities, and FAQ schema.

## Verification

`npm run build` (telemetry/feedback disabled), `npm run typecheck`, `node --test scripts/site-content.test.mjs`.

## After Action Review

**Expected:** Publish article with metadata and schema, limitations preserved.

**Actual:** Published locally and verified by build, tests, and typecheck.

**Difference:** Featured image differs from the brief's described composition; source URLs de-wrapped.

**Learning:** None.
