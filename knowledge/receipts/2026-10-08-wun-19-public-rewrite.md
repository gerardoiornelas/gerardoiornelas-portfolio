---
title: WUN-19 evidence-led public rewrite
type: task-receipt
date: 2026-10-08
status: partial
intent: Correct capability claims and add a status-labeled Research & Field Notes layer without changing the homepage's commercial focus.
sources:
  - src/views/uig.tsx
  - src/views/compound-engineering.tsx
  - src/components/UIGates/UIGates.tsx
  - src/components/Projects/Projects.api.ts
  - src/views/research.tsx
  - src/views/verifiably-human-research.tsx
  - src/views/trust-stack-research.tsx
  - src/views/corrections.tsx
  - src/views/manifesto.tsx
  - src/views/index.tsx
  - src/views/authority-layer.tsx
  - src/views/author/gerardo-i-ornelas.tsx
  - src/components/BlogPostTemplate/BlogPostTemplate.tsx
  - src/content/verifiably-human-part-1.md
  - src/content/verifiably-human-part-2.md
  - src/content/verifiably-human-part-3.md
  - static/llms.txt
  - static/llms-full.txt
  - knowledge/context.md
authorization:
  state: delegated
  source: User explicitly requested implementation of WUN-19 and a Jira update.
  scope: Local public-copy and knowledge edits in isolated worktrees; no commit, push, or deployment.
  valid_until: Completion of this local slice.
acceptance:
  status: partial
  human_review: pending
  reviewer: Independent second agent review passed after claim-parity fixes; human acceptance remains pending.
  evidence:
    - Site content tests passed, 3 of 3, including the Verifiably Human metadata contract.
    - TypeScript typecheck passed.
    - Astro production build passed, 33 pages.
    - Browser suite passed on all 33 routes at 1440 and 390 pixels, including hydration, metadata, image decoding, navigation, both skill downloads, and intercepted form submission.
    - Independent second review found two claim-parity blockers; the historical manifesto and homepage JSON-LD were corrected, and re-review found no remaining blockers.
    - UI-GATES page had no horizontal overflow at 1440 or 390 pixels; desktop and mobile screenshots inspected.
    - Built AI manifests match source and legacy anchors remain present. Local Markdown link targets in all five UI-GATES documents exist.
    - Working OKF bundle and receipt structure validated; git diff --check passed in both worktrees.
    - A prior code-graph refresh produced 2219 nodes and 3180 edges. After the Phase 2 expansion, a new semantic refresh was attempted and all three backend chunks failed with connection errors; the generated graph is incomplete and is not acceptance evidence.
    - Source records checked at UI-GATES main 3cf008e and hook-first experiment 5f6b913.
aar:
  expected: Public pages separate commercial positioning, arguments, implementations, experiments, findings, corrections, and unknown states.
  actual: Phase 1 claims were corrected and Phase 2's research hub, body-of-work status pages, article metadata, correction log, and manifests were implemented locally. Full verification and independent second review passed; human acceptance and publication remain pending.
  difference: Jira asserted a complete five-part Trust Stack series, but only four numbered installments exist in repository source. The site reports four rather than inventing a fifth. AI-assistance history for Verifiably Human Parts I–III was also absent, so the visible disclosure says it is not documented.
  learning: Public status systems must preserve unknown states when the source record cannot support the requested label.
---

# WUN-19 public rewrite

Source: https://violetek-37043527.atlassian.net/browse/WUN-19.

The approved change replaces the operating-system benefit narrative with existing artifacts, negative and inconclusive measurements, and a research question. It also adds a Research & Field Notes hub, explicit body-of-work status, a public correction record, and article fields for status, corrections, sources, series, and AI-assistance disclosure. No checker, evidence-packet feature, new product name, or governing-rule change is included.

The corresponding UI-GATES documentation first pass is in `/private/tmp/wun-19-uigates`, branch `codex/wun-19-public-claims`, based on `3cf008e`; Jira later moved repository changes to WUN-21. This WUN-19 portfolio implementation is in `/private/tmp/wun-19-portfolio`, based on `a1f4598` on the same branch name.

The Jev statement is explicitly attributed to the access-controlled issue report because live records are not published in the repository. Crittora copy is now explicitly framed as design; independent Crittora implementation and outcome review remains outside this ticket.

This receipt does not claim publication, deployment, or human acceptance. The Trust Stack count and Verifiably Human AI-assistance history remain source-record discrepancies, not implementation guesses.

## After Action Review

Expected: evidence-led public copy and a research information architecture without a replacement product announcement.
Actual: pages, article model, corrections, manifests, and navigation rewritten; typecheck, content tests, build, and 33-route browser suite passed.
Delta: four Trust Stack installments exist rather than the five Jira asserted; AI-assistance history is undocumented. Browser execution required host permission, and the new pages initially lacked the repository's `withPage` hydration wrapper; adding it resolved the React hydration error.
Learning: keep statistical comparability limits next to descriptive measurements, preserve unknown states, and test new Astro/React pages through a full history-navigation cycle rather than direct loads alone.
