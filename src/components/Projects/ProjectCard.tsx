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

interface ProjectCardProps {
  id: string
  title: string
  description: string[]
  imgSrc: string
  imgAlt: string
  url?: string
  github?: string
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
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
      id={id}
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
        {description.map((el, index) => (
          <Typography
            key={index}
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
          {url && (
            <Button
              startIcon={<OpenInBrowserTwoToneIcon sx={{ color: `#fff` }} />}
              href={url}
              target="_blank"
              rel="noreferrer"
              size="small"
              sx={{ color: "#fff" }}
            >
              Website
            </Button>
          )}
        </Box>
        <Box>
          {github && (
            <Button
              startIcon={<CodeTwoToneIcon sx={{ color: `#fff` }} />}
              href={github}
              target="_blank"
              rel="noreferrer"
              size="small"
              sx={{ color: "#fff" }}
            >
              Source Code
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  )
}
