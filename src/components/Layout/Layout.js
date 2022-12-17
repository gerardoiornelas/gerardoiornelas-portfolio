import React from "react"
import PropTypes from "prop-types"

import { StyledLayout } from "./Layout.styled"
import { Header } from "../Header"
import { Footer } from "../Footer"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
