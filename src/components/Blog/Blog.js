import React from "react"
import cuid from "cuid"
import PropTypes from "prop-types"
import { Container, Box } from "@mui/material"

import { RowCol, Row, Col } from "../RowCol"
import { Title } from "../Title"

import BlogCard from "./BlogCard"

import ImgGenerativeNfts from "../../images/projects/generative-nft.jpg"

const blogData = [
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

const Blog = ({ children }) => {
  return (
    <Container>
      <RowCol mb={4}>
        <Title variant="segment" align="center">
          Blog
        </Title>
      </RowCol>
      <RowCol>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent={`space-evenly`}
        >
          {blogData.map(data => (
            <BlogCard {...data} />
          ))}
        </Box>
      </RowCol>
    </Container>
  )
}

Blog.propTypes = {
  children: PropTypes.node,
}

export default Blog
