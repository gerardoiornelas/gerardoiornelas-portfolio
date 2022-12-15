import React from "react"
import PropTypes from "prop-types"

import { StyledBase } from "./Section.styled"

const Base = ({ children, ...props }) => (
  <StyledBase {...props}>{children}</StyledBase>
)

Base.propTypes = {
  children: PropTypes.node,
}

export default Base
