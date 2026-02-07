import React from "react"
import type { HeadFC } from "gatsby"
import { Thanks } from "../components/Thanks"
import { Seo } from "../components/Seo"

const ThanksPage: React.FC = () => {
  return <Thanks />
}

export const Head: HeadFC = () => (
  <Seo
    title="Thanks"
    description="Thanks for your message to Gerardo I. Ornelas."
    pathname="/thanks"
    noindex
  />
)

export default ThanksPage
