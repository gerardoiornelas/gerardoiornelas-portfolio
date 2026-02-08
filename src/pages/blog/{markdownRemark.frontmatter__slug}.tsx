import * as React from "react"
import { graphql, type HeadFC, type PageProps } from "gatsby"
import { BlogPostTemplate } from "../../components/BlogPostTemplate"
import { Seo, seoDefaults } from "../../components/Seo"

interface BlogPostPageData {
  markdownRemark: {
    excerpt: string
    html: string
    frontmatter: {
      date: string
      datePublished: string
      slug: string
      title: string
      author: string
      featuredImage?: {
        publicURL?: string
        childImageSharp?: {
          gatsbyImageData: any
        }
      }
    }
  }
}

const BlogPostPage: React.FC<PageProps<BlogPostPageData>> = ({ data }) => (
  <BlogPostTemplate data={data} />
)

export const Head: HeadFC<BlogPostPageData> = ({ data }) => {
  if (!data?.markdownRemark) return <></>

  const post = data.markdownRemark
  const slug = post.frontmatter.slug
  const pathname = `/blog${slug}`
  const image = post.frontmatter.featuredImage?.publicURL
  const absoluteImage = image ? `${seoDefaults.siteUrl}${image}` : undefined

  const topicConfig: Record<
    string,
    {
      keywords: string[]
      about: string[]
      faq?: Array<{ q: string; a: string }>
      extraImages?: string[]
    }
  > = {
    "/securing-autonomy": {
      keywords: [
        "agentic AI security",
        "execution-time authorization",
        "Agent Permission Protocol",
        "LangGraph security",
        "AI agent governance",
      ],
      about: [
        "Agent Permission Protocol",
        "LangGraph",
        "execution-time authority",
        "cryptographic policy verification",
      ],
      faq: [
        {
          q: "What is APP in one line?",
          a: "APP is a cryptographic authorization layer for autonomous agent actions.",
        },
        {
          q: "Can LangGraph alone secure autonomy?",
          a: "No. LangGraph orchestrates reasoning and flow, while APP enforces execution-time authority.",
        },
        {
          q: "What is the core enforcement rule?",
          a: "No tool action should execute without an explicit, verifiable, encrypted policy.",
        },
      ],
      extraImages: [
        `${seoDefaults.siteUrl}/images/blog/securing-autonomy-authority-flow.svg`,
        `${seoDefaults.siteUrl}/images/blog/securing-autonomy-langgraph-vs-app.svg`,
      ],
    },
    "/verifiably-human-part-1": {
      keywords: [
        "verifiable human content",
        "AI content provenance",
        "synthetic media authenticity",
        "human provenance infrastructure",
        "blockchain and AI trust",
      ],
      about: [
        "content provenance",
        "synthetic media",
        "human authenticity verification",
        "agentic trust infrastructure",
      ],
      faq: [
        {
          q: "What problem does Verifiably Human solve?",
          a: "It addresses provenance by making human presence at creation explicit and verifiable.",
        },
        {
          q: "Why is detection alone not enough?",
          a: "Detection is an arms race. Provenance requires explicit proof of origin, not inference.",
        },
        {
          q: "What does provably human require?",
          a: "Proof at capture, cryptographic sealing, lineage through edits, and visible tool intervention.",
        },
      ],
    },
    "/verifiably-human-part-2": {
      keywords: [
        "ambient authority",
        "human provenance",
        "Agent Permission Protocol",
        "execution-time authorization",
        "content provenance infrastructure",
        "scoped human authority",
      ],
      about: [
        "ambient authority",
        "Agent Permission Protocol",
        "human provenance as authority",
        "capability-based trust",
        "content origin verification",
      ],
      faq: [
        {
          q: "What is ambient authority and why is it dangerous?",
          a: "Ambient authority is the assumption that identity implies permission. In agentic AI systems, it allows agents to act indefinitely under human credentials without per-action authorization.",
        },
        {
          q: "How does APP address human provenance?",
          a: "APP treats human origin as an explicit, scoped, time-bound, cryptographically sealed claim—governed by authority, not identity.",
        },
        {
          q: "What are human provenance scopes?",
          a: "Graded authority levels such as human.captured, human.authored, human.approved, and ai.assisted that make hybrid workflows transparent instead of deceptive.",
        },
        {
          q: "Why must human provenance claims expire?",
          a: "Because permanent claims are indistinguishable from ambient authority. Keys can be compromised, devices resold, and consent can change.",
        },
      ],
    },
  }

  const topic = topicConfig[slug] ?? {
    keywords: ["AI security", "blockchain", "agentic systems"],
    about: ["AI security", "cryptographic controls"],
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    datePublished: post.frontmatter.datePublished,
    dateModified: post.frontmatter.datePublished,
    inLanguage: "en-US",
    description: post.excerpt,
    keywords: topic.keywords.join(", "),
    author: {
      "@type": "Person",
      name: post.frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Gerardo I. Ornelas",
      url: seoDefaults.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${seoDefaults.siteUrl}/lone-star-gs.png`,
      },
    },
    mainEntityOfPage: `${seoDefaults.siteUrl}${pathname}`,
    image: [
      absoluteImage,
      ...(topic.extraImages ?? []),
    ].filter(Boolean),
    about: topic.about.map((name) => ({
      "@type": "Thing",
      name,
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: seoDefaults.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${seoDefaults.siteUrl}/#blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.frontmatter.title,
        item: `${seoDefaults.siteUrl}${pathname}`,
      },
    ],
  }

  const faqSchema = topic.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: topic.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      }
    : null

  return (
    <Seo
      title={post.frontmatter.title}
      description={post.excerpt}
      pathname={pathname}
      image={image}
      type="article"
      jsonLd={[articleSchema, breadcrumbSchema, faqSchema].filter(Boolean)}
    />
  )
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      excerpt(pruneLength: 160)
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        datePublished: date(formatString: "YYYY-MM-DD")
        slug
        title
        author
        featuredImage {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 512)
          }
        }
      }
    }
  }
`

export default BlogPostPage
