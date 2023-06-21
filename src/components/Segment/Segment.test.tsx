import React from "react"
import { render } from "@testing-library/react"
import { Segment } from "./Segment"

describe("<Segment />", () => {
  it("renders without error", () => {
    render(<Segment>Segment content</Segment>)
  })

  it('renders with the "primary" variant', () => {
    render(<Segment variant="primary">Segment content</Segment>)
  })

  it('renders with the "primaryLight" variant', () => {
    render(<Segment variant="primaryLight">Segment content</Segment>)
  })

  it('renders with the "secondary" variant', () => {
    render(<Segment variant="secondary">Segment content</Segment>)
  })

  it('renders with the "tertiary" variant', () => {
    render(<Segment variant="tertiary">Segment content</Segment>)
  })

  it('renders with the "gradient" variant', () => {
    render(<Segment variant="gradient">Segment content</Segment>)
  })

  it('renders with the "accent" variant', () => {
    render(<Segment variant="accent">Segment content</Segment>)
  })
})
