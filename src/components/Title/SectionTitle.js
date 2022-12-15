import React from "react"
import PropTypes from "prop-types"
import { Typography } from "@mui/material"

const SectionTitle = ({ children, ...props }) => {
  return (
    <Typography variant="h5" sx={{ mb: 1 }} {...props}>
      {children}
    </Typography>
  )
}

SectionTitle.propTypes = {
  children: PropTypes.node,
}

export default SectionTitle
