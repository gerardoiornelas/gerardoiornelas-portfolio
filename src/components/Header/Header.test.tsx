import React from "react"
import { render } from "@testing-library/react"

import { Header } from "./Header"

describe("Header", () => {
  it("renders without error", () => {
    const { container } = render(
      <Header
        yAxisHome={0}
        yAxisProjects={100}
        yAxisCv={200}
        yAxisBlog={300}
        yAxisContact={400}
      />
    )

    expect(container).toBeInTheDocument()
  })
})
