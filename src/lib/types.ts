import type { ImageData } from "./image"
export interface BlogSummary {
  excerpt: string
  frontmatter: {
    author: string
    date: string
    datePublished: string
    slug: string
    title: string
    featuredImage?: ImageData
  }
}
export interface BlogPost extends BlogSummary { html: string }
