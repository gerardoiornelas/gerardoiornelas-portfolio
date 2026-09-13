import { withPage } from "../lib/site"
import React from "react"
import type { HeadFC } from "../lib/site"
import { PrivacyPolicy } from "../components/PrivacyPolicy"
import { Seo } from "../components/Seo"

const PrivacyPolicyPage: React.FC = () => {
  return <PrivacyPolicy />
}

export const Head: HeadFC = () => (
  <Seo
    title="Privacy Policy"
    description="Privacy policy for Gerardo I. Ornelas website services and contact forms."
    pathname="/privacy-policy"
  />
)

export default withPage(PrivacyPolicyPage)
