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
import ambientAuthorityImg from "../images/authority-layer/authority_layer_01_ambient_authority.png"
import executionTimeImg from "../images/authority-layer/authority_layer_02_execution_time.png"
import securityUxImg from "../images/authority-layer/authority_layer_03_security_ux.png"
import proofLayerImg from "../images/authority-layer/authority_layer_04_proof_layer.png"

const PillarSection: React.FC<{
  eyebrow: string
  title: string
  titleAccent: string
  description: string
  image: string
  imageLeft?: boolean
}> = ({ eyebrow, title, titleAccent, description, image, imageLeft }) => (
  <Box sx={{ mb: 12 }}>
    <Typography
      sx={{
        fontFamily: "monospace",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.2em",
        color: "secondary.main",
        textTransform: "uppercase",
        mb: 2,
      }}
    >
      {eyebrow}
    </Typography>
    <Grid
      container
      spacing={6}
      alignItems="center"
      flexDirection={imageLeft ? "row-reverse" : "row"}
    >
      <Grid item xs={12} md={6}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Bebas Neue', sans-serif",
            lineHeight: 0.95,
            mb: 3,
            fontSize: { xs: "48px", md: "64px" },
          }}
        >
          {title}
          <br />
          <Box component="span" sx={{ color: "secondary.main" }}>
            {titleAccent}
          </Box>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            fontWeight: 300,
            lineHeight: 1.6,
            fontFamily: "monospace",
            fontSize: 14,
          }}
        >
          {description}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              inset: -15,
              border: "1px solid",
              borderColor: "rgba(56, 180, 198, 0.1)",
              zIndex: -1,
            },
          }}
        >
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  </Box>
)

const AuthorityLayerPage: React.FC = () => {
  return (
    <LayoutAlt>
      <Box py={10}>
        <Container maxWidth="lg">
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "text.disabled",
              textTransform: "uppercase",
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              "&::before": {
                content: '""',
                display: "inline-block",
                width: 24,
                height: 1,
                bgcolor: "text.disabled",
              },
            }}
          >
            System Framework — Intelligence Control
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: { xs: "72px", md: "110px" },
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "text.primary",
              mb: 3,
            }}
          >
            THE AUTHORITY <Box component="span" sx={{ color: "secondary.main" }}>LAYER</Box>
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
              maxWidth: 720,
              lineHeight: 1.65,
              mb: 6,
              fontWeight: 300,
            }}
          >
            A founder-readable framework for how intelligent products are allowed
            to act, how those permissions are enforced at execution time, and how
            trust becomes legible to humans.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mb: 10 }}
          >
            <Button
              variant="contained"
              color="secondary"
              href="/#contact"
              sx={{ fontFamily: "monospace", fontWeight: 600, fontSize: 12 }}
            >
              Request A Briefing
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              href="/manifesto/"
              sx={{ fontFamily: "monospace", fontWeight: 600, fontSize: 12 }}
            >
              Read The Manifesto
            </Button>
          </Stack>

          <Divider sx={{ mb: 12 }} />

          {/* ── Pillar 1: Ambient Authority ── */}
          <PillarSection
            eyebrow="The Problem"
            title="AMBIENT"
            titleAccent="AUTHORITY"
            description="Intelligent systems should not act just because they can. Ambient authority makes agents unsafe by default because access silently turns into standing permission."
            image={ambientAuthorityImg}
          />

          <Divider sx={{ mb: 12 }} />

          {/* ── Pillar 2: Execution Time ── */}
          <PillarSection
            eyebrow="The Mechanism"
            title="EXECUTION-TIME"
            titleAccent="AUTHORIZATION"
            description="The enforcement step that evaluates whether a proposed action is allowed right now, for the intended scope, audience, and duration, before the action is executed."
            image={executionTimeImg}
            imageLeft
          />

          <Divider sx={{ mb: 12 }} />

          {/* ── Pillar 3: Security UX ── */}
          <PillarSection
            eyebrow="The Human Interface"
            title="SECURITY"
            titleAccent="UX"
            description="The human interface to authority. If users cannot understand a permission, review a risky action, or verify the scope of a grant, the system is not truly secure."
            image={securityUxImg}
          />

          <Divider sx={{ mb: 12 }} />

          {/* ── Pillar 4: Verifiable Enforcement ── */}
          <PillarSection
            eyebrow="The Proof Layer"
            title="VERIFIABLE"
            titleAccent="ENFORCEMENT"
            description="Provenance, attestations, receipts, and revocation. Trust that persists across organizational boundaries."
            image={proofLayerImg}
            imageLeft
          />

          <Divider sx={{ mb: 12 }} />

          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" sx={{ mb: 4, fontFamily: "'Bebas Neue', sans-serif" }}>
              START HERE
            </Typography>
            <Stack spacing={2}>
              <Typography sx={{ fontSize: 18, fontWeight: 300 }}>
                <Link to="/manifesto/" style={{ color: "inherit" }}>
                  Verifiably Human Manifesto
                </Link>
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 300 }}>
                <Link to="/uig/" style={{ color: "inherit" }}>
                  UI-GATE methodology
                </Link>
                <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
                  — ship agentic features with human validation gates
                </Typography>
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 300 }}>
                <Link to="/blog/securing-autonomy/" style={{ color: "inherit" }}>
                  Securing Autonomy: APP applied to real agent patterns
                </Link>
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 300 }}>
                <Link to="/author/gerardo-i-ornelas/" style={{ color: "inherit" }}>
                  Author profile and guided reading path
                </Link>
              </Typography>
            </Stack>
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
