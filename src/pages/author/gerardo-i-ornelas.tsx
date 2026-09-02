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
                Systems architect, founder, and advisor for governed AI and
                trusted visibility.
              </Typography>
              <Typography paragraph>
                Gerardo I. Ornelas works at two points where AI-era businesses
                win or fail: the authority to act and the ability to be
                understood. He helps mortgage organizations govern
                consequential AI with clear controls and evidence, and helps
                businesses build credible visibility across search and answer
                engines.
              </Typography>
              <Typography paragraph>
                His mortgage AI governance practice operates through Crittora.
                His AI visibility practice includes work as WUN AEO Director
                and with XEO Labs. He is also the author of the Agent Permission
                Protocol, a framework for explicit authority and reviewable
                evidence.
              </Typography>
              <Typography paragraph>
                His writing and speaking explain the connecting doctrine:
                high-trust AI needs governed action in operations and reliable
                public information people can understand and trust.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Start Here
                </Typography>
                <Stack spacing={1}>
                  <Typography>
                    <Link to="/authority-layer/">
                      Authority Layer Research
                    </Link>
                  </Typography>
                  <Typography>
                    <Link to="/manifesto/">Verifiably Human Doctrine</Link>
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
      jobTitle: "Systems Architect, Founder, and Advisor",
    description:
      "Gerardo I. Ornelas works on mortgage AI governance, execution evidence, and AI-era visibility systems.",
    knowsAbout: [
      "Mortgage AI governance",
      "AI controls and evidence",
      "AI visibility",
      "Cross-engine strategy",
      "Agent Permission Protocol",
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
      title="Gerardo I. Ornelas"
      description="Gerardo I. Ornelas works on mortgage AI governance, execution evidence, and AI-era visibility systems."
      pathname="/author/gerardo-i-ornelas/"
      jsonLd={[personSchema, profileSchema]}
    />
  )
}

export default AuthorPage
