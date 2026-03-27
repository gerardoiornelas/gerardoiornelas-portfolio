import React from "react"
import { Link } from "gatsby"
import cuid from "cuid"
import { useStaticQuery, graphql } from "gatsby"
import { Container, Box, Typography } from "@mui/material"

import { RowCol } from "../RowCol"
import { Title } from "../Title"
import { AnimateOnScroll } from "../AnimateOnScroll"

import BlogCard from "./BlogCard"

interface BlogData {
  frontmatter: {
    author: string
    date: string
    slug: string
    title: string
    featuredImage?: {
      childImageSharp?: {
        gatsbyImageData: any
      }
    }
  }
  html: string
  excerpt: string
}

export const Blog: React.FC = () => {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(graphql`
    query MyQuery {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          frontmatter {
            author
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 512)
              }
            }
          }
          html
          excerpt(pruneLength: 200)
        }
      }
    }
  `)

  return (
    <Box py={6}>
      <Container>
        <RowCol mb={4}>
          <AnimateOnScroll animateIn={`fadeInUp`}>
            <Title variant="segment" align="center">
              Authority Engine
            </Title>
          </AnimateOnScroll>
        </RowCol>
        <RowCol mb={4}>
          <AnimateOnScroll animateIn="fadeInUp" delay={100}>
            <Box textAlign="center" maxWidth="md" mx="auto">
              <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                A growing body of work on the authority layer for agentic
                systems: ambient authority, execution-time authorization,
                security UX, and verifiable enforcement.
              </Typography>
              <Typography>
                Start with <Link to="/authority-layer/">The Authority Layer</Link>
                {" "}or explore the full <Link to="/blog/">series archive</Link>.
              </Typography>
            </Box>
          </AnimateOnScroll>
        </RowCol>
        <RowCol>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent={`space-evenly`}
            alignItems="stretch"
          >
            {nodes.map((data: BlogData, index: number) => {
              return (
                <AnimateOnScroll
                  animateIn="fadeInUp"
                  delay={index * 200}
                  key={cuid()}
                  style={{ display: "flex", marginBottom: "2rem" }}
                >
                  <BlogCard {...data} />
                </AnimateOnScroll>
              )
            })}
          </Box>
        </RowCol>
      </Container>
    </Box>
  )
}
