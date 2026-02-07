import React from "react"

const SITE_NAME = "Gerardo I. Ornelas"
const SITE_URL = "https://www.gerardoiornelas.com"
const DEFAULT_TITLE = "Gerardo I. Ornelas | Secure AI Agent Systems"
const DEFAULT_DESCRIPTION =
  "Technology leader building execution-time security and cryptographic controls for AI systems."
const DEFAULT_IMAGE = "/lone-star-gs.png"

interface SeoProps {
  title?: string
  description?: string
  pathname?: string
  image?: string
  type?: "website" | "article"
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

const toAbsoluteUrl = (value: string) => {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value
  }

  if (value.startsWith("/")) {
    return `${SITE_URL}${value}`
  }

  return `${SITE_URL}/${value}`
}

const getCanonicalUrl = (pathname?: string) => {
  if (!pathname || pathname === "/") return SITE_URL
  return `${SITE_URL}${pathname}`
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  pathname,
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  jsonLd,
}) => {
  const resolvedTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
  const resolvedDescription = description ?? DEFAULT_DESCRIPTION
  const canonicalUrl = getCanonicalUrl(pathname)
  const imageUrl = toAbsoluteUrl(image)

  const baseSchemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Gerardo I. Ornelas",
      url: SITE_URL,
      sameAs: [
        "https://www.github.com/gerardoiornelas",
        "https://x.com/gerardoiornelas",
        "https://www.linkedin.com/in/gerardo-i-ornelas/",
      ],
    },
  ]

  const extraSchemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
  const schemas = [...baseSchemas, ...extraSchemas]

  return (
    <>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {schemas.map((schema, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

export const seoDefaults = {
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
}
