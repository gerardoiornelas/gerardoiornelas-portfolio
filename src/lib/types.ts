import type { ImageData } from "./image"

export interface ArticleCorrection {
  date: string
  what: string
  why: string
}

export interface ArticleSource {
  title: string
  url: string
}

export interface ArticleFaq {
  question: string
  answer: string
}

export interface BlogFrontmatter {
  author: string
  date: string
  datePublished: string
  slug: string
  title: string
  description?: string
  metaTitle?: string
  territory?: string
  series?: string
  part?: number
  status?: string
  updated?: string
  corrections?: ArticleCorrection[]
  aiAssistance?: string
  sources?: ArticleSource[]
  faq?: ArticleFaq[]
  featuredImage?: ImageData
}

export interface BlogSummary {
  excerpt: string
  frontmatter: BlogFrontmatter
}
export interface BlogPost extends BlogSummary { html: string }
