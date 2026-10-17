import React from "react"
import { Box, Container, Stack, Typography } from "@mui/material"
import { LayoutAlt } from "../components/Layout"
import { Seo, seoDefaults } from "../components/Seo"
import { type HeadFC, withPage } from "../lib/site"

const installments = [
  ["Part I", "The Provenance Spectrum", "/blog/trust-stack-provenance-spectrum-pol-c2pa/"],
  ["Part II", "Proof of Personhood Is Not Proof of Authority", "/blog/trust-stack-proof-of-personhood-vs-authority/"],
  ["Part III", "The Silicon Root of Trust", "/blog/trust-stack-hardware-capture-attestation/"],
  ["Part IV", "Beyond the Badge: Capability-Based Provenance", "/blog/beyond-the-badge-capability-based-provenance/"],
]

const TrustStackPage: React.FC = () => (
  <LayoutAlt>
    <Box component="main" py={{ xs: 6, md: 10 }}>
      <Container maxWidth="md">
        <Typography variant="overline" color="secondary.main">Published series · four numbered installments verified</Typography>
        <Typography component="h1" variant="h2" sx={{ mt: 1, mb: 3 }}>The Trust Stack</Typography>
        <Typography variant="h5" sx={{ fontWeight: 300, lineHeight: 1.55, mb: 5 }}>
          A published argument that identity, provenance, authenticity, authority, and capability answer different questions. The series should be read as analysis, not as a deployed standard or a validation of Verifiably Human.
        </Typography>
        <Stack spacing={2}>
          {installments.map(([part, title, href]) => (
            <Box key={part} sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
              <Typography variant="overline">{part}</Typography>
              <Typography component="h2" variant="h5"><a href={href}>{title}</a></Typography>
            </Box>
          ))}
        </Stack>
        <Typography color="text.secondary" sx={{ mt: 4, lineHeight: 1.7 }}>
          The repository contains four numbered installments. No fifth numbered article was found, so this page does not claim the planned five-part series is complete.
        </Typography>
      </Container>
    </Box>
  </LayoutAlt>
)

export const Head: HeadFC = () => <Seo title="The Trust Stack — Published Series" description="Four verified installments examining the limits and relationships of identity, provenance, authenticity, authority, and capability." pathname="/research/trust-stack/" jsonLd={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "The Trust Stack", url: `${seoDefaults.siteUrl}/research/trust-stack/` }} />

export default withPage(TrustStackPage)
