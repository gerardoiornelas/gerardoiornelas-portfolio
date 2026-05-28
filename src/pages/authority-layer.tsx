import * as React from "react"
import { Link, type HeadFC } from "gatsby"
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
import { Title } from "../components/Title"

const AuthorityLayerPage: React.FC = () => {
  return (
    <LayoutAlt>
      <Box py={6}>
        <Container maxWidth="md">
          <Title variant="segmentAlt">
            The Authority Layer for Agentic Systems
          </Title>

          <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
            A founder-readable framework for how intelligent products are
            allowed to act, how those permissions are enforced at execution
            time, and how trust becomes legible to humans.
          </Typography>

          <Typography paragraph>
            Most AI products still rely on ambient authority: the system can act
            because it has access to a tool, credential, or workflow, not
            because this specific action was explicitly authorized. The
            authority layer is the missing control plane that decides what an
            agent is allowed to do, under what constraints, with what proof, and
            with what accountability.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mb: 5 }}
          >
            <Button variant="contained" color="primary" href="/#contact">
              Request A Briefing
            </Button>
            <Button variant="outlined" color="primary" href="/manifesto/">
              Read The Manifesto
            </Button>
          </Stack>

          <Grid container spacing={3} sx={{ mb: 5 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                The Problem
              </Typography>
              <Typography color="text.secondary">
                Intelligent systems should not act just because they can.
                Ambient authority makes agents unsafe by default because access
                silently turns into standing permission.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                The Mechanism
              </Typography>
              <Typography color="text.secondary">
                Execution-time authorization separates reasoning from action.
                The model can propose, but authority decides whether the action
                is allowed in this moment, for this scope, with this evidence.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                The Human Interface
              </Typography>
              <Typography color="text.secondary">
                Security UX is the human interface to authority. If users cannot
                understand a permission, review a risky action, or verify the
                scope of a grant, the system is not truly secure.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                The Proof Layer
              </Typography>
              <Typography color="text.secondary">
                Some systems need stronger proof: provenance, attestations,
                receipts, and revocation. Blockchain-backed verification can be
                useful when trust must persist across organizational boundaries.
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Plain-English Definitions
            </Typography>
            <Typography paragraph>
              <strong>Authority layer:</strong> the part of an intelligent
              system that determines what actions are explicitly allowed, under
              what constraints, with what proof, and with what human-legible
              accountability.
            </Typography>
            <Typography paragraph>
              <strong>Ambient authority:</strong> when a system can act because
              it has general access to a tool or credential, rather than because
              that exact action was explicitly authorized at execution time.
            </Typography>
            <Typography paragraph>
              <strong>Execution-time authorization:</strong> the enforcement
              step that evaluates whether a proposed action is allowed right
              now, for the intended scope, audience, and duration, before the
              action is executed.
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Start Here
            </Typography>
            <Stack spacing={1}>
              <Typography>
                <Link to="/manifesto/">Verifiably Human Manifesto</Link>
              </Typography>
              <Typography>
                <Link to="/uig/">UI-GATE methodology</Link>
                <Typography
                  component="span"
                  color="text.secondary"
                  sx={{ fontSize: 14 }}
                >
                  {" "}
                  — ship agentic features with human validation gates between
                  every ticket
                </Typography>
              </Typography>
              <Typography>
                <Link to="/blog/securing-autonomy/">
                  Securing Autonomy: APP applied to real agent patterns
                </Link>
              </Typography>
              <Typography>
                <Link to="/blog/verifiably-human-part-1/">
                  Verifiably Human: explicit provenance and synthetic trust
                </Link>
              </Typography>
              <Typography>
                <Link to="/author/gerardo-i-ornelas/">
                  Author profile and guided reading path
                </Link>
              </Typography>
            </Stack>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Where APP Fits
            </Typography>
            <Typography paragraph>
              The Agent Permission Protocol is the formal framework underneath
              this thesis. It focuses on execution-time authorization:
              short-lived, explicit, verifiable permissions that are enforced
              outside the model at the moment of action.
            </Typography>
            <Typography>
              <Link to="/#contact">Request a briefing</Link> if you are building
              a product where agents can take meaningful action and you need a
              stronger authority model.
            </Typography>
          </Box>
        </Container>
      </Box>
    </LayoutAlt>
  )
}

export const Head: HeadFC = () => {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "The Authority Layer for Agentic Systems",
    url: `${seoDefaults.siteUrl}/authority-layer/`,
    description:
      "A founder-readable framework for execution-time authorization, ambient authority, security UX, and verifiable enforcement in intelligent systems.",
    about: [
      { "@type": "Thing", name: "Authority layer for agentic systems" },
      { "@type": "Thing", name: "Execution-time authorization" },
      { "@type": "Thing", name: "Ambient authority" },
      { "@type": "Thing", name: "Security UX" },
      { "@type": "Thing", name: "Verifiable enforcement" },
    ],
  }

  return (
    <Seo
      title="The Authority Layer for Agentic Systems"
      description="A founder-readable framework for execution-time authorization, ambient authority, security UX, and verifiable enforcement in intelligent systems."
      pathname="/authority-layer/"
      jsonLd={webPageSchema}
    />
  )
}

export default AuthorityLayerPage
