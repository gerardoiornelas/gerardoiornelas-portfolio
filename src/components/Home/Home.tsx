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
                sx={{
                  minHeight: { md: 565 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  py: { xs: 2, md: 0 },
                }}
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
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                      {/* Primary Action Row */}
                      <Stack
                        direction={isSmall ? "column" : "row"}
                        spacing={2}
                        alignItems={isSmall ? "stretch" : "center"}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          href="/uig/"
                          fullWidth={isSmall}
                          sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            fontSize: 12,
                            letterSpacing: "0.06em",
                            px: 3,
                            py: 1.3,
                            whiteSpace: "nowrap",
                            boxShadow: "0 4px 14px rgba(56, 180, 198, 0.25)",
                          }}
                        >
                          UI-GATES Operating System ↗
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          href="/#contact"
                          fullWidth={isSmall}
                          sx={{
                            fontFamily: "monospace",
                            fontWeight: 600,
                            fontSize: 12,
                            letterSpacing: "0.06em",
                            px: 3,
                            py: 1.3,
                            whiteSpace: "nowrap",
                          }}
                        >
                          Request a Briefing
                        </Button>
                      </Stack>

                      {/* Ventures Row */}
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          gap: { xs: 1.5, sm: 2 },
                          pt: 0.5,
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "monospace",
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            color: "text.disabled",
                            textTransform: "uppercase",
                            mr: 0.5,
                          }}
                        >
                          Ventures:
                        </Typography>
                        <Button
                          component="a"
                          href="https://www.crittora.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          sx={{
                            fontFamily: "monospace",
                            fontSize: 11,
                            color: "text.secondary",
                            border: "1px solid",
                            borderColor: "rgba(255, 255, 255, 0.12)",
                            bgcolor: "rgba(255, 255, 255, 0.02)",
                            px: 1.75,
                            py: 0.6,
                            whiteSpace: "nowrap",
                            "&:hover": {
                              borderColor: "secondary.main",
                              color: "secondary.main",
                              bgcolor: "rgba(56, 180, 198, 0.08)",
                            },
                          }}
                        >
                          Crittora · Mortgage AI ↗
                        </Button>
                        <Button
                          component="a"
                          href="https://xeolabs.ai/"
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          sx={{
                            fontFamily: "monospace",
                            fontSize: 11,
                            color: "text.secondary",
                            border: "1px solid",
                            borderColor: "rgba(255, 255, 255, 0.12)",
                            bgcolor: "rgba(255, 255, 255, 0.02)",
                            px: 1.75,
                            py: 0.6,
                            whiteSpace: "nowrap",
                            "&:hover": {
                              borderColor: "secondary.main",
                              color: "secondary.main",
                              bgcolor: "rgba(56, 180, 198, 0.08)",
                            },
                          }}
                        >
                          XEO Labs · AI Visibility ↗
                        </Button>
                      </Box>
                    </Box>
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
