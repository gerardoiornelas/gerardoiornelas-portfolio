import * as React from "react"
import { graphql, Link, type HeadFC, type PageProps } from "gatsby"
import { Box, Container, Divider, Grid, Typography } from "@mui/material"
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
              A body of work on the authority layer for agentic systems:
              execution-time authorization, ambient authority, security UX, and
              verifiable enforcement.
            </Typography>
          </Box>

          <Box mb={5}>
            <Typography variant="h6" gutterBottom>
              Start Here
            </Typography>
            <Typography>
              <Link to="/authority-layer/">
                The Authority Layer for Agentic Systems
              </Link>
            </Typography>
            <Typography>
              <Link to="/manifesto/">
                Verifiably Human Manifesto
              </Link>
            </Typography>
            <Typography>
              <Link to="/blog/securing-autonomy/">
                Securing Autonomy: APP applied to real agent patterns
              </Link>
            </Typography>
            <Typography>
              <Link to="/#contact">Request a briefing</Link>
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box mb={5}>
            <Typography variant="h6" gutterBottom>
              Series
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Authority Layer</Typography>
                <Typography color="text.secondary">
                  Foundational essays on how intelligent systems should be
                  allowed to act, how authority is bounded, and why reasoning
                  must be separated from action.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">
                  Agent Permission Protocol
                </Typography>
                <Typography color="text.secondary">
                  Applied patterns, control models, and implementation framing
                  for execution-time authorization in agentic systems.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Security UX</Typography>
                <Typography color="text.secondary">
                  The human interface to authority: how permissions, review, and
                  trust become legible in real products.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Verifiable Systems</Typography>
                <Typography color="text.secondary">
                  Provenance, receipts, attestations, and blockchain-backed
                  proofs for systems that need durable trust.
                </Typography>
              </Grid>
            </Grid>
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
      "Series-based essays on the authority layer for agentic systems, including execution-time authorization, ambient authority, security UX, and verifiable enforcement.",
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
      title="Blog: The Authority Layer for Agentic Systems"
      description="Series-based essays on execution-time authorization, ambient authority, security UX, and verifiable enforcement."
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
