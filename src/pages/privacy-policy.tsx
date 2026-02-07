import React from "react"
import type { HeadFC } from "gatsby"
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

export default PrivacyPolicyPage
