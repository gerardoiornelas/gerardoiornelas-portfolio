import React from "react"
import PropTypes from "prop-types"

import {
  StyledSegmentDecoration,
  StyledSegmentDecorationAlt,
} from "./Segment.styled"

interface SegmentDecorationProps {
  alternate: boolean
}

export const SegmentDecoration: React.FC<SegmentDecorationProps> = ({
  alternate = false,
}) => {
  return alternate ? (
    <StyledSegmentDecorationAlt />
  ) : (
    <StyledSegmentDecoration />
  )
}
