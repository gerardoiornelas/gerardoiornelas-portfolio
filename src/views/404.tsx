import { withPage } from "../lib/site"
import React from "react"
import type { HeadFC } from "../lib/site"
import { PageNotFound } from "../components/PageNotFound"
import { Seo } from "../components/Seo"

const PageNotFoundPage: React.FC = () => {
  return <PageNotFound />
}

export const Head: HeadFC = () => (
  <Seo
    title="Page Not Found"
    description="The requested page could not be found."
    pathname="/404"
    noindex
  />
)

export default withPage(PageNotFoundPage)
