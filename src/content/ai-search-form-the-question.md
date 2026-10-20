---
slug: "/ai-search-form-the-question"
date: "2026-10-20"
title: "AI Search Should Help You Form the Question, Not Just Answer It"
author: "Gerardo I. Ornelas"
category: "Human–AI Interaction"
tags:
  - Human-AI Interaction
  - HCI
  - Exploratory Search
  - AI Search
  - Knowledge Work
  - Interaction Design
  - Human Agency
featuredImage: "../images/blog/ai-search-form-the-question.jpg"
---

*Editorial Series: Human–AI Interaction & Research Field Notes*

> **Target Question:** How should AI help when I do not yet know what question to ask?
>
> **Direct Answer:** When the question is unclear, AI should support bounded exploration: show multiple paths, preserve user-controlled reading traces, and shift into resolution mode once the information need stabilizes. Early evidence is suggestive; it does not establish better long-term research quality.

---

The blank prompt looks like freedom.

Ask anything.

But it also hides a demand: before the system can help, the person must already know enough to phrase a useful question.

Sometimes the question is not the starting point. It is the result of reading.

---

## Search Is Not Always Retrieval

Most AI search products compress a familiar sequence:

**PROMPT → RETRIEVE → SUMMARIZE → ANSWER**

The sequence works when intention is clear. The problem begins when it is incomplete.

Marcia Bates's 1989 “berrypicking” model described search as an evolving process in which each encounter can change the query. Gary Marchionini later distinguished direct lookup from exploratory search for learning and investigation.

Generative AI did not create this tension. It intensified it. A fluent answer can make an unfinished question feel settled.

---

## What Wistful Actually Found

A 2026 preprint, “Feeling Wistful,” examines what happens before a precise query exists.

Wistful lays out scholarly papers and preserves a reader's movement as a “creative reading trace.” Sixteen HCI researchers—eight junior and eight senior—each completed one 15-minute task with Wistful and one with their usual workflow.

Interests, semantic proximity, and citation links shaped different paths. Ratings were broadly comparable. Wistful was descriptively favored for reflection, enjoyment, reuse, and usefulness of the record; ratings for forming a well-developed inquiry were mixed.

The short study used 771 UIST papers. It did not test better research, originality, or durable learning.

The narrower takeaway: a reading path can reveal parts of an emerging inquiry that a final query erases.

---

## The Path Can Help Create the Criterion

Relevance is often treated as if it exists before search begins.

In exploratory work, relevance may emerge through searching: new language, a neighboring field, or a disagreement can clarify what matters.

An AI system that resolves ambiguity immediately can answer the first question before the person discovers a more important one.

That does not make inefficiency virtuous. It means the system should recognize the stage of inquiry before optimizing it away.

---

## AI Research Tools Need Two Modes

### Resolve When the Goal Is Known

Resolution mode should retrieve sources, compare claims, expose disagreements, summarize evidence, and answer a bounded question. Success means accuracy, coverage, traceability, and time saved.

### Explore When the Goal Is Forming

Exploration mode should reveal several plausible paths; preserve what the person opened, rejected, connected, or annotated; show how interests changed; delay synthesis until requested; and make the switch into resolution mode explicit.

Success is better orientation: a more meaningful question whose formation remains visible.

This is the same design problem we raised when asking [what must stay fixed when software generates its own interface](/blog/generated-ai-interfaces-what-must-stay-fixed/): adaptive systems still need stable, legible boundaries—here, an explicit boundary between exploring and resolving.

---

## Preserve the Path Without Surveilling the Reader

Reading traces can reveal uncertainty, abandoned ideas, health concerns, or mistakes. Treat them as user-controlled working material, not institutional telemetry: private by default, selectively shared, visibly retained, editable, and deletable.

---

## Sometimes the Detour Is Just a Detour

Exploration can become avoidance, reinforce familiar interests, or create overload. AI synthesis is valuable because attention is limited.

The answer is not to romanticize wandering. It is to stop treating every unknown as the same problem.

When the question is stable, help resolve it. When it is forming, help the person notice, compare, and revise what draws their attention.

---

## Good Interaction Preserves Productive Uncertainty

The usual measure of AI search is how quickly it moves from prompt to answer.

A better measure depends on the stage of thought.

Did the system retrieve the right evidence when the goal was known?

And when the goal was not yet known, did it leave room for the person to discover what was worth asking?

Good AI should not preserve confusion for its own sake. But it should recognize that uncertainty is sometimes unfinished judgment—not a defect waiting for autocomplete.

Like [AI as rehearsal](/blog/ai-rehearsal-after-interface/), and like the broader argument for [human agency in the future of work](/blog/labor-day-ai-future-of-work-human-agency/), the value of the interaction may lie in what the person is better able to do—here, ask a better question.

---

## Primary Sources

- **Liu et al. (submitted Oct. 7, 2026):** [Feeling Wistful](https://arxiv.org/abs/2610.10890)
- **Marcia J. Bates (1989):** [The Design of Browsing and Berrypicking Techniques for the Online Search Interface](https://pages.gseis.ucla.edu/faculty/bates/berrypicking.html)
- **Gary Marchionini (2006):** [Exploratory Search: From Finding to Understanding](https://dl.acm.org/doi/10.1145/1121949.1121979)
- **Related Analysis:** [When Software Generates Its Own Interface, What Must Stay Fixed?](/blog/generated-ai-interfaces-what-must-stay-fixed/)
- **Related Analysis:** [The Interface Ended. The Interaction Didn’t.](/blog/ai-rehearsal-after-interface/)
- **Related Analysis:** [Labor Day in the Age of AI: The Future of Work Is a Human Agency Problem](/blog/labor-day-ai-future-of-work-human-agency/)

---

## Frequently Asked Questions

### What is exploratory search?
Search used to learn, investigate, and refine the question—not only retrieve a known answer.
