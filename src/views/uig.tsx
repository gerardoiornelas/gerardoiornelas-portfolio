import { withPage } from "../lib/site"
import React, { useCallback } from "react"
import type { HeadFC } from "../lib/site"
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
import ImgUigLogo from "../images/uig/uigates-icon-transparent.png?url"
import skillContent from "../../skills/uig/SKILL.md?raw"

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
    ["02", "Discover", "The agent reads task-relevant committed knowledge and repository instructions before proposing anything."],
    ["03", "Plan", "The agent defines the smallest scoped slice of work and the evidence that will prove it worked."],
    ["04", "Propose", "The agent names the specific action, resource scope, impact, risk, authority requested, and verification plan before a consequential change."],
    ["05", "UI-GATE", "At execution time, the gate allows, denies, or escalates the proposal. It evaluates who may do what, to which resource, under which intent, right now."],
    ["06", "Execute", "Only the authorized action is performed. Execution never implies authorization on its own."],
    ["07", "Verify", "Authorized work is verified in the right surface: tests, live UI, review, security checks, or explicit human judgment. A passing build is evidence—not universal proof. This answers what actually happened."],
    ["08", "Receipt", "Evidence of the authorized execution and its verification is preserved so a future agent can trace the decision. Its discrepancy analysis answers why actual differed from intent."],
    ["09", "Synthesize", "Only evidence-backed decisions and reusable patterns are promoted into committed project knowledge for the next task. This answers what will be done differently: sustain what worked, improve what did not."],
  ]

  return (
    <LayoutAlt>
      <Box sx={{ minHeight: "78vh", display: "flex", alignItems: "center", py: { xs: 11, md: 15 }, px: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Box
                  component="img"
                  src={ImgUigLogo}
                  alt="UI-GATES Master Icon"
                  sx={{
                    width: { xs: 44, md: 56 },
                    height: "auto",
                    filter: "drop-shadow(0 6px 20px rgba(56, 180, 198, 0.35))",
                  }}
                />
                <Label>Authority-aware agentic work</Label>
              </Box>
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
                <Box role="img" aria-label="UI-GATES workflow: intent, discover, plan, propose, UI-GATE, execute, verify, receipt, and synthesize" sx={{ border: "1px solid", borderColor: "divider", bgcolor: "rgba(8, 18, 27, 0.72)", p: { xs: 3, md: 4 }, boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
                  <Typography sx={{ fontFamily: "monospace", color: "secondary.main", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", mb: 1.5 }}>SKILL-GUIDED WORKFLOW</Typography>
                  <Typography sx={{ color: "text.secondary", fontWeight: 300, fontSize: 14, lineHeight: 1.65, mb: 3 }}>A portable Markdown skill guides the agent through this sequence. It does not install a ticketing interface or a runtime control panel.</Typography>
                  <Stack spacing={1.25}>
                    {["Intent", "Discover", "Plan", "Propose", "UI-GATE", "Execute", "Verify", "Receipt", "Synthesize"].map((step, index) => <Box key={step} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}><Typography sx={{ fontFamily: "monospace", color: "text.disabled", fontSize: 11, width: 20 }}>{String(index + 1).padStart(2, "0")}</Typography><Box sx={{ flex: 1, border: "1px solid", borderColor: step === "UI-GATE" ? "secondary.main" : "divider", bgcolor: step === "UI-GATE" ? "rgba(56, 180, 198, 0.12)" : "transparent", px: 2, py: 1.15 }}><Typography sx={{ fontFamily: "monospace", color: step === "UI-GATE" ? "secondary.main" : "text.primary", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>{step.toUpperCase()}{step === "UI-GATE" ? "  ·  ALLOW / DENY / ESCALATE" : ""}</Typography></Box></Box>)}
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
        <Typography color="text.secondary" sx={{ maxWidth: 900, fontWeight: 300, lineHeight: 1.75, mt: 5, fontStyle: "italic" }}>
          The final three steps close the loop with the After Action Review — what was supposed to happen, what actually happened, why the difference, and what will be done differently. A loop that returns without answering all four has not closed.
        </Typography>
      </Container>

      <Divider />
      <Container id="learning" component="section" aria-labelledby="learning-title" maxWidth="lg" sx={{ py: 10, px: 3, scrollMarginTop: 96 }}>
        <Label>Learning from experience</Label>
        <Typography id="learning-title" component="h2" variant="h3" sx={{ maxWidth: 850, mb: 3 }}>A lesson must earn its place in the next task.</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 850, fontWeight: 300, lineHeight: 1.8, mb: 4 }}>
          UI-GATES treats learning as a traceable change in future behavior: experience produces a lesson, an approved lesson guides a later task, and verification tests whether it helped. The first implementation focuses on receipt authoring.
        </Typography>
        <Grid container spacing={3}>
          {[
            ["Capture and propose", "Instrumented receipt attempts record validation failures and successful corrections. A matching correction across two distinct tasks can produce a candidate lesson, with supporting evidence and conditions for reuse."],
            ["Evaluate and approve", "Candidates are tested on unseen tasks against a control that receives no lesson. Evaluation and principal approval precede live reuse. Learning cannot supply authorization or waive human review."],
            ["Reuse and retire", "Later tasks receive only applicable, approved lessons. Source changes and expired approvals stop stale reuse; acceptance regressions retire the affected lessons. Failed attempts and learning overhead stay in the comparison."],
          ].map(([title, body]) => <Grid item xs={12} md={4} key={title}><Box sx={{ height: "100%", border: "1px solid", borderColor: "divider", p: 3.5 }}><Typography component="h3" variant="h5" sx={{ mb: 1.5 }}>{title}</Typography><Typography color="text.secondary" sx={{ fontWeight: 300, lineHeight: 1.75 }}>{body}</Typography></Box></Grid>)}
        </Grid>
        <Box sx={{ mt: 4, borderLeft: "2px solid", borderColor: "secondary.main", pl: 3, maxWidth: 900 }}>
          <Typography component="h3" variant="h6" sx={{ mb: 1 }}>Implemented; transfer tested in fixtures</Typography>
          <Typography color="text.secondary" sx={{ fontWeight: 300, lineHeight: 1.8 }}>
            The local tools cover recording, lesson proposals, approval, selective reuse, and controlled evaluation. Six unseen paired fixtures exercise the learning mechanism. A real coding-agent comparison is still required to establish learning-driven improvement. The implementation uses persistent memory; it does not retrain the underlying model.
          </Typography>
          <Typography color="text.secondary" sx={{ fontWeight: 300, lineHeight: 1.8, mt: 2 }}>
            A separate 12-run workflow comparison measured 12.6% fewer total worker tokens with the same automated checks passing. That comparison held lessons fixed, excluded parent and reviewer model usage, and left human UI and full operational acceptance pending. It does not demonstrate learned-memory gains or lower billing costs.
          </Typography>
        </Box>
        <Typography color="text.secondary" sx={{ maxWidth: 850, fontSize: 14, lineHeight: 1.75, mt: 3 }}>
          Usage is tracked out of the box: the portable download records each invocation and completion to a local log, so <Box component="code" sx={{ fontFamily: "monospace", fontSize: 13 }}>npm run uig:learn -- stats</Box> reports real all-time runs and receipts across your projects. The evaluation harness (lesson store, evaluator, frozen plans) and any runtime control plane remain repository-local — the download is a workflow guide plus a usage ledger, not an installed system.
        </Typography>
      </Container>

      <Divider />
      <Container maxWidth="lg" sx={{ py: 10, px: 3 }}>
        <Label>The immediate value</Label>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}><Typography sx={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.14em", color: "text.disabled", mb: 1.5 }}>WITHOUT UI-GATES</Typography><Typography color="text.secondary" sx={{ fontWeight: 300, lineHeight: 1.8 }}>An agent can make rapid local progress while decisions stay implicit, permission is inferred from credentials, verification is uneven, and the next task must rediscover what the last task learned.</Typography></Grid>
          <Grid item xs={12} md={6}><Typography sx={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.14em", color: "secondary.main", mb: 1.5 }}>WITH UI-GATES</Typography><Typography color="text.secondary" sx={{ fontWeight: 300, lineHeight: 1.8 }}>The agent knows its scope, asks before consequential actions, proves its result, and records what the evidence supports. A reusable lesson is retained only when warranted; no new lesson is a valid outcome.</Typography></Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {[
            ["Authority, not theater", "Credentials and technical ability do not grant permission. The workflow requires a principal decision before a merge, deploy, external message, or production-impacting action."],
            ["Proof proportional to risk", "Tests matter, but so can live UI validation, a security review, an approval, or a rollback plan. UI-GATES asks for the evidence appropriate to the claim."],
            ["Learning without a junk drawer", "Learning earns promotion: Ephemeral → Task → Decision → Knowledge → Canon. Every promoted item links back to evidence and reuse guidance."],
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

export default withPage(UigPage)
