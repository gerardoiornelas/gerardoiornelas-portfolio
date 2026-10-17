import React from "react"
import { Box, Button, Container, Divider, Grid, Stack, Typography } from "@mui/material"
import { LayoutAlt } from "../components/Layout"
import { Seo, seoDefaults } from "../components/Seo"
import { type HeadFC, withPage } from "../lib/site"

const dimensions = [
  ["Process evidence", "What activity was observed, under which threat model, and what remained outside observation."],
  ["Attributable declaration", "What a particular issuer claimed about a particular artifact. A valid signature does not establish that the claim is true."],
  ["Accountability", "Who investigates challenges, what evidence is considered, what consequences can follow, and how decisions are appealed."],
  ["Authority", "Whether an actor was permitted to perform or publish a particular action or claim."],
]

const VerifiablyHumanPage: React.FC = () => (
  <LayoutAlt>
    <Box component="main" py={{ xs: 6, md: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="overline" color="secondary.main">Evolving research program</Typography>
        <Typography component="h1" variant="h2" sx={{ mt: 1, mb: 3 }}>Verifiably Human</Typography>
        <Typography variant="h5" sx={{ maxWidth: 920, fontWeight: 300, lineHeight: 1.55 }}>
          Human-creation claims should identify their supporting process evidence, attributable declarations, and observation limits. Authority and accountability are evaluated separately. Anything the evidence does not resolve remains unknown.
        </Typography>
        <Box sx={{ mt: 4, p: 3, borderLeft: "3px solid", borderColor: "warning.main", bgcolor: "rgba(237, 108, 2, 0.06)" }}>
          <Typography component="h2" variant="h5">Correction to Parts I–III</Typography>
          <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.75 }}>
            Authorized issuance is not verified origin. A person can retype or revise AI-produced text and issue a valid signed claim. Missing provenance means unknown origin, not synthetic origin. Capture, authorship, approval, and AI assistance can coexist. A dispute requires an adjudication process; it does not automatically invalidate a claim. An issuer’s stated time is not independent evidence of when a record existed.
          </Typography>
          <Button component="a" href="/corrections/" color="secondary" sx={{ mt: 2 }}>Read the correction record →</Button>
        </Box>
      </Container>
      <Divider sx={{ my: { xs: 6, md: 10 } }} />
      <Container maxWidth="lg">
        <Typography component="h2" variant="h3" sx={{ mb: 3 }}>Four dimensions, reported separately</Typography>
        <Grid container spacing={3}>
          {dimensions.map(([title, body]) => (
            <Grid item xs={12} md={6} key={title}>
              <Box sx={{ height: "100%", p: 3, border: "1px solid", borderColor: "divider" }}>
                <Typography component="h3" variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{body}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Divider sx={{ my: { xs: 6, md: 10 } }} />
      <Container maxWidth="lg">
        <Typography component="h2" variant="h3" sx={{ mb: 3 }}>Open work</Typography>
        <Stack spacing={2} sx={{ maxWidth: 900 }}>
          <Typography color="text.secondary">Define individual creation claims precisely enough that observed workflow, declared claim, and policy eligibility remain separate.</Typography>
          <Typography color="text.secondary">Compare which forms of process evidence survive deliberate substitution, and which legitimate workflows—including dictation, transcription, autocomplete, and assistive input—are wrongly rejected.</Typography>
          <Typography color="text.secondary">Measure attack acceptance, legitimate rejection, unresolved cases, privacy exposure, and collection burden. No benchmark result has been published.</Typography>
        </Stack>
        <Typography sx={{ mt: 4 }}>Earlier essays remain available as historical arguments with visible editor’s notes:</Typography>
        <Stack spacing={1} sx={{ mt: 2 }}>
          <a href="/blog/verifiably-human-part-1/">Part I: Everything Is Synthetic by Default</a>
          <a href="/blog/verifiably-human-part-2/">Part II: The Death of Ambient Authority</a>
          <a href="/blog/verifiably-human-part-3/">Part III: Sealing the Moment of Creation</a>
        </Stack>
      </Container>
    </Box>
  </LayoutAlt>
)

export const Head: HeadFC = () => <Seo title="Verifiably Human — Evolving Research Program" description="An evolving research program asking what evidence justifies claims of human creation, with process evidence, declarations, accountability, authority, and uncertainty reported separately." pathname="/research/verifiably-human/" jsonLd={{ "@context": "https://schema.org", "@type": "ResearchProject", name: "Verifiably Human", url: `${seoDefaults.siteUrl}/research/verifiably-human/`, description: "Research into what evidence justifies claims of human creation." }} />

export default withPage(VerifiablyHumanPage)
