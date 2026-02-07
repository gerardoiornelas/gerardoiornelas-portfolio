import { createTheme } from "@mui/material/styles"

import {
  fontFamilies,
  headlineFontStyles,
  commonColorStyles,
  bodyFont,
} from "./theme.config"

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#401e87",
    },
    secondary: {
      main: "#945be2",
    },

    tertiary: {
      light: "#90caf9",
      main: "#42a5f5",
      dark: "#1565c0",
    },
    accent: {
      light: "#ce93d8",
      main: "#ab47bc",
      dark: "#7b1fa2",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontFamily: bodyFont,
        },
      },
    },
  },
})

export default theme
