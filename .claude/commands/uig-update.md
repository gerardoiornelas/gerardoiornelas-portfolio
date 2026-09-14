---
description: Sync every portable skill source to the installed Claude Code skill directory, then commit and push so the /uig download stays current.
---

# Update the UIG skill (and publish)

The portable skills live in this repository under `skills/<name>/SKILL.md`
(the source of truth). The installed copies Claude Code actually invokes live
under `~/.claude/skills/<name>/SKILL.md`. This command brings the installed
copies up to date and publishes the source change.

## Run the sync

1. `npm run skills:sync` — copies each `skills/<name>/SKILL.md` to
   `~/.claude/skills/<name>/SKILL.md`, creating the directory if needed.
2. Verify the sync actually happened: byte-compare each installed copy against
   its repo source (`cmp -s ~/.claude/skills/<name>/SKILL.md skills/<name>/SKILL.md`)
   and report which skills were `updated` vs `unchanged`.

## Publish, if anything changed

3. If any `skills/<name>/SKILL.md` actually changed, stage only the skill source
   files — never unrelated working-tree changes — and commit with a short message
   naming the skill and the change (bump `version:` and `updated:` in the
   frontmatter first if the edit is a real rule or content change).
4. Push to `origin main` so the `/uig` page download reflects the new content on
   the next site build.
5. If nothing changed, do not commit or push — say so plainly.

## Report

State which skills were synced, the commit hash (if any), and confirm the push
reached `origin/main`. If the edit touches loop rules, authority, or the
promotion ladder, note that the canon (`docs/compound-engineering/ui-gates-canon.md`)
and the consistency lesson (`knowledge/lessons/uig-consistency.md`) should be
reviewed for the same change.
