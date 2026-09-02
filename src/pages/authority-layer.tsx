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
            Authored Systems Doctrine — Governed AI & Trusted Visibility
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
            AUTHORITY & <Box component="span" sx={{ color: "secondary.main" }}>EVIDENCE</Box>
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
            Research for high-trust organizations: govern consequential AI at
            the point of action, preserve evidence of what occurred, and make
            public information clear enough to be accurately understood.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mb: 10 }}
          >
            <Button
              variant="contained"
              color="secondary"
              href="https://www.crittora.com/"
              sx={{ fontFamily: "monospace", fontWeight: 600, fontSize: 12 }}
            >
              Explore Mortgage AI Governance
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              href="https://xeolabs.ai/"
              sx={{ fontFamily: "monospace", fontWeight: 600, fontSize: 12 }}
            >
              Explore AI Visibility Strategy
            </Button>
          </Stack>

          <Divider sx={{ mb: 12 }} />

          <PillarSection
            eyebrow="Control"
            title="AUTHORITY"
            titleAccent="PERIMETERS"
            description="Consequential mortgage AI needs an explicit answer to who or what may act, in which workflow, under which limits, and with whose oversight. Policy has to become an operating control at the moment an action could change state."
            image={ambientAuthorityImg}
          />

          <Divider sx={{ mb: 12 }} />

          <PillarSection
            eyebrow="Evidence"
            title="CONTROL +"
            titleAccent="PROOF"
            description="Governance cannot stop at policy. A defensible program retains the actor, requested action, authority decision, result, and review record needed to understand what occurred. MISMO FRAME provides a practical reference for the policy, inventory, risk, controls, oversight, and documentation concerns this work addresses."
            image={executionTimeImg}
            imageLeft
          />

          <Divider sx={{ mb: 12 }} />

          <PillarSection
            eyebrow="Discoverability"
            title="TRUSTED"
            titleAccent="VISIBILITY"
            description="Being indexed is not the same as being understood. Businesses need accurate, credible information across search, AI answers, content, and conversion surfaces so people and answer engines can find, interpret, and trust them."
            image={securityUxImg}
          />

          <Divider sx={{ mb: 12 }} />

          <PillarSection
            eyebrow="Doctrine"
            title="AUTHORED"
            titleAccent="SYSTEMS"
            description="The Agent Permission Protocol and related research explain the shared principle: authority should be explicit in execution, and evidence should be trustworthy wherever it informs a consequential decision—inside an operating workflow or in the public information around a business."
            image={proofLayerImg}
            imageLeft
          />

          <Divider sx={{ mb: 12 }} />

          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" sx={{ mb: 4, fontFamily: "'Bebas Neue', sans-serif" }}>
              RESEARCH PATH
            </Typography>
            <Stack spacing={2}>
              <Typography sx={{ fontSize: 18, fontWeight: 300 }}>
                <Link to="/manifesto/" style={{ color: "inherit" }}>
                  Verifiably Human Doctrine
                </Link>
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 300 }}>
                <Link to="/uig/" style={{ color: "inherit" }}>
                  UI-GATES methodology
                </Link>
                <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
                  — a supporting research methodology for governed agentic work
                </Typography>
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 300 }}>
                <Link to="/blog/securing-autonomy/" style={{ color: "inherit" }}>
                  Securing Autonomy: APP applied to agent patterns
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
      name: "Authority Layer Research",
    url: `${seoDefaults.siteUrl}/authority-layer/`,
    description:
      "Research on governed AI, execution evidence, AI visibility, and trustworthy public information for high-trust organizations.",
    about: [
      { "@type": "Thing", name: "Mortgage AI governance" },
      { "@type": "Thing", name: "AI controls and evidence" },
      { "@type": "Thing", name: "AI visibility" },
      { "@type": "Thing", name: "Agent Permission Protocol" },
    ],
  }

  return (
    <Seo
      title="Authority Layer Research"
      description="Research on governed AI, execution evidence, AI visibility, and trustworthy public information for high-trust organizations."
      pathname="/authority-layer/"
      jsonLd={webPageSchema}
    />
  )
}

export default AuthorityLayerPage
