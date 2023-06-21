import React from "react"
import PropTypes from "prop-types"

import { StyledCurvy, StyledCurvyAlt } from "./Segment.styled"

interface CurvyProps {
  alternate: boolean
}

export const Curvy: React.FC<CurvyProps> = ({ alternate = false }) => {
  return alternate ? <StyledCurvyAlt /> : <StyledCurvy />
}
