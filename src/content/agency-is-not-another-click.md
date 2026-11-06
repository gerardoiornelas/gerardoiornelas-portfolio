---
slug: "/agency-is-not-another-click"
date: "2026-11-06"
title: "Agency Is Not Another Click"
author: "Gerardo I. Ornelas"
category: "Human–AI Interaction"
metaTitle: "Human Agency in Proactive Automation"
description: "Proactive systems can preserve agency without asking first—if they reveal uncertainty, explain changes, and provide contest and recovery."
tags:
  - Human Agency
  - Proactive Automation
  - Human-AI Interaction
  - HCI
  - Automated Valuation Models
  - Public-Service Systems
  - AI Governance
featuredImage: "../images/blog/agency-is-not-another-click.jpg"
---

*Editorial Series: Human–AI Interaction & Research Field Notes*

> **Target Question:** Does human agency require approval before an automated system acts?
>
> **Direct Answer:** Human agency does not require initiating or approving every beneficial automated action. It requires legible inference and uncertainty, notice of what changed, and reliable ways to contest, correct, or reverse the outcome. Approval before action is one control; understanding and recovery after action are others.

---

Imagine that a system notices you may be paying for mortgage insurance you no longer need.

It estimates your home’s value, determines that you appear eligible, and removes the charge before you know to ask.

Did automation reduce a burden—or take control away from you?

The answer cannot be found by counting approval screens.

---

## When Help No Longer Waits for a Request

Executive Order 14438, dated October 22, 2026, directs the Federal Housing Finance Agency Director—if specified determinations are made—to direct Fannie Mae and Freddie Mac to establish a pilot for mortgages made after it begins. The process would use automated valuation models and other data to identify borrowers who appear to satisfy equity and other requirements for mortgage-insurance cancellation. It also calls for prompt notice and fewer unnecessary documentation and appraisal costs.

Source: [The White House](https://www.whitehouse.gov/presidential-actions/2026/10/decreasing-housing-costs-for-the-american-people/)

This is a conditional directive, not evidence that insurance is already being canceled automatically nationwide. It supplies a useful interaction problem: a system may deliver a benefit before someone knows it is available.

Traditional software waits. Proactive software infers that action may help and moves first.

---

## Another Approval Is Not Always More Agency

The obvious response is to require confirmation before anything changes.

Sometimes that is right. But a prompt can recreate the burden automation was meant to remove. A person may not understand the valuation, eligibility rules, or consequences well enough to make the click meaningful. The interface can preserve involvement while adding little control.

Agency is not how often someone is asked to approve. It is the ability to understand what the system believes, influence what happens, and recover when the belief is wrong—a principle central to [human agency in the age of AI](/blog/labor-day-ai-future-of-work-human-agency/).

---

## What a Proactive System Owes the Person

### Show the inference
State the consequential claim: “Current data suggests you may satisfy the equity requirement.” Identify the relevant evidence and rule instead of saying only that “AI found savings.”

### Show uncertainty
An automated valuation is an estimate, not a fact. Disclose material uncertainty, missing data, and conditions that could change eligibility.

FHFA’s AVM quality-control rule provides context. For covered uses, it requires controls addressing confidence in estimates, data manipulation, conflicts, testing and review, and nondiscrimination. The rule does not establish the accuracy or fairness of this proposed pilot.

Source: [Federal Housing Finance Agency](https://www.fhfa.gov/regulation/federal-register/final-rule/quality-control-standards-for-automated-valuation-models)

### Show what changed
Notice should identify the amount, effective date, evidence used, and downstream consequence. “We helped you” is not an adequate account of an action.

### Make correction and recovery real
Let people correct data, request human review, contest an estimate, and understand whether an action can be reversed. Recovery should not depend on persuading the same automated system that made the decision.

These are proposed design requirements, not findings established by the Executive Order.

---

## The Strongest Objection: Some Actions Should Not Move First

A system can be confidently wrong. A mistaken valuation may affect financial obligations, contractual rights, safety-and-soundness considerations, or later disputes. Notice after an irreversible action is not meaningful control.

Just as [autonomous systems need controls that push back](/blog/autonomous-systems-controls-that-push-back/) to prevent authority from drifting silently into the background, automated systems cannot treat every scenario as an opportunity to move unprompted.

The answer is not a universal “act first” rule. Match interaction to consequence:

- **Ask before acting** when harm may be serious or difficult to reverse.
- **Act and notify** when likely benefit is high, downside is bounded, and recovery is dependable.
- **Monitor and offer** when uncertainty is too high for automatic action or a burdensome approval request.

This thesis would fail if people could not understand the notice, correction rarely changed outcomes, recovery was nominal, or mistakes imposed costs that later remedies could not repair.

---

## Agency Exists Before and After the System Moves

Autonomous and ambient systems require agency before action, during action, and after action.

Much like [establishing an interruption contract for always-on AI](/blog/always-on-ai-interruption-contract/), proactive systems must separate the opportunity to act from the justification for doing so.

Sometimes that means permission. Sometimes it means a visible boundary and dependable stop. Sometimes it means allowing a system to remove a burden without forcing someone to discover the right form and ask first.

Agency can survive action without a command—but only when the person can understand, contest, and recover from what the system did.

Agency is not another click. It is the quality of control around the consequence.

---

## Primary Sources & Related Reading

- **Executive Order 14438 (Oct. 22, 2026):** [Decreasing Housing Costs for the American People](https://www.whitehouse.gov/presidential-actions/2026/10/decreasing-housing-costs-for-the-american-people/)
- **FHFA Final Rule (2024):** [Quality Control Standards for Automated Valuation Models](https://www.fhfa.gov/regulation/federal-register/final-rule/quality-control-standards-for-automated-valuation-models)
- **Related Analysis:** [Labor Day in the Age of AI: The Future of Work Is a Human Agency Problem](/blog/labor-day-ai-future-of-work-human-agency/)
- **Related Analysis:** [Why Autonomous Systems Need Controls That Push Back](/blog/autonomous-systems-controls-that-push-back/)
- **Related Analysis:** [Always-On AI Needs an Interruption Contract](/blog/always-on-ai-interruption-contract/)
