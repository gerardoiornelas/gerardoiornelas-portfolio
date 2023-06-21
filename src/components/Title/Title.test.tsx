import React from "react"
import { render } from "@testing-library/react"
import { HeroTitle } from "./HeroTitle"
import { SegmentTitle } from "./SegmentTitle"
import { SegmentTitleAlt } from "./SegmentTitleAlt"
import { SectionTitle } from "./SectionTitle"
import { Title } from "./Title"

describe("<Title />", () => {
  it('renders HeroTitle component for variant "hero"', () => {
    const { getByText } = render(<Title variant="hero">Hello, World!</Title>)
    const titleElement = getByText("Hello, World!")
    expect(titleElement).toBeInTheDocument()
    expect(titleElement.tagName).toBe("H1")
    expect(titleElement).toHaveClass("hero-title")
  })

  it('renders SegmentTitle component for variant "segment"', () => {
    const { getByText } = render(<Title variant="segment">Hello, World!</Title>)
    const titleElement = getByText("Hello, World!")
    expect(titleElement).toBeInTheDocument()
    expect(titleElement.tagName).toBe("H2")
    expect(titleElement).toHaveClass("segment-title")
  })

  it('renders SegmentTitleAlt component for variant "segmentAlt"', () => {
    const { getByText } = render(
      <Title variant="segmentAlt">Hello, World!</Title>
    )
    const titleElement = getByText("Hello, World!")
    expect(titleElement).toBeInTheDocument()
    expect(titleElement.tagName).toBe("H2")
    expect(titleElement).toHaveClass("segment-title-alt")
  })

  it('renders SectionTitle component for variant "section"', () => {
    const { getByText } = render(<Title variant="section">Hello, World!</Title>)
    const titleElement = getByText("Hello, World!")
    expect(titleElement).toBeInTheDocument()
    expect(titleElement.tagName).toBe("H3")
    expect(titleElement).toHaveClass("section-title")
  })
})
