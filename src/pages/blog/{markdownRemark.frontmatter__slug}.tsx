import * as React from "react"
import { graphql, type HeadFC, type PageProps } from "gatsby"
import { BlogPostTemplate } from "../../components/BlogPostTemplate"
import { Seo, seoDefaults } from "../../components/Seo"

interface BlogPostPageData {
  markdownRemark: {
    excerpt: string
    html: string
    frontmatter: {
      date: string
      datePublished: string
      slug: string
      title: string
      author: string
      featuredImage?: {
        publicURL?: string
        childImageSharp?: {
          gatsbyImageData: any
        }
      }
    }
  }
}

const BlogPostPage: React.FC<PageProps<BlogPostPageData>> = ({ data }) => (
  <BlogPostTemplate data={data} />
)

export const Head: HeadFC<BlogPostPageData> = ({ data }) => {
  if (!data?.markdownRemark) return <></>

  const post = data.markdownRemark
  const slug = post.frontmatter.slug
  const pathname = `/blog${slug}`
  const image = post.frontmatter.featuredImage?.publicURL

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    datePublished: post.frontmatter.datePublished,
    author: {
      "@type": "Person",
      name: post.frontmatter.author,
    },
    mainEntityOfPage: `${seoDefaults.siteUrl}${pathname}`,
    image: image ? `${seoDefaults.siteUrl}${image}` : undefined,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: seoDefaults.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${seoDefaults.siteUrl}/#blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.frontmatter.title,
        item: `${seoDefaults.siteUrl}${pathname}`,
      },
    ],
  }

  return (
    <Seo
      title={post.frontmatter.title}
      description={post.excerpt}
      pathname={pathname}
      image={image}
      type="article"
      jsonLd={[articleSchema, breadcrumbSchema]}
    />
  )
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      excerpt(pruneLength: 160)
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        datePublished: date(formatString: "YYYY-MM-DD")
        slug
        title
        author
        featuredImage {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 512)
          }
        }
      }
    }
  }
`

export default BlogPostPage
