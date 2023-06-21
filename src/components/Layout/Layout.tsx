import React from "react"
import { Header } from "../Header"
import { Footer } from "../Footer"

export interface YAxisProps {
  yAxisHome?: number | null
  yAxisProjects?: number | null
  yAxisCv?: number | null
  yAxisBlog?: number | null
  yAxisContact?: number | null
}

interface LayoutProps extends YAxisProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  yAxisHome,
  yAxisProjects,
  yAxisCv,
  yAxisBlog,
  yAxisContact,
}) => {
  return (
    <>
      <Header
        yAxisHome={yAxisHome}
        yAxisProjects={yAxisProjects}
        yAxisCv={yAxisCv}
        yAxisBlog={yAxisBlog}
        yAxisContact={yAxisContact}
      />
      {children}
      <Footer />
    </>
  )
}
