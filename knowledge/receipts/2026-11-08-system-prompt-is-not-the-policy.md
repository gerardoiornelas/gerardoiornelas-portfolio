---
title: The System Prompt Is Not the Policy Blog Article
type: task-receipt
status: verified
intent: Publish Human–AI Interaction article arguing a system prompt is design
  intent, not policy, and that behavioral rules need observable, audited,
  challengeable evidence.
sources:
  - knowledge/context.md
  - src/content/system-prompt-is-not-the-policy.md
  - src/images/blog/system-prompt-is-not-the-policy.jpeg
  - src/templates/blog-post.tsx
authorization:
  state: delegated
  source: User supplied the article copy and the Gemini image, asked for it on the
    website, then approved commit and push to main.
  scope: Article, user-supplied featured image (unaltered), template SEO metadata,
    receipt, and verification followed by commit and push.
  valid_until: Task completion.
acceptance:
  status: verified
  human_review: accepted
  reviewer: Gerardo I. Ornelas accepted the image and authorized commit and push;
    Astro build (40 pages), site content tests (3/3), typecheck and OKF
    validation passed.
  evidence:
    - Astro build under Node 22 compiled
      /blog/system-prompt-is-not-the-policy/index.html (40 pages).
    - Rendered head shows title "The System Prompt Is Not the Policy | Gerardo
      I. Ornelas" and the supplied meta description.
    - Structured data Article and BreadcrumbList present; FAQ is visible text
      with no FAQPage schema, per specification.
    - The three verified internal links resolve to existing articles, the page
      is in the sitemap, and og:image is the supplied image.
    - Site content tests (node --test scripts/site-content.test.mjs) passed 3 of
      3; npm run typecheck had no errors; npm run okf:validate passed.
aar:
  expected: Publish the article with content, featured image, SEO metadata and
    schema while preserving the preprint's stated limits and no clinical,
    universal-model or production-safety claim.
  actual: Content, unaltered image and metadata added; fact-check limits (one
    GPT-4o deployment, U.S. samples, observational decision-demand link, weakest
    challenge coder agreement) preserved in copy.
  difference: Used the user-supplied Gemini image as is (2752x1536, not cropped to
    1600x900); date set to 2026-11-08; FAQ included as visible text;
    dependencies installed with npm ci --ignore-scripts on Node 22 because
    sharp's install check fails on this Linux machine; graphify not installed so
    the graph was not refreshed.
  learning: None.
---

# Task receipt

## After Action Review

See the structured aar answers and acceptance evidence above.
