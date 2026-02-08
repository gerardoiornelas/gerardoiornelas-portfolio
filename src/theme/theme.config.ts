import { lighten, darken } from "polished"

// Brand palette
const brandOffWhite: string = "#D8D8D8"
const brandNavy: string = "rgb(9, 5, 63)"
const brandViolet: string = "#6F4B9B"
const brandLime: string = "#D4DF1E"
const brandCyan: string = "#38B4C6"
const brandBg: string = "#0D0C2B"
const brandSurface: string = "#13123D"

const primaryColor: string = brandCyan
const secondaryColor: string = brandViolet
const tertiaryColor: string = brandLime
const accentColor: string = brandNavy

const appTitle: string = "Gerardo I. Ornelas - Web3 Developer"
const metaDescription: string =
  "Digital architect of user-interfaces with a passion for Blockchain and Web3."
const metaKeywords: string =
  "react, hardhat, solidity, web3, UX, UI, blockchain"

const googleFonts: string =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"

const fontFamilies: string = "'Inter', sans-serif"
const headlineFont: string = "'Space Grotesk', sans-serif"
const bodyFont: string = "'Inter', sans-serif"

const headlineFontStyles: React.CSSProperties = {
  fontFamily: headlineFont,
  fontWeight: "normal",
  fontStyle: "normal",
  // letterSpacing: "-0.02em",
}

const commonColorStyles: { [key: string]: string } = {
  white: brandOffWhite,
  black: "#000",
  grey: "#B8BCC7",
  lightGrey: brandBg,
}

const customColorStyles: {
  tertiary: { light: string; main: string; dark: string }
  accent: { light: string; main: string; dark: string }
} = {
  tertiary: {
    light: lighten(0.1, tertiaryColor),
    main: tertiaryColor,
    dark: darken(0.1, tertiaryColor),
  },
  accent: {
    light: lighten(0.1, accentColor),
    main: accentColor,
    dark: darken(0.1, accentColor),
  },
}

export {
  googleFonts,
  brandBg,
  brandSurface,
  brandOffWhite,
  brandNavy,
  brandViolet,
  brandLime,
  brandCyan,
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
