import React, { ReactNode } from "react"
import { Grid, GridProps, GridSize } from "@mui/material"

interface ColProps extends GridProps {
  children?: ReactNode
  xs?: boolean | GridSize
}

export const Col: React.FC<ColProps> = ({ children, xs, ...otherProps }) => {
  return (
    <Grid item xs={xs} {...otherProps}>
      {children}
    </Grid>
  )
}
