import React from "react"
import PropTypes from "prop-types"
import { Typography, AppBar, Container, Box } from "@mui/material"

import { StyledHeader } from "./Header.styled"
import { Navigation } from "../Navigation"

const Header = ({ children }) => {
  return <Navigation />
}

Header.propTypes = {
  children: PropTypes.node,
}

export default Header
