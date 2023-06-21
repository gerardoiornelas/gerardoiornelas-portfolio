import React, { ReactNode } from "react"
import { Box, Grid, GridProps } from "@mui/material"

interface RowProps extends GridProps {
  mb?: number
  children: ReactNode
}

export const Row: React.FC<RowProps> = ({ children, mb, ...otherProps }) => {
  return (
    <>
      <Grid container {...otherProps}>
        {children}
      </Grid>
      <Box mb={mb} />
    </>
  )
}
