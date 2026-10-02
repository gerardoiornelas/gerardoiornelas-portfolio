---
title: Deploy llms.txt and llms-full.txt AEO Manifests
type: task-receipt
status: partial
intent: Deploy standard llms.txt and llms-full.txt manifests and update robots.txt to maximize machine ingestion and AEO citations.
sources:
  - knowledge/context.md
  - static/llms.txt
  - static/llms-full.txt
  - static/robots.txt
authorization:
  state: delegated
  source: 'User approved AEO optimization ("do it") to deploy standard LLM manifests.'
  scope: Deploy llms.txt and llms-full.txt, update robots.txt, and verify build.
  valid_until: Task completion.
acceptance:
  status: partial
  human_review: pending
  reviewer: Automated Astro build, unit tests, and OKF checks passed; principal visual review pending.
  evidence:
    - Astro build successfully compiled public/llms.txt and public/llms-full.txt.
    - robots.txt updated with standard discovery pointers.
    - Site content tests and okf:validate passed cleanly.
aar:
  expected: Deploy standard llms.txt and llms-full.txt files and robots.txt pointers.
  actual: Created static/llms.txt, static/llms-full.txt, updated static/robots.txt, and verified output in public/.
  difference: None.
  learning: None.
---

# Deploy llms.txt and llms-full.txt AEO Manifests

## Context

Deployed the standard `llms.txt` and `llms-full.txt` files (following the llmstxt.org specification) to provide LLMs, search answer engines, and autonomous agents with clean, high-density structured markdown definitions, direct answer fast extracts, core doctrine summaries, and article links.

## Change

- Created `static/llms.txt` with structured summaries of core practices (Crittora, AI Visibility, Authority Layer, UI-GATES, Compound Engineering) and direct links to all research articles.
- Created `static/llms-full.txt` providing full extracted canonical direct answers for The Trust Stack series, ambient authority, and UI-GATES architecture.
- Updated `static/robots.txt` with standard LLM discovery comments and endpoint links.

## Verification

- Verified via Astro build (`npm run build`), unit tests (`npm run test`), and OKF validation (`npm run okf:validate`).

## After Action Review

**Expected:** Deploy standard llms.txt and llms-full.txt files and robots.txt pointers.

**Actual:** Created static/llms.txt, static/llms-full.txt, updated static/robots.txt, and verified output in public/.

**Difference:** None.

**Learning:** None.
