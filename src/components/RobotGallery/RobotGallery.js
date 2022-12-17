import React from "react"
import { Box } from "@mui/material"
import cuid from "cuid"
import PropTypes from "prop-types"
import Gallery from "react-photo-gallery"

import Robot01 from "../../images/gallery/01.jpg"
import Robot02 from "../../images/gallery/02.jpg"
import Robot03 from "../../images/gallery/03.jpg"
import Robot04 from "../../images/gallery/04.jpg"
import Robot05 from "../../images/gallery/05.jpg"
import Robot06 from "../../images/gallery/06.jpg"

const robotArt = [
  {
    id: cuid(),
    src: Robot01,
    sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
    width: 1,
    height: 1,
  },
  {
    id: cuid(),
    src: Robot02,
    sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
    width: 1,
    height: 1,
  },
  {
    id: cuid(),
    src: Robot03,
    sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
    width: 1,
    height: 1,
  },
  {
    id: cuid(),
    src: Robot04,
    sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
    width: 1,
    height: 1,
  },
  {
    id: cuid(),
    src: Robot05,
    sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
    width: 1,
    height: 1,
  },
  {
    id: cuid(),
    src: Robot06,
    sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
    width: 1,
    height: 1,
  },
]

const RobotGallery = ({ children }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Gallery photos={robotArt} margin={0} />
    </Box>
  )
}

RobotGallery.propTypes = {
  children: PropTypes.node,
}

export default RobotGallery
