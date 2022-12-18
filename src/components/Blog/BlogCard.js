import React from "react"
import { navigate } from "gatsby"
import parse from "html-react-parser"
import ClampLines from "react-clamp-lines"
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Button,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { rem } from "polished"
import OpenInBrowserTwoToneIcon from "@mui/icons-material/OpenInBrowserTwoTone"
import ReadMoreIcon from "@mui/icons-material/ReadMore"

const BlogCard = ({ frontmatter: { author, slug, title }, html }) => {
  const theme = useTheme()
  const parsedHtmlText = parse(html)
  return (
    <Card
      sx={{
        maxWidth: `${rem(345)}`,
        marginBottom: `2rem`,
      }}
    >
      {/* <CardMedia component="img" alt={imgAlt} height="100" image={imgSrc} /> */}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <ClampLines
          text={html}
          lines={4}
          ellipsis="..."
          buttons={false}
          innerElement="p"
        />
        <Button onClick={() => navigate(`/blog/${slug}`)}></Button>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: `center` }}>
        <Button
          endIcon={<ReadMoreIcon />}
          size="small"
          onClick={() => navigate(`/blog${slug}`)}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  )
}

export default BlogCard
