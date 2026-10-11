---
title: Rebrand Projects cards - XEO Director by XEO Labs and WUN.ai Ecosystem Engineering
type: task-receipt
status: partial
intent: Update the second Projects card from "AI Visibility & Cross-Engine Strategy" to "XEO Director by XEO Labs" using the XEO Labs text wordmark from xeolabs.ai; replace the third card with "WUN.ai Ecosystem Engineering" using the WUN logo.
sources:
  - src/components/Projects/Projects.api.ts
  - src/images/projects/xeo-labs-wordmark.svg
authority: Principal direction 2026-10-09: moving forward the AEO Director work is "XEO Director by XEO Labs"; use the XEO Labs text logo from xeolabs.ai; use the WUN logo for the WUN.ai card.
evidence:
  - "XEO Labs wordmark on xeolabs.ai verified as styled HTML text: DM Mono, weight 300, letter-spacing 2.64px, #f0f0f0, with a 5px dot preceding the text (nav-logo markup: <span class=nav-dot></span>XEO LABS)"
  - "Recreated faithfully as src/images/projects/xeo-labs-wordmark.svg (dot + DM Mono text); render verified via browser rasterization - legible, correct dot placement"
  - "npm run build: 31 pages, complete (2026-10-09)"
  - "npm test: 2/2 passing"
  - "Built index.html: card 2 = XEO Director by XEO Labs (wordmark inlined as SVG data URI), card 3 = WUN.ai Ecosystem Engineering (wun.png)"
acceptance: Partial - automated verification passing; production deploy + human visual acceptance of the wordmark rendering pending.
notes: Card 3 replaces the interim "AI Governance Advisory" placeholder card from commit 2b649b6; its advisory framing may return as a fourth card or elsewhere if the principal wants it.
