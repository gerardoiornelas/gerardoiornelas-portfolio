import { Box } from "@mui/material"
import { styled } from "@mui/system"
import { rem } from "polished"

import ImgCurvy from "../../images/curvy-segment.svg"
import ImgCurvyAlt from "../../images/curvy-segment-alt.svg"

const segmentDecorationHeight = 130
const segmentDecorationAltHeight = 170

function setDecorationPadding(decorated, decoratedAlt) {
  let pb
  if (decorated) {
    pb = `${rem(segmentDecorationHeight)}`
  } else if (decoratedAlt) {
    pb = `${rem(segmentDecorationAltHeight)}`
  } else {
    pb = 4
  }
  return pb
}

const StyledSegment = styled(Box)(
  ({ theme, decorated, decoratedAlt, noPadding }) => ({
    position: "relative",
    paddingBottom: setDecorationPadding(decorated, decoratedAlt),
    paddingTop: noPadding ? 0 : 4,
  })
)

const StyledSegmentDecoration = styled(Box)({
  backgroundImage: `url(${ImgCurvy})`,
  backgroundSize: "cover",
  display: "block",
  height: `${rem(segmentDecorationHeight)}`,
  width: "100%",
  position: "absolute",
  bottom: "0",
})

const StyledSegmentDecorationAlt = styled(Box)({
  backgroundImage: `url(${ImgCurvyAlt})`,
  backgroundSize: "cover",
  display: "block",
  height: `${rem(segmentDecorationAltHeight)}`,
  width: "100%",
  position: "absolute",
  bottom: "0",
})

const StyledPad = styled(Box)(
  ({ theme, segmentDecoration, segmentDecorationAlt, noPadding }) => ({
    paddingTop: `${noPadding ? 0 : rem(50)}`,
    paddingRight: `${noPadding ? 0 : rem(50)}`,
    paddingBottom: segmentDecorationAlt
      ? `${rem(115)}`
      : `${noPadding ? 0 : rem(50)}`,
    paddingLeft: `${noPadding ? 0 : rem(50)}`,
    [theme.breakpoints.down("sm")]: {
      paddingTop: `${noPadding ? 0 : rem(10)}`,
      paddingRight: `${noPadding ? 0 : rem(10)}`,
      paddingBottom:
        segmentDecoration || segmentDecorationAlt
          ? `${rem(15)}`
          : `${noPadding ? 0 : rem(10)}`,
      paddingLeft: `${noPadding ? 0 : rem(10)}`,
    },
  })
)

export {
  StyledSegment,
  StyledSegmentDecoration,
  StyledSegmentDecorationAlt,
  StyledPad,
}
