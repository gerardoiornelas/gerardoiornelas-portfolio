import React from "react"
import { render, screen } from "@testing-library/react"
import { AnimateOnScroll } from "./AnimateOnScroll"

describe("AnimateOnScroll", () => {
  it("should animate when in view", () => {
    render(
      <AnimateOnScroll>
        <div data-testid="content">Hello World</div>
      </AnimateOnScroll>
    )

    // Mock the intersection observer to simulate the element being in view
    const mockUseInView = jest.fn(() => [true, { ref: null }])
    jest.mock("react-intersection-observer", () => ({
      useInView: mockUseInView,
    }))

    // Assert that the content is initially hidden
    const contentElement = screen.getByTestId("content")
    expect(contentElement).toHaveStyle({ opacity: 0 })

    // Wait for the animation to complete
    setTimeout(() => {
      // Assert that the content becomes visible after animation
      expect(contentElement).toHaveStyle({ opacity: 1 })
    }, 600) // Wait for the default animation duration (0.5s) plus a small buffer

    // Clean up the mock
    jest.unmock("react-intersection-observer")
  })
})
