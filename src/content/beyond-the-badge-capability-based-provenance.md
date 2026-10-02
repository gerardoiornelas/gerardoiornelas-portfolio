---
slug: "/beyond-the-badge-capability-based-provenance"
date: "2026-10-02"
title: "Beyond the Badge: Capability-Based Provenance"
author: "Gerardo I. Ornelas"
category: "The Trust Stack"
tags:
  - The Trust Stack
  - Capability-Based Provenance
  - Authority Layer
  - Content Credentials
  - C2PA
  - W3C Verifiable Credentials
  - RFC 9396
  - Agentic Trust
featuredImage: "../images/blog/beyond-the-badge-capability-based-provenance.jpg"
---

*Editorial Series: The Trust Stack: Architecture, Identity & the Battle for Authentic Media — Part IV of V*

> **Target Question:** How can people tell what humans and AI contributed—and what each participant may do?
>
> **Direct Answer:** Identity tells us who or what is acting. Provenance records origin and history. Authenticity tells us whether evidence is credible. None grants authority. Trustworthy human–AI systems need explicit capabilities: permission for a specific actor to perform a specific action on a specific asset, within limits, until expiry or revocation—checked again where the action becomes consequential.

---

## Beyond the Badge: Capability-Based Provenance

The internet is learning to attach receipts to media. Content Credentials can record who signed an asset, which tools touched it and which transformations were declared. Verifiable credentials can package claims in tamper-evident form. Secure capture can strengthen the first link in the chain.

These advances are easy to overread. A receipt can show that a camera captured an image; it cannot decide whether a publisher may distribute it. A credential can identify a person; it cannot decide whether that person may license a likeness. A provenance trail can record AI participation; it cannot decide whether the output may train another model.

The missing question is not only “What happened?” It is “What may happen next?”

---

## The Badge Is Carrying Too Much Meaning

A “verified” badge often collapses six ideas:

- **Identity:** who or what is acting.
- **Provenance:** origin and history.
- **Authenticity:** whether evidence is credible.
- **Authority:** the right to act in context.
- **Capability:** the action currently permitted.
- **Trust:** the judgment made from those signals.

C2PA says valid provenance does not establish that content is true. W3C Verifiable Credentials likewise says verifiability does not make the claim true; a verifier still applies policy. These limits show where provenance ends.

---

## Hybrid Work Needs Claims, Not a Binary Label

“Human-made” and “AI-generated” are too crude. A work may be human-captured, AI-denoised, editor-approved and institution-published. A better record can express `human.captured`, `human.authored`, `human.approved`, `ai.assisted` and `ai.generated`.

These claims preserve contribution without pretending every contribution grants a right. “Human approved” says approval occurred. It does not prove the approver had authority, that approval covered this distribution or that it remains valid.

Provenance claims describe context. Capabilities govern action.

---

## What a Capability Must Answer

A capability makes the operating agreement inspectable:

- **Actor:** who or what may act?
- **Action:** publish, edit, train, license, pay or distribute?
- **Asset:** which exact work or version?
- **Scope:** audience, territory, channel or purpose?
- **Limits:** amount, frequency or downstream use?
- **Time:** when does permission expire?
- **Delegation:** may authority pass to another agent?
- **Revocation:** how can it be withdrawn?
- **Evidence:** which claims support the grant?

OAuth Rich Authorization Requests (RFC 9396) supports structured authorization; its payment example specifies action, amount, currency and recipient. The HCI move is to make that precision understandable. “Allow access” is not enough. “Allow this agent to publish this approved version to two channels before Friday, with no paid promotion” is closer to meaningful consent.

---

## Check Authority Where Consequences Occur

Permission should not be checked once and remembered forever:

1. **Issue a scoped capability.**
2. **Carry provenance and capability separately.**
3. **Let an agent propose an action.**
4. **At publishing, training, payment or distribution,** check scope, expiry, revocation and asset version.
5. **Fail closed** or return for approval if proof is missing, stale or mismatched.
6. **Record the result.**

The system executing an action must enforce the rules. A polished interface cannot compensate for a backend that treats old approval as ambient authority. Before execution, people should see what will happen, which authority permits it, what could exceed scope and how to stop or revoke it.

---

## Where an Authority Layer Fits

An Authority Layer can bind human-readable intent to machine-enforceable capability. APP can help agents request, carry and prove scoped authority. It should complement—not replace—identity and provenance: C2PA describes asset history; a credential conveys a claim; the authority layer answers whether a proposed action is permitted now.

Blockchain is optional. It may help when parties need a shared revocation, rights or settlement record without one operator. If one accountable service can enforce policy, a signed registry may be simpler. The requirement is explicit authority, not a chain.

---

## Limits and Counterarguments

Capability systems add complexity. People can approve carelessly. Policies can encode unfair power. Revocation may not undo distributed copies. Offline systems may use stale state. Interoperability can fail.

Use plain-language scope first, precise details when needed, safe defaults, short lifetimes and visible history. Reusable policies should cover low-risk actions; interruption belongs at exceptions and irreversible consequences.

---

## Where This Fits in The Trust Stack

- **Part I** showed that provenance labels preserve history without guaranteeing value or permission.
- **Part II** separated personhood from authority.
- **Part III** showed that hardware attestation strengthens capture evidence without proving truth or consent.
- **Part IV** connects those limits: identity and provenance describe the situation; capability defines permissible action. Trust becomes operational when authority is explicit, scoped, time-bound, revocable and re-evaluated at the consequential boundary.
- **Part V** follows the economic consequences: licensing, royalties, attribution, distribution and compensation become more programmable when systems distinguish contribution from permission and permission from execution.

---

## Conclusion

The badge is not useless. It is incomplete.

Good human–AI interaction cannot stop at telling people what happened. It must show who may act, on what, for how long and under which limits—and let people withdraw authority before the next consequential step.

A badge preserves context. A capability governs action.

---

## Sources & Further Reading

- **C2PA Explainer:** [C2PA Technical Explainer](https://spec.c2pa.org/specifications/specifications/2.4/explainer/Explainer.html)
- **W3C VC 2.0:** [W3C Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/vc-data-model-2.0/)
- **RFC 9396:** [OAuth 2.0 Rich Authorization Requests (RAR)](https://www.rfc-editor.org/rfc/rfc9396.html)
- **RFC 9700:** [OAuth 2.0 Security Best Current Practice](https://www.rfc-editor.org/rfc/rfc9700.html)
- **The Trust Stack Part I:** [The Provenance Spectrum: Why a Label Cannot Protect Human Creativity by Itself](/blog/trust-stack-provenance-spectrum-pol-c2pa/)
- **The Trust Stack Part II:** [Proof of Personhood Is Not Proof of Authority](/blog/trust-stack-proof-of-personhood-vs-authority/)
- **The Trust Stack Part III:** [The Silicon Root of Trust: What Secure Capture Can—and Cannot—Prove](/blog/trust-stack-hardware-capture-attestation/)
- **Related Analysis:** [Verifiably Human — Part I: Everything Is Synthetic by Default](/blog/verifiably-human-part-1/)
- **Related Analysis:** [Verifiably Human — Part II: The Death of Ambient Authority](/blog/verifiably-human-part-2/)
- **Related Analysis:** [Verifiably Human — Part III: Sealing the Moment of Creation](/blog/verifiably-human-part-3/)
- **Authority Research:** [The Authority Layer](/authority-layer/)

---

## Frequently Asked Questions

### What is capability-based provenance?
A model where origin records (provenance) are coupled with explicit, scoped, time-bound, and revocable permissions (capabilities) governing what actors may do with an asset.

### Can Content Credentials grant permission?
No. Content Credentials and C2PA manifests record origin and transformation history; they do not convey authorization or legal permission to distribute, license, or execute actions.

### How is authority different from identity?
Identity proves who or what an actor is. Authority specifies what that actor is permitted to do in a specific context on a specific asset.

### Does this require blockchain?
No. Blockchain is optional for multi-party decentralized settlement or public revocation, but signed registries and centralized policy enforcement layers can execute capability checks without a distributed ledger.
