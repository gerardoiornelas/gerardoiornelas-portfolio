import React from "react"
import { Box, Container, Typography } from "@mui/material"
import { LayoutAlt } from "../components/Layout"
import { Seo, seoDefaults } from "../components/Seo"
import { type HeadFC, withPage } from "../lib/site"

const CorrectionsPage: React.FC = () => (
  <LayoutAlt>
    <Box component="main" py={{ xs: 6, md: 10 }}>
      <Container maxWidth="md">
        <Typography variant="overline" color="secondary.main">Public record</Typography>
        <Typography component="h1" variant="h2" sx={{ mt: 1, mb: 3 }}>Corrections</Typography>
        <Typography color="text.secondary" sx={{ lineHeight: 1.8, mb: 6 }}>
          Earlier writing remains available in its original form. This log records material changes to the claims used by current research and site summaries.
        </Typography>
        <Box component="article" sx={{ p: 3, borderLeft: "3px solid", borderColor: "warning.main", bgcolor: "rgba(237, 108, 2, 0.06)" }}>
          <Typography variant="overline">2026-10-08 · Verifiably Human Parts I–III</Typography>
          <Typography component="h2" variant="h4" sx={{ mt: 1, mb: 2 }}>Authority to assert origin is not evidence that origin is true.</Typography>
          <Typography sx={{ mb: 2 }}><strong>Prior claims:</strong> Missing provenance should be treated as synthetic; human-origin scopes form a downgrade ladder; signed, encrypted, expiring policies make human origin verifiable; a disputed hash invalidates a claim.</Typography>
          <Typography sx={{ mb: 2 }}><strong>Corrected position:</strong> Missing provenance means unknown origin. Process evidence, attributable declarations, accountability, and authority are separate dimensions. Capture, authorship, approval, and AI assistance can coexist. A signature binds a declaration to a key under stated assumptions; it does not establish authorship. Disputes require governed review. Claimed issue time is not independent time evidence, and historical evidence does not share the lifecycle of current permission.</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}><strong>Reason:</strong> The retype counterexample passes the original policy checks: a person can retype or revise AI-produced text and issue a valid signed claim. The cryptography protects the record but does not establish the truth of its creation claim.</Typography>
          <Typography><a href="/research/verifiably-human/">Current research statement</a> · <a href="/blog/verifiably-human-part-1/">Part I</a> · <a href="/blog/verifiably-human-part-2/">Part II</a> · <a href="/blog/verifiably-human-part-3/">Part III</a></Typography>
        </Box>
      </Container>
    </Box>
  </LayoutAlt>
)

export const Head: HeadFC = () => <Seo title="Corrections" description="A public log of material corrections to Gerardo I. Ornelas’s published arguments and research summaries." pathname="/corrections/" jsonLd={{ "@context": "https://schema.org", "@type": "WebPage", name: "Corrections", url: `${seoDefaults.siteUrl}/corrections/` }} />

export default withPage(CorrectionsPage)
