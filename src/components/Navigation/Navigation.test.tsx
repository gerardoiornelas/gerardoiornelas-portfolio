import React from "react"
import { render } from "@testing-library/react"

import { Navigation } from "./Navigation"

describe("Navigation", () => {
  it("renders without error", () => {
    const props = {
      yAxisHome: 0,
      yAxisProjects: 100,
      yAxisCv: 200,
      yAxisBlog: 300,
      yAxisContact: 400,
    }
    const { container } = render(<Navigation {...props} />)

    expect(container).toBeInTheDocument()
  })
})
