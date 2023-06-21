import { lighten, darken } from "polished"

const primaryColor: string = "#03002D"
const secondaryColor: string = "#F7218C"
const tertiaryColor: string = "#4BBDD2"
const accentColor: string = "#AB28A4"

const appTitle: string = "Gerardo I. Ornelas - Web3 Developer"
const metaDescription: string =
  "Digital architect of user-interfaces with a passion for Blockchain and Web3."
const metaKeywords: string =
  "react, hardhat, solidity, web3, UX, UI, blockchain"

const googleFonts: string =
  "https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"

const fontFamilies: string =
  "'PT Sans', sans-serif,'p22-arts-and-crafts', sans-serif "
const headlineFont: string = "'p22-arts-and-crafts', sans-serif"
const bodyFont: string = "'PT Sans', sans-serif"

const headlineFontStyles: React.CSSProperties = {
  fontFamily: headlineFont,
  fontWeight: "normal",
  fontStyle: "normal",
  // letterSpacing: "-0.02em",
}

const commonColorStyles: { [key: string]: string } = {
  white: "#fff",
  black: "#000",
  grey: "#696a6c",
  lightGrey: "#fafafa",
}

const customColorStyles: {
  tertiary: { light: string, main: string, dark: string },
  accent: { light: string, main: string, dark: string },
} = {
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
