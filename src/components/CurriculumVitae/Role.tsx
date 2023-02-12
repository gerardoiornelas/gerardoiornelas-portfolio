import React from "react"
import { Box, Container, Typography } from "@mui/material"

interface Props {
  id: string
  logo: HTMLImageElement
  title: string
  employer: string
  dates: string
  location: string
  description: string
}

const Role = ({
  id,
  logo,
  title,
  employer,
  dates,
  location,
  description,
}: Props) => {
  return (
    <Box id={id}>
      <Box display="flex" justifyContent="center" mb={3}>
        <Box
          component="img"
          src={logo}
          alt="american family insurance logo"
          sx={{ borderRadius: "50%", maxWidth: "128px" }}
        />
      </Box>
      <Box>
        <Typography color="white" align="center">
          <strong>{title}</strong>
        </Typography>
      </Box>
      <Box>
        <Typography color="white" align="center">
          {employer}
        </Typography>
      </Box>
      <Box>
        <Typography color="white" align="center">
          {dates}
        </Typography>
      </Box>
      <Box>
        <Typography color="white" align="center">
          {location}
        </Typography>
      </Box>
      <Box>
        <Typography color="white" align="center">
          {description}
        </Typography>
      </Box>
    </Box>
  )
}

export default Role
