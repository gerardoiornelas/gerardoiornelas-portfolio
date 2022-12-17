import React from "react"
import PropTypes from "prop-types"
import { Typography, Box, useTheme } from "@mui/material"

const SegmentTitleAlt = ({
  subtitle,
  children,
  textShadowColor,
  ...otherProps
}) => {
  const theme = useTheme()
  return (
    <Box mb={2}>
      <Typography
        {...otherProps}
        sx={{ textShadow: `${theme.palette.secondary.main} 2px 2px` }}
      >
        {children}
      </Typography>
    </Box>
  )
}

SegmentTitleAlt.defaultProps = {
  variant: "h4",
  color: "primary",
}

SegmentTitleAlt.propTypes = {
  children: PropTypes.node,
  textShadowColor: PropTypes.string,
}

export default SegmentTitleAlt
