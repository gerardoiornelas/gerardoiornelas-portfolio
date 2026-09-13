# Portfolio Agent Contract

## Start Here

Before changing this repository, read:

1. `knowledge/context.md`
2. the touched route, component, or document
3. `package.json` when changing the site

Use the task routing table in `knowledge/context.md` for additional reading. Read the UI-GATES canon for public terminology or governing behavior changes, and the operating-system document when changing workflow, gates, receipts, or learning behavior. Routine styling or isolated tests do not require the full architecture documents. Expand retrieval whenever scope or evidence requires it.

## Knowledge and Graph

- Treat committed repository source and approved decisions as authoritative.
- Treat Graphify outputs as generated retrieval aids, never as authority over source code or approved knowledge.
- For a meaningful completed change, capture only warranted learning in the same commit: a task note, decision, reusable pattern, or canon.
- **Commit & Push Rule**: Always update and sync the OKF bundle (`knowledge/context.md`, `knowledge/okf.yaml`, and associated receipts/learning) and refresh the knowledge graph (`graphify . --update`) before any commit and push.
- Preserve provenance: link the relevant code, plan, test evidence, and decision rather than writing unsupported summaries.
- Refresh the graph after material code or knowledge changes with `graphify . --update`.

## Authority

UI-GATES is the governing system. Reasoning proposes; authority decides. Do not treat credentials or tool access as authorization. Reading and scoped local editing are allowed for the active task; deploys, pushes, external communication, and production-impacting actions require explicit approval. Proceed within valid delegated scope; gated actions require approval before execution; prohibited actions stop. Changes to authority, permissions, verification, or completion rules require principal approval. Authorization precedes execution; acceptance follows verification and cannot retroactively authorize work.

## Validation

Run `npm run build` for meaningful site changes. Use `GATSBY_TELEMETRY_DISABLED=1 GATSBY_FEEDBACK_DISABLED=1 npm run build` for restricted telemetry/feedback writes; these flags disable different services. If global configuration still fails, read `knowledge/lessons/gatsby-build.md`. Run `npm run okf:test` for receipt-tooling changes. Required verification and human acceptance remain mandatory regardless of retrieval scope.
