import React from "react"
import { Container, Box, Typography, Button, Stack } from "@mui/material"
import { Segment } from "../Segment"
import { Title } from "../Title"

export const UIGates: React.FC = () => (
  <Segment>
    <Container maxWidth="lg">
      <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center" }}>
        <Typography sx={{ fontFamily: "monospace", color: "secondary.main", letterSpacing: "0.15em", fontSize: 12, mb: 2 }}>EXPERIMENTAL PROJECT · EVIDENCE AND OPEN RESEARCH</Typography>
        <Title variant="segment">UI-GATES</Title>
        <Typography variant="h5" sx={{ fontWeight: 300, lineHeight: 1.6, my: 3 }}>Investigating evidence in AI-assisted software work.</Typography>
        <Typography color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>The existing workflow, reference engine, and evaluation tools record proposed actions, verification output, and repository lessons. Evaluations have not demonstrated token savings or a learning benefit.</Typography>
        <Typography color="text.secondary" sx={{ lineHeight: 1.8, mb: 4 }}>Current research asks whether reviewers can check agents’ narrow verification claims against records already available at handoff. No claim-checking feature or results are available yet. The nine-step workflow remains a reference design.</Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
          <Button variant="contained" color="secondary" href="/uig/#measured">Read the findings</Button>
          <Button variant="outlined" color="secondary" href="/uig/#research">The open question</Button>
          <Button color="secondary" href="/compound-engineering/">Reference playbook</Button>
        </Stack>
      </Box>
    </Container>
  </Segment>
)
