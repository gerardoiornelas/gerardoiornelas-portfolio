import React, { ReactNode } from "react"
import { Box, Grid, GridProps } from "@mui/material"

interface RowColProps extends GridProps {
  mb?: number
  children: ReactNode
}

export const RowCol: React.FC<RowColProps> = ({
  children,
  mb,
  ...otherProps
}) => {
  return (
    <>
      <Grid container {...otherProps}>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
      <Box mb={mb} />
    </>
  )
}
