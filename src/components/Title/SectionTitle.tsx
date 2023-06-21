import React from "react"
import { Typography, TypographyProps } from "@mui/material"

export interface SectionTitleProps extends TypographyProps {
  children: React.ReactNode
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  ...props
}) => {
  return (
    <Typography variant="h5" sx={{ mb: 1 }} {...props}>
      {children}
    </Typography>
  )
}
