import React from "react"
import { render } from "@testing-library/react"

import { Loading } from "./Loading"

describe("Loading", () => {
  it("renders without error", () => {
    const { container } = render(<Loading />)

    expect(container).toBeInTheDocument()
  })
})
