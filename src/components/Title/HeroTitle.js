import React from "react"
import PropTypes from "prop-types"
import { Typography } from "@mui/material"

const HeroTitle = ({ white, children, ...props }) => {
  return (
    <Typography
      variant="h1"
      sx={{
        fontSize: {
          xs: "4rem",
          md: "5rem",
        },
      }}
      {...props}
    >
      {children}
    </Typography>
  )
}

HeroTitle.propTypes = {
  children: PropTypes.node,
}

export default HeroTitle
