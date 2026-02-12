import React from "react"
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
  signal: string
  imgSrc: string
  imgAlt: string
  url?: string
  anchor?: string
  github?: string
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  signal,
  imgSrc,
  imgAlt,
  url,
  anchor,
  github,
}) => {
  const theme = useTheme()

  return (
    <Card
      id={id}
      sx={{
        width: `${rem(345)}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardMedia component="img" alt={imgAlt} image={imgSrc} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        {description.map((el, index) => (
          <Typography key={index} variant="body2" color="text.secondary">
            {el}
          </Typography>
        ))}
        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
          {signal}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 1.5,
          marginTop: "auto",
        }}
      >
        {anchor && (
          <Button href={anchor} size="small" color="primary" variant="outlined">
            View APP Flow
          </Button>
        )}
        <Button
          href="#contact"
          size="small"
          color="secondary"
          variant="contained"
        >
          Request Briefing
        </Button>
        {url && (
          <Button
            startIcon={<OpenInBrowserTwoToneIcon sx={{ color: "secondary" }} />}
            href={url}
            target="_blank"
            rel="noreferrer"
            size="small"
            color="primary"
            variant="text"
          >
            Visit
          </Button>
        )}
        {github && (
          <Button
            startIcon={<CodeTwoToneIcon sx={{ color: `#fff` }} />}
            href={github}
            target="_blank"
            rel="noreferrer"
            size="small"
          >
            Source
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
