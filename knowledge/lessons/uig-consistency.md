# Public skill consistency

Applies when: changing UI-GATES rules or loop descriptions.

Action: inspect the canon, operating-system specification, `plans/uigate/uigate-skill.md`, the portable skill source at `skills/uig/SKILL.md` (served by the `/uig` page download and synced to `~/.claude/skills/uig/SKILL.md`), the homepage `src/components/UIGates/UIGates.tsx`, and the installed short skill at `~/.claude/skills/uig/SKILL.md`. Keep applicable rules, the nine-step loop, the authority states, and the promotion ladder (`Ephemeral → Task → Decision → Knowledge → Canon`) consistent. `src/views/uig.tsx` imports the portable skill at build time via `skills/uig/SKILL.md?raw`; the installed skill is the same content under `~/.claude/skills/uig/SKILL.md`.

Limits: source locations are retrieval aids, not authority to change governing rules. Check current source; the separate canonical distribution repository is outside this checkout.

Usage tracking surfaces: the automatic usage ledger lives in `scripts/uig-usage.js` (reader and the `uig-usage` command) and `scripts/uig-stop-hook.js` (Claude Code SessionEnd hook parsing the transcript). The skill writes invocation/completion events to the global `~/.uig/tracking.jsonl`; the hook appends per-session token lines and is registered in `~/.claude/settings.json`. Keep the event schema in `scripts/uig-usage.js` aligned with the skill's Automatic tracking section.

Evidence: [reconciliation receipt](../receipts/2026-09-12-uigates-operationalization.md).

Sync check: the installed `~/.claude/skills/uig/SKILL.md` is outside the repository and is not tracked by git. After editing `skills/uig/SKILL.md`, run `npm run skills:sync` to copy the repo source to the installed location — a commit-only fix leaves the live skill serving stale rules. `skills:sync` copies every `skills/<name>/SKILL.md` to `~/.claude/skills/<name>/SKILL.md`, `scripts/uig-stop-hook.js` to `~/.uig/uig-stop-hook.js`, and `scripts/uig-usage.js` to `~/.uig/bin/uig-usage` (symlinked onto PATH as the bare `uig-usage` command).
