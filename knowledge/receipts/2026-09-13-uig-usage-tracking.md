---
title: Make uig usage stats real with out-of-the-box tracking
type: task-receipt
date: 2026-09-13
status: partial
intent: >-
  The stats command must report real, all-time usage out of the box, not only the
  instrumented evaluation harness. The portable skill auto-records invocations and
  completions to a global ledger, the stats tool counts this repo's receipts, and a
  Claude Code SessionEnd hook captures genuine per-session token telemetry, so the
  previous runs:1 / tokens:0 output no longer implies the principal barely used uig.
sources:
  - scripts/uig-usage.js
  - scripts/uig-usage.test.js
  - scripts/uig-stop-hook.js
  - scripts/uig-stop-hook.test.js
  - scripts/uig-learning-cli.js
  - scripts/sync-skills.js
  - package.json
  - skills/uig/SKILL.md
  - src/views/uig.tsx
  - knowledge/context.md
  - knowledge/lessons/uig-consistency.md
  - .claude/commands/uig-update.md
authorization:
  state: delegated
  source: >-
    Principal said the stats were misleading and must be an out-of-the-box feature,
    chose a global lifetime store plus per-repo receipt counts, and approved
    installing the Claude Code SessionEnd hook for real token capture.
  scope: >-
    Local repo edits plus installing the SessionEnd hook in the user-global
    ~/.claude/settings.json (preserving existing hooks) and the hook copy in
    ~/.uig/. No commit or push in this slice.
  valid_until: Completion of this local slice.
acceptance:
  status: partial
  human_review: pending
  reviewer: >-
    Implementing agent ran automated local verification; principal visual and
    functional acceptance outstanding
  evidence:
    - >-
      npm run okf:test passed 62 (was 54), including new uig-usage (5) and
      uig-stop-hook (3) suites and the skill contract test against the 0.3.0 skill.
    - >-
      npm run typecheck clean. npm run build completed 24 pages.
    - >-
      npm run uig:learn -- usage prints the all-time ledger and counts 14 receipts in
      this repo after recording one run-start.
    - >-
      Simulated SessionEnd hook against a real session transcript: has_uig true, real
      input and output token totals across 249 unique messages, one line recorded,
      exit 0.
    - >-
      ~/.claude/settings.json parses with the added SessionEnd hook and an 8s timeout;
      the existing iterm2 cc-status hooks for every event are preserved.
    - >-
      npm run skills:sync is idempotent and byte-verified for the uig skill and the
      hook (cmp -s against repo sources).
aar:
  expected: >-
    A stats feature whose output reflects real usage with zero setup. The skill records
    invocation and completion events; a hook captures real tokens; stats shows an
    all-time usage ledger separated from the instrumented evaluation harness.
  actual: >-
    Implemented. The portable skill (0.3.0) instructs run-start and run-complete
    events into ~/.uig/tracking.jsonl; the SessionEnd hook appends per-session token
    lines (deduplicated by message id, once per session, exit 0 on every path); the CLI
    now prints USAGE (global ledger plus repo receipts) above HARNESS (instrumented
    runs); skills:sync keeps the hook installed and byte-identical. Live run captured,
    runs started moved 0 to 1 after recording this session's start.
  difference: >-
    Tone and placement changed during implementation. The global ledger stores all
    source events in one JSONL file that both the skill and the hook append, and the
    hook was registered with an 8s timeout to raise the 1.5s SessionEnd budget for
    large transcripts. Token totals use the existing harness convention (input plus
    output, cache reported separately) rather than inventing a new definition.
  learning: >-
    Sustain: usage accounting is a separate concern from evaluation. The instrumented
    harness (.uig-learning) is opt-in evaluation, the ledger is automatic observation,
    and stats must label both. Keep the ledger append-only JSONL shared by the skill
    and the hook, keep token definitions aligned to telemetry(), and sync the hook
    through skills:sync so /uig-update keeps machine copies live. Improve: re-run the
    real-agent comparison now that per-session tokens are automatic, and consider a
    per-repo slice of the ledger if cross-repo attribution needs tightening.
---

# Out-of-the-box uig usage tracking

## Context

`npm run uig:learn -- stats` read only `.uig-learning/`, the opt-in instrumented
evaluation harness ("1 total [discovery: 1]"). Fourteen real receipts sit in
`knowledge/receipts/` yet the report implied near-zero usage, and "tokens: 0 ...
never counted as zero" read as fabricated. The request: make usage tracking an
out-of-the-box feature of the portable skill itself.

## Change

- `scripts/uig-usage.js` — new `Usage` ledger: appends JSONL events and aggregates
  them (runs started/completed, gated approvals, hook sessions, measured tokens);
  counts this repo's `knowledge/receipts/`.
- `scripts/uig-usage.test.js` — 5 tests (empty store, receipts, cross-repo
  attribution, malformed lines, hook filtering/measurement).
- `scripts/uig-stop-hook.js` — Claude Code SessionEnd hook: parses the session
  transcript for real per-message usage (deduped by message id), tags whether the
  session ran uig, records once per session, exits 0 on every path, skips
  transcripts over 64 MB.
- `scripts/uig-stop-hook.test.js` — 3 tests (dedup/measurement, malformed usage,
  detection markers).
- `scripts/uig-learning-cli.js` — new `usage` command and a two-section `stats`
  (USAGE ledger first, HARNESS instrumented runs second).
- `scripts/sync-skills.js` — now also copies `scripts/uig-stop-hook.js` to
  `~/.uig/uig-stop-hook.js`.
- `skills/uig/SKILL.md` — 0.3.0: new "Automatic tracking (out-of-the-box)"
  section instructing run-start/run-complete events into `~/.uig/tracking.jsonl`.
- `src/views/uig.tsx` — corrected the copy that said the download "does not
  install the recorder": it now states the portable download tracks usage out of
  the box while the evaluation harness stays repository-local.
- `knowledge/context.md`, `knowledge/lessons/uig-consistency.md` — document the
  ledger, hook, and sync surface.
- `.claude/commands/uig-update.md` — description and steps now cover the hook.

Machine-global (not in the repo): `~/.claude/settings.json` gained a `SessionEnd`
hook entry (8s timeout) running `~/.uig/uig-stop-hook.js` alongside the existing
cc-status hooks; the hook copy is synced by `npm run skills:sync`.

## Evidence

- `npm run okf:test`: 62 passed, 0 failed.
- `npm run typecheck`: clean. `npm run build`: 24 pages.
- `npm run uig:learn -- usage` (live): receipts written 14; recording one
  run-start moved runs started 0 -> 1 and the first event appears.
- Hook simulation against a real transcript: `has_uig true`, input 18628801 /
  output 17958 / cached 4465521 across 249 unique messages, one line written,
  exit 0.
- Settings JSON validated with `python3 -m json.tool`; SessionEnd hooks count 2.
- `npm run skills:sync`: unchanged uig, unchanged compound-engineering, unchanged
  uig-stop-hook.js; `cmp -s` byte-identical for the installed uig skill and hook.

## After Action Review

1. **What was supposed to happen?** — Stats become an out-of-the-box feature: the
   portable skill records usage automatically, a hook captures real tokens, and
   `stats` reports an honest all-time ledger alongside the instrumented harness.
2. **What actually happened?** — All four delivered. The ledger stores skill and
   hook events together; the SessionEnd hook provides real per-session tokens;
   the CLI separates USAGE from HARNESS; skills:sync keeps the machine copies and
   the hook live; the site and knowledge docs were corrected to stay truthful.
3. **Why was there a difference?** — The main deviation was design clarity, not
   scope: the original instinct to reuse the harness store would have kept the
   misleading framing. Separating observation (automatic) from evaluation
   (opt-in) and relabeling the report removed the ambiguity, at the cost of one
   new module and one hook registration.
4. **What will we do differently?** — Treat usage reporting as automatic
   observation with its own ledger and clear labels; keep token semantics aligned
   with `telemetry()`; make hooks part of the sync contract so they never drift
   from the repo; re-run the real-agent token comparison now that telemetry is
   automatic and free.

## Reuse

Edit a repo skill or the hook, then run `npm run skills:sync` (also run by
`/uig-update`) to refresh `~/.claude/skills/` and `~/.uig/uig-stop-hook.js`.
`npm run uig:learn -- usage` prints the ledger; `-- stats` adds the harness. Keep
the event schema in `scripts/uig-usage.js` aligned with the skill's Automatic
tracking section and with the SessionEnd hook, and keep the SessionEnd entry in
`~/.claude/settings.json` when the machine is re-provisioned.
