import React from "react"
import cuid from "cuid"
import PropTypes from "prop-types"
import { Container, Box } from "@mui/material"

import { RowCol } from "../RowCol"
import { Title } from "../Title"
import { AnimateOnScroll } from "../AnimateOnScroll"

import ProjectCard from "./ProjectCard"

import ImgGenerativeNfts from "../../images/projects/generative-nft.jpg"
import ImgCrowdfunding from "../../images/projects/crowdfunding.jpg"
import ImgDao from "../../images/projects/dao.jpg"

const GITHUB_LOSTWUN = `https://github.com/lostwun`

const projectsData = [
  {
    id: cuid(),
    title: `Generative NFT Drop`,
    description: ["Create an NFT from scratch and an NFT minting website."],
    imgSrc: ImgGenerativeNfts,
    imgAlt: "dj boombox remix crew",
    url: null,
    github: `${GITHUB_LOSTWUN}/wunpunks`,
  },
  {
    id: cuid(),
    title: `Crowdfunding App`,
    description: ["Create an NFT from scratch and an NFT minting website."],
    imgSrc: ImgCrowdfunding,
    imgAlt: "dj boombox remix crew",
    url: null,
    github: `${GITHUB_LOSTWUN}/crowdsale`,
  },
  {
    id: cuid(),
    title: `DAO`,
    description: ["Create an NFT from scratch and an NFT minting website."],
    imgSrc: ImgDao,
    imgAlt: "dj boombox remix crew",
    url: null,
    github: `${GITHUB_LOSTWUN}/dao`,
  },
]

const Projects = ({ children }) => {
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
    </Box>
  )
}

Projects.propTypes = {
  children: PropTypes.node,
}

export default Projects
