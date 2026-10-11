---
title: XEO Director card refinements - matching logo height and clean title
type: task-receipt
status: partial
intent: Match the XEO Labs wordmark logo box height to Crittora and WUN cards (84px), and retitle card 2 to just "XEO Director" per principal feedback.
sources:
  - src/components/Projects/Projects.api.ts
  - src/images/projects/xeo-labs-wordmark.svg
authority: Principal feedback 2026-10-09 (screenshot review): XEO Labs logo height should match Crittora and WUN; card title should read "XEO Director", not "XEO Director by XEO Labs".
evidence:
  - "SVG canvas resized to 200x84 (same height as the 128x84 Crittora/WUN logo boxes); wordmark vertically centered in the box"
  - "Card title now exactly 'XEO Director'; description reads 'Through XEO Director, by XEO Labs: ...' so attribution stays in prose"
  - "npm run build: 31 pages, complete; npm test: 2/2 passing"
  - "Built HTML: 0 occurrences of 'XEO Director by XEO Labs'; title renders as XEO Director"
acceptance: Partial - awaiting principal visual acceptance of the live deploy.
