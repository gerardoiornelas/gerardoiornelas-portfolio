import React from "react"
import { Link } from "../../lib/site"
import ClampLines from "react-clamp-lines"
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material"
import { rem } from "polished"
import { ResponsiveImage, type ImageData } from "../../lib/image"
import ReadMoreIcon from "@mui/icons-material/ReadMore"

interface BlogCardProps {
  frontmatter: {
    date: string
    title: string
    slug: string
    featuredImage?: ImageData
  }
  excerpt: string
}

const BlogCard: React.FC<BlogCardProps> = ({ frontmatter, excerpt }) => {
  const featuredImg = frontmatter.featuredImage
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
        <ResponsiveImage
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
          component={Link}
          to={`/blog${frontmatter.slug}`}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  )
}

export default BlogCard
