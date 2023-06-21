import React from "react"
import { render, screen } from "@testing-library/react"

import { CurriculumVitae } from "./CurriculumVitae"

test("renders CurriculumVitae component", () => {
  render(<CurriculumVitae />)

  // Check if the "Curriculum Vitae" title is rendered
  const titleElement = screen.getByText("Curriculum Vitae")
  expect(titleElement).toBeInTheDocument()

  // Check if the "Current Roles" section is rendered
  const currentRolesElement = screen.getByText("Current Roles")
  expect(currentRolesElement).toBeInTheDocument()

  // Add more assertions here to test other elements or behavior of the component
})
