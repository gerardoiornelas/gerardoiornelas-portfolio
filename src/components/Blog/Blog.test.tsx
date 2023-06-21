import React from "react"
import { render } from "@testing-library/react"
import { useStaticQuery } from "gatsby"

import { Blog } from "./Blog"

// Mock the useStaticQuery hook
const mockedUseStaticQuery = useStaticQuery as jest.Mock

// Provide a mock implementation for the useStaticQuery hook
const mockStaticQueryData = {
  allMarkdownRemark: {
    nodes: [
      {
        frontmatter: {
          author: "John Doe",
          slug: "/blog-post-1",
          title: "Blog Post 1",
          featuredImage: {
            childImageSharp: {
              gatsbyImageData: {
                width: 512,
              },
            },
          },
        },
        html: "<p>This is the content of Blog Post 1</p>",
      },
      // Add more mock data if needed
    ],
  },
}

beforeEach(() => {
  // Mock the useStaticQuery hook with the mock data
  mockedUseStaticQuery.mockReturnValue(mockStaticQueryData)
})

test("renders Blog component", () => {
  render(<Blog />)
  // Add your assertions here to verify the rendered output or behavior of the component
})
