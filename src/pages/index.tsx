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
        text: "His work focuses on authority boundaries, machine permissions, verification, and the systems required to make intelligent actions explicit and auditable.",
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
  name: "Gerardo I. Ornelas | Building the Authority Layer for Intelligent Systems",
  url: "https://www.gerardoiornelas.com/",
  description:
    "Founder of Violetek and author of the Agent Permission Protocol, building systems, ventures, and frameworks for authority, verification, and execution-runtime authorization.",
  about: [
    { "@type": "Thing", name: "Authority systems" },
    { "@type": "Thing", name: "Execution-time authorization" },
    { "@type": "Thing", name: "Machine permissions" },
    { "@type": "Thing", name: "Verification" },
  ],
}

export const Head: HeadFC = () => (
  <Seo
    title="Building the Authority Layer for Intelligent Systems"
    description="Founder of Violetek and author of the Agent Permission Protocol. Gerardo I. Ornelas builds systems, ventures, and frameworks for authority, verification, and execution-runtime authorization."
    pathname="/"
    jsonLd={[faqSchema, homepageSchema]}
  />
)

export default ScrollContainerPage
