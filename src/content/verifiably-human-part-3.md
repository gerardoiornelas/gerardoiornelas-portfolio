---
slug: "/verifiably-human-part-3"
date: "2026-02-13"
title: "Verifiably Human — Part III: Sealing the Moment of Creation"
author: "Gerardo I. Ornelas"
featuredImage: "../images/blog/verifiably-human-part-3.png"
---

In Part II, we dismantled ambient authority and reframed human origin as a permissioned claim, not an inferred property.

Now we answer the hard question:

**How do we cryptographically seal a claim of human origin without recreating the same structural flaws that broke identity-based trust?**

If “Verifiably Human” is to mean anything, it must be issued, scoped, time-bound, and revocable—just like any other safe authority in a distributed system.

⸻

## The Primitive: A Human Provenance Policy

We begin with a clear definition:

A **Human Provenance Policy (HPP)** is a cryptographically signed and encrypted artifact that grants scoped authority to assert a specific human-origin claim over a specific piece of content.

It is not a badge.
It is not metadata.
It is not identity.

It is authority over a claim.

⸻

## What Exactly Is Being Sealed?

Not the content alone.

What is sealed is:

- The hash of the artifact
- The scope of the human claim
- The issuer key
- The time bounds
- The revocation reference

In other words, we are sealing:

“**This artifact may be asserted as human.captured under these constraints until this expiration.**”

Nothing more.

⸻

## Required Fields of a Human Provenance Policy

Modeled after capability-based authority systems, an HPP must include:

1. **policy_type** — `human_provenance`
2. **policy_version** — versioned schema for forward compatibility.
3. **artifact_hash** — cryptographic digest (e.g., SHA-256) of the content.
4. **scope** — one of:

   - `human.captured`
   - `human.authored`
   - `human.approved`
   - `ai.assisted.declared`

   Scopes are mutually exclusive at issuance and may only be downgraded.

5. **issuer** — public key of the human or secure capture device.
6. **issued_at**
7. **expires_at** — mandatory. No permanent claims.
8. **revocation_pointer** — reference to a public revocation registry.
9. **nonce** — optional replay protection.

⸻

## The Cryptographic Flow (Sign → Encrypt → Anchor)

The sealing process follows three stages.

1. **Construct** — The policy is assembled locally at the point of capture or authorization.

   - Devices attest to conditions, not intent.
   - Humans attest to authorization, not physics.

2. **Sign** — The issuer signs the serialized policy with a private key.

   - Non-exportable keys are strongly recommended: hardware enclaves, secure elements, TPM-backed keys.
   - If the key is extractable, the claim is forgeable.

3. **Encrypt** — The signed policy is encrypted for its intended verifier audience.
   - Prevents metadata harvesting, scope inspection by intermediaries, and selective stripping attacks.
   - Only after encryption is the policy considered sealed.

⸻

## Why Sign-Then-Encrypt?

Order matters.

- Encrypt-first makes signature verification ambiguous.
- Sign-without-encrypt leaks scope and metadata.

Sign-then-encrypt ensures integrity, confidentiality, and non-repudiation.
No plaintext policies should be considered valid.

⸻

## Expiry: The Death of Permanent Humanity

Human provenance must expire.

Because keys get compromised, devices get resold, consent changes, and threat models evolve. A permanent claim is indistinguishable from ambient authority.

Short TTLs + revalidation at distribution time prevent stale claims from persisting indefinitely.

⸻

## Revocation: The Safety Valve

Revocation must be globally observable.

An HPP is invalid if:

- The issuer key is revoked.
- The artifact hash appears in a dispute registry.
- The scope has been superseded by a downgrade event.

Revocation is not optional. Without it, provenance becomes irreversible trust—the very problem we are trying to kill.

⸻

## Verification at Distribution Time

The common mistake: verify once at creation and never again.

Verification must occur before publication, before display, and before amplification. A verifier checks:

1. Signature validity
2. Encryption authenticity
3. Expiration window
4. Revocation status
5. Scope compatibility with platform policy

If any check fails → the claim is invalid. **Fail closed.**

⸻

## What This Does Not Do

It does **not** prove personhood, guarantee truth, prevent manipulation after issuance, or eliminate AI.

It does one thing: it makes claims about human origin explicit, bounded, and cryptographically accountable. That is enough to replace ambient trust.

⸻

## Where the Ledger Fits (But Is Not Primary)

A blockchain or transparency log may be used to anchor issuer public keys, record revocation events, provide timestamp anchoring, and detect replay. But the ledger is not the authority.

Authority is in the sealed policy. The ledger is audit infrastructure. Confusing those layers recreates the same mistake identity systems made.

⸻

## The Boundary Has Moved

We are not asking, “Is this human?”

We are asking, “Is there valid, scoped, unexpired authority to assert that this artifact was human-originated under defined conditions?”

That replaces assumption with verification, identity with capability, and permanence with expiry. And that is how you kill ambient authority.
