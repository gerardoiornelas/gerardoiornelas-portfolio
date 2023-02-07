import React from "react"
import _ from "lodash"
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { rem } from "polished"
import OpenInBrowserTwoToneIcon from "@mui/icons-material/OpenInBrowserTwoTone"
import CodeTwoToneIcon from "@mui/icons-material/CodeTwoTone"

const ProjectCard = ({
  id,
  title,
  description,
  imgSrc,
  imgAlt,
  url,
  github,
}) => {
  const theme = useTheme()

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
        <Box>
          {!_.isNil(url) && (
            <Button
              component="href"
              href={url}
              target="_blank"
              rel="noreferrer"
              size="small"
            >
              <OpenInBrowserTwoToneIcon sx={{ color: `#fff` }} />
            </Button>
          )}
        </Box>
        <Box>
          {!_.isNil(github) && (
            <Button href={github} target="_blank" rel="noreferrer" size="small">
              <CodeTwoToneIcon sx={{ color: `#fff` }} />
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  )
}

export default ProjectCard
