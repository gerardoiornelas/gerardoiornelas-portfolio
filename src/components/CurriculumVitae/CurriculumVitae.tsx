import React from "react"
import { Box, Container, Typography, Button } from "@mui/material"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"

import { AnimateOnScroll } from "../AnimateOnScroll"
import { Title } from "../Title"
import { RowCol, Row, Col } from "../RowCol"
import { Role } from "./Role"

import { roles } from "./CurriculumVitae.api"

export const CurriculumVitae: React.FC = () => {
  return (
    <Box py={6}>
      <Container>
        <RowCol mb={4}>
          <AnimateOnScroll animateIn="fadeInUp">
            <Box>
              <Title variant="segment" align="center">
                Curriculum Vitae
              </Title>
            </Box>
          </AnimateOnScroll>
        </RowCol>
        <RowCol mb={6}>
          <Box display="flex" justifyContent={`center`}>
            <Box sx={{ maxWidth: "640px" }}>
              <Typography align="center">
                I work at the frontier of blockchain and agentic AI security. My
                focus is turning trust from an assumption into infrastructure:
                explicit authority, cryptographic proof, and auditable
                execution. I lead teams that translate these ideas into
                deployable systems used in real production workflows.
              </Typography>
            </Box>
          </Box>
        </RowCol>
        <RowCol mb={2}>
          <RowCol mb={2}>
            <Typography align="center">
              <strong> Current Roles</strong>
            </Typography>
          </RowCol>
          <Row mb={0} justifyContent="center">
            <Col xs={12} md={8}>
              <Row mb={0}>
                {roles.map(
                  ({
                    id,
                    logo,
                    title,
                    employer,
                    dates,
                    location,
                    description,
                  }) => (
                    <Col xs={12} md={6} key={id}>
                      <Role
                        id={id}
                        logo={logo}
                        title={title}
                        employer={employer}
                        dates={dates}
                        location={location}
                        description={description}
                      />
                    </Col>
                  )
                )}
              </Row>
            </Col>
          </Row>
          {/* <RowCol mb={2}>
            <Box display="flex" justifyContent="center" my={4}>
              <Button
                startIcon={<PictureAsPdfIcon />}
                variant="outlined"
                sx={{ color: "white", borderColor: "white" }}
                size="large"
                href={CvPdf}
                target="_blank"
              >
                Download CV
              </Button>
            </Box>
          </RowCol> */}
        </RowCol>
      </Container>
    </Box>
  )
}
