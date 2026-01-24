import React from "react"
import PropTypes from "prop-types"
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
                      <Title variant="hero" color="primary">
                        Co-founder at{" "}
                        <Box
                          component="span"
                          sx={{ color: theme.palette.secondary.main }}
                        >
                          Crittora
                        </Box>
                      </Title>
                      <Title variant="hero" color="primary">
                        Secure AI agents in production
                      </Title>
                    </AnimateOnScroll>
                  </RowCol>
                  <RowCol>
                    <AnimateOnScroll animateIn="fadeIn" delay={500}>
                      <Typography>
                        I lead strategy, design, and development of Crittora's
                        cryptographic experience stack — the trust layer that
                        authorizes what agents can do at the moment they act. We
                        enforce explicit, time-bound authority and signed
                        Proof-of-Action receipts for every action.
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
            <Col xs={12} md={6}>
              <Box display="flex" justifyContent={`center`}>
                <AnimateOnScroll animateIn={"fadeIn"}>
                  <Box
                    component="img"
                    sx={{ maxHeight: "500px" }}
                    src={ImgLostwunHero}
                    alt="digital illustration of gerardo ornelas"
                  />
                </AnimateOnScroll>
              </Box>
            </Col>
          </Row>
        </Box>
      </Container>
    </StyledHome>
  )
}
