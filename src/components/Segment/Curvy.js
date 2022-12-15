import React from "react"
import PropTypes from "prop-types"

import { StyledCurvy, StyledCurvyAlt } from "./Segment.styled"

const Curvy = ({ alternate }) => {
  return alternate ? <StyledCurvyAlt /> : <StyledCurvy />
}

Curvy.defaultProps = {
  alternate: false,
}
Curvy.propTypes = {
  alternate: PropTypes.bool,
}

export default Curvy
