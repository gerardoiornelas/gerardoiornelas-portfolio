import React from "react"
import { render } from "@testing-library/react"
import { ThemeProvider } from "@mui/material/styles"
import { createTheme } from "@mui/material"

import { Segment } from "./Segment"

describe("Segment", () => {
  test("renders children correctly", () => {
    const theme = createTheme()
    const children = <div>Segment Content</div>
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Segment>{children}</Segment>
      </ThemeProvider>
    )

    expect(getByText("Segment Content")).toBeInTheDocument()
  })

  test("renders with provided variant", () => {
    const theme = createTheme()
    const variant = "primary"
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Segment variant={variant} />
      </ThemeProvider>
    )

    expect(container.firstChild).toHaveStyle(
      `background: ${theme.palette.primary.main}`
    )
  })

  test("renders with segment decoration", () => {
    const theme = createTheme()
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Segment segmentDecoration />
      </ThemeProvider>
    )

    expect(container.querySelector(".segment-decoration")).toBeInTheDocument()
  })

  test("renders with segment decoration alternate", () => {
    const theme = createTheme()
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Segment segmentDecorationAlt />
      </ThemeProvider>
    )

    expect(
      container.querySelector(".segment-decoration-alternate")
    ).toBeInTheDocument()
  })

  test("renders without padding", () => {
    const theme = createTheme()
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Segment noPadding />
      </ThemeProvider>
    )

    expect(container.firstChild).toHaveStyle(`padding-bottom: 0`)
  })
})
