import React from "react"
import _ from "lodash"
import { navigate } from "gatsby"
import PropTypes from "prop-types"
import { Grid, Box, Button, Container, Typography, Link } from "@mui/material"
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone"
import TwitterIcon from "@mui/icons-material/Twitter"

import { Footer } from "../Footer"

import { Title } from "../Title"

const BlogPostTemplate = ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const transformTitle = _.replace(frontmatter.title, " ", "%20")
  const twitterShare = `https://twitter.com/share?text=I%20just%20read%20%22${transformTitle}%22%20by%20@lostswun&url=https://www.lostwun.com/blog${frontmatter.slug}/`
  const linkedInShare = `https://www.linkedin.com/shareArticle?mini=true&url=https://www.lostwun.com/blog${frontmatter.slug}/`
  return (
    <>
      <Box py={5}>
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <Box mb={5}>
                <Button
                  startIcon={<ArrowBackTwoToneIcon />}
                  onClick={() => navigate("/#blog")}
                >
                  Back
                </Button>
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

BlogPostTemplate.propTypes = {
  children: PropTypes.node,
}

export default BlogPostTemplate
