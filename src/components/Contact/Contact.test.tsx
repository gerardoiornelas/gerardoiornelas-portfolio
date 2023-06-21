import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { Contact } from "./Contact"

test("renders Contact component", () => {
  const { getByLabelText, getByText } = render(<Contact />)

  // Fill in the form fields
  fireEvent.change(getByLabelText("Your Name"), {
    target: { value: "John Doe" },
  })
  fireEvent.change(getByLabelText("Your Email"), {
    target: { value: "john@example.com" },
  })
  fireEvent.change(getByLabelText("Message"), {
    target: { value: "Hello, this is a test message." },
  })

  // Submit the form
  fireEvent.click(getByText("Send Message"))

  // Add your assertions here to verify the submitted form or any other expected behavior
})
