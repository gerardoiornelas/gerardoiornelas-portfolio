---
description: Print the all-time uig usage ledger (global ~/.uig/tracking.jsonl) plus this repo's receipts.
---

# UIG usage report

Run `uig-usage` (or `npm run uig:usage`) from this repository and report the
USAGE section to the principal:

- runs started and completed (and how many completed in this repo)
- receipts written in `knowledge/receipts/`
- gated approvals granted
- hook-captured sessions seen, and how many ran the uig skill
- tokens measured across uig-tagged sessions

Be honest about provenance: if the SessionEnd hook has not recorded any sessions
yet (restart needed after a hook change), say so; and if tokens read 0, state that
they fill in automatically as sessions end. Do not pad the report with numbers the
ledger does not contain.
