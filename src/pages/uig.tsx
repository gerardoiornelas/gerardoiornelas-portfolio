import React, { useCallback } from "react"
import type { HeadFC } from "gatsby"
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material"
import { LayoutAlt } from "../components/Layout"
import { Seo, seoDefaults } from "../components/Seo"

const skillContent = `---
name: uig
description: Run the UI-GATES authority-aware learning workflow for meaningful work that needs repository knowledge, explicit intent, verification evidence, and reusable learning.
---

# UIG — UI-GATES short entrypoint

Reasoning proposes. Authority decides. Verified work synthesizes into reusable knowledge.

1. Read repository instructions and task-relevant committed knowledge.
2. Bound the intent: objective, constraints, success evidence, authority scope, and expiry.
3. Propose consequential actions with their resource, reason, impact, risk, requested authority, and verification plan.
4. Execute only delegated work. Escalate gated or prohibited actions to the principal.
5. Verify with evidence, record a receipt, and promote only warranted learning with provenance.

Authority states: observe, delegated, gated, prohibited.

UI-GATES COMPLETE — outcome verified, provenance recorded, next work grounded.
`

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography
    sx={{
      fontFamily: "monospace",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.2em",
      color: "text.disabled",
      textTransform: "uppercase",
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      mb: 3,
      "&::before": { content: '\"\"', width: 24, height: 1, bgcolor: "text.disabled" },
    }}
  >
    {children}
  </Typography>
)

const UigPage: React.FC = () => {
  const downloadSkill = useCallback(() => {
    const blob = new Blob([skillContent], { type: "text/markdown" })
    const href = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = href
    link.download = "uig-skill.md"
    link.click()
    URL.revokeObjectURL(href)
  }, [])

  const loop = [
    ["01", "Intent", "A principal defines the outcome, constraints, success evidence, allowed domain, and expiry. Technical capability never becomes authority by itself."],
    ["02", "Proposal", "An agent names the specific action, resource scope, impact, risk, authority requested, and verification plan before a consequential change."],
    ["03", "UI-GATE", "At execution time, the gate allows, denies, or escalates the proposal. It evaluates who may do what, to which resource, under which intent, right now."],
    ["04", "Evidence", "Authorized work is verified in the right surface: tests, live UI, review, security checks, or explicit human judgment. A passing build is evidence—not universal proof."],
    ["05", "Learning", "A receipt preserves provenance. Only evidence-backed decisions and reusable patterns are promoted into committed project knowledge for the next task."],
  ]

  return (
    <LayoutAlt>
      <Box sx={{ minHeight: "78vh", display: "flex", alignItems: "center", py: { xs: 11, md: 15 }, px: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Label>Authority-aware agentic work</Label>
              <Typography component="h1" sx={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: { xs: "72px", md: "118px" }, fontWeight: 400, lineHeight: 0.88, letterSpacing: "-0.025em", mb: 3 }}>
                UI-<Box component="span" sx={{ color: "secondary.main" }}>GATES</Box>
              </Typography>
              <Typography variant="h5" sx={{ maxWidth: 660, color: "text.secondary", fontWeight: 300, lineHeight: 1.65, mb: 4 }}>
                UI-GATES—User-Intent Gated Agentic Task Execution & Synthesis—is an authority-aware operating system and portable skill for agentic work. It brings intent, authority, verification, and durable knowledge into the same loop—so agents move quickly without treating access as permission or experience as forgotten context.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button component="a" href="https://github.com/gerardoiornelas/uigates" target="_blank" rel="noopener noreferrer" variant="contained" color="secondary" sx={{ fontFamily: "monospace" }}>Explore UIGATES on GitHub ↗</Button>
                <Button variant="outlined" color="secondary" onClick={() => document.getElementById("operating-loop")?.scrollIntoView({ behavior: "smooth" })} sx={{ fontFamily: "monospace" }}>See how it works ↓</Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ width: "100%", position: "relative", "&::after": { content: '\"\"', position: "absolute", inset: -20, border: "1px solid", borderColor: "rgba(56, 180, 198, 0.1)", zIndex: -1 } }}>
                <Box role="img" aria-label="UI-GATES workflow: intent, proposal, UI-GATE, execute, verify, receipt, and synthesize" sx={{ border: "1px solid", borderColor: "divider", bgcolor: "rgba(8, 18, 27, 0.72)", p: { xs: 3, md: 4 }, boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
                  <Typography sx={{ fontFamily: "monospace", color: "secondary.main", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", mb: 1.5 }}>SKILL-GUIDED WORKFLOW</Typography>
                  <Typography sx={{ color: "text.secondary", fontWeight: 300, fontSize: 14, lineHeight: 1.65, mb: 3 }}>A portable Markdown skill guides the agent through this sequence. It does not install a ticketing interface or a runtime control panel.</Typography>
                  <Stack spacing={1.25}>
                    {["Intent", "Proposal", "UI-GATE", "Execute", "Verify", "Receipt", "Synthesize"].map((step, index) => <Box key={step} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}><Typography sx={{ fontFamily: "monospace", color: "text.disabled", fontSize: 11, width: 20 }}>{String(index + 1).padStart(2, "0")}</Typography><Box sx={{ flex: 1, border: "1px solid", borderColor: step === "UI-GATE" ? "secondary.main" : "divider", bgcolor: step === "UI-GATE" ? "rgba(56, 180, 198, 0.12)" : "transparent", px: 2, py: 1.15 }}><Typography sx={{ fontFamily: "monospace", color: step === "UI-GATE" ? "secondary.main" : "text.primary", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>{step.toUpperCase()}{step === "UI-GATE" ? "  ·  ALLOW / DENY / ESCALATE" : ""}</Typography></Box></Box>)}
                  </Stack>
                  <Typography sx={{ fontFamily: "monospace", color: "text.disabled", fontSize: 10, letterSpacing: "0.08em", mt: 3 }}>REASONING PROPOSES · AUTHORITY DECIDES · VERIFIED WORK SYNTHESIZES</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Divider />
      <Container maxWidth="lg" sx={{ py: 10, px: 3 }}>
        <Label>The distinction that matters</Label>
        <Grid container spacing={3}>
          {[
            ["UI-GATES", "The operating system", "The full loop: principal intent, scoped proposals, authority decisions, execution, verification, receipts, and evidence-backed learning."],
            ["UI-GATE", "The decision at execution time", "The authority plane inside UI-GATES. It answers: is this actor authorized to perform this action, on this resource, under this intent, right now?"],
            ["Compound Engineering", "The software playbook", "The UI-GATES specialization for repository work: plan, code, test, review, preserve provenance, and teach the next task only what was actually learned."],
          ].map(([name, title, body]) => <Grid item xs={12} md={4} key={name}><Box sx={{ height: "100%", border: "1px solid", borderColor: "divider", p: 3.5, borderTop: name === "UI-GATE" ? "2px solid" : undefined, borderTopColor: "secondary.main" }}><Typography sx={{ color: "secondary.main", fontFamily: "monospace", letterSpacing: "0.16em", fontSize: 11, mb: 3 }}>{name}</Typography><Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography><Typography color="text.secondary" sx={{ fontWeight: 300, lineHeight: 1.7 }}>{body}</Typography></Box></Grid>)}
        </Grid>
      </Container>

      <Divider />
      <Container id="operating-loop" maxWidth="lg" sx={{ py: 10, px: 3 }}>
        <Label>The operating loop</Label>
        <Typography sx={{ fontSize: { xs: 23, md: 30 }, lineHeight: 1.4, fontWeight: 300, maxWidth: 900, mb: 6, borderLeft: "2px solid", borderColor: "secondary.main", pl: { xs: 3, md: 4 } }}>
          “Reasoning proposes. Authority decides. Verified work synthesizes into reusable knowledge.”
        </Typography>
        <Box sx={{ maxWidth: 960 }}>
          {loop.map(([number, title, body], index) => <Box key={number} sx={{ display: "grid", gridTemplateColumns: { xs: "48px 1fr", md: "92px 1fr" }, gap: { xs: 2, md: 4 }, py: 3.5, borderTop: index ? "1px solid" : "none", borderColor: "divider" }}><Typography sx={{ fontFamily: "monospace", color: "secondary.main", fontSize: { xs: 14, md: 18 }, pt: 0.4 }}>{number}</Typography><Box><Typography variant="h4" sx={{ mb: 1.2 }}>{title}</Typography><Typography color="text.secondary" sx={{ maxWidth: 700, fontWeight: 300, lineHeight: 1.75 }}>{body}</Typography></Box></Box>)}
        </Box>
      </Container>

      <Divider />
      <Container maxWidth="lg" sx={{ py: 10, px: 3 }}>
        <Label>The immediate value</Label>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}><Typography sx={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.14em", color: "text.disabled", mb: 1.5 }}>WITHOUT UI-GATES</Typography><Typography color="text.secondary" sx={{ fontWeight: 300, lineHeight: 1.8 }}>An agent can make rapid local progress while decisions stay implicit, permission is inferred from credentials, verification is uneven, and the next task must rediscover what the last task learned.</Typography></Grid>
          <Grid item xs={12} md={6}><Typography sx={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.14em", color: "secondary.main", mb: 1.5 }}>WITH UI-GATES</Typography><Typography color="text.secondary" sx={{ fontWeight: 300, lineHeight: 1.8 }}>The agent knows its scope, asks before consequential actions, proves its result, and leaves a concise traceable lesson. Future work begins with better context instead of a blank slate.</Typography></Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {[
            ["Authority, not theater", "Credentials and technical ability do not grant permission. The workflow requires a principal decision before a merge, deploy, external message, or production-impacting action."],
            ["Proof proportional to risk", "Tests matter, but so can live UI validation, a security review, an approval, or a rollback plan. UI-GATES asks for the evidence appropriate to the claim."],
            ["Learning without a junk drawer", "Learning earns promotion: Ephemeral → Task → Decision → Knowledge / Pattern → Canon. Every promoted item links back to evidence and reuse guidance."],
          ].map(([title, body]) => <Grid item xs={12} md={4} key={title}><Box sx={{ height: "100%", bgcolor: "rgba(56, 180, 198, 0.06)", p: 3.5 }}><Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography><Typography color="text.secondary" sx={{ fontWeight: 300, lineHeight: 1.7 }}>{body}</Typography></Box></Grid>)}
        </Grid>
      </Container>

      <Divider />
      <Box sx={{ bgcolor: "rgba(56, 180, 198, 0.06)", py: 10, px: 3 }}>
        <Container maxWidth="lg"><Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={4}><Box><Label>Start with a real task</Label><Typography variant="h3" sx={{ maxWidth: 650 }}>Use the short <Box component="span" sx={{ color: "secondary.main" }}>UIG</Box> skill to make the next meaningful change safer and more useful than the last.</Typography></Box><Stack direction={{ xs: "column", sm: "row" }} spacing={2}><Button component="a" href="https://github.com/gerardoiornelas/uigates" target="_blank" rel="noopener noreferrer" variant="contained" color="secondary" sx={{ fontFamily: "monospace", flexShrink: 0 }}>View canonical source ↗</Button><Button variant="outlined" color="secondary" onClick={downloadSkill} sx={{ fontFamily: "monospace", flexShrink: 0 }}>Download uig-skill.md</Button></Stack></Stack></Container>
      </Box>
    </LayoutAlt>
  )
}

export const Head: HeadFC = () => {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: "UI-GATES", url: `${seoDefaults.siteUrl}/uig/`, description: "UI-GATES is an authority-aware learning system for agentic work: intent, authorization, verification, receipts, and reusable knowledge." }
  return <Seo title="UI-GATES — Authority-Aware Agentic Work" description="A governed learning system for agentic work: explicit intent, execution-time authority, verification evidence, and durable repository knowledge." pathname="/uig/" jsonLd={schema} />
}

export default UigPage
