import type { ImageData } from "../../lib/image"
import React from "react"
import { Link, usePosts } from "../../lib/site"
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
    featuredImage?: ImageData
  }
  excerpt: string
}

export const Blog: React.FC = () => {
  const nodes = usePosts()

  return (
    <Box py={6}>
      <Container>
        <RowCol mb={4}>
          <AnimateOnScroll animateIn={`fadeInUp`}>
            <Title variant="segment" align="center">
              Research & Field Notes
            </Title>
          </AnimateOnScroll>
        </RowCol>
        <RowCol mb={4}>
          <AnimateOnScroll animateIn="fadeInUp" delay={100}>
            <Box textAlign="center" maxWidth="md" mx="auto">
              <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                Essays and field notes on governed AI, execution evidence, and
                the reliable public information high-trust organizations need to
                be understood.
              </Typography>
              <Typography>
                Start with{" "}
                <Link to="/authority-layer/">Authority Layer Research</Link> or
                explore the full <Link to="/blog/">series archive</Link>.
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
                  key={data.frontmatter.slug}
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
