import React from "react"
import { Typography, TypographyProps } from "@mui/material"

interface HeroTitleProps extends TypographyProps {
  white?: boolean
  children: React.ReactNode
}

export const HeroTitle: React.FC<HeroTitleProps> = ({
  white,
  children,
  ...props
}) => {
  return (
    <Typography
      variant="h1"
      sx={{
        fontSize: {
          xs: "4rem",
          md: "5rem",
        },
      }}
      {...props}
    >
      {children}
    </Typography>
  )
}
