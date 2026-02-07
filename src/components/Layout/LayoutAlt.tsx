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
} from "@mui/material"

import { Title } from "../Title"
import { Footer } from "../Footer"

interface LayoutAltProps {
  children: React.ReactNode
}

export const LayoutAlt: React.FC<LayoutAltProps> = ({ children }) => {
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
            backgroundColor: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.divider}`,
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
                    Gerardo I. Ornelas
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
      <Box flexGrow={2}>{children}</Box>
      <Footer />
    </Box>
  )
}
