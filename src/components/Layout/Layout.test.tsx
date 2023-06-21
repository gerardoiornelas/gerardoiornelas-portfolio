import React from "react"
import { render } from "@testing-library/react"

import { Layout } from "./Layout"

describe("Layout", () => {
  it("renders without error", () => {
    const { container } = render(
      <Layout
        yAxisHome={null}
        yAxisProjects={null}
        yAxisCv={null}
        yAxisBlog={null}
        yAxisContact={null}
      >
        <div>Content</div>
      </Layout>
    )

    expect(container).toBeInTheDocument()
  })
})
