import React from "react"
import PropTypes from "prop-types"
import { Container, Typography, Box } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import { RowCol, Row, Col } from "../RowCol"
import { Title } from "../Title"
import { StyledHome } from "./Home.styled"
import { AnimateOnScroll } from "../AnimateOnScroll"

import ImgLostwunHero from "../../images/hero-lostwun.png"

const Home = ({ children }) => {
  const theme = useTheme()
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
                        What's good!
                      </Title>
                      <Title variant="hero" color="primary">
                        I'm{" "}
                        <Box
                          component="span"
                          sx={{ color: theme.palette.secondary.main }}
                        >
                          Gerardo
                        </Box>
                      </Title>
                    </AnimateOnScroll>
                  </RowCol>
                  <RowCol>
                    <AnimateOnScroll animateIn="fadeIn" delay={500}>
                      <Typography>
                        I'm a digital architect of user-interfaces. I have a
                        passion for UI, Blockchain, and Web3! Let me help bridge
                        your product to these next-gen technologies.{" "}
                      </Typography>
                    </AnimateOnScroll>
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

Home.propTypes = {
  children: PropTypes.node,
}

export default Home
