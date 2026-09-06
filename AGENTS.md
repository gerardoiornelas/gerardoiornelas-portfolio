# Portfolio Agent Contract

## Start Here

Before changing this repository, read:

1. `knowledge/context.md`
2. the touched route, component, or document
3. `package.json` when changing the site

For UI-GATES work, also read:

- `docs/compound-engineering/ui-gates-canon.md`
- `docs/compound-engineering/operating-system.md`

## Knowledge and Graph

- Treat committed repository source and approved decisions as authoritative.
- Treat Graphify outputs as generated retrieval aids, never as authority over source code or approved knowledge.
- For a meaningful completed change, capture only warranted learning in the same commit: a task note, decision, reusable pattern, or canon.
- Preserve provenance: link the relevant code, plan, test evidence, and decision rather than writing unsupported summaries.
- Refresh the graph after material code or knowledge changes with `graphify . --update`.

## Authority

UI-GATES is the governing system. Reasoning proposes; authority decides. Do not treat credentials or tool access as authorization. Reading and scoped local editing are allowed for the active task; deploys, pushes, external communication, and production-impacting actions require explicit approval.

## Validation

Run `npm run build` for meaningful site changes. Use `GATSBY_TELEMETRY_DISABLED=1 npm run build` when the environment blocks Gatsby's global feedback file.
