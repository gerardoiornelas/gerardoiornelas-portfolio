import React from "react"
import type { GatsbySSR } from "gatsby"

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHtmlAttributes,
  setHeadComponents,
}) => {
  setHtmlAttributes({ lang: `en` })
  setHeadComponents([
    React.createElement("meta", {
      key: "viewport",
      name: "viewport",
      content: "initial-scale=1, width=device-width",
    }),
    React.createElement("link", {
      key: "preconnect-fonts-1",
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    }),
    React.createElement("link", {
      key: "preconnect-fonts-2",
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    }),
    React.createElement("link", {
      key: "google-fonts",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap",
      rel: "stylesheet",
    }),
  ])
}
