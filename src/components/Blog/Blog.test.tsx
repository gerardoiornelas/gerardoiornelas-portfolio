import React from "react"
import { render, screen } from "@testing-library/react"
import { usePosts } from "../../lib/site"
import { Blog } from "./Blog"

jest.mock("../../lib/site", () => ({
  ...jest.requireActual("../../lib/site"),
  usePosts: jest.fn(),
}))

test("renders the supplied article summary and stable route", () => {
  ;(usePosts as jest.Mock).mockReturnValue([{
    frontmatter: { author: "John Doe", date: "January 01, 2026", slug: "/blog-post-1", title: "Blog Post 1" },
    excerpt: "Article summary",
  }])
  render(<Blog />)
  expect(screen.getByText("Blog Post 1")).toBeTruthy()
  expect(screen.getByText("Read More").closest("a")?.getAttribute("href")).toBe("/blog/blog-post-1")
})
