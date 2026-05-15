import path from "path"
import type { GatsbyNode } from "gatsby"

interface BlogPostNode {
  id: string
  frontmatter?: {
    slug?: string
  }
}

interface CreatePagesResult {
  data?: {
    allMarkdownRemark?: {
      nodes?: BlogPostNode[]
    }
  }
  errors?: unknown
}

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions
  const component = path.resolve("./src/templates/blog-post.tsx")

  const result = (await graphql(`
    query CreateBlogPostPages {
      allMarkdownRemark {
        nodes {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  `)) as CreatePagesResult

  if (result.errors) {
    reporter.panicOnBuild("Failed to create blog post pages.", result.errors)
    return
  }

  const posts = result.data?.allMarkdownRemark?.nodes ?? []

  posts.forEach(post => {
    const slug = post.frontmatter?.slug

    if (!slug) {
      return
    }

    createPage({
      path: `/blog${slug}/`,
      component,
      context: {
        id: post.id,
      },
    })
  })
}
