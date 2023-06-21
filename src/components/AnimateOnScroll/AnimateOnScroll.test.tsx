import React from "react"
import { render } from "@testing-library/react"
import { AnimateOnScroll } from "./AnimateOnScroll"

describe("<AnimateOnScroll/> spec", () => {
  test("should match <AnimateOnScroll/> snapshot", () => {
    const container = render(AnimateOnScroll)
    expect(container.firstChild).toMatchSnapshot()
  })
  test("should render <AnimateOnScroll/>", () => {
    render(<AnimateOnScroll />)
  })
})
