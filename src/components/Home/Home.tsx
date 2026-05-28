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
                      <Typography variant="h4" component="h1">
                        The authority layer for agentic systems.
                      </Typography>

                      <Typography component="h2" textTransform="none">
                        I&apos;m Gerardo I. Ornelas, founder of Violetek and
                        author of the Agent Permission Protocol. I write about
                        execution-time authorization, ambient authority,
                        security UX, and verifiable enforcement — and developed{" "}
                        <a
                          href="/uig"
                          style={{
                            color: "inherit",
                            textDecorationColor: "secondary",
                          }}
                        >
                          UI-GATE
                        </a>
                        , a methodology for shipping agentic features without
                        compounding hidden failures.
                      </Typography>
                    </AnimateOnScroll>
                  </RowCol>

                  <RowCol my={2}>
                    <AnimateOnScroll animateIn="fadeIn" delay={150}>
                      <Typography color="text.secondary">
                        Most AI products still rely on ambient authority:
                        systems can act because they have access, not because a
                        specific action was explicitly authorized. My work
                        focuses on the missing layer: how intelligent systems
                        are actually allowed to act, how those permissions are
                        enforced at execution time, and how that trust becomes
                        legible to humans.
                      </Typography>
                    </AnimateOnScroll>
                  </RowCol>

                  <RowCol my={2}>
                    <Stack
                      direction={isSmall ? "column" : "row"}
                      spacing={2}
                      alignItems={isSmall ? "stretch" : "flex-start"}
                      flexWrap={isSmall ? "nowrap" : "wrap"}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        href="/authority-layer"
                        fullWidth={isSmall}
                        size="large"
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        Read Authority Layer
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        href="/#contact"
                        fullWidth={isSmall}
                        size="large"
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        Request Briefing
                      </Button>
                      <Button
                        variant="text"
                        color="secondary"
                        href="https://www.violetek.com/"
                        fullWidth={isSmall}
                        size="large"
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        Violetek
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
