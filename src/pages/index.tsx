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
        text: "Gerardo I. Ornelas is a systems architect, founder, and advisor working on mortgage AI governance, execution evidence, and AI-era visibility systems.",
      },
    },
    {
      "@type": "Question",
      name: "What is mortgage AI governance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mortgage AI governance defines who or what may act in consequential mortgage workflows, under which limits, and what evidence proves the decision, action, and result.",
      },
    },
    {
      "@type": "Question",
      name: "What is Crittora?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Crittora is a mortgage-specific control and evidence layer designed to help approved AI actions proceed, stop actions outside approved rules, and preserve proof of what occurred.",
      },
    },
    {
      "@type": "Question",
      name: "What is UI-GATES?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UI-GATES (User-Intent Gated Agentic Task Execution & Synthesis) is an authority-aware operating system and portable skill for agentic work that unifies intent bounding, execution-time authority gates, verification evidence, and durable knowledge synthesis.",
      },
    },
    {
      "@type": "Question",
      name: "What does Gerardo I. Ornelas work on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "He helps mortgage organizations govern consequential AI with controls and evidence, authors the UI-GATES operating system for agentic work, and helps businesses become credible and findable across search and AI answer engines.",
      },
    },
    {
      "@type": "Question",
      name: "What is AI visibility and cross-engine strategy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI visibility and cross-engine strategy help a business be accurately understood and found across search engines, AI-generated answers, content, and conversion surfaces.",
      },
    },
    {
      "@type": "Question",
      name: "How does MISMO FRAME relate to this work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MISMO FRAME is a practical framework for mortgage AI governance. Gerardo's work applies the same operational concerns—policy, inventory, risk, controls, oversight, and documentation—without claiming a MISMO certification or designation.",
      },
    },
  ],
}

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Gerardo I. Ornelas | Governed AI & Trusted Visibility",
  url: "https://www.gerardoiornelas.com/",
  description:
    "Gerardo I. Ornelas works on mortgage AI governance, execution evidence, UI-GATES agentic operating system, and AI-era visibility systems.",
  about: [
    { "@type": "Thing", name: "Mortgage AI governance" },
    { "@type": "Thing", name: "UI-GATES operating system" },
    { "@type": "Thing", name: "AI controls and evidence" },
    { "@type": "Thing", name: "AI visibility" },
    { "@type": "Thing", name: "Cross-engine strategy" },
  ],
}

export const Head: HeadFC = () => (
  <Seo
    title="Governed AI & Trusted Visibility"
    description="Gerardo I. Ornelas works on mortgage AI governance, execution evidence, and AI-era visibility systems."
    pathname="/"
    jsonLd={[faqSchema, homepageSchema]}
  />
)

export default ScrollContainerPage
