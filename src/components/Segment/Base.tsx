import React from "react"
import { StyledBase } from "./Section.styled"

interface BaseProps {
  children: React.ReactNode
}
export const Base: React.FC<BaseProps> = ({ children, ...props }) => (
  <StyledBase {...props}>{children}</StyledBase>
)
