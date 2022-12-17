import React from "react"
import PropTypes from "prop-types"
import { Grid } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import SegmentDecoration from "./SegmentDecoration"

import { StyledSegment, StyledPad } from "./Segment.styled"

import { getBackground } from "./Segment.api"

const Segment = ({
  children,
  variant,
  segmentDecoration,
  segmentDecorationAlt,
  noPadding,
}) => {
  const theme = useTheme()
  const bg = getBackground(theme, variant)
  return (
    <StyledSegment
      sx={{ background: bg }}
      decorated={segmentDecoration}
      decoratedAlt={segmentDecorationAlt}
      noPadding={noPadding}
    >
      <Grid container>
        <Grid item xs={12}>
          <StyledPad
            segmentDecoration={segmentDecoration}
            segmentDecorationAlt={segmentDecorationAlt}
            noPadding={noPadding}
          >
            {children}
          </StyledPad>
        </Grid>
      </Grid>
      {segmentDecoration && <SegmentDecoration />}
      {segmentDecorationAlt && <SegmentDecoration alternate />}
    </StyledSegment>
  )
}

Segment.propTypes = {
  noPadding: PropTypes.bool,
  variant: PropTypes.oneOf([
    "primary",
    "primaryLight",
    "secondary",
    "tertiary",
    "gradient",
    "accent",
  ]),
}

export default Segment
