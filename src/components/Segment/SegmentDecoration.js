import React from "react"
import PropTypes from "prop-types"

import {
  StyledSegmentDecoration,
  StyledSegmentDecorationAlt,
} from "./Segment.styled"

const SegmentDecoration = ({ alternate }) => {
  return alternate ? (
    <StyledSegmentDecorationAlt />
  ) : (
    <StyledSegmentDecoration />
  )
}

SegmentDecoration.defaultProps = {
  alternate: false,
}
SegmentDecoration.propTypes = {
  alternate: PropTypes.bool,
}

export default SegmentDecoration
