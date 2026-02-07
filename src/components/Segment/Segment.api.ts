import { Theme } from "@mui/material/styles"

const getBackground = (theme: Theme, variant: string): string => {
  let bgColor: string = theme.palette.background.default
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
      bgColor = `linear-gradient(0deg, rgb(100, 75, 221) 0%, #0d0c2b 100%);`
      break
    default:
      bgColor = theme.palette.background.default
  }
  return bgColor
}

export { getBackground }
