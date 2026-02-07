import React from "react"
import { Box } from "@mui/material"

interface BaseProps {
  children: React.ReactNode
}
export const Base: React.FC<BaseProps> = ({ children, ...props }) => (
  <Box {...props}>{children}</Box>
)
