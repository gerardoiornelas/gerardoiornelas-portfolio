import * as React from "react"
import { Link, type HeadFC } from "gatsby"
import { Box, Container, Grid, Typography } from "@mui/material"
import { LayoutAlt } from "../../components/Layout"
import { Seo, seoDefaults } from "../../components/Seo"
import { Title } from "../../components/Title"
import ImgAuthor from "../../images/hero-author.png"

const AuthorPage: React.FC = () => {
  return (
    <LayoutAlt>
      <Box py={6}>
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h4" component="h3">
                Gerardo I. Ornelas
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                Founder of Violetek. Author of the Agent Permission Protocol.
              </Typography>
              <Typography paragraph>
                Gerardo I. Ornelas is a founder, author, and systems builder
                focused on authority systems, machine permissions,
                verification, and execution-runtime authorization.
              </Typography>
              <Typography paragraph>
                He is the founder of Violetek, a venture platform building
                products and ventures in this category, and the author of the
                Agent Permission Protocol.
              </Typography>
              <Typography paragraph>
                His writing explores how intelligent systems are granted,
                constrained, and verified in execution, with a focus on
                authority boundaries, machine permissions, and accountable
                system behavior.
              </Typography>
              <Typography>
                Read:{" "}
                <Link to="/blog/securing-autonomy/">Securing Autonomy</Link> and{" "}
                <Link to="/blog/verifiably-human-part-1/">
                  Verifiably Human — Part I
                </Link>
                .
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src={ImgAuthor}
                alt="Gerardo I. Ornelas"
                sx={{ width: "100%", borderRadius: 2 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LayoutAlt>
  )
}

export const Head: HeadFC = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gerardo I. Ornelas",
    url: `${seoDefaults.siteUrl}/author/gerardo-i-ornelas/`,
    jobTitle: "Founder of Violetek",
    description:
      "Gerardo I. Ornelas is the founder of Violetek and the author of the Agent Permission Protocol. His work focuses on authority systems, machine permissions, verification, and execution-runtime authorization.",
    knowsAbout: [
      "Authority systems",
      "Execution-time authorization",
      "Machine permissions",
      "Verification",
      "Agent permissions",
    ],
    sameAs: [
      "https://www.github.com/gerardoiornelas",
      "https://x.com/gerardoiornelas",
      "https://www.linkedin.com/in/gerardo-i-ornelas/",
    ],
  }

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${seoDefaults.siteUrl}/author/gerardo-i-ornelas/`,
    mainEntity: {
      "@type": "Person",
      name: "Gerardo I. Ornelas",
    },
  }

  return (
    <Seo
      title="Gerardo I. Ornelas | Founder of Violetek"
      description="Gerardo I. Ornelas is the founder of Violetek and the author of the Agent Permission Protocol. His work focuses on authority systems, machine permissions, verification, and execution-runtime authorization."
      pathname="/author/gerardo-i-ornelas/"
      jsonLd={[personSchema, profileSchema]}
    />
  )
}

export default AuthorPage
