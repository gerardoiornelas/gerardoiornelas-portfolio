import React from "react"

import { Navigation } from "../Navigation"

import type { YAxisProps } from "../Layout/Layout"

export const Header: React.FC<YAxisProps> = ({
  yAxisHome,
  yAxisProjects,
  yAxisCv,
  yAxisBlog,
  yAxisContact,
}) => {
  return (
    <Navigation
      yAxisHome={yAxisHome}
      yAxisProjects={yAxisProjects}
      yAxisCv={yAxisCv}
      yAxisBlog={yAxisBlog}
      yAxisContact={yAxisContact}
    />
  )
}
