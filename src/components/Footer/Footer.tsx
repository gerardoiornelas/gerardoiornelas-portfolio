import React from "react"
import { Link } from "gatsby"
import {
  Grid,
  Box,
  Container,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material"

import { Social } from "../Social"

export const Footer: React.FC = () => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Box>
      <Divider />
      <Container>
        <Grid container py={4}>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography align={isSmall ? "center" : "left"}>
                © Gerardo I. Ornelas
              </Typography>
              <Typography
                variant="body2"
                align={isSmall ? "center" : "left"}
                sx={{ opacity: 0.8 }}
              >
                Systems architect, founder, and advisor for governed AI and
                trusted visibility.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="center">
              <Social />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              display="flex"
              justifyContent={isSmall ? `center` : `flex-end`}
            >
              <Box display="flex" gap={2}>
                <Link to="/blog/">Blog</Link>
                <Link to="/author/gerardo-i-ornelas/">Author</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
