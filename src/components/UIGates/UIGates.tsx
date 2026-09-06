import React from "react"
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material"

import { RowCol } from "../RowCol"
import { AnimateOnScroll } from "../AnimateOnScroll"
import { Segment } from "../Segment"
import { Title } from "../Title"
import ImgUigTerminal from "../../images/uig/uigate_terminal.png"

export const UIGates: React.FC = () => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  const steps = [
    { label: "Intent", desc: "Principal bounds objective & constraints" },
    { label: "Proposal", desc: "Agent states scope, risk & plan" },
    { label: "UI-GATE", desc: "Execution-time authority decision", isGate: true },
    { label: "Execute", desc: "Perform only delegated scope" },
    { label: "Verify", desc: "Validate evidence on real surfaces" },
    { label: "Receipt", desc: "Record immutable execution receipt" },
    { label: "Synthesize", desc: "Compound learning into knowledge" },
  ]

  return (
    <Segment>
      <Container maxWidth="lg">
        <RowCol mb={4}>
          <AnimateOnScroll animateIn="fadeInUp">
            <Box textAlign="center" mb={1}>
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "secondary.main",
                  textTransform: "uppercase",
                }}
              >
                Authority-Aware Agentic Operating System
              </Typography>
            </Box>

            <Box textAlign="center" mb={2}>
              <Title variant="segment">
                UI-GATES
              </Title>
            </Box>

            <Box textAlign="center" mb={4} maxWidth="md" mx="auto">
              <Typography
                variant="h5"
                sx={{
                  color: "text.primary",
                  fontWeight: 300,
                  lineHeight: 1.5,
                  mb: 2,
                }}
              >
                “Reasoning proposes. Authority decides. Verified work synthesizes into reusable knowledge.”
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: 16, lineHeight: 1.7 }}>
                <strong>UI-GATES</strong> (User-Intent Gated Agentic Task Execution & Synthesis) is an
                authority-aware operating model and portable skill for agentic work. It brings intent bounding,
                execution-time authority gates, evidence-based verification, and durable knowledge into the same loop—so
                autonomous agents move fast without treating credentials as permission or previous work as lost context.
              </Typography>
            </Box>

            {/* Three Core Pillars */}
            <Grid container spacing={3} sx={{ mb: 5 }} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    height: "100%",
                    p: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "rgba(8, 18, 27, 0.6)",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      color: "secondary.main",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      mb: 1.5,
                    }}
                  >
                    01 · Intent & Proposal
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1.5 }}>
                    Intent Bounding
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7, fontSize: 14 }}>
                    A human principal defines the exact objective, constraints, and success criteria. Agents produce structured proposals naming the action, resource scope, and risk before changing state.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    height: "100%",
                    p: 3,
                    border: "1px solid",
                    borderColor: "secondary.main",
                    bgcolor: "rgba(56, 180, 198, 0.08)",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      color: "secondary.main",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      mb: 1.5,
                    }}
                  >
                    02 · UI-GATE Authority
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1.5 }}>
                    Execution-Time Gate
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7, fontSize: 14 }}>
                    The authority plane evaluates every consequential action at runtime: <em>ALLOW</em>, <em>DENY</em>, or <em>ESCALATE</em>. Having API access or a shell never implies permission.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    height: "100%",
                    p: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "rgba(8, 18, 27, 0.6)",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      color: "secondary.main",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      mb: 1.5,
                    }}
                  >
                    03 · Synthesis & Receipts
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1.5 }}>
                    Compounding Knowledge
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7, fontSize: 14 }}>
                    Every meaningful execution produces a verifiable receipt. Validated decisions and reusable patterns are promoted into repository knowledge so future tasks compound on proven context.
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Step-by-Step Flow */}
            <Box
              sx={{
                mb: 6,
                p: { xs: 2.5, md: 4 },
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "rgba(8, 18, 27, 0.72)",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  color: "secondary.main",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textAlign: "center",
                  mb: 3,
                }}
              >
                THE UI-GATES OPERATING LOOP
              </Typography>
              <Grid container spacing={2}>
                {steps.map((s, idx) => (
                  <Grid item xs={12} sm={6} md={12 / 7} key={s.label}>
                    <Box
                      sx={{
                        p: 2,
                        height: "100%",
                        border: "1px solid",
                        borderColor: s.isGate ? "secondary.main" : "divider",
                        bgcolor: s.isGate ? "rgba(56, 180, 198, 0.15)" : "transparent",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "monospace",
                          color: s.isGate ? "secondary.main" : "text.disabled",
                          fontSize: 10,
                          fontWeight: 700,
                          mb: 0.5,
                        }}
                      >
                        STEP {String(idx + 1).padStart(2, "0")}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "monospace",
                          color: s.isGate ? "secondary.main" : "text.primary",
                          fontSize: 13,
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          mb: 1,
                        }}
                      >
                        {s.label}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: 11, lineHeight: 1.4 }}
                      >
                        {s.desc}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Optional Terminal / Visual Preview */}
            {ImgUigTerminal && (
              <Box mb={5} sx={{ maxWidth: 880, mx: "auto" }}>
                <Box
                  component="img"
                  src={ImgUigTerminal}
                  alt="UI-GATES Execution Terminal & Authority Decision"
                  width="100%"
                  sx={{ borderRadius: 1, border: "1px solid", borderColor: "divider" }}
                />
              </Box>
            )}

            {/* CTAs */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="secondary"
                href="/uig/"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: 13,
                  px: 3.5,
                  py: 1.25,
                }}
              >
                Explore UI-GATES System ↗
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                href="/compound-engineering/"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 600,
                  fontSize: 13,
                  px: 3,
                  py: 1.25,
                }}
              >
                Compound Engineering Playbook
              </Button>
              <Button
                variant="text"
                color="secondary"
                href="https://github.com/gerardoiornelas/uigates"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 600,
                  fontSize: 13,
                  opacity: 0.85,
                }}
              >
                View on GitHub ↗
              </Button>
            </Stack>
          </AnimateOnScroll>
        </RowCol>
      </Container>
    </Segment>
  )
}
