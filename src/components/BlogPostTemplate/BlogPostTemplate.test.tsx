import React from "react"
import { render } from "@testing-library/react"
import { navigate } from "gatsby"

import { BlogPostTemplate } from "./BlogPostTemplate"

// Mock the navigate function from Gatsby
jest.mock("gatsby", () => ({
  navigate: jest.fn(),
}))

// Mock the image component from gatsby-plugin-image
jest.mock("gatsby-plugin-image", () => ({
  GatsbyImage: jest
    .fn()
    .mockImplementation(({ image }) => <img src={image.src} alt={image.alt} />),
  getImage: jest.fn(),
}))

// Sample data for the test
const mockData = {
  markdownRemark: {
    frontmatter: {
      title: "Sample Blog Post",
      date: "2022-01-01",
      author: "John Doe",
      slug: "/sample-blog-post",
      featuredImage: {
        childImageSharp: {
          gatsbyImageData: {
            src: "image.jpg",
            alt: "Image Alt Text",
          },
        },
      },
    },
    html: "<p>Sample blog post content</p>",
  },
}

test("renders BlogPostTemplate component", () => {
  render(<BlogPostTemplate data={mockData} />)
  // Add your assertions here to verify the rendered output or behavior of the component

  // Example assertion:
  expect(navigate).toHaveBeenCalledWith("/#blog")
})
