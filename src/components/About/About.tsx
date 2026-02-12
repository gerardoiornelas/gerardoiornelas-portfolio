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
import { StyledHome } from "../Home/Home.styled"
import { AnimateOnScroll } from "../AnimateOnScroll"
import { Social } from "../Social"

import ImgLostwunHero from "../../images/hero-gerardo-i-ornelas.png"
import LogoVerizon from "../../images/xp/verizon.svg"
import LogoGE from "../../images/xp/ge.svg"
import LogoAmfam from "../../images/xp/amfam.svg"
import LogoBCBS from "../../images/xp/bcbsfl.svg"

export const About: React.FC = () => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <StyledHome>
      <Container>
        <Box py={4}>
          <RowCol>
            <Container maxWidth="md">
              <AnimateOnScroll animateIn="fadeInUp">
                <Box textAlign={`center`} mt={8} mb={4}>
                  <Typography
                    variant="overline"
                    sx={{ letterSpacing: 2, opacity: 0.7 }}
                  >
                    Applying Fortune 100 architectural rigor to the autonomous
                    era.
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="center"
                  alignItems="center"
                  columnGap={6}
                  rowGap={3}
                  sx={{ opacity: 0.7 }}
                >
                  <Tooltip title="Verizon — Zero-trust migration leadership">
                    <Box
                      component="img"
                      src={LogoVerizon}
                      sx={{
                        height: { xs: 56, sm: 64, md: 80, lg: 96 },
                        width: "auto",
                        filter: "grayscale(1)",
                        objectFit: "contain",
                      }}
                      alt="Verizon"
                    />
                  </Tooltip>
                  <Tooltip title="GE — Edge-grade reliability programs">
                    <Box
                      component="img"
                      src={LogoGE}
                      sx={{
                        height: { xs: 56, sm: 64, md: 80, lg: 96 },
                        width: "auto",
                        filter: "grayscale(1)",
                        objectFit: "contain",
                      }}
                      alt="General Electric"
                    />
                  </Tooltip>
                  <Tooltip title="American Family Insurance — Security advisory">
                    <Box
                      component="img"
                      src={LogoAmfam}
                      sx={{
                        height: { xs: 56, sm: 64, md: 80, lg: 96 },
                        width: "auto",
                        filter: "grayscale(1)",
                        objectFit: "contain",
                      }}
                      alt="American Family Insurance"
                    />
                  </Tooltip>
                  <Tooltip title="Blue Cross Blue Shield Florida — Regulated data protections">
                    <Box
                      component="img"
                      src={LogoBCBS}
                      sx={{
                        height: { xs: 56, sm: 64, md: 80, lg: 96 },
                        width: "auto",
                        filter: "grayscale(1)",
                        objectFit: "contain",
                      }}
                      alt="Blue Cross Blue Shield Florida"
                    />
                  </Tooltip>
                </Box>
              </AnimateOnScroll>
            </Container>
            <AnimateOnScroll animateIn="fadeIn">
              <RowCol mt={8}>
                <Container maxWidth="md">
                  <AnimateOnScroll animateIn="fadeIn" delay={500}>
                    <Box textAlign={`center`}>
                      {/* <Typography variant="h5" component="h2" mb={2}>
                        Scaling the Interface of Trust.
                      </Typography> */}

                      <Box mb={4}>
                        <Typography>
                          I spent my career solving critical UX challenges and
                          building the scalable, reusable software architectures
                          that power the world’s largest infrastructures - and I
                          learned a hard truth:{" "}
                          <Box component="span" fontWeight={`bold`}>
                            Security is a UX failure
                          </Box>
                          .
                        </Typography>
                      </Box>

                      <Typography>
                        Most protocols break because they ignore the
                        human-machine interface. My transition into
                        cybersecurity is the logical evolution of this work. I
                        am now applying that same architectural rigor to{" "}
                        <Box component="span" fontWeight={`bold`}>
                          Crittora
                        </Box>{" "}
                        and the{" "}
                        <Box component="span" fontWeight={`bold`}>
                          Agent Permission Protocol
                        </Box>
                        (APP)—building execution-time security that isn't just
                        unbreakable, but actually usable at enterprise scale.
                      </Typography>
                    </Box>
                  </AnimateOnScroll>
                </Container>
              </RowCol>
            </AnimateOnScroll>
          </RowCol>
        </Box>
      </Container>
    </StyledHome>
  )
}
