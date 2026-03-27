import React from "react"
import { Container, Box, Typography, Button, Stack } from "@mui/material"

import { RowCol } from "../RowCol"
import { AnimateOnScroll } from "../AnimateOnScroll"
import { Segment } from "../Segment"

import ImgAPP from "../../images/app-gio@2x.png"

export const APP: React.FC = () => {
  return (
    <Segment>
      <Container>
        <RowCol mb={4}>
          <AnimateOnScroll animateIn="fadeInUp">
            <Box textAlign="center" mb={2}>
              <Typography fontWeight={`bold`}>
                Agent Permission Protocol
              </Typography>
            </Box>
            <Box textAlign="center" mb={4}>
              <Typography>
                A framework for execution-time authorization in agentic systems
              </Typography>
            </Box>
            <Box textAlign="center" mb={4} maxWidth="md" mx="auto">
              <Typography color="text.secondary">
                APP is the formal framework underneath the broader authority
                layer thesis: reasoning proposes, authority decides. It is how
                intelligent systems move from ambient access to explicit,
                auditable permission at the moment of action.
              </Typography>
            </Box>
            <Box mb={4}>
              <Box
                component="img"
                src={ImgAPP}
                alt="APP Diagram"
                width="100%"
              />
            </Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button variant="outlined" color="primary" href="/authority-layer">
                Start With The Authority Layer
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  window.open(
                    "https://www.crittora.com/app/whitepaper",
                    "_blank"
                  )
                }
              >
                Read the Whitepaper
              </Button>
            </Stack>
          </AnimateOnScroll>
        </RowCol>
      </Container>
    </Segment>
  )
}
