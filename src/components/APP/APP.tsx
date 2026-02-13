import React from "react"
import { Container, Box, Typography, Button } from "@mui/material"

import { RowCol } from "../RowCol"
import { Title } from "../Title"
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
                The Execution-Time Authorization Layer for AI Agents
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
            <Box display="flex" justifyContent="center">
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
            </Box>
          </AnimateOnScroll>
        </RowCol>
      </Container>
    </Segment>
  )
}
