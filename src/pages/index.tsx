import React from "react"
import type { HeadFC } from "gatsby"
import { ScrollContainer } from "../components/ScrollContainer"
import { Seo } from "../components/Seo"

const ScrollContainerPage: React.FC = () => {
  return <ScrollContainer />
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Gerardo I. Ornelas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gerardo I. Ornelas is a technology leader who builds execution-time security and cryptographic controls for AI systems. He is the Co-founder and President of Crittora, where he leads strategy, design, and development of the cryptographic experience stack that secures AI agents in production.",
      },
    },
    {
      "@type": "Question",
      name: "What is Crittora?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Crittora is a security company that builds the trust layer authorizing what AI agents can do at the moment they act. It enforces explicit, time-bound authority and provides signed Proof-of-Action receipts for every action, making authority explicit, enforceable, and auditable at runtime.",
      },
    },
    {
      "@type": "Question",
      name: "What are execution-time security controls for AI agents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Execution-time security controls are cryptographic mechanisms that enforce authorization policies at the exact moment an AI agent performs an action. Unlike static access controls, these controls verify authority in real time, ensuring agents only act within explicitly granted, time-bound permissions.",
      },
    },
    {
      "@type": "Question",
      name: "What is a Proof-of-Action receipt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Proof-of-Action receipt is a cryptographically signed record generated each time an AI agent performs an authorized action. It provides an auditable trail that confirms what action was taken, by which agent, under what authority, and at what time.",
      },
    },
    {
      "@type": "Question",
      name: "How does cryptographic authorization work for AI agents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cryptographic authorization for AI agents uses cryptographic primitives to enforce policies at runtime. Rather than relying on role-based access alone, it binds permissions to specific actions with time-bound validity, ensuring that every agent action is explicitly authorized, verifiable, and non-repudiable.",
      },
    },
  ],
}

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Gerardo I. Ornelas | Tech Futurist in Blockchain & Agentic AI Security",
  url: "https://www.gerardoiornelas.com/",
  description:
    "Founder and technologist building blockchain-backed provenance and execution-time security for AI agents.",
  about: [
    { "@type": "Thing", name: "Agentic AI security" },
    { "@type": "Thing", name: "Execution-time authorization" },
    { "@type": "Thing", name: "Blockchain provenance" },
    { "@type": "Thing", name: "Cryptographic policy enforcement" },
  ],
}

export const Head: HeadFC = () => (
  <Seo
    title="Secure AI Agent Systems"
    description="Gerardo I. Ornelas leads strategy, design, and development of cryptographic controls that secure AI agents in production."
    pathname="/"
    jsonLd={[faqSchema, homepageSchema]}
  />
)

export default ScrollContainerPage
