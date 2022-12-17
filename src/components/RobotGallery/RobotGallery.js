import React from "react"
import { Box, useTheme } from "@mui/material"
import cuid from "cuid"
import PropTypes from "prop-types"
import Gallery from "react-photo-gallery"

import { AnimateOnScroll } from "../AnimateOnScroll"

import Robot01 from "../../images/gallery/01.jpg"
import Robot02 from "../../images/gallery/02.jpg"
import Robot03 from "../../images/gallery/03.jpg"
import Robot04 from "../../images/gallery/04.jpg"
import Robot05 from "../../images/gallery/05.jpg"
import Robot06 from "../../images/gallery/06.jpg"

const imageSizePatterns = {
  id: cuid(),
  width: 1,
  height: 1,
  sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
}

const robotArt = [
  {
    src: Robot01,
    ...imageSizePatterns,
  },
  {
    src: Robot02,
    ...imageSizePatterns,
  },
  {
    src: Robot03,
    ...imageSizePatterns,
  },
  {
    src: Robot04,
    ...imageSizePatterns,
  },
  {
    src: Robot05,
    ...imageSizePatterns,
  },
  {
    src: Robot06,
    ...imageSizePatterns,
  },
]

const RobotGallery = ({ children }) => {
  const theme = useTheme()
  return (
    <Box sx={{ width: "100%", backgroundColor: theme.palette.accent.main }}>
      <AnimateOnScroll animateIn="fadeInUp">
        <Gallery photos={robotArt} margin={0} />
      </AnimateOnScroll>
    </Box>
  )
}

RobotGallery.propTypes = {
  children: PropTypes.node,
}

export default RobotGallery
