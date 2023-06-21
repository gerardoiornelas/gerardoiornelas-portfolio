import React from "react"
import { render } from "@testing-library/react"
import { Projects } from "./Projects"
import { ProjectCard } from "./ProjectCard"

describe("<Projects />", () => {
  it("renders without error", () => {
    render(<Projects />)
  })
})

describe("<ProjectCard />", () => {
  const sampleProps = {
    id: "project-1",
    title: "Sample Project",
    description: ["Description line 1", "Description line 2"],
    imgSrc: "sample-image.jpg",
    imgAlt: "Sample Image",
    url: "https://example.com",
    github: "https://github.com/example",
  }

  it("renders without error", () => {
    render(<ProjectCard {...sampleProps} />)
  })
})
