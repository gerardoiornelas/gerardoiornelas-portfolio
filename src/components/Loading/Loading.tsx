import React from "react"
import PropTypes from "prop-types"
import { CircularProgress } from "@mui/material"

import { StyledLoading } from "./Loading.styled"

export const Loading: React.FC = ({ ...otherProps }) => {
  return (
    <StyledLoading my={5}>
      <CircularProgress {...otherProps} />
    </StyledLoading>
  )
}
