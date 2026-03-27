import * as React from "react"
import { Link, type HeadFC } from "gatsby"
import { Box, Container, Grid, Stack, Typography } from "@mui/material"
import { LayoutAlt } from "../../components/Layout"
import { Seo, seoDefaults } from "../../components/Seo"
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
                Founder of Violetek. Defining the authority layer for agentic
                systems.
              </Typography>
              <Typography paragraph>
                Gerardo I. Ornelas is a founder, author, and systems builder
                focused on how intelligent systems are allowed to act in
                production. His work centers on execution-time authorization,
                ambient authority, security UX, and verifiable enforcement.
              </Typography>
              <Typography paragraph>
                He is the founder of Violetek and the author of the Agent
                Permission Protocol, a framework for separating reasoning from
                authority so that autonomous systems operate with explicit,
                bounded, and auditable permissions.
              </Typography>
              <Typography paragraph>
                His writing helps founders and builders rethink trust
                boundaries in AI products, especially where machine action,
                human review, provenance, and secure user experience intersect.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Start Here
                </Typography>
                <Stack spacing={1}>
                  <Typography>
                    <Link to="/authority-layer/">
                      The Authority Layer for Agentic Systems
                    </Link>
                  </Typography>
                  <Typography>
                    <Link to="/manifesto/">Verifiably Human Manifesto</Link>
                  </Typography>
                  <Typography>
                    <Link to="/blog/securing-autonomy/">Securing Autonomy</Link>
                  </Typography>
                  <Typography>
                    <Link to="/#contact">Request a briefing</Link>
                  </Typography>
                </Stack>
              </Box>
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
      "Gerardo I. Ornelas defines the authority layer for agentic systems through execution-time authorization, ambient authority, security UX, and verifiable enforcement.",
    knowsAbout: [
      "Authority layer for agentic systems",
      "Execution-time authorization",
      "Ambient authority",
      "Security UX",
      "Verifiable enforcement",
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
      title="Gerardo I. Ornelas | Authority Layer for Agentic Systems"
      description="Gerardo I. Ornelas defines the authority layer for agentic systems through execution-time authorization, ambient authority, security UX, and verifiable enforcement."
      pathname="/author/gerardo-i-ornelas/"
      jsonLd={[personSchema, profileSchema]}
    />
  )
}

export default AuthorPage
