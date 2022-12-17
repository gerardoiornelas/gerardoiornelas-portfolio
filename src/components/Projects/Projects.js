import React from "react"
import cuid from "cuid"
import PropTypes from "prop-types"
import { Container, Box } from "@mui/material"

import { RowCol } from "../RowCol"
import { Title } from "../Title"
import { AnimateOnScroll } from "../AnimateOnScroll"

import ProjectCard from "./ProjectCard"

import ImgGenerativeNfts from "../../images/projects/generative-nft.jpg"

const projectsData = [
  {
    id: cuid(),
    title: `Generative NFT Drop`,
    description: ["Create an NFT from scratch and an NFT minting website."],
    imgSrc: ImgGenerativeNfts,
    imgAlt: "dj boombox remix crew",
  },
  {
    id: cuid(),
    title: `Crowdfunding App`,
    description: ["Create an NFT from scratch and an NFT minting website."],
    imgSrc: ImgGenerativeNfts,
    imgAlt: "dj boombox remix crew",
  },
  {
    id: cuid(),
    title: `DAO`,
    description: ["Create an NFT from scratch and an NFT minting website."],
    imgSrc: ImgGenerativeNfts,
    imgAlt: "dj boombox remix crew",
  },
]

const Projects = ({ children }) => {
  return (
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
      <RowCol>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent={`space-evenly`}
        >
          {projectsData.map((data, index) => (
            <AnimateOnScroll animateIn="fadeInUp" delay={index * 200}>
              <ProjectCard {...data} />
            </AnimateOnScroll>
          ))}
        </Box>
      </RowCol>
    </Container>
  )
}

Projects.propTypes = {
  children: PropTypes.node,
}

export default Projects
