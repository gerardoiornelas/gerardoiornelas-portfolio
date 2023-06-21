import React from "react"
import { Typography, Box, TypographyProps } from "@mui/material"

interface SegmentTitleProps extends TypographyProps {
  subtitle?: React.ReactNode
  textShadowColor?: string
}

export const SegmentTitle: React.FC<SegmentTitleProps> = ({
  subtitle,
  children,
  textShadowColor,
  ...otherProps
}) => {
  return (
    <Box mb={2}>
      <Typography
        {...otherProps}
        sx={{ textShadow: `${textShadowColor} 2px 2px` }}
      >
        {children}
      </Typography>
    </Box>
  )
}

SegmentTitle.defaultProps = {
  variant: "h4",
  color: "secondary",
} as Partial<SegmentTitleProps>
