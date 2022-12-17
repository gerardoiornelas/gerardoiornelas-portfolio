import React from "react"
import {
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  IconButton,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { rem } from "polished"
import OpenInBrowserTwoToneIcon from "@mui/icons-material/OpenInBrowserTwoTone"
import CodeTwoToneIcon from "@mui/icons-material/CodeTwoTone"

const BlogCard = ({ id, title, description, imgSrc, imgAlt }) => {
  const theme = useTheme()
  console.log({ theme })
  return (
    <Card
      sx={{
        maxWidth: `${rem(345)}`,
        marginBottom: `2rem`,
      }}
    >
      <CardMedia component="img" alt={imgAlt} height="100" image={imgSrc} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        {description.map(el => (
          <Typography
            variant="body2"
            sx={{
              color: `${theme.palette.tertiary.main}`,
            }}
          >
            {el}
          </Typography>
        ))}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: `space-between` }}>
        <IconButton size="small">
          <OpenInBrowserTwoToneIcon />
        </IconButton>
        <IconButton size="small">
          <CodeTwoToneIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default BlogCard
