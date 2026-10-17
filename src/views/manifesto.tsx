import { withPage } from "../lib/site"
import React from "react"
import type { HeadFC } from "../lib/site"
import { Box, Container, Typography, Divider } from "@mui/material"

import { LayoutAlt } from "../components/Layout"
import { Seo } from "../components/Seo"
import { Title } from "../components/Title"

const ManifestoPage: React.FC = () => {
  return (
    <LayoutAlt>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Title variant="segmentAlt">
          Verifiably Human: An Earlier Argument
        </Title>
        <Box sx={{ mt: 3, mb: 4, p: 3, borderLeft: "3px solid", borderColor: "warning.main", bgcolor: "rgba(237, 108, 2, 0.06)" }}>
          <Typography variant="overline">Historical status · corrected 2026-10-08</Typography>
          <Typography sx={{ mt: 1 }}>
            This page preserves an earlier synthesis. It does not represent the current Verifiably Human research thesis. Attributable provenance can preserve a claim and its supporting record; it does not establish that the claim is true or that content was human-authored. Missing evidence means unknown origin.
          </Typography>
          <Typography sx={{ mt: 1.5 }}>
            <a href="/research/verifiably-human/">Read the current research statement</a> · <a href="/corrections/">Read the correction record</a>
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
          An earlier thesis for high-trust AI: how consequential systems are
          allowed to act, how evidence makes those actions reviewable, and how
          public information becomes reliable enough to be understood.
        </Typography>

        <Box mb={4}>
          <Typography>
            High-trust businesses have two related problems. In operations, AI
            can act too broadly, for too long, with too little proof. In public,
            a business can be found but still be misunderstood by people and
            answer engines. This doctrine argues for explicit authority,
            reviewable evidence, and clear information at both decision points. These are design arguments, not verified outcomes.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h6">The Pillars</Typography>
          <ul>
            <li>
              <Typography>
                Governed Action: consequential permissions are scoped, logged,
                and reviewable at execution time. Access does not silently
                become standing permission.
              </Typography>
            </li>
            <li>
              <Typography>
                Legible Oversight: controls and evidence are designed for the
                human reviewers who need to understand a decision, its limits,
                and its outcome.
              </Typography>
            </li>
            <li>
              <Typography>
                Bounded Information: evidence, provenance, and clear public
                claims can show what was recorded, who asserted it, and what
                remains unresolved. They do not independently establish truth.
              </Typography>
            </li>
          </ul>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box mb={4}>
          <Typography variant="body1" sx={{ fontStyle: "italic" }}>
            “In the era of agents, trust is no longer a feeling—it is an
            infrastructure.”
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography>
            This earlier argument draws on Crittora's mortgage AI control-and-evidence
            design, the Agent Permission Protocol, AI visibility practice, and
            lessons from regulated environments. It is intentionally
            operational: scope authority, preserve reviewable evidence, and
            design information that can be accurately understood without
            sacrificing useful speed.
          </Typography>
        </Box>

        <Box display="flex" gap={2}>
          <a href="/#contact">Request a Briefing</a>
          <a href="/research/verifiably-human/">Current Verifiably Human research</a>
          <a href="/research/">Research &amp; Field Notes</a>
        </Box>
      </Container>
    </LayoutAlt>
  )
}

export const Head: HeadFC = () => (
  <Seo
    title="Verifiably Human — Earlier Argument and Correction"
    description="An earlier Verifiably Human argument retained with a prominent correction and a link to the current research statement."
    pathname="/manifesto"
  />
)

export default withPage(ManifestoPage)
