import React from "react"
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material"

import { RowCol, Row, Col } from "../RowCol"
import { StyledHome } from "./Home.styled"
import { AnimateOnScroll } from "../AnimateOnScroll"
import { Social } from "../Social"

import ImgLostwunHero from "../../images/hero-gerardo-i-ornelas.png"

export const Home: React.FC = () => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <StyledHome>
      <Container>
        <Box py={4}>
          <Row>
            {" "}
            <Col xs={12} md={6}>
              <Box display="flex" justifyContent={`center`}>
                <AnimateOnScroll animateIn={"fadeIn"}>
                  <Box
                    component="img"
                    width={`100%`}
                    src={ImgLostwunHero}
                    alt="editorial portrait placeholder of Gerardo I. Ornelas"
                  />
                </AnimateOnScroll>
              </Box>
            </Col>
            <Col xs={12} md={6}>
              <Box
                height={`565px`}
                display="flex"
                flexDirection={`column`}
                justifyContent={`center`}
              >
                <Box>
                  <RowCol mb={2}>
                    <AnimateOnScroll animateIn="fadeIn">
                      <Typography
                        sx={{
                          fontFamily: "monospace",
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: "0.2em",
                          color: "text.disabled",
                          textTransform: "uppercase",
                          mb: 2,
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
                        Systems Architect · Founder · Advisor
                      </Typography>

                      <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: { xs: "56px", md: "84px" },
                          fontWeight: 400,
                          lineHeight: 0.95,
                          letterSpacing: "-0.02em",
                          color: "text.primary",
                          mb: 3,
                        }}
                      >
                        AI NEEDS <Box component="span" sx={{ color: "secondary.main" }}>PERMISSION</Box>
                        <br />
                        BUSINESSES NEED CLARITY TO BE FOUND
                      </Typography>

                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                          color: "text.secondary",
                          maxWidth: 560,
                          lineHeight: 1.6,
                          fontWeight: 300,
                          mb: 3,
                        }}
                      >
                        I work with mortgage and high-trust organizations on AI
                        governance, execution evidence, and AI-era visibility
                        systems. My work connects governed action with the
                        reliable public understanding businesses need to be found.
                      </Typography>
                    </AnimateOnScroll>
                  </RowCol>

                  <RowCol my={2}>
                    <Stack
                      direction={isSmall ? "column" : "row"}
                      spacing={2}
                      alignItems={isSmall ? "stretch" : "flex-start"}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        href="/uig/"
                        fullWidth={isSmall}
                        sx={{
                          fontFamily: "monospace",
                          fontWeight: 600,
                          fontSize: 12,
                          px: 3,
                        }}
                      >
                        UI-GATES Operating System
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        href="https://www.crittora.com/"
                        fullWidth={isSmall}
                        sx={{
                          fontFamily: "monospace",
                          fontWeight: 600,
                          fontSize: 12,
                          px: 3,
                        }}
                      >
                        Mortgage AI Governance
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        href="https://xeolabs.ai/"
                        fullWidth={isSmall}
                        sx={{
                          fontFamily: "monospace",
                          fontWeight: 600,
                          fontSize: 12,
                          px: 3,
                        }}
                      >
                        AI Visibility Strategy
                      </Button>
                      <Button
                        variant="text"
                        href="/#contact"
                        fullWidth={isSmall}
                        sx={{
                          fontFamily: "monospace",
                          fontWeight: 600,
                          fontSize: 12,
                          opacity: 0.7,
                          color: "text.secondary",
                        }}
                      >
                        Request a Briefing
                      </Button>
                    </Stack>
                  </RowCol>
                  <RowCol my={2}>
                    <Box
                      display="flex"
                      justifyContent={isSmall ? "center" : "flex-start"}
                    >
                      <Box>
                        <Social />
                      </Box>
                    </Box>
                  </RowCol>
                </Box>
              </Box>
            </Col>
          </Row>
        </Box>
      </Container>
    </StyledHome>
  )
}
