import React from "react"
import PropTypes from "prop-types"

import { Header } from "../Header"
import { Footer } from "../Footer"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
