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
                Tech Futurist in Blockchain and Agentic AI Security
              </Typography>
              <Typography paragraph>
                I build trust infrastructure for autonomous systems. My work
                focuses on execution-time authorization, cryptographic policy
                enforcement, and verifiable provenance for AI actions and
                digital content.
              </Typography>
              <Typography paragraph>
                I am Co-Founder at Crittora and Co-Author of the Agent
                Permission Protocol (APP), where I work on production controls
                that make AI agent authority explicit, enforceable, and
                auditable at runtime.
              </Typography>
              <Typography paragraph>
                Core areas: agentic AI security, blockchain-based provenance,
                policy verification, cryptographic sealing, and governance for
                autonomous execution.
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
    jobTitle: "Tech Futurist in Blockchain and Agentic AI Security",
    knowsAbout: [
      "Agentic AI security",
      "Execution-time authorization",
      "Blockchain provenance",
      "Cryptographic policy enforcement",
      "AI governance",
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
      title="Gerardo I. Ornelas: Blockchain + Agentic AI Security"
      description="Author profile for Gerardo I. Ornelas, focused on execution-time AI agent security and blockchain-backed provenance infrastructure."
      pathname="/author/gerardo-i-ornelas/"
      jsonLd={[personSchema, profileSchema]}
    />
  )
}

export default AuthorPage
