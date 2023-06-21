import React from "react"
import { HeroTitle } from "./HeroTitle"
import { SegmentTitle } from "./SegmentTitle"
import { SegmentTitleAlt } from "./SegmentTitleAlt"
import { SectionTitle, SectionTitleProps } from "./SectionTitle"

interface TitleProps extends SectionTitleProps {
  variant: "hero" | "segment" | "segmentAlt" | "section"
  children: React.ReactNode
}

export const Title: React.FC<TitleProps> = ({
  variant,
  children,
  ...props
}) => {
  const TitleComponent = {
    hero: HeroTitle,
    segment: SegmentTitle,
    segmentAlt: SegmentTitleAlt,
    section: SectionTitle,
  }[variant]

  const titleProps: SectionTitleProps = props as SectionTitleProps

  return React.createElement(TitleComponent, titleProps, children)
}
