import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import { navigate } from "../../lib/site"
import { BlogPostTemplate } from "./BlogPostTemplate"

jest.mock("../../lib/site", () => ({
  ...jest.requireActual("../../lib/site"),
  navigate: jest.fn(),
}))

const mockData = {
  markdownRemark: {
    frontmatter: {
      title: "Sample Blog Post", date: "January 01, 2022", author: "John Doe", slug: "/sample-blog-post",
      featuredImage: { src: "/image.webp", publicURL: "/image.jpg", srcSet: "/image.webp 512w", width: 512, height: 512 },
    },
    html: "<p>Sample blog post content</p>",
  },
}

test("renders article content and returns to the homepage blog section", () => {
  render(<BlogPostTemplate data={mockData} />)
  expect(screen.getByText("Sample blog post content")).toBeTruthy()
  fireEvent.click(screen.getByText("Back"))
  expect(navigate).toHaveBeenCalledWith("/#blog")
})
