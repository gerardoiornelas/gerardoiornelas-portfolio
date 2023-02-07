import React from "react"
import { navigate } from "gatsby"
import ClampLines from "react-clamp-lines"
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material"
import { rem } from "polished"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ReadMoreIcon from "@mui/icons-material/ReadMore"

const BlogCard = ({ frontmatter, html }) => {
  let featuredImg = getImage(
    frontmatter.featuredImage?.childImageSharp?.gatsbyImageData
  )
  return (
    <Card
      sx={{
        maxWidth: `${rem(345)}`,
        marginBottom: `2rem`,
      }}
    >
      <GatsbyImage image={featuredImg} fullWidth />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" color="primary">
          {frontmatter.title}
        </Typography>
        <Typography color="common.grey">
          <ClampLines
            text={html}
            lines={4}
            ellipsis="..."
            buttons={false}
            innerElement="p"
          />
        </Typography>
        <Button onClick={() => navigate(`/blog/${frontmatter.slug}`)}></Button>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: `center` }}>
        <Button
          endIcon={<ReadMoreIcon />}
          size="small"
          color="secondary"
          onClick={() => navigate(`/blog${frontmatter.slug}`)}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  )
}

export default BlogCard
