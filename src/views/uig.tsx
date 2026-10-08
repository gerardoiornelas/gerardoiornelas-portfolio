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

  const repo = "https://github.com/gerardoiornelas/uigates"
  const evidence = `${repo}/blob/3cf008ef4f24137b15e975662ae83f393febe698/evaluations/token-ab/PLAN.md#full-workboard-run-2026-09-22`
  const findings = [
    ["Gate and receipt overhead", "The 16-task Workboard run observed 85.3% higher mean weighted tokens for ceremony versus control on 14 complete triples. Control accepted 16/16 tasks, ceremony 15/16, learned 14/16. Acceptance imbalance meant no formal verdict. Two pilots also observed higher cost.", evidence, "Workboard experiment"],
    ["Knowledge reuse", "Learning’s incremental token effect was indistinguishable from zero in that run. No measured learning benefit was established.", evidence, "Learning comparison"],
    ["Hook-first savings", "No saving demonstrated; no verdict. Control accepted 20/24 tasks and treatment 23/24. On 20 mutually accepted pairs, saving was −0.6% (95% interval −10.3% to +9.0%).", `${repo}/blob/5f6b913b42b4bcd866983612dc64244fe74b37ed/evaluations/token-ab/PLAN.md#savings-ab-result-2026-09-23`, "Hook-first experiment"],
    ["Audit checks", "Tests cover rejection of vacuous commands such as bare git diff. An accepted command does not establish that the check was adequate for every claim.", `${repo}/blob/3cf008ef4f24137b15e975662ae83f393febe698/plugins/uigates/cli/audit_test.ts`, "Audit tests"],
    ["Enforcement and record limits", "Gate rules are instructions the model follows. Real enforcement remains the host’s sandbox and permission controls. Agent-writable records are tamper-evident to engine checks, not tamper-proof against a hostile agent.", `${repo}/blob/3cf008ef4f24137b15e975662ae83f393febe698/plugins/uigates/core/README.md`, "Engine trust boundaries"],
    ["Jev live approval", "The project status report records live advisory approval, but no live APPROVE for a gate-class action. Live records are not published here, so this is a reported status, not a gate-class validation result.", "https://violetek-37043527.atlassian.net/browse/WUN-19", "WUN-19 status report (access required)"],
  ]
  return (
    <LayoutAlt>
      <Box sx={{ py: { xs: 11, md: 15 }, px: 3 }}>
        <Container maxWidth="lg">
          <Box component="img" src={ImgUigLogo} alt="UI-GATES logo" sx={{ width: 56, mb: 3 }} />
          <Label>Experimental project · status as of October 8, 2026</Label>
          <Typography component="h1" sx={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: { xs: 72, md: 118 }, lineHeight: 0.95, mb: 3 }}>UI-<Box component="span" sx={{ color: "secondary.main" }}>GATES</Box></Typography>
          <Typography variant="h5" sx={{ maxWidth: 850, color: "text.secondary", fontWeight: 300, lineHeight: 1.65, mb: 3 }}>
            UI-GATES is an experimental project investigating evidence in AI-assisted software work. Its existing tools record proposed actions, verification output, and repository lessons. Evaluations have not demonstrated token savings or a learning benefit.
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 850, lineHeight: 1.8, mb: 4 }}>
            Current research asks whether reviewers can check agents’ narrow verification claims against records already available at handoff. No claim-checking feature or research result is available yet.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button component="a" href="#measured" variant="contained" color="secondary">Read the findings ↓</Button>
            <Button component="a" href="#research" variant="outlined" color="secondary">The open question ↓</Button>
          </Stack>
        </Container>
      </Box>
      <Divider />
      <Container component="section" id="measured" aria-labelledby="measured-title" maxWidth="lg" sx={{ py: 10, px: 3, scrollMarginTop: 96 }}>
        <Label>Evidence and limits</Label>
        <Typography id="measured-title" component="h2" variant="h3" sx={{ mb: 3 }}>What has been measured</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 850, mb: 4, lineHeight: 1.8 }}>These findings apply to the named workloads. They do not establish results for every agent or repository. Observed numbers do not override an experiment’s declared “no verdict.”</Typography>
        <Grid container spacing={3}>
          {findings.map(([title, body, href, source]) => <Grid item xs={12} md={6} key={title}><Box sx={{ border: "1px solid", borderColor: "divider", p: 3.5, height: "100%" }}><Typography component="h3" variant="h5" sx={{ mb: 2 }}>{title}</Typography><Typography color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>{body}</Typography><Box component="a" href={href} sx={{ color: "secondary.main" }}>{source} ↗</Box></Box></Grid>)}
        </Grid>
        <Typography color="text.secondary" sx={{ mt: 4, lineHeight: 1.8 }}>Agent handoff claim accuracy has not been evaluated. The token experiments checked code acceptance and costs, not whether the agents’ statements matched their actions.</Typography>
      </Container>
      <Divider />
      <Container component="section" id="research" aria-labelledby="research-title" maxWidth="lg" sx={{ py: 10, px: 3, scrollMarginTop: 96 }}>
        <Label>Open research · no results yet</Label>
        <Typography id="research-title" component="h2" variant="h3" sx={{ maxWidth: 850, mb: 3 }}>Is checking verification claims a problem worth solving?</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 900, lineHeight: 1.8, mb: 3 }}>The question is whether reviewers repeatedly spend time resolving narrow claims such as “these tests passed on this revision,” when the evidence already existed at handoff. Existing CI output, diffs, and a concise handoff are alternatives a proposed checker must justify improving on.</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 900, lineHeight: 1.8, mb: 3 }}>The next step is a retrospective of 10–20 consecutive sessions, with human-reviewed labels and checking effort. Continue only if contradicted or effortful-to-confirm claims recur and existing evidence could resolve them. Stop if checking effort is rare, new verification would be required, or most claims remain ambiguous or unobservable. Missing records do not establish dishonesty.</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 900, lineHeight: 1.8 }}>No extractor, runner, evidence-packet feature, or replacement product is being announced. A positive retrospective would justify a prospective comparison that measures review effort and defect detection. Faster approval with worse defect detection is a failure.</Typography>
      </Container>
      <Divider />
      <Container component="section" maxWidth="lg" sx={{ py: 10, px: 3 }}>
        <Label>What exists</Label>
        <Typography component="h2" variant="h3" sx={{ mb: 3 }}>Tools available for inspection</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 900, lineHeight: 1.8, mb: 4 }}>UI-GATES stands for User-Intent Gated Agentic Task Execution &amp; Synthesis. The repository contains a portable workflow skill, a reference engine and CLI for proposals and verification receipts, and evaluation tooling. The skill instructs an agent to ask for required authorization and record the evidence it gathered. Following those instructions is not a host-enforced security boundary.</Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}><Button component="a" href={repo} variant="contained" color="secondary">Inspect the repository ↗</Button><Button variant="outlined" color="secondary" onClick={downloadSkill}>Download uig-skill.md</Button></Stack>
      </Container>
      <Divider />
      <Container component="section" id="operating-loop" maxWidth="lg" sx={{ py: 10, px: 3, scrollMarginTop: 96 }}>
        <Label>Reference design · benefits unestablished</Label>
        <Typography component="h2" variant="h3" sx={{ mb: 3 }}>The nine-step workflow</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 900, lineHeight: 1.8, mb: 3 }}>This sequence describes the existing design. The gate/receipt process added overhead in the Workboard comparison above. Recording a lesson does not establish that the next task improves.</Typography>
        <Typography sx={{ fontFamily: "monospace", color: "secondary.main", lineHeight: 2, overflowWrap: "anywhere" }}>Intent → Discover → Plan → Propose → UI-GATE → Execute → Verify → Receipt → Synthesize</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 900, mt: 3, lineHeight: 1.8 }}>Design motto: “Reasoning proposes. Authority decides. Verified work synthesizes into reusable knowledge.” The promotion ladder is Ephemeral → Task → Decision → Knowledge → Canon. These are design rules, not measured learning outcomes.</Typography>
        <Button component="a" href="/compound-engineering/" color="secondary" sx={{ mt: 3 }}>Read the reference playbook →</Button>
      </Container>
      <Divider />
      <Container component="section" id="learning" aria-labelledby="learning-title" maxWidth="lg" sx={{ py: 10, px: 3, scrollMarginTop: 96 }}>
        <Label>Evaluation design</Label>
        <Typography id="learning-title" component="h2" variant="h3" sx={{ mb: 3 }}>A harness is not a learning result.</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 900, lineHeight: 1.8, mb: 3 }}>The evaluation design captures candidate lessons, compares control and treatment tasks, and accounts for overhead. Fixture tests exercise mechanics. No real-agent learning certificate has passed; neither learning benefits nor token savings have been demonstrated.</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 900, lineHeight: 1.8 }}>The portable download is a workflow guide with local usage logging. The engine and evaluation harness are separate repository tools. The proposed handoff research has no results yet.</Typography>
        <Button component="a" href={`${repo}/blob/3cf008ef4f24137b15e975662ae83f393febe698/evaluations/real-project-v1/REPORT.md`} color="secondary" sx={{ mt: 3 }}>Read the incomplete learning evaluation ↗</Button>
      </Container>
    </LayoutAlt>
  )
}

export const Head: HeadFC = () => {
  const description = "UI-GATES is an experimental project investigating evidence in AI-assisted software work. Token savings and learning benefits remain unestablished; handoff claim-checking is open research."
  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: "UI-GATES", url: `${seoDefaults.siteUrl}/uig/`, description }
  return <Seo title="UI-GATES — Evidence and Open Research" description={description} pathname="/uig/" jsonLd={schema} />
}

export default withPage(UigPage)
