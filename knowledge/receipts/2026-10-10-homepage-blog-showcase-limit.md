---
title: Homepage Blog Showcase Curation
type: task-receipt
status: partial
intent: Cap homepage blog showcase to 6 recent articles and add a prominent archive CTA button.
sources:
  - knowledge/context.md
  - src/components/Blog/Blog.tsx
authorization:
  state: delegated
  source: 'User selected Option 1 to display the most recent articles on the homepage with a CTA linking to the full archive.'
  scope: Scoped curation of homepage blog section, CTA button, receipt, and verification.
  valid_until: Task completion.
acceptance:
  status: partial
  human_review: pending
  reviewer: Automated Astro build, unit tests, and TypeScript checks passed; principal visual review pending.
  evidence:
    - Astro build successfully compiled all pages including homepage with 6-card curated showcase and CTA.
    - Site content tests (node --test scripts/site-content.test.mjs) passed 2 of 2 tests.
    - TypeScript checks (npm run typecheck) completed cleanly with 0 errors.
aar:
  expected: Limit homepage to 6 most recent articles and add prominent CTA to /blog/.
  actual: Homepage displays top 6 articles in a balanced grid with an animated "View All Articles & Series" CTA button.
  difference: None.
  learning: None.
---

# Homepage Blog Showcase Curation

## Context

Updated the homepage "Research & Field Notes" section to follow UX best practices: displaying a curated set of the 6 most recent articles in a balanced grid rather than rendering all 20+ articles, and providing a prominent call-to-action button to navigate to the full `/blog/` archive.

## Change

- Updated `src/components/Blog/Blog.tsx` to slice `nodes` to 6 items (`FEATURED_POST_COUNT = 6`).
- Added an animated `Button` component linking to `/blog/` with dynamic total article count (`View All Articles & Series (N)`).

## Verification

- Verified via Astro build (`npm run build`), unit tests (`npm test`), and TypeScript check (`npm run typecheck`).

## After Action Review

**Expected:** Limit homepage to 6 most recent articles and add prominent CTA to /blog/.

**Actual:** Homepage displays top 6 articles in a balanced grid with an animated "View All Articles & Series" CTA button.

**Difference:** None.

**Learning:** None.
