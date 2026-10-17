import React from "react"
import { Box, Button, Container, Divider, Grid, Stack, Typography } from "@mui/material"
import { LayoutAlt } from "../components/Layout"
import { Seo, seoDefaults } from "../components/Seo"
import { Link, type HeadFC, withPage } from "../lib/site"

const territories = [
  ["Human–AI Interaction", "Agency, cognition, creativity, delegation, work, learning, memory, authorship, and accessibility."],
  ["Authority & Trust", "Permission, provenance, identity, verification, execution, accountability, ownership, and recourse."],
  ["Human–Technology Futures", "Embodied, ambient, spatial, decentralized, and other interaction models that change the human relationship with computation."],
]

const uigRepo = "https://github.com/gerardoiornelas/uigates"
const uigEvidence = `${uigRepo}/blob/3cf008ef4f24137b15e975662ae83f393febe698/evaluations/token-ab/PLAN.md#full-workboard-run-2026-09-22`

const uigFindings = [
  ["Gate and receipt overhead", "The 16-task Workboard run observed 85.3% higher mean weighted tokens for ceremony versus control on 14 complete triples. Control accepted 16/16 tasks, ceremony 15/16, learned 14/16. Acceptance imbalance meant no formal verdict. Two pilots also observed higher cost.", uigEvidence, "Workboard experiment"],
  ["Knowledge reuse", "Learning’s incremental token effect was indistinguishable from zero in that run. No measured learning benefit was established.", uigEvidence, "Learning comparison"],
  ["Hook-first savings", "No saving demonstrated; no verdict. Control accepted 20/24 tasks and treatment 23/24. On 20 mutually accepted pairs, saving was −0.6% (95% interval −10.3% to +9.0%).", uigRepo, "UI-GATES repository (hook-first experiment)"],
  ["Audit checks", "Tests cover rejection of vacuous commands such as bare git diff. An accepted command does not establish that the check was adequate for every claim.", `${uigRepo}/blob/3cf008ef4f24137b15e975662ae83f393febe698/plugins/uigates/cli/audit_test.ts`, "Audit tests"],
  ["Enforcement and record limits", "Gate rules are instructions the model follows. Real enforcement remains the host’s sandbox and permission controls. Agent-writable records are tamper-evident to engine checks, not tamper-proof against a hostile agent.", `${uigRepo}/blob/3cf008ef4f24137b15e975662ae83f393febe698/plugins/uigates/core/README.md`, "Engine trust boundaries"],
  ["Jev live approval", "The project status report records live advisory approval, but no live APPROVE for a gate-class action. Live records are not published here, so this is a reported status, not a gate-class validation result.", "https://violetek-37043527.atlassian.net/browse/WUN-19", "WUN-19 status report (access required)"],
]

const ResearchPage: React.FC = () => (
  <LayoutAlt>
    <Box component="main" py={{ xs: 6, md: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="overline" color="secondary.main">Research &amp; Field Notes</Typography>
        <Typography component="h1" variant="h2" sx={{ maxWidth: 900, mt: 1, mb: 3 }}>
          What does good human–computer interaction mean when the computer is no longer waiting for the human to operate it?
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 820, lineHeight: 1.8 }}>
          This is the intellectual layer of Gerardo’s work. Each body of work is labeled by its actual status so an argument, implementation, experiment, and evaluated finding are not treated as the same kind of evidence.
        </Typography>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {territories.map(([title, body]) => (
            <Grid item xs={12} md={4} key={title}>
              <Box sx={{ height: "100%", p: 3, border: "1px solid", borderColor: "divider" }}>
                <Typography component="h2" variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{body}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Divider sx={{ my: { xs: 6, md: 10 } }} />
      <Container maxWidth="lg">
        <Typography component="h2" variant="h3" sx={{ mb: 4 }}>Bodies of work</Typography>
        <Stack spacing={3}>
          <Box sx={{ p: 3, borderLeft: "3px solid", borderColor: "secondary.main", bgcolor: "rgba(56, 180, 198, 0.05)" }}>
            <Typography variant="overline" sx={{ letterSpacing: "0.14em" }}>Evolving research program</Typography>
            <Typography component="h3" variant="h4" sx={{ mb: 1 }}>Verifiably Human</Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 850, lineHeight: 1.7, mb: 2 }}>
              What evidence justifies a claim of human creation, and what remains unknown?
            </Typography>
            <Button component={Link} to="/research/verifiably-human/" color="secondary">Review the work →</Button>
          </Box>
          <Box sx={{ p: 3, borderLeft: "3px solid", borderColor: "secondary.main", bgcolor: "rgba(56, 180, 198, 0.05)" }}>
            <Typography variant="overline" sx={{ letterSpacing: "0.14em" }}>Experimental engineering project</Typography>
            <Typography component="h3" variant="h4" sx={{ mb: 1 }}>UI-GATES</Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 850, lineHeight: 1.7, mb: 2 }}>
              Mechanisms and measurements for evidence in AI-assisted software work, including negative and inconclusive results. The dedicated repository and reference playbook remain available for inspection.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button component="a" href="#measured" color="secondary">Read what has been measured ↓</Button>
              <Button component="a" href={uigRepo} color="secondary">Inspect the GitHub repository ↗</Button>
              <Button component={Link} to="/compound-engineering/" color="secondary">Reference playbook →</Button>
            </Stack>
          </Box>
          <Box sx={{ p: 3, borderLeft: "3px solid", borderColor: "secondary.main", bgcolor: "rgba(56, 180, 198, 0.05)" }}>
            <Typography variant="overline" sx={{ letterSpacing: "0.14em" }}>Published series · four numbered installments verified</Typography>
            <Typography component="h3" variant="h4" sx={{ mb: 1 }}>The Trust Stack</Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 850, lineHeight: 1.7, mb: 2 }}>
              Identity, provenance, authenticity, authority, and capability are related signals with different limits.
            </Typography>
            <Button component={Link} to="/research/trust-stack/" color="secondary">Review the work →</Button>
          </Box>
          <Box sx={{ p: 3, borderLeft: "3px solid", borderColor: "secondary.main", bgcolor: "rgba(56, 180, 198, 0.05)" }}>
            <Typography variant="overline" sx={{ letterSpacing: "0.14em" }}>Published argument</Typography>
            <Typography component="h3" variant="h4" sx={{ mb: 1 }}>The Authority Layer</Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 850, lineHeight: 1.7, mb: 2 }}>
              A design argument for connecting human-readable intent to bounded execution authority.
            </Typography>
            <Button component={Link} to="/authority-layer/" color="secondary">Review the work →</Button>
          </Box>
        </Stack>
      </Container>
      <Divider sx={{ my: { xs: 6, md: 10 } }} />
      <Container component="section" id="measured" aria-labelledby="measured-title" maxWidth="lg" sx={{ scrollMarginTop: 96 }}>
        <Typography variant="overline" color="secondary.main">UI-GATES · Evidence and limits</Typography>
        <Typography id="measured-title" component="h2" variant="h3" sx={{ mt: 1, mb: 3 }}>What has been measured</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 850, mb: 4, lineHeight: 1.8 }}>
          These findings apply to the named UI-GATES workloads. They do not establish results for every agent or repository. Observed numbers do not override an experiment’s declared “no verdict.”
        </Typography>
        <Grid container spacing={3}>
          {uigFindings.map(([title, body, href, source]) => (
            <Grid item xs={12} md={6} key={title}>
              <Box sx={{ border: "1px solid", borderColor: "divider", p: 3.5, height: "100%" }}>
                <Typography component="h3" variant="h5" sx={{ mb: 2 }}>{title}</Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>{body}</Typography>
                <Box component="a" href={href} sx={{ color: "secondary.main" }}>{source} ↗</Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Typography color="text.secondary" sx={{ mt: 4, lineHeight: 1.8 }}>
          Agent handoff claim accuracy has not been evaluated. The token experiments checked code acceptance and costs, not whether the agents’ statements matched their actions. No real-agent learning certificate has passed (<a href={`${uigRepo}/blob/3cf008ef4f24137b15e975662ae83f393febe698/evaluations/real-project-v1/REPORT.md`}>read the incomplete learning evaluation ↗</a>).
        </Typography>
      </Container>
      <Divider sx={{ my: { xs: 6, md: 10 } }} />
      <Container component="section" id="research" aria-labelledby="research-title" maxWidth="lg" sx={{ scrollMarginTop: 96 }}>
        <Typography variant="overline" color="secondary.main">Open research · no results yet</Typography>
        <Typography id="research-title" component="h2" variant="h3" sx={{ maxWidth: 850, mt: 1, mb: 3 }}>
          Is checking verification claims a problem worth solving?
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 900, lineHeight: 1.8, mb: 3 }}>
          The question is whether reviewers repeatedly spend time resolving narrow claims such as “these tests passed on this revision,” when the evidence already existed at handoff. Existing CI output, diffs, and a concise handoff are alternatives a proposed checker must justify improving on.
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 900, lineHeight: 1.8, mb: 3 }}>
          The next step is a retrospective of 10–20 consecutive sessions, with human-reviewed labels and checking effort. Continue only if contradicted or effortful-to-confirm claims recur and existing evidence could resolve them. Stop if checking effort is rare, new verification would be required, or most claims remain ambiguous or unobservable. Missing records do not establish dishonesty.
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 900, lineHeight: 1.8 }}>
          No extractor, runner, evidence-packet feature, or replacement product is being announced. A positive retrospective would justify a prospective comparison that measures review effort and defect detection. Faster approval with worse defect detection is a failure.
        </Typography>
      </Container>
    </Box>
  </LayoutAlt>
)

export const Head: HeadFC = () => <Seo title="Research & Field Notes" description="Research and field notes on human agency, authority, provenance, and interaction with autonomous systems, with the status of each body of work made explicit." pathname="/research/" jsonLd={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Research & Field Notes", url: `${seoDefaults.siteUrl}/research/` }} />

export default withPage(ResearchPage)
