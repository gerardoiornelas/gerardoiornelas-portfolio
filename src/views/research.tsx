import React from "react"
import { Box, Button, Container, Divider, Grid, Stack, Typography } from "@mui/material"
import { LayoutAlt } from "../components/Layout"
import { Seo, seoDefaults } from "../components/Seo"
import { Link, type HeadFC, withPage } from "../lib/site"

const territories = [
  ["Human–AI Interaction", "Agency, cognition, creativity, delegation, work, learning, memory, authorship, and accessibility."],
  ["Authority & Trust", "Permission, provenance, identity, verification, execution, accountability, ownership, and recourse."],
  ["Human–Technology Futures", "Embodied, ambient, spatial, decentralized, and other interaction models that change the human relationship with computation."],
]

const bodies = [
  ["Verifiably Human", "Evolving research program", "/research/verifiably-human/", "What evidence justifies a claim of human creation, and what remains unknown?"],
  ["UI-GATES", "Experimental engineering project", "/uig/", "Mechanisms and measurements for evidence in AI-assisted software work, including negative and inconclusive results."],
  ["The Trust Stack", "Published series · four numbered installments verified", "/research/trust-stack/", "Identity, provenance, authenticity, authority, and capability are related signals with different limits."],
  ["The Authority Layer", "Published argument", "/authority-layer/", "A design argument for connecting human-readable intent to bounded execution authority."],
]

const ResearchPage: React.FC = () => (
  <LayoutAlt>
    <Box component="main" py={{ xs: 6, md: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="overline" color="secondary.main">Research &amp; Field Notes</Typography>
        <Typography component="h1" variant="h2" sx={{ maxWidth: 900, mt: 1, mb: 3 }}>
          What does good human–computer interaction mean when the computer is no longer waiting for the human to operate it?
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 820, lineHeight: 1.8 }}>
          This is the intellectual layer of Gerardo’s work. Each body of work is labeled by its actual status so an argument, implementation, experiment, and evaluated finding are not treated as the same kind of evidence.
        </Typography>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {territories.map(([title, body]) => (
            <Grid item xs={12} md={4} key={title}>
              <Box sx={{ height: "100%", p: 3, border: "1px solid", borderColor: "divider" }}>
                <Typography component="h2" variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{body}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Divider sx={{ my: { xs: 6, md: 10 } }} />
      <Container maxWidth="lg">
        <Typography component="h2" variant="h3" sx={{ mb: 4 }}>Bodies of work</Typography>
        <Stack spacing={3}>
          {bodies.map(([title, status, href, body]) => (
            <Box key={title} sx={{ p: 3, borderLeft: "3px solid", borderColor: "secondary.main", bgcolor: "rgba(56, 180, 198, 0.05)" }}>
              <Typography variant="overline" sx={{ letterSpacing: "0.14em" }}>{status}</Typography>
              <Typography component="h3" variant="h4" sx={{ mb: 1 }}>{title}</Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 850, lineHeight: 1.7, mb: 2 }}>{body}</Typography>
              <Button component={Link} to={href} color="secondary">Review the work →</Button>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  </LayoutAlt>
)

export const Head: HeadFC = () => <Seo title="Research & Field Notes" description="Research and field notes on human agency, authority, provenance, and interaction with autonomous systems, with the status of each body of work made explicit." pathname="/research/" jsonLd={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Research & Field Notes", url: `${seoDefaults.siteUrl}/research/` }} />

export default withPage(ResearchPage)
