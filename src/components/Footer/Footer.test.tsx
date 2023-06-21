import React from "react"
import { render } from "@testing-library/react"
import { Footer } from "./Footer"

test("renders Footer component", () => {
  const { getByText } = render(<Footer />)

  // Test the presence of specific text content
  expect(getByText("© Gerardo I. Ornelas")).toBeInTheDocument()
  expect(getByText("Privacy Policy")).toBeInTheDocument()

  // Test the presence of specific HTML elements
  expect(document.querySelector("hr")).toBeInTheDocument()
  expect(
    document.querySelector("a[href='/privacy-policy']")
  ).toBeInTheDocument()
})
