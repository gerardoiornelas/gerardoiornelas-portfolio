import { createTheme } from "@mui/material/styles";
import { lighten, darken } from "polished";

import {
  primaryColor,
  secondaryColor,
  accentColor,
  fontFamilies,
  headlineFontStyles,
  commonColorStyles,
  bodyFont,
  customColorStyles,
} from "./theme.config";

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: lighten(0.1, primaryColor),
      main: primaryColor,
      dark: darken(0.1, primaryColor),
    },
    secondary: {
      light: lighten(0.1, secondaryColor),
      main: secondaryColor,
      dark: darken(0.1, secondaryColor),
    },
    accent: {
      light: lighten(0.1, accentColor),
      main: accentColor,
      dark: darken(0.1, accentColor),
    },
    common: {
      ...commonColorStyles,
    },
    ...customColorStyles,
  },
  typography: {
    fontFamily: fontFamilies,
    h1: {
      ...headlineFontStyles,
    },
    h2: {
      ...headlineFontStyles,
    },
    h3: {
      ...headlineFontStyles,
    },
    h4: {
      fontFamily: bodyFont,
      fontWeight: 500,
    },
    h5: {
      fontFamily: bodyFont,
    },
    h6: {
      fontFamily: bodyFont,
    },
    subtitle1: {
      fontFamily: bodyFont,
    },
    subtitle2: {
      fontFamily: bodyFont,
    },
    body1: {
      fontFamily: bodyFont,
    },
    body2: {
      fontFamily: bodyFont,
    },
    button: {
      fontFamily: bodyFont,
    },
    caption: {
      fontFamily: bodyFont,
    },
    overline: {
      fontFamily: bodyFont,
    },
  },

  components: {
    button: {
      borderRadius: 0,
      fontFamily: bodyFont,
    },
  },
});

export default theme;
