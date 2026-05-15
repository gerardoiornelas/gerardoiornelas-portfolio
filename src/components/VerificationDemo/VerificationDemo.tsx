import React from "react"
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material"
import Grid from "@mui/material/Grid"

import { AnimateOnScroll } from "../AnimateOnScroll"
import { RowCol } from "../RowCol"
import { Segment } from "../Segment"
import { Title } from "../Title"

import {
  VerificationScenario,
  verificationScenarios,
} from "./VerificationDemo.api"

const statusTone = {
  executed: "success",
  expired: "warning",
  revoked: "error",
} as const

const proofCopy = {
  executed: {
    label: "Confirmed on proof rail",
    summary:
      "This receipt maps to an immutable proof reference and the action stayed inside the original grant window.",
  },
  expired: {
    label: "Expired before safe settlement",
    summary:
      "The action no longer satisfies the original time boundary, so the receipt remains visible but cannot be treated as currently authorized.",
  },
  revoked: {
    label: "Revoked after issue",
    summary:
      "The receipt preserves provenance while making clear that the grant was later withdrawn and should not be reused.",
  },
} as const

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  })
}

function renderList(items: string[]) {
  return (
    <Stack spacing={1.25}>
      {items.map(item => (
        <Box key={item} display="flex" gap={1.25} alignItems="flex-start">
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "secondary.main",
              mt: "0.45rem",
              flexShrink: 0,
            }}
          />
          <Typography color="text.secondary">{item}</Typography>
        </Box>
      ))}
    </Stack>
  )
}

function StepCard({
  step,
  title,
  children,
}: {
  step: string
  title: string
  children: React.ReactNode
}) {
  return (
    <Box
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "rgba(216, 216, 216, 0.14)",
        backgroundColor: "background.paper",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.18)",
      }}
    >
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={2}>
          <Box>
            <Typography
              variant="overline"
              color="secondary.main"
              sx={{ letterSpacing: 2 }}
            >
              {step}
            </Typography>
            <Typography variant="h6">{title}</Typography>
          </Box>
          {children}
        </Stack>
      </Box>
    </Box>
  )
}

function KeyValue({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </Box>
  )
}

export const VerificationDemo: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = React.useState(
    verificationScenarios[0].id
  )
  const [verifiedScenarioId, setVerifiedScenarioId] = React.useState<
    string | null
  >(null)

  const selectedScenario =
    verificationScenarios.find(
      scenario => scenario.id === selectedScenarioId
    ) ?? verificationScenarios[0]

  const verificationVisible = verifiedScenarioId === selectedScenario.id
  const proofState = proofCopy[selectedScenario.verificationReceipt.status]

  const handleScenarioChange = (scenario: VerificationScenario) => {
    setSelectedScenarioId(scenario.id)
    setVerifiedScenarioId(null)
  }

  return (
    <Segment variant="gradient" segmentDecorationAlt>
      <Container>
        <RowCol mb={4}>
          <AnimateOnScroll animateIn="fadeInUp">
            <Box textAlign="center" maxWidth="md" mx="auto">
              <Typography
                variant="overline"
                color="secondary.main"
                sx={{ letterSpacing: 2 }}
              >
                Verifiable Authorization Receipt Demo
              </Typography>
              <Title variant="segment" align="center">
                Verify An Agent Action
              </Title>
              <Typography sx={{ mt: 2 }}>
                Intelligence is not authority. This demo shows how a proposed
                agent action becomes legible only when the grant is explicit,
                bounded, and backed by a verifiable receipt.
              </Typography>
            </Box>
          </AnimateOnScroll>
        </RowCol>

        <RowCol mb={4}>
          <AnimateOnScroll animateIn="fadeInUp" delay={100}>
            <Box
              sx={{
                p: { xs: 2, md: 3 },
                border: "1px solid rgba(216, 216, 216, 0.12)",
                background:
                  "linear-gradient(135deg, rgba(56, 180, 198, 0.10) 0%, rgba(19, 18, 61, 0.92) 100%)",
              }}
            >
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Select a scenario to inspect the action request, the authority
                grant, and the resulting receipt.
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
                {verificationScenarios.map(scenario => {
                  const active = scenario.id === selectedScenario.id
                  return (
                    <Button
                      key={scenario.id}
                      variant={active ? "contained" : "outlined"}
                      color={active ? "secondary" : "primary"}
                      onClick={() => handleScenarioChange(scenario)}
                    >
                      {scenario.eyebrow}
                    </Button>
                  )
                })}
              </Stack>
              <Typography sx={{ mt: 2.5 }}>{selectedScenario.thesis}</Typography>
            </Box>
          </AnimateOnScroll>
        </RowCol>

        <RowCol mb={4}>
          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} lg={4}>
              <AnimateOnScroll animateIn="fadeInUp" delay={150}>
                <StepCard step="Step 1" title="Proposed Action">
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip
                      label={`${selectedScenario.actionRequest.riskLevel} risk`}
                      color="secondary"
                      size="small"
                    />
                    <Chip
                      label={selectedScenario.actionRequest.actor}
                      variant="outlined"
                      size="small"
                    />
                  </Stack>
                  <Typography variant="h6">
                    {selectedScenario.actionRequest.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {selectedScenario.actionRequest.requestedAction}
                  </Typography>
                  <Divider />
                  <KeyValue
                    label="Resource"
                    value={selectedScenario.actionRequest.resource}
                  />
                  <KeyValue
                    label="Request ID"
                    value={selectedScenario.actionRequest.id}
                  />
                </StepCard>
              </AnimateOnScroll>
            </Grid>

            <Grid item xs={12} lg={4}>
              <AnimateOnScroll animateIn="fadeInUp" delay={225}>
                <StepCard step="Step 2" title="Authority Grant">
                  <KeyValue
                    label="Grant ID"
                    value={selectedScenario.authorityGrant.grantId}
                  />
                  <KeyValue
                    label="Approved By"
                    value={selectedScenario.authorityGrant.approvedBy}
                  />
                  <KeyValue
                    label="Expires"
                    value={formatTimestamp(selectedScenario.authorityGrant.expiresAt)}
                  />
                  <KeyValue
                    label="Policy Hash"
                    value={selectedScenario.authorityGrant.policyHash}
                  />
                  <Divider />
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                      Scope
                    </Typography>
                    {renderList(selectedScenario.authorityGrant.scope)}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                      Constraints
                    </Typography>
                    {renderList(selectedScenario.authorityGrant.constraints)}
                  </Box>
                </StepCard>
              </AnimateOnScroll>
            </Grid>

            <Grid item xs={12} lg={4}>
              <AnimateOnScroll animateIn="fadeInUp" delay={300}>
                <StepCard step="Step 3" title="Verification Receipt">
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip
                      label={selectedScenario.verificationReceipt.status}
                      color={statusTone[selectedScenario.verificationReceipt.status]}
                      size="small"
                    />
                    <Chip
                      label={
                        selectedScenario.verificationReceipt.revocable
                          ? "Revocable"
                          : "Non-revocable"
                      }
                      variant="outlined"
                      size="small"
                    />
                  </Stack>
                  <KeyValue
                    label="Receipt ID"
                    value={selectedScenario.verificationReceipt.receiptId}
                  />
                  <KeyValue
                    label="Executed"
                    value={formatTimestamp(selectedScenario.verificationReceipt.executedAt)}
                  />
                  <KeyValue
                    label="Proof Rail"
                    value={selectedScenario.verificationReceipt.proofRef.network}
                  />
                  <KeyValue
                    label="Transaction Reference"
                    value={selectedScenario.verificationReceipt.proofRef.txIdOrHash}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setVerifiedScenarioId(selectedScenario.id)}
                  >
                    Verify Receipt
                  </Button>
                </StepCard>
              </AnimateOnScroll>
            </Grid>
          </Grid>
        </RowCol>

        <RowCol>
          <AnimateOnScroll animateIn="fadeInUp" delay={350}>
            <Box
              sx={{
                p: { xs: 2, md: 3 },
                border: "1px solid rgba(216, 216, 216, 0.14)",
                backgroundColor: "background.paper",
              }}
            >
              {verificationVisible ? (
                <Stack spacing={2.5}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                    flexDirection={{ xs: "column", md: "row" }}
                    gap={1.5}
                  >
                    <Box>
                      <Typography variant="overline" color="secondary.main">
                        Verification Result
                      </Typography>
                      <Typography variant="h5">{proofState.label}</Typography>
                    </Box>
                    <Chip
                      label={selectedScenario.verificationReceipt.proofRef.proofStatus}
                      color={statusTone[selectedScenario.verificationReceipt.status]}
                    />
                  </Box>

                  <Typography color="text.secondary">
                    {proofState.summary}
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          p: 2,
                          height: "100%",
                          border: "1px solid rgba(216, 216, 216, 0.12)",
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                          What this proves
                        </Typography>
                        {renderList([
                          "The action was evaluated against an explicit grant.",
                          "The grant carries bounded scope, constraints, and expiry.",
                          "The receipt points to a durable proof reference rather than a silent internal log.",
                          "Revocation and expiry remain legible after execution.",
                        ])}
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          p: 2,
                          height: "100%",
                          border: "1px solid rgba(216, 216, 216, 0.12)",
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                          Proof reference
                        </Typography>
                        <Stack spacing={1.25}>
                          <KeyValue
                            label="Record type"
                            value={
                              selectedScenario.verificationReceipt.proofRef
                                .recordType
                            }
                          />
                          <KeyValue
                            label="Network"
                            value={
                              selectedScenario.verificationReceipt.proofRef.network
                            }
                          />
                          <KeyValue
                            label="Verifier"
                            value={
                              <Link
                                href={
                                  selectedScenario.verificationReceipt.proofRef
                                    .verifierUrl
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                Open external proof explorer
                              </Link>
                            }
                          />
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                </Stack>
              ) : (
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Ready to verify
                  </Typography>
                  <Typography color="text.secondary">
                    Inspect the grant first, then verify the receipt to see how
                    provenance, expiry, and revocation become legible without
                    requiring wallet friction.
                  </Typography>
                </Box>
              )}
            </Box>
          </AnimateOnScroll>
        </RowCol>
      </Container>
    </Segment>
  )
}
