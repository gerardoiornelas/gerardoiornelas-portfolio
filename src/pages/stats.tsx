import React from "react"
import type { HeadFC } from "gatsby"
import { Box, Container, Typography, Chip, Stack } from "@mui/material"

import { LayoutAlt } from "../components/Layout"
import { Seo } from "../components/Seo"
import { Title } from "../components/Title"

const StatItem: React.FC<{ label: string; target: string }> = ({ label, target }) => (
  <Box sx={{ p: 3, border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
    <Typography variant="subtitle2" color="text.secondary">
      {label}
    </Typography>
    <Stack direction="row" spacing={1} alignItems="center" mt={1}>
      <Chip label="Target" size="small" color="secondary" />
      <Typography>{target}</Typography>
    </Stack>
  </Box>
)

const StatsPage: React.FC = () => {
  return (
    <LayoutAlt>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Title variant="segmentAlt">Operational Stats</Title>
        <Typography sx={{ mt: 2, mb: 4 }}>
          Live targets for performance, accessibility, and security baselines.
        </Typography>
        <Stack spacing={3}>
          <StatItem label="Performance" target="100/100 Lighthouse (mobile)" />
          <StatItem label="Accessibility" target="WCAG 2.2 AA" />
          <StatItem label="Security" target="Strict CSP; zero third-party trackers except newsletter" />
        </Stack>
      </Container>
    </LayoutAlt>
  )
}

export const Head: HeadFC = () => (
  <Seo
    title="Operational Stats"
    description="Performance, accessibility, and security targets for agentic trust delivery."
    pathname="/stats"
  />
)

export default StatsPage
