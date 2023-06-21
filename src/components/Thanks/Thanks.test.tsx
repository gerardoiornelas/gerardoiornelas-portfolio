import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { navigate } from "gatsby"
import { Thanks } from "./Thanks"

jest.mock("gatsby", () => ({
  navigate: jest.fn(),
}))

describe("<Thanks />", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders without error", () => {
    render(<Thanks />)
  })

  it('navigates to home page when "Back to Home" button is clicked', () => {
    const { getByText } = render(<Thanks />)
    const backButton = getByText("Back to Home")

    fireEvent.click(backButton)

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith("/")
  })
})
