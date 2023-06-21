import React from "react"
import { navigate } from "gatsby"
import { Grid, Container, Typography, Box, Button } from "@mui/material"

import { Title } from "../Title"
import { LayoutAlt } from "../Layout"
import { SectionTitle } from "../Title/SectionTitle"

export const PageNotFound: React.FC = () => {
  return (
    <LayoutAlt>
      <Container>
        <Grid container>
          <Grid item xs={12} md={2}></Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <SectionTitle subtitle align="center">
                Oops! Something went wrong.
              </SectionTitle>
              <Typography align="center">
                We can't find the page your looking for.
              </Typography>
              <Box display="flex" justifyContent="center" mt={4}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/")}
                  sx={{ color: "white" }}
                >
                  Take me Home
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}></Grid>
        </Grid>
      </Container>
    </LayoutAlt>
  )
}
