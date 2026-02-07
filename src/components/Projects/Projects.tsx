import React from "react"
import { Container, Box } from "@mui/material"

import { RowCol } from "../RowCol"
import { Title } from "../Title"
import { AnimateOnScroll } from "../AnimateOnScroll"

import { ProjectCard } from "./ProjectCard"

import { projectsData } from "./Projects.api"

export const Projects: React.FC = () => {
  return (
    <Box py={6}>
      <Container>
        <RowCol mb={4}>
          <AnimateOnScroll animateIn="fadeInUp">
            <Box>
              <Title variant="segment" align="center">
                Projects
              </Title>
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
    </Box>
  )
}
