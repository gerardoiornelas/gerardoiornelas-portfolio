import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material"

import { RowCol, Row, Col } from "../RowCol"
import { StyledHome } from "./Home.styled"
import { AnimateOnScroll } from "../AnimateOnScroll"
import { Social } from "../Social"

import ImgLostwunHero from "../../images/hero-gerardo-i-ornelas.png"
import LogoVerizon from "../../images/xp/verizon.svg"
import LogoGE from "../../images/xp/ge.svg"
import LogoAmfam from "../../images/xp/amfam.svg"
import LogoBCBS from "../../images/xp/bcbsfl.svg"

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
                        Building the authority layer for intelligent systems.
                      </Typography>

                      <Typography component="h2" textTransform="none">
                        I&apos;m Gerardo I. Ornelas, founder of Violetek and
                        author of the Agent Permission Protocol. My work
                        focuses on authority systems, machine permissions,
                        verification, and execution-runtime authorization.
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
                        color="primary"
                        href="/manifesto"
                        fullWidth={isSmall}
                        size="large"
                      >
                        Read the Thesis
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        href="https://www.violetek.com/"
                        fullWidth={isSmall}
                        size="large"
                      >
                        Explore Violetek
                      </Button>
                    </Stack>
                  </RowCol>
                  <RowCol my={2}>
                    {/* <Typography align="center">
                      Watch the Agent Permission Protocol in motion.
                    </Typography> */}
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
