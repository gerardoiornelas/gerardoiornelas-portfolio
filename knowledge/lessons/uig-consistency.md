# Public skill consistency

Applies when: changing UI-GATES rules or loop descriptions.

Action: inspect the canon, operating-system specification, `plans/uigate/uigate-skill.md`, the downloadable `skillContent` inside `src/views/uig.tsx`, the homepage `src/components/UIGates/UIGates.tsx`, and the installed short skill at `~/.claude/skills/uig/SKILL.md`. Keep applicable rules, the nine-step loop, the authority states, and the promotion ladder (`Ephemeral → Task → Decision → Knowledge → Canon`) consistent. The short download is embedded separately from the visible page copy, and the installed skill is the same content under `~/.claude/skills/uig/SKILL.md`.

Limits: source locations are retrieval aids, not authority to change governing rules. Check current source; the separate canonical distribution repository is outside this checkout.

Evidence: [reconciliation receipt](../receipts/2026-09-12-uigates-operationalization.md).

Deployed-vs-committed check: the installed `~/.claude/skills/uig/SKILL.md` is outside the repository and is not tracked by git. After any change that alters `skillContent` in `src/views/uig.tsx`, re-verify that the installed copy matches the committed content — a committed-only fix leaves the live skill serving stale rules.
