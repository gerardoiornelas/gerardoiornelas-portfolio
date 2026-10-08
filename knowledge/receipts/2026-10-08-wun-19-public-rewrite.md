---
title: WUN-19 evidence-led public rewrite
type: task-receipt
date: 2026-10-08
status: partial
intent: Present existing tools, measured limits, and open research without announcing a new product.
sources:
  - src/views/uig.tsx
  - src/views/compound-engineering.tsx
  - src/components/UIGates/UIGates.tsx
  - src/components/Projects/Projects.api.ts
  - static/llms.txt
  - static/llms-full.txt
  - knowledge/context.md
authorization:
  state: delegated
  source: User requested WUN-19 and then approved the substantive rewrite with "do it".
  scope: Local public-copy and knowledge edits in isolated worktrees; no commit, push, or deployment.
  valid_until: Completion of this local slice.
acceptance:
  status: partial
  human_review: pending
  reviewer: Implementing agent; separate prepublication reviewer outstanding.
  evidence:
    - Existing site content tests passed, 2 of 2.
    - Astro production build passed, 29 pages.
    - Existing browser suite passed on all 29 routes at 1440 and 390 pixels, including both skill downloads, hydration, metadata, navigation, and intercepted form submission.
    - UI-GATES page had no horizontal overflow at 1440 or 390 pixels; desktop and mobile screenshots inspected.
    - Built AI manifests match source and legacy anchors remain present. Local Markdown link targets in all five UI-GATES documents exist.
    - Working OKF bundle and receipt structure validated; git diff --check passed in both worktrees.
    - Code graph refreshed (2219 nodes, 3180 edges). Semantic refresh failed with backend connection errors; documentation graph remains incomplete.
    - Source records checked at UI-GATES main 3cf008e and hook-first experiment 5f6b913.
aar:
  expected: README, public pages, homepage and AI manifests describe measured results and open research consistently.
  actual: Public narrative rewritten; nine-step workflow retained as reference design. Local site checks passed; independent prepublication review remains pending.
  difference: Initial build could not write the dependency cache through a symlink. Dependencies were copied into the worktree; the build then passed. Original checkout files preserved.
  learning: Report the observed 85.3 percent cost increase alongside the experiment's no-verdict comparability limit; neither may stand in for the other.
---

# WUN-19 public rewrite

Source: https://violetek-37043527.atlassian.net/browse/WUN-19.

The approved change replaces the operating-system benefit narrative with existing artifacts, negative and inconclusive measurements, and a research question. No checker, evidence-packet feature, new product name, or governing-rule change is included.

The corresponding UI-GATES documentation is in `/private/tmp/wun-19-uigates`, branch `codex/wun-19-public-claims`, based on `3cf008e`. This portfolio worktree is `/private/tmp/wun-19-portfolio`, based on `a1f4598` on the same branch name.

The Jev statement is explicitly attributed to the access-controlled issue report because live records are not published in the repository. Crittora claims, essays, internal doctrine, and downloadable skill rules are outside this correction; Crittora's proof claims still need their own review.

Separate review by Astra or a person remains required before publishing. This receipt does not claim publication or human acceptance.

## After Action Review

Expected: evidence-led public copy without a replacement product announcement.
Actual: pages and manifests rewritten; build and content tests passed.
Delta: dependency-cache sandbox restriction resolved by worktree-local dependency copy. Browser suite passed after host permission. Graphify semantic refresh failed with connection errors; generated graph is not source authority.
Learning: keep statistical comparability limits next to descriptive measurements, and keep research status separate from implemented tools.
