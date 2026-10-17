import React from "react"
import replace from "lodash/replace"
import { Link, navigate } from "../../lib/site"
import { Grid, Box, Button, Container, Typography } from "@mui/material"
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone"
import { ResponsiveImage } from "../../lib/image"

import { Footer } from "../Footer"

import { Title } from "../Title"
import type { BlogPost } from "../../lib/types"

interface BlogPostTemplateProps {
  data: {
    markdownRemark: BlogPost
    seriesPosts?: Array<Pick<BlogPost["frontmatter"], "slug" | "title" | "part">>
  }
}

export const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const featuredImg = frontmatter.featuredImage
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
                  <ResponsiveImage
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
              {(frontmatter.status || frontmatter.territory || frontmatter.series) && (
                <Box
                  sx={{
                    mt: 3,
                    p: 2.5,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "rgba(56, 180, 198, 0.05)",
                  }}
                >
                  {frontmatter.status && (
                    <Typography variant="overline" sx={{ letterSpacing: "0.14em" }}>
                      Status: {frontmatter.status}
                    </Typography>
                  )}
                  {frontmatter.territory && (
                    <Typography variant="body2" color="text.secondary">
                      Territory: {frontmatter.territory}
                    </Typography>
                  )}
                  {frontmatter.series && (
                    <Typography variant="body2" color="text.secondary">
                      Series: {frontmatter.series}{frontmatter.part ? ` · Part ${frontmatter.part}` : ""}
                    </Typography>
                  )}
                  {frontmatter.updated && (
                    <Typography variant="body2" color="text.secondary">
                      Updated: {frontmatter.updated}
                    </Typography>
                  )}
                  {frontmatter.aiAssistance && (
                    <Typography variant="body2" color="text.secondary">
                      AI assistance: {frontmatter.aiAssistance}
                    </Typography>
                  )}
                </Box>
              )}
              {frontmatter.corrections?.length ? (
                <Box sx={{ mt: 3, p: 2.5, borderLeft: "3px solid", borderColor: "warning.main", bgcolor: "rgba(237, 108, 2, 0.06)" }}>
                  <Typography component="h2" variant="h6">Editor’s note</Typography>
                  {frontmatter.corrections.map(correction => (
                    <Box key={`${correction.date}-${correction.what}`} sx={{ mt: 1.5 }}>
                      <Typography variant="body2" color="text.secondary">{correction.date}</Typography>
                      <Typography>{correction.what}</Typography>
                      <Typography variant="body2" color="text.secondary">{correction.why}</Typography>
                    </Box>
                  ))}
                  <Typography variant="body2" sx={{ mt: 1.5 }}>
                    <Link to="/corrections/">Read the public corrections log</Link>
                  </Typography>
                </Box>
              ) : null}
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
              {frontmatter.sources?.length ? (
                <Box sx={{ my: 4, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
                  <Typography component="h2" variant="h5" sx={{ mb: 1.5 }}>Sources</Typography>
                  {frontmatter.sources.map(source => (
                    <Typography key={source.url} sx={{ mb: 1 }}>
                      <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>
                    </Typography>
                  ))}
                </Box>
              ) : null}
              {frontmatter.faq?.length ? (
                <Box sx={{ my: 4, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
                  <Typography component="h2" variant="h5" sx={{ mb: 2 }}>Questions and answers</Typography>
                  {frontmatter.faq.map(item => (
                    <Box key={item.question} sx={{ mb: 2 }}>
                      <Typography component="h3" variant="h6">{item.question}</Typography>
                      <Typography color="text.secondary">{item.answer}</Typography>
                    </Box>
                  ))}
                </Box>
              ) : null}
              {data.seriesPosts && data.seriesPosts.length > 1 ? (
                <Box sx={{ my: 4, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
                  <Typography component="h2" variant="h5" sx={{ mb: 1.5 }}>{frontmatter.series}</Typography>
                  {data.seriesPosts.map(post => (
                    <Typography key={post.slug} sx={{ mb: 1 }}>
                      {post.part ? `Part ${post.part}: ` : ""}<Link to={`/blog${post.slug}/`}>{post.title}</Link>
                    </Typography>
                  ))}
                </Box>
              ) : null}
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
