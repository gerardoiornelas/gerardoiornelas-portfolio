import { lighten, darken } from "polished"

const primaryColor: string = "#230046"
const secondaryColor: string = "#320064"
const tertiaryColor: string = "#282828"
const accentColor: string = "#141414"

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
  white: "#fff",
  black: "#000",
  grey: "#B3B3B3",
  lightGrey: "#141414",
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
