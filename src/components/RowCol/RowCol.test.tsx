import React from "react"
import { render } from "@testing-library/react"
import { RowCol } from "./RowCol"
import { Col } from "./Col"
import { Row } from "./Row"

describe("<RowCol />", () => {
  it("renders without error", () => {
    render(
      <RowCol mb={2}>
        <div>Test Content</div>
      </RowCol>
    )
  })
})

describe("<Col />", () => {
  it("renders without error", () => {
    render(
      <Col xs={6}>
        <div>Test Content</div>
      </Col>
    )
  })
})

describe("<Row />", () => {
  it("renders without error", () => {
    render(
      <Row>
        <div>Test Content</div>
      </Row>
    )
  })
})
