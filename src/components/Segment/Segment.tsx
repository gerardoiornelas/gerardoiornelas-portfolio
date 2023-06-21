import React from "react"
import { Grid } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import { SegmentDecoration } from "./SegmentDecoration"

import { StyledSegment, StyledPad } from "./Segment.styled"

import { getBackground } from "./Segment.api"

interface SegmentProps {
  children: React.ReactNode
  variant?:
    | "primary"
    | "primaryLight"
    | "secondary"
    | "tertiary"
    | "gradient"
    | "accent"
  segmentDecoration?: boolean
  segmentDecorationAlt?: boolean
  noPadding?: boolean
}

export const Segment: React.FC<SegmentProps> = ({
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
