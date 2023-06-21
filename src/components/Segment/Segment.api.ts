import { Theme } from "@mui/material/styles"

const getBackground = (theme: Theme, variant: string): string => {
  let bgColor: string | null = null
  switch (variant) {
    case "primary":
      bgColor = theme.palette.primary.main
      break
    case "primaryLight":
      bgColor = theme.palette.primary.light
      break
    case "secondary":
      bgColor = theme.palette.secondary.dark
      break
    case "tertiary":
      bgColor = theme.palette.tertiary.main
      break
    case "accent":
      bgColor = theme.palette.accent.main
      break
    case "gradient":
      bgColor = `linear-gradient(0deg, rgba(171,40,164,1) 0%, rgba(3, 0, 45, 1) 100%);`
      break
    default:
      bgColor = theme.palette.common.white
  }
  return bgColor
}

export { getBackground }
