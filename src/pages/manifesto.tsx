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
          Verifiably Human: A Doctrine of Sovereign Authority
        </Title>
        <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
          A practical thesis for the authority layer of agentic systems: how
          intelligent products are allowed to act, how trust is enforced at
          execution time, and how accountability becomes legible instead of
          implied.
        </Typography>

        <Box mb={4}>
          <Typography>
            Most AI products still collapse reasoning and authority into the
            same layer. Once a system has access, it can often act too broadly,
            for too long, with too little proof. This manifesto argues for a
            different architecture: eliminate ambient authority, authorize
            actions at execution time, and design the human interface to
            authority as carefully as the policy itself.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h6">The Pillars</Typography>
          <ul>
            <li>
              <Typography>
                Deterministic Authority: permissions are scoped, logged, and
                revocable at execution-time. We move from ambient authority to
                explicit, bounded control.
              </Typography>
            </li>
            <li>
              <Typography>
                Security–UX Convergence: safety is engineered into the
                interface, not bolted on. If a human cannot audit a permission
                in 300ms, the system is a liability.
              </Typography>
            </li>
            <li>
              <Typography>
                Operational Provenance: every action generates an immutable
                receipt. If your stack cannot attest to its own integrity in
                real time, it is a prototype—not production infrastructure.
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
            This doctrine codifies patterns from Crittora, the Agent Permission
            Protocol, and lessons learned architecting for critical
            infrastructure and regulated environments. It is intentionally
            operational: how to scope authority, instrument verifiability,
            design legible review surfaces, and maintain human sovereignty
            without sacrificing the velocity of autonomy.
          </Typography>
        </Box>

        <Box display="flex" gap={2}>
          <a href="/#contact">Request a Briefing</a>
          <a href="/authority-layer/">Start with the authority layer</a>
          <a href="/blog/">Read the research</a>
        </Box>
      </Container>
    </LayoutAlt>
  )
}

export const Head: HeadFC = () => (
  <Seo
    title="Verifiably Human Manifesto"
    description="A practical thesis for the authority layer of agentic systems: execution-time authorization, ambient-authority elimination, security UX, and verifiable accountability."
    pathname="/manifesto"
  />
)

export default ManifestoPage
