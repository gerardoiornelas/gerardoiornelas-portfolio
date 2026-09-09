---
slug: "/generated-ai-interfaces-what-must-stay-fixed"
date: "2026-09-09"
title: "When Software Generates Its Own Interface, What Must Stay Fixed?"
author: "Gerardo I. Ornelas"
category: "Human–AI Interaction"
tags:
  - AI Generated Interfaces
  - Human-Computer Interaction
  - HCI
  - Human Agency
  - Authority Layer
  - Predictability
  - Accessibility
featuredImage: "../images/blog/generated-ai-interfaces-what-must-stay-fixed.jpg"
---

For most of computing history, an interface has been a promise.

A button may move after an update. But within a particular version, the same control generally means the same thing each time. Designers decide what can happen, engineers encode those behaviors, and everyone receives a shared surface.

That arrangement can feel restrictive. It is also why people can learn software, teach it, document a process, and notice when something goes wrong.

Now that promise is changing.

Runway recently introduced Solaris, an early research system it calls an “Interface World Model.” Instead of serving fixed coded screens, Solaris generates an interactive interface frame by frame as a person clicks, drags, types, or speaks. The interface does not merely display generated content. The interface itself is generated.

That raises one of the most important HCI questions of the AI era:

**What must remain stable when the screen becomes probabilistic?**

---

## From Navigating Software to Shaping It

Traditional software makes designers anticipate possible interactions. A shopping site has a product page, cart, and checkout because those states were implemented in advance.

A generated interface can respond more fluidly. Runway demonstrates scenes where people manipulate objects directly and where one environment supports interactions that were never laid out as buttons or menu items.

The appeal is obvious. Software could meet a person in the context of the task instead of making the person learn the application. A tutorial could render the next step around what someone is seeing. A store could behave more like a showroom than a catalog. The presentation could adapt without waiting for a product team to ship a redesign.

This moves us toward software organized around intent rather than apps.

But adaptability is not the same as usability.

---

## Fixed Interfaces Created Common Ground

A conventional interface gives people a shared reference.

A support representative can say, “Open Settings and choose Privacy.” A screen-reader user can learn a reliable sequence. A compliance team can document where approval occurs. Two people can look at the same screen and discuss the same thing.

Generated interfaces may weaken that common ground. If a screen changes for every person—or the same gesture can lead to different outcomes—then instructions, expectations, and accountability become harder to share.

Personalization can improve fit while reducing predictability.

Predictability is not merely technical. It is part of the relationship between a person and a system. People build confidence by learning what causes what. When cause and effect become unstable, the user may be surrounded by intelligence while understanding less about how to act. As explored in our look at [human agency in the age of AI](/blog/labor-day-ai-future-of-work-human-agency/), eliminating mechanical friction should never come at the expense of human understanding and command.

---

## The Surface May Change; The Invariants Should Not

Good generated interfaces need stable invariants beneath adaptable surfaces.

### Consequential actions need consistent meaning
“Send,” “buy,” “publish,” and “delete” cannot quietly change meaning because the interface inferred a new context. People must recognize when an action crosses from exploration into consequence. Enforcing this boundary requires an explicit [Authority Layer](/authority-layer/)—governed by protocols like [APP (Agent Permission Protocol)](/blog/securing-autonomy/)—so runtime reasoning cannot unilaterally expand execution authority.

### State changes must be legible
If the system moves an object, changes a value, commits a transaction, or starts an external process, that transition should be visible. [Preview and execution must remain distinct](/blog/verifiably-human-part-2/), ensuring the user always knows whether they are exploring possibilities or committing state.

### Recovery must be designed in
Generative systems will surprise us. Recovery cannot depend entirely on the same system improvising its way back. Reversible actions, checkpoints, and histories need to exist outside the presentation layer.

### Accessibility needs durable structure
Runway acknowledges that generated interfaces must integrate with screen readers and accessibility APIs. A visual stream cannot become the only truth. Assistive technologies need a structured representation of controls, relationships, state, and meaning to maintain dependable security UX across all modalities.

### Material adaptation should be disclosed
Users do not need an alert for every cosmetic change. They do need to know when personalization changes available choices, prices, permissions, evidence, or the route to a consequential outcome.

---

## Adaptive Should Not Mean Arbitrary

After years working with design systems, I see their value less as visual consistency and more as behavioral consistency. A good design system reduces the number of meanings people must learn. It creates a dependable vocabulary.

Generated interfaces should extend that achievement, not discard it.

Imagine layout, imagery, explanation, and interaction style adapting to the person while action semantics, accessibility structure, authority boundaries, and recovery behavior remain fixed and inspectable. The experience becomes personal without becoming unknowable.

That is the opportunity.

The next era of HCI may not be a choice between static and infinitely generated software. It may be defined by deciding which parts of the experience may move—and which promises must never be generated on the fly.

---

## Sources & Further Reading

- **Runway Research — Introducing Solaris:** [https://runway.com/news/research/introducing-solaris](https://runway.com/news/research/introducing-solaris)
- **arXiv — Interface World Models:** [https://arxiv.org/abs/2609.00776](https://arxiv.org/abs/2609.00776)
- **Related Analysis:** [Labor Day in the Age of AI: The Future of Work Is a Human Agency Problem](/blog/labor-day-ai-future-of-work-human-agency/)

---

## Frequently Asked Questions

### What is an AI-generated interface?
An interface whose visuals or behavior are produced dynamically by AI rather than fully predefined in code.

### Are generated interfaces accessible?
Only if they expose durable semantic structure to assistive technology; a visual stream alone is insufficient.
