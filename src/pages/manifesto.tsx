import React from "react"
import type { HeadFC } from "gatsby"
import { Box, Container, Typography, Divider } from "@mui/material"

import { LayoutAlt } from "../components/Layout"
import { Seo } from "../components/Seo"
import { Title } from "../components/Title"

const ManifestoPage: React.FC = () => {
  return (
    <LayoutAlt>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Title variant="segmentAlt">
          Verifiably Human: A Doctrine of Authority & Evidence
        </Title>
        <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
          A practical thesis for high-trust AI: how consequential systems are
          allowed to act, how evidence makes those actions reviewable, and how
          public information becomes reliable enough to be understood.
        </Typography>

        <Box mb={4}>
          <Typography>
            High-trust businesses have two related problems. In operations, AI
            can act too broadly, for too long, with too little proof. In public,
            a business can be found but still be misunderstood by people and
            answer engines. This doctrine argues for explicit authority,
            reviewable evidence, and clear information at both decision points.
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
                Trustworthy Information: evidence, provenance, and clear
                public claims let systems and people understand what is true,
                where it came from, and when it should be trusted.
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
            This doctrine draws on Crittora's mortgage AI control-and-evidence
            work, the Agent Permission Protocol, AI visibility practice, and
            lessons from regulated environments. It is intentionally
            operational: scope authority, preserve reviewable evidence, and
            design information that can be accurately understood without
            sacrificing useful speed.
          </Typography>
        </Box>

        <Box display="flex" gap={2}>
          <a href="/#contact">Request a Briefing</a>
          <a href="/authority-layer/">Explore authority and evidence research</a>
          <a href="/blog/">Read the research</a>
        </Box>
      </Container>
    </LayoutAlt>
  )
}

export const Head: HeadFC = () => (
  <Seo
    title="Verifiably Human Doctrine"
    description="A practical thesis for governed AI, execution evidence, and trustworthy public information in high-trust markets."
    pathname="/manifesto"
  />
)

export default ManifestoPage
