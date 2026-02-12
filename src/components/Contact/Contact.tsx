import React from "react"
import {
  Container,
  Box,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material"

import { RowCol, Row, Col } from "../RowCol"
import { Title } from "../Title"

export const Contact: React.FC = () => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Container>
      <RowCol mb={4}>
        <Title variant="segment" align="center">
          Request a Briefing
        </Title>
      </RowCol>
      <Row justifyContent="center">
        <Col xs={12} md={6}>
          <form
            name="contact"
            method="POST"
            action="/thanks"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="contact" />
            <Box mb={2}>
              <TextField
                variant="filled"
                fullWidth
                id="name"
                label="Name"
                name="name"
                required
              />
            </Box>

            <Box mb={2}>
              <TextField
                variant="filled"
                fullWidth
                id="email"
                label="Work Email"
                name="email"
                required
              />
            </Box>

            <Box mb={2}>
              <TextField
                variant="filled"
                fullWidth
                id="organization"
                label="Organization"
                name="organization"
                required
              />
            </Box>

            <Box mb={2}>
              <TextField
                variant="filled"
                fullWidth
                id="objective"
                label="Objective"
                name="objective"
                multiline
                rows={3}
                required
              />
            </Box>

            <Box mb={2}>
              <TextField
                variant="filled"
                fullWidth
                id="timeline"
                label="Timeline"
                name="timeline"
              />
            </Box>

            <Box mb={2}>
              <TextField
                variant="filled"
                fullWidth
                id="security"
                label="Security Requirements"
                name="security"
                multiline
                rows={3}
                required
              />
            </Box>

            <Box mb={2}>
              <label>
                <input
                  type="checkbox"
                  name="newsletter"
                  value="yes"
                  style={{ marginRight: "0.5rem" }}
                />
                Add me to The Agentic Standard newsletter.
              </label>
            </Box>

            <Box display="flex" justifyContent={`flex-end`}>
              <Button
                type="submit"
                size="large"
                fullWidth={isSmall}
                variant="contained"
                color="secondary"
              >
                Send Briefing Request
              </Button>
            </Box>
          </form>
        </Col>
      </Row>
    </Container>
  )
}
