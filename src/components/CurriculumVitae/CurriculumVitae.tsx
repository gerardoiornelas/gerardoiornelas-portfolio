import React from "react"
import { Box, Container, Typography, Button } from "@mui/material"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"

import { AnimateOnScroll } from "../AnimateOnScroll"
import { Title } from "../Title"
import { RowCol, Row, Col } from "../RowCol"
import { Role } from "./Role"

import CvPdf from "../../pdf/Gerardo_Ornelas_Resume_02_12_2023.pdf"

import { roles } from "./CurriculumVitae.api"

interface Props {
  children: React.ReactNode
}

export const CurriculumVitae = ({ children }: Props) => {
  return (
    <Box py={6}>
      <Container>
        <RowCol mb={4}>
          <AnimateOnScroll animateIn="fadeInUp">
            <Box>
              <Title variant="segment" align="center" color="common.white">
                Curriculum Vitae
              </Title>
            </Box>
          </AnimateOnScroll>
        </RowCol>
        <RowCol mb={6}>
          <Box display="flex" justifyContent={`center`}>
            <Box sx={{ maxWidth: "640px" }}>
              <Typography color="white" align="center">
                I'm a technology leader with a passion for building great teams,
                solving business critical problems, and delivering innovative
                products. I’ve successfully led cross-functional technology
                teams in the startup and enterprise environments. I'm a firm
                believer that the success of a project is built on great
                communication, collaboration, and mentorship.
              </Typography>
            </Box>
          </Box>
        </RowCol>
        <RowCol mb={2}>
          <RowCol mb={2}>
            <Typography align="center" color="white">
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
          <RowCol mb={2}>
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
          </RowCol>
        </RowCol>
      </Container>
    </Box>
  )
}
