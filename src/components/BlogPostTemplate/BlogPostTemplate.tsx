import React from "react"
import _ from "lodash"
import { navigate } from "gatsby"
import { Grid, Box, Button, Container, Typography, Link } from "@mui/material"
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

import { Footer } from "../Footer"

import { Title } from "../Title"

interface BlogPostTemplateProps {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        date: string
        author: string
        slug: string
        featuredImage: {
          childImageSharp: {
            gatsbyImageData: any
          }
        }
      }
      html: string
    }
  }
}

export const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  let featuredImg = getImage(
    frontmatter.featuredImage?.childImageSharp?.gatsbyImageData
  )
  const transformTitle = _.replace(frontmatter.title, " ", "%20")
  const twitterShare = `https://twitter.com/share?text=I%20just%20read%20%22${transformTitle}%22%20by%20@gerardoiornelas&url=https://www.gerardoiornelas.com/blog${frontmatter.slug}/`
  const linkedInShare = `https://www.linkedin.com/shareArticle?mini=true&url=https://www.gerardoiornelas.com/blog${frontmatter.slug}/`
  return (
    <>
      <Box py={5}>
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <Button
                  startIcon={<ArrowBackTwoToneIcon />}
                  onClick={() => navigate("/#blog")}
                >
                  Back
                </Button>
              </Box>
              <Box mb={3}>
                <GatsbyImage image={featuredImg} alt="" />
              </Box>
              <Title variant="segmentAlt">{frontmatter.title}</Title>
              <Typography
                variant="h6"
                color="primary"
              >{`${frontmatter.date} by ${frontmatter.author}`}</Typography>
              {/* <Box>
            <Button
              startIcon={<TwitterIcon />}
              href="https://twitter.com/intent/follow?screen_name=lostwun"
              target="_blank"
              rel="noreferrer"
              size="small"
              variant="outlined"
            >
              Follow me on Twitter
            </Button>
          </Box> */}
              <Box my={4}>
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </Box>
              <Box>
                <Button
                  href={twitterShare}
                  target="_blank"
                  rel="noreferrer"
                  size="small"
                  variant="outlined"
                >
                  Share on Twitter
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  )
}
