# Graph + Jev + AAR: an alternative to human-gated UI-GATE

**Status: proposal, not canon.** Per [ui-gates-canon.md](ui-gates-canon.md)'s own rule ("changes to governing rules... require explicit approval"), adopting any part of this is itself a gated decision for the principal — this doc does not change canon by existing.

## Problem

[ui-gates-canon.md](ui-gates-canon.md) already names the target substrate: **KF + Graph**, "the repository-committed knowledge substrate and its relationship/retrieval layer." What UI-GATE actually does today, in the `uigates` CLI, is narrower and more expensive than that name implies:

- Authorization for gated (medium/high impact) work requires a human in the loop before execution (canon: "Gated actions require explicit principal approval before execution").
- Knowledge is scoped per-project (`.uigates/knowledge`), populated only from that project's own receipts, and matched by **exact normalized action text** — a limitation [mvp.md](../../../../uigates/docs/mvp.md) finding 2 already named: "Reuse is matched by exact action text... lessons about similar work worded differently never combine."
- Measured cost: the `token-ab` evaluation (three independent runs — two pilots plus one full 16-task Workboard suite) found the gate/receipt ceremony carries a consistent ~85% token-cost premium over an ungated agent, with no measurable benefit from knowledge reuse in the one run that tested it.
- Direct usage signal: the person who built and runs `uigates` reports not using the gating feature in practice, and expects informed decisions to come from an always-current knowledge graph instead of a blocking approval step.

The ceremony and the learning discipline are currently bundled into one mechanism. They don't have to be.

## Proposal: separate "informed and fast" from "closes the loop"

Three pieces, two of which already exist outside this repo:

### 1. Graph (OKF + graphify) — replaces ad hoc discovery, not receipts

An always-updated knowledge graph (codebase structure, relationships, prior decisions — built with the `graphify` skill, validated against OKF) is the context source at decision time, in place of grepping/reading the repo fresh or waiting on a per-project receipt ledger. This is the literal fix for "make a more informed decision... without burning tokens parsing the codebase."

This does not compete with UI-GATES' knowledge ladder (`Ephemeral → Task → Decision → Knowledge → Canon`) — it's the retrieval layer the ladder was always supposed to sit on top of, generalized across projects instead of trapped inside one project's `.uigates/` directory.

### 2. Jev — replaces the *human* gate with an *advisory* one, for ordinary risk

`Jev` is a real, already-cataloged decision model (`~/.hermes/hermes-agent/plugin-catalog/jev*.yaml`), not a hypothetical. The relevant variant is `jev-approvals`: "TypeSafe's Jev decision model as the smart-approval reviewer only... every flagged command... [decides] APPROVE/DENY/ESCALATE; upstream errors fail closed to ESCALATE."

That's a direct swap for canon's current rule that gated work needs explicit principal approval *before* execution — for ordinary-risk work. Consequential work still escalates to a human; the difference is that "ordinary" no longer stops on a person by default.

**Real constraint, not a footnote**: `jev-approvals` calls a third-party API (`api.typesafe.ai` direct, or OpenRouter) for every decision. The flagged command (redacted best-effort) and the approval policy text leave the machine. It needs `TYPESAFE_API_KEY` or an `OPENROUTER_API_KEY` in the credential pool. This is a real data-boundary decision, not an implementation detail — it should be opt-in, visible, and the user's call per project, not a silent default.

`jev-memory-selector` is a second, separate piece worth noting: it's aimed at the exact weakness [mvp.md](../../../../uigates/docs/mvp.md) already flagged — semantic (not exact-string) lesson matching, "the strongest case for the semantic-match idea from the Jev discussion."

### 3. AAR — unchanged, and is *why* the graph stays current

Nothing here touches the closing protocol. [ui-gates-canon.md](ui-gates-canon.md)'s Verify → Receipt → Synthesize already *is* the four-question After Action Review (what was supposed to happen, what happened, why the difference, what will be done differently). That discipline is what keeps the graph "always updated" — every closed loop's Synthesize step is a write back into the graph, not a separate refresh job. Removing the human gate for ordinary work does not remove AAR; it's the one piece of the current loop that's already earning its keep and should not be touched.

## What changes vs. what doesn't

| Canon element | Today | Proposed |
| --- | --- | --- |
| Discover / context | project files, `.uigates/brief` (per-project, exact-match) | graphify-backed graph (cross-project, relationship-aware, always current) |
| Propose → UI-GATE (ordinary risk) | authorize, or wait on human for gated | Jev advisory judgment (APPROVE/DENY/ESCALATE), no human wait for APPROVE |
| Propose → UI-GATE (genuine risk) | human gate | still a human gate — Jev's ESCALATE path, fail-closed |
| Verify → Receipt → Synthesize (AAR) | unchanged | unchanged |
| Knowledge promotion ladder | unchanged | unchanged, but fed by the graph instead of (or in addition to) `.uigates/knowledge` |

## Open questions before this is more than a proposal

1. **Data boundary**: is sending flagged commands + policy text to a third-party API (TypeSafe/OpenRouter) acceptable, per project? This needs an explicit, per-project opt-in — never a silent default.
2. **What counts as "ordinary" vs. "genuine" risk** — canon's low/medium/high impact framing already exists; does Jev's APPROVE/DENY/ESCALATE map onto it directly, or does the risk boundary need to be redrawn?
3. **Where does `uigates` end and Hermes/Jev begin** — is this a pluggable decision-backend interface inside `uigates authorize` (smallest change, opt-in via env var), or a deeper redesign that retires the human-gate path entirely for some projects?
4. **Graph provenance** — canon requires every durable artifact to retain provenance to its source and evidence. A cross-project graph needs the same discipline graphify's knowledge graph already has, not a downgrade in exchange for reach.

## Smallest next step

A spike: an optional, env-var-gated decision backend inside `uigates authorize`, tried against a stubbed/local judge first (no external call, no credential needed) to prove the integration point, before wiring a live `jev-approvals` call that any project would have to opt into explicitly.
