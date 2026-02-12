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
        <Title variant="segmentAlt">Verifiably Human</Title>
        <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
          A field doctrine for building systems that prove who is accountable—before anything goes live.
        </Typography>

        <Box mb={4}>
          <Typography variant="h6">Pillars</Typography>
          <ul>
            <li>
              <Typography>
                Deterministic trust: permissions are scoped, logged, and revocable in real time.
              </Typography>
            </li>
            <li>
              <Typography>
                Cryptography as interface: safety is designed into the interaction, not bolted on after launch.
              </Typography>
            </li>
            <li>
              <Typography>
                Operational truth: metrics are public; failures are rehearsed until they’re uneventful.
              </Typography>
            </li>
          </ul>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box mb={4}>
          <Typography variant="body1" sx={{ fontStyle: "italic" }}>
            “If your stack can’t attest to its own integrity, it’s not production-ready.”
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography>
            This manifesto collects patterns from Crittora, the Agent Permission Protocol, and regulated deployments. It is
            intentionally short and operational: how to scope authority, instrument verifiability, and keep humans in the
            loop without slowing them down.
          </Typography>
        </Box>

        <Box display="flex" gap={2}>
          <a href="#contact">Request a Briefing</a>
          <a href="/blog/">Read the research</a>
        </Box>
      </Container>
    </LayoutAlt>
  )
}

export const Head: HeadFC = () => (
  <Seo
    title="Verifiably Human Manifesto"
    description="Field doctrine for deterministic, audit-ready agentic systems."
    pathname="/manifesto"
  />
)

export default ManifestoPage
