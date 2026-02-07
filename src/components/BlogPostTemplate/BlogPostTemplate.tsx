import React from "react"
import replace from "lodash/replace"
import { Link, navigate } from "gatsby"
import { Grid, Box, Button, Container, Typography } from "@mui/material"
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

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
        featuredImage?: {
          childImageSharp?: {
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
  const featuredImg = getImage(
    frontmatter.featuredImage?.childImageSharp?.gatsbyImageData ?? null
  )
  const transformTitle = replace(frontmatter.title, " ", "%20")
  const twitterShare = `https://twitter.com/share?text=I%20just%20read%20%22${transformTitle}%22%20by%20@gerardoiornelas&url=https://www.gerardoiornelas.com/blog${frontmatter.slug}/`
  const linkedInShare = `https://www.linkedin.com/shareArticle?mini=true&url=https://www.gerardoiornelas.com/blog${frontmatter.slug}/`
  return (
    <>
      <Box py={5}>
        <Container maxWidth="sm">
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Box mb={2}>
                <Button
                  startIcon={<ArrowBackTwoToneIcon />}
                  onClick={() => navigate("/#blog")}
                >
                  Back
                </Button>
              </Box>
              {featuredImg && (
                <Box mb={3}>
                  <GatsbyImage
                    image={featuredImg}
                    alt={`Featured image for ${frontmatter.title}`}
                  />
                </Box>
              )}
              <Title variant="segment">{frontmatter.title}</Title>
              <Typography
                variant="h6"
                color="primary"
              >{`${frontmatter.date} by ${frontmatter.author}`}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Link to="/author/gerardo-i-ornelas/">Author profile</Link>
              </Typography>
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
              <Box
                my={4}
                sx={{
                  "& img": {
                    display: "block",
                    width: "100%",
                    maxWidth: 512,
                    height: "auto",
                    margin: "1rem auto",
                  },
                }}
              >
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
