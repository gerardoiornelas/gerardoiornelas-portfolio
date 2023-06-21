import React from "react"
import { render } from "@testing-library/react"
import Title from "./Title"

describe("Title", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Title variant="section">Test Title</Title>)

    const titleElement = getByText("Test Title")
    expect(titleElement).toBeInTheDocument()
  })
})
