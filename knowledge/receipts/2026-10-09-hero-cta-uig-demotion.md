---
title: Demote UI-GATES from hero CTA; lead with Request a Briefing
type: task-receipt
status: partial
intent: Make Request a Briefing the single primary hero CTA; move UI-GATES to a ventures-row chip; replace the UI-GATES Projects card with AI Governance Advisory.
sources:
  - src/components/Home/Home.tsx
  - src/components/Projects/Projects.api.ts
authority: Principal direction 2026-10-09: the primary hero CTA to UI-GATES work on gerardoiornelas.com is not correct (follow-up to WUN-24 de-prioritization). Execute now.
evidence:
  - "npm run build: 31 pages, complete (2026-10-09)"
  - "npm test: 2/2 passing"
  - "public/index.html: 0 refs to 'UI-GATES Operating System'; hero CTA is 'Request a Briefing' (contained); ventures row contains 'UI-GATES - Methodology' chip; Projects includes 'AI Governance Advisory'"
acceptance: Partial - automated verification passing; production deploy + human visual acceptance pending.
notes: Fixes the WUN-24 follow-through gap: the first de-prioritization pass retargeted links but left the UI-GATES button in the hero primary slot (visible on live site as 'UI-GATES Operating System' contained button).
