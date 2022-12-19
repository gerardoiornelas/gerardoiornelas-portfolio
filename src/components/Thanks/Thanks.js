import React from "react"
import { navigate } from "gatsby"
import PropTypes from "prop-types"
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  useTheme,
  useMediaQuery,
  ButtonBase,
  Button,
  Typography,
} from "@mui/material"

import { Title } from "../Title"
import { Footer } from "../Footer"

import ImgThanks from "../../images/thanks.jpg"

const Thanks = () => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box display="flex" flexDirection="column" sx={{ height: "100vh" }}>
      <Box>
        <AppBar
          position="sticky"
          color="transparent"
          elevation={0}
          sx={{
            backgroundColor: "#fff",
            borderBottom: `1px solid #fafafa`,
          }}
        >
          <Container disableGutters maxWidth="lg">
            <Toolbar>
              <Box
                sx={{
                  flexGrow: {
                    xs: 1,
                    md: 3,
                  },
                  display: "flex",
                  justifyContent: {
                    xs: "flex-start",
                    md: "flex-start",
                  },
                }}
              >
                <ButtonBase onClick={() => navigate("/")}>
                  <Title variant="segmentAlt" color="primary">
                    Lostwun
                  </Title>
                </ButtonBase>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                    lg: "block",
                    xl: "block",
                  },
                }}
              >
                <Box></Box>
              </Box>
              <Box
                sx={{
                  display: {
                    xs: "flex",
                    sm: "flex",
                    md: "none",
                    lg: "none",
                  },
                }}
              ></Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Box flexGrow={2}>
        <Container>
          <Box mb={4} display="flex" justifyContent={`center`}>
            <Box component="img" src={ImgThanks} alt="robot saying thank you" />
          </Box>
          <Box mb={4}>
            <Title variant="segmentAlt" align="center">
              Thank you!
            </Title>
            <Typography align="center">
              Your message is in flight! I'll contact you within the next 24
              hours to follow up on your inquiry!
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              onClick={() => navigate("/")}
              variant="contained"
              color="secondary"
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

Thanks.propTypes = {
  children: PropTypes.node,
}

export default Thanks
