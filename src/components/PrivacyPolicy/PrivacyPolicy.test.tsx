import React from "react"
import { render } from "@testing-library/react"

import { PrivacyPolicy } from "./PrivacyPolicy"

describe("PrivacyPolicy", () => {
  it("renders without error", () => {
    const { container } = render(<PrivacyPolicy />)

    expect(container).toBeInTheDocument()
  })
})
