import React from "react"
import { Box, Typography } from "@mui/material"

interface RoleProps {
  id: string
  logo: string
  title: string
  employer: string
  dates: string
  location: string
  description: string
}

export const Role: React.FC<RoleProps> = ({
  id,
  logo,
  title,
  employer,
  dates,
  location,
  description,
}) => {
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
        <Typography align="center">
          <strong>{title}</strong>
        </Typography>
      </Box>
      <Box>
        <Typography align="center">{employer}</Typography>
      </Box>
      <Box>
        <Typography align="center">{dates}</Typography>
      </Box>
      <Box>
        <Typography align="center">{location}</Typography>
      </Box>
      <Box>
        <Typography align="center">{description}</Typography>
      </Box>
    </Box>
  )
}
