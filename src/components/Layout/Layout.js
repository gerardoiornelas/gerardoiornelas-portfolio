import React from "react"
import PropTypes from "prop-types"

import { StyledLayout } from "./Layout.styled"
import { Header } from "../Header"

const Layout = ({ children }) => {
  return (
    <StyledLayout>
      <Header />
      {children}
    </StyledLayout>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
