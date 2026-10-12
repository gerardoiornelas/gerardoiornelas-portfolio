import { createTheme } from "@mui/material/styles"
import { lighten, darken } from "polished"

import {
  primaryColor,
  secondaryColor,
  fontFamilies,
  headlineFontStyles,
  bodyFont,
  commonColorStyles,
  customColorStyles,
  brandBg,
  brandSurface,
  brandOffWhite,
  monoFont,
} from "./theme.config"

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: lighten(0.1, primaryColor),
      main: primaryColor,
      dark: darken(0.1, primaryColor),
      contrastText: brandOffWhite,
    },
    secondary: {
      light: lighten(0.1, secondaryColor),
      main: secondaryColor,
      dark: darken(0.1, secondaryColor),
      contrastText: "#101214",
    },
    common: {
      ...commonColorStyles,
    },
    background: {
      default: brandBg,
      paper: brandSurface,
    },
    text: {
      primary: brandOffWhite,
      secondary: commonColorStyles.grey,
    },
    ...customColorStyles,
  },
  typography: {
    fontFamily: fontFamilies,
    h1: {
      fontFamily: headlineFontStyles.fontFamily,
      fontWeight: 700,
    },
    h2: {
      fontFamily: headlineFontStyles.fontFamily,
      fontWeight: 600,
    },
    h3: {
      fontFamily: headlineFontStyles.fontFamily,
      fontWeight: 600,
    },
    h4: {
      ...headlineFontStyles,
    },
    h5: {
      fontFamily: headlineFontStyles.fontFamily,
    },
    h6: {
      fontFamily: headlineFontStyles.fontFamily,
    },
    subtitle1: {
      fontFamily: bodyFont,
    },
    subtitle2: {
      fontFamily: bodyFont,
    },
    body1: {
      fontFamily: bodyFont,
      color: commonColorStyles.grey,
    },
    body2: {
      fontFamily: bodyFont,
    },
    button: {
      fontFamily: monoFont,
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.06em",
    },
    caption: {
      fontFamily: bodyFont,
    },
    overline: {
      fontFamily: bodyFont,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          color: primaryColor,
          textDecorationColor: primaryColor,
          textDecorationThickness: "0.08em",
          textDecorationSkipInk: "auto",
        },
        "a:hover": {
          color: secondaryColor,
          textDecorationColor: secondaryColor,
        },
        "a:focus-visible": {
          outline: `2px solid ${secondaryColor}`,
          outlineOffset: "2px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontFamily: monoFont,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "none",
        },
        containedSecondary: {
          boxShadow: "0 4px 14px rgba(56, 180, 198, 0.25)",
          "&:hover": {
            boxShadow: "0 6px 18px rgba(56, 180, 198, 0.35)",
          },
        },
        sizeSmall: {
          fontSize: 11,
          padding: "4px 12px",
        },
        sizeMedium: {
          fontSize: 12,
          padding: "6px 16px",
        },
        sizeLarge: {
          fontSize: 13,
          padding: "10px 24px",
        },
      },
    },
  },
})

export default theme
