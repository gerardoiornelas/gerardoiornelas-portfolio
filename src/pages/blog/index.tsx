import * as React from "react"
import { graphql, Link, type HeadFC, type PageProps } from "gatsby"
import { Box, Container, Divider, Typography } from "@mui/material"
import { LayoutAlt } from "../../components/Layout"
import { Seo, seoDefaults } from "../../components/Seo"
import { Title } from "../../components/Title"

interface BlogIndexData {
  allMarkdownRemark: {
    nodes: Array<{
      excerpt: string
      frontmatter: {
        slug: string
        title: string
        date: string
      }
    }>
  }
}

const BlogIndexPage: React.FC<PageProps<BlogIndexData>> = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <LayoutAlt>
      <Box py={6}>
        <Container maxWidth="md">
          <Box mb={4}>
            <Title variant="segmentAlt">Blog</Title>
            <Typography color="text.secondary">
              Writing about agentic AI security, blockchain-backed provenance,
              cryptographic policy enforcement, and verifiable autonomy.
            </Typography>
          </Box>

          <Box mb={5}>
            <Typography variant="h6" gutterBottom>
              Topic Clusters
            </Typography>
            <Typography>
              <Link to="/blog/securing-autonomy/">
                Agent Permission Protocol + LangGraph security patterns
              </Link>
            </Typography>
            <Typography>
              <Link to="/blog/verifiably-human-part-1/">
                Verifiable human provenance for synthetic media
              </Link>
            </Typography>
            <Typography>
              <Link to="/author/gerardo-i-ornelas/">
                Author profile: blockchain + agentic AI security focus
              </Link>
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {posts.map((post) => (
            <Box key={post.frontmatter.slug} mb={4}>
              <Typography variant="body2" color="text.secondary">
                {post.frontmatter.date}
              </Typography>
              <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                <Link to={`/blog${post.frontmatter.slug}`}>
                  {post.frontmatter.title}
                </Link>
              </Typography>
              <Typography color="text.secondary">{post.excerpt}</Typography>
            </Box>
          ))}
        </Container>
      </Box>
    </LayoutAlt>
  )
}

export const Head: HeadFC<BlogIndexData> = ({ data }) => {
  const items = data?.allMarkdownRemark.nodes ?? []

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog | Gerardo I. Ornelas",
    url: `${seoDefaults.siteUrl}/blog/`,
    description:
      "Articles on agentic AI security, blockchain provenance, and cryptographic authorization.",
    hasPart: items.map((post) => ({
      "@type": "BlogPosting",
      headline: post.frontmatter.title,
      url: `${seoDefaults.siteUrl}/blog${post.frontmatter.slug}`,
      datePublished: post.frontmatter.date,
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
        item: `${seoDefaults.siteUrl}/blog/`,
      },
    ],
  }

  return (
    <Seo
      title="Blog: Agentic AI Security & Blockchain Provenance"
      description="Technical essays on execution-time authorization, AI agent governance, and verifiable human provenance."
      pathname="/blog/"
      jsonLd={[collectionSchema, breadcrumbSchema]}
    />
  )
}

export const query = graphql`
  query BlogIndexPageQuery {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt(pruneLength: 180)
        frontmatter {
          slug
          title
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`

export default BlogIndexPage
