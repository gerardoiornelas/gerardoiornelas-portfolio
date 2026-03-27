import React from "react"
import { Container, Box } from "@mui/material"

import { RowCol } from "../RowCol"
import { Title } from "../Title"
import { AnimateOnScroll } from "../AnimateOnScroll"
import { Segment } from "../Segment"

import { ProjectCard } from "./ProjectCard"

import { projectsData } from "./Projects.api"

export const Projects: React.FC = () => {
  return (
    <Segment>
      <Container>
        <RowCol mb={4}>
          <AnimateOnScroll animateIn="fadeInUp">
            <Box>
              <Title variant="segment" align="center">
                What I&apos;m Building
              </Title>
            </Box>
          </AnimateOnScroll>
        </RowCol>
        <RowCol mb={4}>
          <AnimateOnScroll animateIn="fadeInUp" delay={100}>
            <Box textAlign="center" maxWidth="md" mx="auto">
              My work spans company building, authored frameworks, and selected
              ventures that operationalize authority and verification in real
              systems.
            </Box>
          </AnimateOnScroll>
        </RowCol>
        <RowCol mb={0}>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent={`space-evenly`}
            alignItems="stretch"
          >
            {projectsData.map((data, index) => (
              <AnimateOnScroll
                animateIn="fadeInUp"
                delay={index * 200}
                key={data.id}
                style={{ display: "flex", marginBottom: "2rem" }}
              >
                <ProjectCard {...data} />
              </AnimateOnScroll>
            ))}
          </Box>
        </RowCol>
      </Container>
    </Segment>
  )
}
