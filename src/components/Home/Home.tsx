import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import {
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material"

import { RowCol, Row, Col } from "../RowCol"
import { Title } from "../Title"
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
                    alt="digital illustration of gerardo ornelas"
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
                      <Typography variant="h5" component="h1">
                        Tech Futurist in
                        <br />
                        <Box component="span">
                          Blockchain + Agentic AI Security
                        </Box>
                      </Typography>

                      <Typography
                        variant="h4"
                        component="h2"
                        color="primary"
                        textTransform="uppercase"
                      >
                        I design trust infrastructure for autonomous systems
                      </Typography>
                    </AnimateOnScroll>
                  </RowCol>
                  <RowCol>
                    <AnimateOnScroll animateIn="fadeIn" delay={500}>
                      <Typography>
                        I’m Gerardo I. Ornelas, Co-Founder at Crittora and
                        Co-Author of the Agent Permission Protocol. I build
                        execution-time security systems that verify who or what
                        is allowed to act, before action happens. My work
                        combines cryptographic policy enforcement, verifiable
                        provenance, and production-grade controls for AI agents.
                      </Typography>
                      <Typography sx={{ mt: 2 }}>
                        Explore my <Link to="/blog/">blog</Link> and{" "}
                        <Link to="/author/gerardo-i-ornelas/">
                          author profile
                        </Link>{" "}
                        for detailed frameworks on AI security, cryptographic
                        authorization, and provenance infrastructure.
                      </Typography>
                    </AnimateOnScroll>
                  </RowCol>
                  <RowCol my={2}>
                    <Typography align="center">Let's connect!</Typography>
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
