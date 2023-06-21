import React from "react"
import { Typography, Box, TypographyProps, useTheme } from "@mui/material"

interface SegmentTitleAltProps extends TypographyProps {
  subtitle?: React.ReactNode
  textShadowColor?: string
}

export const SegmentTitleAlt: React.FC<SegmentTitleAltProps> = ({
  subtitle,
  children,
  textShadowColor,
  ...otherProps
}) => {
  const theme = useTheme()
  return (
    <Box mb={2}>
      <Typography
        {...otherProps}
        sx={{ textShadow: `${theme.palette.secondary.main} 2px 2px` }}
      >
        {children}
      </Typography>
    </Box>
  )
}

SegmentTitleAlt.defaultProps = {
  variant: "h4",
  color: "primary",
}
