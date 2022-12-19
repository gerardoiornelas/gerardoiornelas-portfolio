import * as React from "react"
import { graphql } from "gatsby"
import { BlogPostTemplate } from "../../components/BlogPostTemplate"

const BlogPostPage = ({ data }) => <BlogPostTemplate data={data} />

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        author
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 512)
          }
        }
      }
    }
  }
`

export default BlogPostPage
