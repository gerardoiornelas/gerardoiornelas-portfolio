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
name: compound-engineering
description: Use this skill to turn agent-assisted software work into a reusable engineering asset. Use it for meaningful features, fixes, migrations, and experiments that deserve planning, validation, review, and a durable lesson.
---

# Compound Engineering

## Principle

Every meaningful change should leave the project easier to change than it was before. Do not merely deliver code: leave behind a clear decision, validated behavior, and a reusable lesson.

## The loop

1. **Frame** — State the user outcome, constraints, risks, and how success will be observed. Search existing project knowledge before inventing a solution.
2. **Plan** — Write an implementation-ready plan with the smallest vertical slices, dependencies, acceptance checks, and rollback or failure behavior.
3. **Build** — Implement one validated slice at a time. Keep scope faithful to the plan; record any decision that changes it.
4. **Prove** — Verify behavior in the appropriate surface: automated checks, the live UI, security review, or an explicit human checkpoint. Do not mistake a passing build for proof of user value.
5. **Improve** — Simplify fresh code and review it against the plan. Remove duplication, clarify ownership, and address material findings before the next change.
6. **Compound** — Capture the reusable lesson in project knowledge. Write the context, decision, evidence, and future guidance so the next agent begins smarter.

## Operating rules

- Prefer a small, tested, observable slice over broad speculative implementation.
- Use UI-GATE for user-facing work: stop after each visual slice and wait for explicit validation before stacking more behavior on top.
- Separate evidence from assumptions. Label open questions and never silently convert them into facts.
- Preserve local conventions unless the plan explicitly changes them.
- If a discovery changes the plan, update the plan before continuing implementation.
- A cycle is complete only when the learning has a durable home.

## Required artifacts

Store durable project learning under \`docs/compound/\`:

- \`plans/\` — outcome, constraints, slices, acceptance checks, and decisions
- \`solutions/\` — confirmed patterns and recurring fixes
- \`decisions/\` — durable tradeoffs with alternatives and consequences
- \`validation/\` — evidence of checks, UI validation, and known limits

## Compound note template

\`\`\`md
# [Short, searchable lesson]

## Context
What changed, and why did it matter?

## Decision
What did we choose? What alternatives were rejected?

## Evidence
What was tested, observed, or measured? What remains unproven?

## Reuse
When should a future engineer apply this? Link relevant code and artifacts.
\`\`\`

## Completion signal

End each cycle with:

\`COMPOUND COMPLETE — outcome proved, decisions recorded, next loop grounded.\`
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

const CompoundEngineeringPage: React.FC = () => {
  const downloadSkill = useCallback(() => {
    const blob = new Blob([skillContent], { type: "text/markdown" })
    const href = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = href
    link.download = "compound-engineering-skill.md"
    link.click()
    URL.revokeObjectURL(href)
  }, [])

  const steps = [
    ["01", "Establish principal intent", "Turn a request into a time-bounded intent: outcome, constraints, success evidence, authority domain, and expiry. Capability is never treated as authority."],
    ["02", "Plan and propose", "Translate intent into vertical slices, then name the exact action, resource scope, impact, risk, and authority requested. A plan is ready when another agent can execute it without guessing."],
    ["03", "Authorize at execution time", "UI-GATE allows, denies, or escalates the proposed action. User-facing work also pauses for live validation before unvalidated behavior can stack."],
    ["04", "Execute, verify, and receipt", "Perform only the authorized action. Gather the right evidence—tests, live UI, security review, or human judgment—then preserve why it happened and what proved it."],
    ["05", "Compound the warranted lesson", "Promote only durable decisions and verified patterns. The next loop begins with better context, without turning memory into an AI-generated junk drawer."],
  ]

  return (
    <LayoutAlt>
      <Box sx={{ minHeight: "78vh", display: "flex", alignItems: "center", py: { xs: 11, md: 15 }, px: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={8}>
              <Label>Methodology — durable agentic engineering</Label>
              <Typography component="h1" sx={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: { xs: "70px", md: "118px" }, fontWeight: 400, lineHeight: 0.88, letterSpacing: "-0.025em", mb: 3 }}>
                COMPOUND<br />
                <Box component="span" sx={{ color: "secondary.main" }}>ENGINEERING</Box>
              </Typography>
              <Typography variant="h5" sx={{ maxWidth: 650, color: "text.secondary", fontWeight: 300, lineHeight: 1.65, mb: 4 }}>
                An authority-aware operating system for a one-person, AI-native organization—where every meaningful change creates better context, clearer decisions, and stronger proof for the next one.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button variant="contained" color="secondary" onClick={() => document.getElementById("loop")?.scrollIntoView({ behavior: "smooth" })} sx={{ fontFamily: "monospace" }}>Explore the loop ↓</Button>
                <Button variant="outlined" color="secondary" onClick={downloadSkill} sx={{ fontFamily: "monospace" }}>Download the skill file</Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ border: "1px solid", borderColor: "divider", p: 3.5, bgcolor: "rgba(56, 180, 198, 0.06)", position: "relative", "&::before": { content: '\"\"', position: "absolute", top: -1, left: -1, width: 56, height: 2, bgcolor: "secondary.main" } }}>
                <Typography sx={{ fontFamily: "monospace", color: "secondary.main", fontSize: 11, letterSpacing: "0.14em", mb: 3 }}>THE AUTHORITY CHAIN</Typography>
                {["principal intent", "scoped proposal", "execution-time gate", "verified receipt"].map((item, index) => <Box key={item} sx={{ display: "flex", gap: 2, py: 1.3, borderTop: index ? "1px solid" : "none", borderColor: "divider" }}><Typography sx={{ fontFamily: "monospace", color: "text.disabled", fontSize: 11 }}>0{index + 1}</Typography><Typography sx={{ fontWeight: 300 }}>{item}</Typography></Box>)}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Divider />
      <Container maxWidth="lg" sx={{ py: 10, px: 3 }}>
        <Label>The premise</Label>
        <Box sx={{ borderLeft: "2px solid", borderColor: "secondary.main", pl: { xs: 3, md: 4 }, py: 1, maxWidth: 920 }}>
          <Typography sx={{ fontSize: { xs: 23, md: 30 }, lineHeight: 1.4, fontWeight: 300 }}>“Reasoning proposes. Authority decides. Every meaningful unit of engineering work should make the next unit easier—not merely add more code.”</Typography>
        </Box>
        <Grid container spacing={5} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}><Typography sx={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.14em", color: "text.disabled", mb: 1.5 }}>WITHOUT A COMPOUND LOOP</Typography><Typography color="text.secondary" sx={{ fontWeight: 300, lineHeight: 1.8 }}>Agents can make fast local progress while the project accumulates unrecorded decisions, untested assumptions, and hidden complexity. The next task pays to rediscover what the previous task learned.</Typography></Grid>
          <Grid item xs={12} md={6}><Typography sx={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.14em", color: "secondary.main", mb: 1.5 }}>WITH A COMPOUND LOOP</Typography><Typography color="text.secondary" sx={{ fontWeight: 300, lineHeight: 1.8 }}>Principal intent bounds work. Agents propose actions. UI-GATE authorizes consequential ones at execution time. Verification and receipts turn one-off work into leverage the next agent can immediately use.</Typography></Grid>
        </Grid>
      </Container>

      <Divider />
      <Container id="loop" maxWidth="lg" sx={{ py: 10, px: 3 }}>
        <Label>The operating loop</Label>
        <Box sx={{ maxWidth: 960 }}>
          {steps.map(([number, title, body], index) => <Box key={number} sx={{ display: "grid", gridTemplateColumns: { xs: "48px 1fr", md: "92px 1fr" }, gap: { xs: 2, md: 4 }, py: 3.5, borderTop: index ? "1px solid" : "none", borderColor: "divider" }}><Typography sx={{ fontFamily: "monospace", color: "secondary.main", fontSize: { xs: 14, md: 18 }, pt: 0.4 }}>{number}</Typography><Box><Typography variant="h4" sx={{ mb: 1.2 }}>{title}</Typography><Typography color="text.secondary" sx={{ maxWidth: 690, fontWeight: 300, lineHeight: 1.75 }}>{body}</Typography></Box></Box>)}
        </Box>
      </Container>

      <Divider />
      <Container maxWidth="lg" sx={{ py: 10, px: 3 }}>
        <Label>Original synthesis</Label>
        <Grid container spacing={3}>
          {[
            ["AIDD", "Specification-driven flow", "Frame work with a durable vision, deliberate planning, and explicit execution."],
            ["UI-GATE", "Human validation gates", "Require live, visual proof before unvalidated work can stack on top of it."],
            ["COMPOUND", "Reusable organizational memory", "Capture decisions and evidence in the project so every future loop starts stronger."],
          ].map(([name, title, body]) => <Grid item xs={12} md={4} key={name}><Box sx={{ height: "100%", border: "1px solid", borderColor: "divider", p: 3.5 }}><Typography sx={{ color: "secondary.main", fontFamily: "monospace", letterSpacing: "0.16em", fontSize: 11, mb: 3 }}>{name}</Typography><Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography><Typography color="text.secondary" sx={{ fontWeight: 300, lineHeight: 1.7 }}>{body}</Typography></Box></Grid>)}
        </Grid>
      </Container>

      <Box id="download" sx={{ borderTop: "1px solid", borderColor: "divider", bgcolor: "rgba(56, 180, 198, 0.06)", py: 10, px: 3 }}>
        <Container maxWidth="lg"><Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={4}><Box><Label>Start a durable loop</Label><Typography variant="h3" sx={{ maxWidth: 620 }}>Make your next change leave the system wiser.</Typography></Box><Button variant="contained" color="secondary" onClick={downloadSkill} sx={{ fontFamily: "monospace", flexShrink: 0 }}>Download compound-engineering-skill.md</Button></Stack></Container>
      </Box>
    </LayoutAlt>
  )
}

export const Head: HeadFC = () => {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: "Compound Engineering", url: `${seoDefaults.siteUrl}/compound-engineering/`, description: "A durable agentic engineering methodology that turns every meaningful change into better context, proof, and reusable learning." }
  return <Seo title="Compound Engineering" description="An authority-aware operating system where every meaningful agentic change creates better context, clearer decisions, and stronger proof for the next one." pathname="/compound-engineering/" jsonLd={schema} />
}

export default CompoundEngineeringPage
