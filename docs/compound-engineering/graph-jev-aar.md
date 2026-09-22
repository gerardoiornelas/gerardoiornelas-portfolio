# Graph + Jev + AAR: an alternative to human-gated UI-GATE

**Status: decided direction, canon not yet updated.** On 2026-09-22 the principal chose the solo-workflow fork over the team/compliance-gated product (see "What changes vs. what doesn't" below and the open questions this resolves). `uigates advise` (the TypeSafe/Jev backend) is live and proven against real records. What's still open is *how* `advise`'s APPROVE becomes authority-granting rather than advisory-only — see the updated open questions. [ui-gates-canon.md](ui-gates-canon.md) itself ("Gated actions require explicit principal approval before execution") has not been edited yet; that edit is the actual canon change this decision implies, and per canon's own rule it still needs its own explicit sign-off before landing.

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

## Resolved

1. **Data boundary**: acceptable, opt-in per invocation (`UIGATES_JEV_BACKEND=typesafe` + `TYPESAFE_API_KEY`, read from a gitignored `.env` or the real environment — never a project default, never a CLI flag). Live and working.
2. **Which fork**: solo workflow, decided 2026-09-22. Graph context + advisory judgment + AAR, human gate reserved for genuinely irreversible/high-blast-radius work — not the team/compliance product where every gate needs a provable human yes.

## Open questions, now that `advise` is proven and the fork is decided

3. **How does APPROVE grant authority, not just advise it?** `GovernanceEngine.authorize()` today hard-requires `principalId === intent.principalId` — it has no concept of a non-human approver. Making `advise`'s APPROVE actually authorize means either (a) a new authorization path that records a distinct, honest identity for a machine-granted approval (e.g. `authorizedBy: "jev:typesafe-jev"`, never impersonating the human principal), or (b) keeping `authorize --approved-by` as-is and building `advise`-then-auto-authorize as a wrapper that still writes `--approved-by <principal>` — which would be dishonest provenance (claiming the human decided when a model did). (a) is the honest option.
4. **Does a Jev-approved authorization change what `uigates audit`'s consent check means?** Today's INFO finding ("principal consent cannot be proven from records... confirm a user message approved it") assumes the only path to gated authority is a human. A machine approval's own API response (verdict, confidence, the six signals) is hashable, storable evidence — arguably *stronger* provenance than today's bare `--approved-by <string>`, which proves nothing on its own. The audit should likely distinguish the two paths, not flag a machine approval as unprovable in the same way.
5. **Where's the line for "still needs a human"?** Not every gate should auto-resolve on APPROVE even in the solo-workflow fork — canon's `ResourceProtectionPolicy` (CI, secrets, deployment config) and cumulative-risk escalation exist for a reason. Does APPROVE bypass the human gate for all gate-class resources uniformly, or does some subset (secrets, deploy, CI) stay human-only regardless of what Jev says?
6. **Canon edit**: once 3–5 are settled, [ui-gates-canon.md](ui-gates-canon.md)'s "Gated actions require explicit principal approval before execution" needs an explicit edit — not a silent drift — to state the machine-approval path as a first-class alternative.
