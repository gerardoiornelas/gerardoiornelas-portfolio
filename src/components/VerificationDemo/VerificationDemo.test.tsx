import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"

import { VerificationDemo } from "./VerificationDemo"

describe("VerificationDemo", () => {
  it("renders the default scenario without requiring verification first", () => {
    render(<VerificationDemo />)

    expect(screen.getByText("Verify An Agent Action")).toBeInTheDocument()
    expect(
      screen.getByText("Transmit a protected diligence packet")
    ).toBeInTheDocument()
    expect(screen.getByText("Ready to verify")).toBeInTheDocument()
  })

  it("switches scenarios and renders the expired verification state", () => {
    render(<VerificationDemo />)

    fireEvent.click(screen.getByRole("button", { name: /scoped payment settlement/i }))
    expect(screen.getByText("Settle a contractor milestone")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: /verify receipt/i }))

    expect(screen.getByText("Expired before safe settlement")).toBeInTheDocument()
    expect(screen.getAllByText("expired").length).toBeGreaterThan(0)
  })

  it("renders revoked state distinctly from confirmed state", () => {
    render(<VerificationDemo />)

    fireEvent.click(screen.getByRole("button", { name: /sensitive workflow access/i }))
    fireEvent.click(screen.getByRole("button", { name: /verify receipt/i }))

    expect(screen.getByText("Revoked after issue")).toBeInTheDocument()
    expect(
      screen.getByText(/the grant was later withdrawn/i)
    ).toBeInTheDocument()
  })
})
