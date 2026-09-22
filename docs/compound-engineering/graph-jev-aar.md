# Graph + Jev + AAR: an alternative to human-gated UI-GATE

**Status: implemented and canon updated.** On 2026-09-22 the principal chose the solo-workflow fork over the team/compliance-gated product, chose no carve-out for gate-class resources, and gave explicit sign-off to edit [ui-gates-canon.md](ui-gates-canon.md) itself. `uigates advise` and `uigates authorize --jev` (uigates repo, commits `31fd765`, `8bf9c5e`) are live, tested (264 passing), and proven against both real records and live calls to api.typesafe.ai. Canon's "Authorization and acceptance" section now states the machine-approval path as a first-class alternative to principal approval, with honest provenance (`authorizedBy: "jev:<backend>"`) required either way.

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
3. **How does APPROVE grant authority, not just advise it?** `GovernanceEngine.authorizeViaAdvisory()` — a new method, not a change to `authorize()`'s own trust check. It records `authorizedBy: "jev:<backend>"`, derived only from the backend's own name on the decision it actually returned, never a caller-supplied string, so it cannot be used to forge a human's approval. `AuthorityLedger.admitReceipt()` needed its own fix to recognize the convention at spend-time, not just at issuance — same trust level as the human path (a string match, not cryptographic proof), not a new weakness.
4. **Does a Jev-approved authorization change what `uigates audit`'s consent check means?** Yes — implemented. The audit now reports a machine approval as a machine judgment, not as unprovable human consent. Still an open gap, stated plainly in the audit's own finding: the decision itself (verdict, confidence, the six signals) is only ever printed to stdout, not yet persisted as hashed evidence, so the audit can confirm *which path* was taken but not yet verify the judgment was real.
5. **Where's the line for "still needs a human"?** No carve-out, decided 2026-09-22: APPROVE bypasses the human gate uniformly, including for gate-class resources (secrets, deploy, CI, dependencies) — a real, explicit choice, not an oversight. Live-tested: every real gate-class call made so far ended in ESCALATE (self-referential or intent-misaligned proposals were correctly caught; a genuine low-risk APPROVE at confidence 0.52 was correctly downgraded by the 0.7 confidence floor), so the uniform policy hasn't yet been exercised by an actual auto-approved gate-class action. Worth revisiting the confidence floor with more live data once it has.
6. **Canon edit**: done. [ui-gates-canon.md](ui-gates-canon.md)'s "Authorization and acceptance" section states the machine-approval path as a first-class alternative to principal approval, not a silent drift.
