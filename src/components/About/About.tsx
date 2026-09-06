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
                    From critical infrastructure to high-trust AI systems.
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
                          My background spans large-scale software architecture,
                          user experience, and security across enterprise and
                          regulated environments. That work led to a consistent
                          conclusion:{" "}
                          <Box component="span" fontWeight={`bold`}>
                            consequential systems are only trustworthy when
                            authority is explicit, bounded, and provable
                          </Box>
                          .
                        </Typography>
                      </Box>

                      <Box mb={4}>
                        <Typography>
                          Today I apply that thinking at two points where AI-era
                          businesses win or fail: the authority to act and the
                          ability to be understood. I help mortgage organizations
                          govern consequential AI with clear controls and
                          evidence, and help businesses build credible visibility
                          across search and answer engines.
                        </Typography>
                      </Box>

                      <Typography>
                        My work includes{" "}
                        <Box component="span" fontWeight={`bold`}>
                          Crittora
                        </Box>{" "}
                        for mortgage AI governance, work as WUN AEO Director
                        and with XEO Labs on cross-engine visibility, and{" "}
                        <Box component="span" fontWeight={`bold`}>
                          UI-GATES
                        </Box>{" "}
                        for authority-aware agentic work. The underlying doctrine is simple: high-trust AI needs
                        governed action in operations and reliable evidence in
                        the public information people use to make decisions.
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
