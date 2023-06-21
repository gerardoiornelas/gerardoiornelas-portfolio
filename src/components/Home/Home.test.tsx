import React from "react"
import { render } from "@testing-library/react"

import { Home } from "./Home"

describe("Home", () => {
  it("renders without error", () => {
    const { container } = render(<Home />)

    expect(container).toBeInTheDocument()
  })
})
