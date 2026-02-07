import React from "react"
import cuid from "cuid"
import { useStaticQuery, graphql } from "gatsby"
import { Container, Box } from "@mui/material"

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
              Blog
            </Title>
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
