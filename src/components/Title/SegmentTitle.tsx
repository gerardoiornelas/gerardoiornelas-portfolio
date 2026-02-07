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
    <Box>
      <Typography {...otherProps} color="primary">
        {children}
      </Typography>
    </Box>
  )
}

SegmentTitle.defaultProps = {
  variant: "h4",
} as Partial<SegmentTitleProps>
