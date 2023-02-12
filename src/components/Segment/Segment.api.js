const getBackground = (_theme, _variant) => {
  let bgColor = null
  switch (_variant) {
    case "primary":
      bgColor = _theme.palette.primary.main
      break
    case "primaryLight":
      bgColor = _theme.palette.primary.light
      break
    case "secondary":
      bgColor = _theme.palette.secondary.dark
      break
    case "tertiary":
      bgColor = _theme.palette.tertiary.main
      break
    case "accent":
      bgColor = _theme.palette.accent.main
      break
    case "gradient":
      bgColor = `linear-gradient(0deg, rgba(171,40,164,1) 0%, rgba(3, 0, 45, 1) 100%);`
      break
    default:
      bgColor = _theme.palette.common.white
  }
  return bgColor
}

export { getBackground }
