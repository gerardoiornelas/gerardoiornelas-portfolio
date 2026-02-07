import React from "react"

import {
  StyledSegmentDecoration,
  StyledSegmentDecorationAlt,
} from "./Segment.styled"

interface CurvyProps {
  alternate?: boolean
}

export const Curvy: React.FC<CurvyProps> = ({ alternate = false }) => {
  return alternate ? <StyledSegmentDecorationAlt /> : <StyledSegmentDecoration />
}
