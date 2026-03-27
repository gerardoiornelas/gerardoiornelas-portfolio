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
        text: "Gerardo I. Ornelas is the founder of Violetek and the author of the Agent Permission Protocol. His work focuses on authority systems, machine permissions, verification, and execution-runtime authorization.",
      },
    },
    {
      "@type": "Question",
      name: "What is the authority layer for agentic systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The authority layer is the part of an intelligent system that determines what actions are explicitly allowed, under what constraints, with what proof, and with what human-legible accountability.",
      },
    },
    {
      "@type": "Question",
      name: "What is Violetek?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Violetek is the venture platform founded by Gerardo I. Ornelas to build products, systems, and ventures around authority systems, verification, and execution-runtime authorization.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Agent Permission Protocol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Agent Permission Protocol is a framework authored by Gerardo I. Ornelas for defining and enforcing machine authority at execution time.",
      },
    },
    {
      "@type": "Question",
      name: "What does Gerardo I. Ornelas work on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "His work focuses on the authority layer for agentic systems, including execution-time authorization, ambient authority, security UX, machine permissions, and verifiable enforcement.",
      },
    },
    {
      "@type": "Question",
      name: "What is ambient authority in AI products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ambient authority is when a system can act just because it has access to a tool or credential, rather than because that specific action was explicitly authorized at execution time.",
      },
    },
    {
      "@type": "Question",
      name: "How are Gerardo I. Ornelas and Violetek related?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gerardo I. Ornelas is the founder of Violetek. His personal site presents his ideas, writing, and current work, while Violetek is the company platform building ventures and products in this category.",
      },
    },
  ],
}

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Gerardo I. Ornelas | The Authority Layer for Agentic Systems",
  url: "https://www.gerardoiornelas.com/",
  description:
    "Gerardo I. Ornelas defines the authority layer for agentic systems through execution-time authorization, ambient-authority elimination, security UX, and verifiable enforcement.",
  about: [
    { "@type": "Thing", name: "Authority layer for agentic systems" },
    { "@type": "Thing", name: "Execution-time authorization" },
    { "@type": "Thing", name: "Ambient authority" },
    { "@type": "Thing", name: "Security UX" },
  ],
}

export const Head: HeadFC = () => (
  <Seo
    title="The Authority Layer for Agentic Systems"
    description="Gerardo I. Ornelas defines the authority layer for agentic systems through execution-time authorization, ambient-authority elimination, security UX, and verifiable enforcement."
    pathname="/"
    jsonLd={[faqSchema, homepageSchema]}
  />
)

export default ScrollContainerPage
