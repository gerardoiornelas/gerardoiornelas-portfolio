---
title: Verify lesson approval history at read time
type: task-receipt
status: partial
intent: "Stop a lesson from becoming retrievable by hand-writing an approved
  history file. Derive lesson state by replaying history against the stored
  plan, evaluation report and approval content hash, so promotion cannot be
  self-awarded (canon: promotion is never automatic and never self-awarded)."
sources:
  - scripts/uig-learning.js
  - scripts/uig-learning.test.js
  - docs/compound-engineering/receipt-learning.md
authorization:
  state: delegated
  source: User asked to merge the reference engine's findings into this harness,
    chose 'Read-time verification + attack tests' on a new branch with no engine
    code ported, and then requested 'commit and push'.
  scope: Local edits to scripts/uig-learning.js, its tests and receipt-learning.md
    on branch uig-verify-approval-chain, and commit and push of that branch to
    origin. No merge to main, no deployment, no site change.
  valid_until: Completion of this commit and push.
acceptance:
  status: partial
  human_review: pending
  reviewer: Implementing agent (Claude) ran automated local verification and
    mutation testing; principal review of the diff and of the change to approval
    semantics is outstanding
  evidence:
    - "npm run okf:test: 75 tests passed, 0 failed. 13 are new in
      uig-learning.test.js: one positive control and 12 attack cases (forged
      approval on an unevaluated lesson, evaluation naming no plan, plan never
      evaluated, approval for other content, approval missing
      principal/source/scope/expiry, terminal retirement, reasonless retirement,
      invalid history refused by plan and counted in stats, a real evaluation
      borrowed for a co-selected lesson that earned nothing, altered report,
      altered plan, evaluation recorded after approval)."
    - Before the change the first 8 attack tests failed and the control passed.
      A probe of the real Learning class in a temporary store showed retrieve()
      returning a lesson whose approved history file was hand-written with no
      evaluation and no principal approval.
    - "Mutation test on a scratch copy: 11 of 11 single-guard breaks in the
      verifier were caught by the tests. The first pass caught 8 of 14: three
      untested guards received tests, three redundant clauses were removed, and
      one mutant was equivalent because a preceding usable() check masks it."
    - "npm test (site content): 2 passed. npm run uig:learn -- stats still runs.
      Both changed JS files already failed prettier at HEAD and were not
      reformatted."
    - "graphify update . (local, code-only) refreshed the code graph. The
      documented graphify . --update was not completed: it needs an LLM API key
      for 150 doc and image files, so the documentation layer of the graph is
      not refreshed."
aar:
  expected: A lesson is retrievable, plannable and suppliable only after a real
    evaluation and a principal approval bound to its content; hand-written
    history cannot substitute.
  actual: state() now replays history. An evaluated event needs a stored plan and
    evaluation report with a matching plan hash, transfer_supported, and at
    least two transfer pairs for that lesson. An approved event needs a prior
    evaluated state and an approval bound to the lesson content hash with
    principal, source, scope and expiry. Retirement is terminal and needs a
    reason. Unbacked history yields invalid-history, which retrieve, plan, start
    and approve refuse and stats counts.
  difference: The first version accepted a real evaluation of one lesson as
    vouching for a co-selected lesson that earned no transfer, because the plan
    and report only listed it; an attack test built from the existing
    co-selection fixture exposed it and the check now requires per-lesson
    transfer. Mutation testing found untested guards and redundant clauses. A
    mutually consistent set of forged files (plan, report and history) still
    passes, and approvals remain unauthenticated local attestations; closing
    that needs approvals signed with a key the agent cannot read. Principal
    acceptance is pending.
  learning: "A gate enforced only in an API call is not a gate: any state machine
    whose current state is read from files must re-verify each transition
    against the artifacts it produced, at read time. This is a task-level note;
    promoting it to a decision or knowledge is left to the principal."
---

# Task receipt

## After Action Review

See the structured aar answers and acceptance evidence above.
