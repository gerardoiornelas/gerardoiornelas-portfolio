import { withPage } from "../lib/site"
import React from "react"
import type { HeadFC } from "../lib/site"
import { ScrollContainer } from "../components/ScrollContainer"
import { Seo } from "../components/Seo"

const ScrollContainerPage: React.FC = () => {
  return <ScrollContainer />
}

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Gerardo I. Ornelas | Governed AI & Trusted Visibility",
  url: "https://www.gerardoiornelas.com/",
  description:
    "Gerardo I. Ornelas works on mortgage AI governance, execution evidence, AI-era visibility systems, and experimental research on evidence in AI-assisted software work.",
  about: [
    { "@type": "Thing", name: "Mortgage AI governance" },
    { "@type": "Thing", name: "UI-GATES experimental research" },
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
    jsonLd={homepageSchema}
  />
)

export default withPage(ScrollContainerPage)
