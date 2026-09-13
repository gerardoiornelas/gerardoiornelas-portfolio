# Portfolio Knowledge Bundle

This is the committed, app-local Open Knowledge Format (OKF) context bundle for the Gerardo I. Ornelas portfolio.

- `okf.yaml` is the routing manifest and Graphify refresh contract.
- `context.md` is the minimal high-value context every agent should load before work.
- UI-GATES doctrine and its Compound Engineering coding playbook live in `../docs/compound-engineering/`.

Generated Graphify outputs are intentionally excluded from git. They are a rebuildable retrieval layer over the repository's committed source of truth.

- `lessons/index.md` routes task-specific retrieval; load only applicable lessons.
- `templates/template-receipt.md` defines the required structured frontmatter for added or modified receipts. Historical unchanged receipts remain valid history.
- `npm run okf:validate` validates staged content and exact source-path coverage. Empty-index runs check the working bundle only. The validator checks structure, not truth or actual permission; human evidence review remains necessary.
- `npm run okf:test` exercises staged/working-tree divergence and receipt failure cases.
- `../docs/compound-engineering/token-pilot.md` defines measurement before claiming savings.
