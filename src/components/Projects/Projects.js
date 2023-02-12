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

const GITHUB_GERARDOIORNELAS = `https://github.com/gerardoiornelas`

const projectsData = [
  {
    id: cuid(),
    title: `AI NFT Minter`,
    description: [
      "An AI-powered NFT project bringing creativity to the blockchain with unique, generated digital art assets.",
    ],
    imgSrc: ImgGenerativeNfts,
    imgAlt: "dj boombox remix crew",
    url: `https://ai-nft-minter.netlify.app/`,
    github: `${GITHUB_GERARDOIORNELAS}/ai-nft-minter`,
  },
  {
    id: cuid(),
    title: `Crowdfunding App`,
    description: [
      "Revolutionary blockchain crowdfunding app connecting entrepreneurs with backers for secure, decentralized funding.",
    ],
    imgSrc: ImgCrowdfunding,
    imgAlt: "dj boombox remix crew",
    url: null,
    github: `${GITHUB_GERARDOIORNELAS}/crowdsale`,
  },
  {
    id: cuid(),
    title: `DAO`,
    description: [
      "Empowering community decision making with decentralized, transparent governance through a blockchain-based DAO.",
    ],
    imgSrc: ImgDao,
    imgAlt: "dj boombox remix crew",
    url: null,
    github: `${GITHUB_GERARDOIORNELAS}/dao`,
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
