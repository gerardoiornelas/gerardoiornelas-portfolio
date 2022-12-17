import React from "react"
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { rem } from "polished"
import OpenInBrowserTwoToneIcon from "@mui/icons-material/OpenInBrowserTwoTone"
import CodeTwoToneIcon from "@mui/icons-material/CodeTwoTone"

const ProjectCard = ({ id, title, description, imgSrc, imgAlt }) => {
  const theme = useTheme()
  console.log({ theme })
  return (
    <Card
      sx={{
        maxWidth: `${rem(345)}`,
        marginBottom: `2rem`,
        background: `transparent`,
        border: `1px solid ${theme.palette.secondary.main}`,
      }}
    >
      <CardMedia component="img" alt={imgAlt} height="100" image={imgSrc} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          color="common.white"
        >
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
          <OpenInBrowserTwoToneIcon sx={{ color: `#fff` }} />
        </IconButton>
        <IconButton size="small">
          <CodeTwoToneIcon sx={{ color: `#fff` }} />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ProjectCard