# Receipt authoring

Run `npm run okf:receipt -- --init /tmp/task-receipt.yaml`, fill the explicit YAML fields, then run `npm run okf:receipt -- YYYY-MM-DD-slug /tmp/task-receipt.yaml`. The helper uses the same validator as `okf:validate`, rejects incomplete evidence or authority, checks exact source paths, and refuses to overwrite an existing file. It does not gather unrelated changes or infer approval. For amendments, edit the existing receipt and validate the staged bundle.

Both status fields start as `partial`, with `acceptance.human_review: pending`. After automated checks, a task awaiting required human review stays partial even when all tests pass. Record the evidence reviewer and outstanding human check in the evidence and actual-outcome fields. Only mark human_review accepted after the human accepts; use not-required when the task has no human acceptance requirement. Authorization is always a separate pre-execution requirement.

A partial, failed, or blocked receipt can validly preserve evidence and cover source paths in a commit. Structural validation is a record-quality check, not a completion or deployment gate. It never grants authority, proves evidence, or replaces human review. Historical receipts without human_review remain compatible.

Only list exact paths this task covers. Deleted sources must be tracked deletions. The helper checks working files; `npm run okf:validate` checks the staged bundle when the index contains changes. Before committing, follow the OKF and graph requirements in `AGENTS.md`.
