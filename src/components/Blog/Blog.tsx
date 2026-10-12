import type { ImageData } from "../../lib/image"
import React from "react"
import { Link, usePosts } from "../../lib/site"
import { Container, Box, Typography, Button } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

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

const FEATURED_POST_COUNT = 6

export const Blog: React.FC = () => {
  const nodes = usePosts()
  const displayPosts = nodes.slice(0, FEATURED_POST_COUNT)

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
            {displayPosts.map((data: BlogData, index: number) => {
              return (
                <AnimateOnScroll
                  animateIn="fadeInUp"
                  delay={index * 150}
                  key={data.frontmatter.slug}
                  style={{ display: "flex", marginBottom: "2rem" }}
                >
                  <BlogCard {...data} />
                </AnimateOnScroll>
              )
            })}
          </Box>
        </RowCol>
        {nodes.length > FEATURED_POST_COUNT && (
          <RowCol mt={2}>
            <AnimateOnScroll animateIn="fadeInUp" delay={200}>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  component={Link}
                  to="/blog/"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    textTransform: "uppercase",
                  }}
                >
                  View All Articles & Series ({nodes.length})
                </Button>
              </Box>
            </AnimateOnScroll>
          </RowCol>
        )}
      </Container>
    </Box>
  )
}
