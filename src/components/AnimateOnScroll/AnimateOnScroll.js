import React from "react"
import PropTypes from "prop-types"
import ScrollAnimation from "react-animate-on-scroll"
import { Box, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"

const AnimateOnScroll = ({ children, ...otherProps }) => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  const component = isSmall ? Box : ScrollAnimation
  return React.createElement(component, { ...otherProps }, children)
}

AnimateOnScroll.propTypes = {
  children: PropTypes.node,
}

export default AnimateOnScroll
