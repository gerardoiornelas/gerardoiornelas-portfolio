import "@mui/material/styles"

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"]
    accent: Palette["primary"]
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"]
    accent?: PaletteOptions["primary"]
  }
}
