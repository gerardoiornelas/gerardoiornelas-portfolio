import { lighten, darken } from "polished"

const primaryColor = "#03002D"
const secondaryColor = "#F7218C"
const tertiaryColor = "#4BBDD2"
const accentColor = "#AB28A4"

const appTitle = "React Hardhat Template"
const metaDescription = "Boilerplate for Web3 development"
const metaKeywords = "react, hardhat, solidity, web3"

const googleFonts =
  "https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"

const fontFamilies = "'PT Sans', sans-serif,'p22-arts-and-crafts', sans-serif "
const headlineFont = "'p22-arts-and-crafts', sans-serif"
const bodyFont = "'PT Sans', sans-serif"

const headlineFontStyles = {
  fontFamily: headlineFont,
  fontWeight: [400, 700],
  fontStyle: "normal",
  // letterSpacing: "-0.02em",
}

const commonColorStyles = {
  white: "#fff",
  black: "#000",
  grey: "#696a6c",
  lightGrey: "#fafafa",
}

const customColorStyles = {
  tertiary: {
    light: lighten(0.1, tertiaryColor),
    main: tertiaryColor,
    dark: darken(0.1, tertiaryColor),
  },
  accent: {
    light: lighten(0.1, tertiaryColor),
    main: accentColor,
    dark: darken(0.1, tertiaryColor),
  },
}

export {
  googleFonts,
  primaryColor,
  secondaryColor,
  accentColor,
  fontFamilies,
  headlineFont,
  headlineFontStyles,
  commonColorStyles,
  bodyFont,
  metaDescription,
  metaKeywords,
  appTitle,
  customColorStyles,
}
