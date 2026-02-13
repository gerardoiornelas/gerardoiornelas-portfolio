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
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import ReadMoreIcon from "@mui/icons-material/ReadMore"

interface BlogCardProps {
  frontmatter: {
    date: string
    title: string
    slug: string
    featuredImage?: {
      childImageSharp?: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
  excerpt: string
}

const BlogCard: React.FC<BlogCardProps> = ({ frontmatter, excerpt }) => {
  const featuredImg = getImage(
    frontmatter.featuredImage?.childImageSharp?.gatsbyImageData ?? null
  )
  return (
    <Card
      sx={{
        width: `${rem(345)}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {featuredImg && (
        <GatsbyImage
          image={featuredImg}
          alt={frontmatter.title}
          style={{ height: rem(210) }}
          imgStyle={{ objectFit: "cover" }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: rem(8) }}
        >
          {frontmatter.date}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          <ClampLines
            text={frontmatter.title}
            lines={2}
            ellipsis="..."
            buttons={false}
            innerElement="span"
          />
        </Typography>
        <Typography color="common.grey" component="div">
          <ClampLines
            text={excerpt}
            lines={4}
            ellipsis="..."
            buttons={false}
            innerElement="span"
          />
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: `center`, marginTop: "auto" }}
      >
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
