import React from "react"
import cuid from "cuid"
import { useStaticQuery, graphql } from "gatsby"
import { Container, Box } from "@mui/material"

import { RowCol } from "../RowCol"
import { Title } from "../Title"
import { AnimateOnScroll } from "../AnimateOnScroll"

import BlogCard from "./BlogCard"

import ImgGenerativeNfts from "../../images/projects/generative-nft.jpg"

interface BlogData {
  frontmatter: {
    author: string
    slug: string
    title: string
    featuredImage: {
      childImageSharp: {
        gatsbyImageData: {
          width: number
        }
      }
    }
  }
  html: string
}

export const Blog: React.FC = () => {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(graphql`
    query MyQuery {
      allMarkdownRemark {
        nodes {
          frontmatter {
            author
            slug
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 512)
              }
            }
          }
          html
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
          >
            {nodes.map((data: BlogData, index: number) => {
              return (
                <AnimateOnScroll
                  animateIn="fadeInUp"
                  delay={index * 200}
                  key={cuid()}
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
