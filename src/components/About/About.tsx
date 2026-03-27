import React from "react"
import {
  Container,
  Typography,
  Box,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material"

import { RowCol } from "../RowCol"
import { StyledHome } from "../Home/Home.styled"
import { AnimateOnScroll } from "../AnimateOnScroll"
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
                <Box textAlign={`center`} mt={isSmall ? 0 : 8} mb={4}>
                  <Typography
                    variant="overline"
                    sx={{ letterSpacing: 2, opacity: 0.7 }}
                  >
                    From critical infrastructure to intelligent systems.
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
                          My background spans large-scale software
                          architecture, user experience, and security across
                          enterprise and regulated environments. That work led
                          to a consistent conclusion:{" "}
                          <Box component="span" fontWeight={`bold`}>
                            intelligent systems are only trustworthy when
                            authority is explicit, bounded, and verifiable
                          </Box>
                          .
                        </Typography>
                      </Box>

                      <Box mb={4}>
                        <Typography>
                          Today I apply that thinking to intelligent systems.
                          Through{" "}
                          <Box component="span" fontWeight={`bold`}>
                            Violetek
                          </Box>
                          , I build ventures, products, and frameworks around
                          the authority layer for agentic systems: execution-time
                          authorization, ambient-authority elimination, security
                          UX, and verifiable enforcement.
                        </Typography>
                      </Box>

                      <Typography>
                        My current work includes the{" "}
                        <Box component="span" fontWeight={`bold`}>
                          Agent Permission Protocol
                        </Box>{" "}
                        and selected ventures such as{" "}
                        <Box component="span" fontWeight={`bold`}>
                          Crittora
                        </Box>{" "}
                        and{" "}
                        <Box component="span" fontWeight={`bold`}>
                          Qripton Verify
                        </Box>
                        , which operationalize these ideas in production
                        contexts through explicit permissions, provenance, and
                        human-legible trust boundaries.
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
