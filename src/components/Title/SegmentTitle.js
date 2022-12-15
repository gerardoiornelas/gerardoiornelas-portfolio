import React from "react"
import { rem } from "polished"
import PropTypes from "prop-types"
import { Typography, Box } from "@mui/material"
import { useTheme } from "@mui/system"

const SegmentTitle = ({ subtitle, children, ...props }) => {
  const theme = useTheme()
  return (
    <Box mb={2}>
      <Typography variant="h4" color="secondary" {...props}>
        {children}
      </Typography>
    </Box>
  )
}

SegmentTitle.propTypes = {
  children: PropTypes.node,
}

export default SegmentTitle
