import React from "react"
import PropTypes from "prop-types"
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

const Contact = ({ children }) => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Container>
      <RowCol mb={4}>
        <Title variant="segmentAlt" color="primary" align="center">
          Get in touch
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
                label="Your Name"
                name="name"
                required
              />
            </Box>

            <Box mb={2}>
              <TextField
                variant="filled"
                fullWidth
                id="email"
                label="Your Email"
                name="email"
                required
              />
            </Box>

            <Box mb={2}>
              <TextField
                variant="filled"
                fullWidth
                id="message"
                label="Message"
                name="message"
                multiline
                rows={4}
                required
              />
            </Box>

            <Box display="flex" justifyContent={`flex-end`}>
              <Button
                type="submit"
                required
                size="large"
                fullWidth={isSmall}
                variant="contained"
                color="secondary"
              >
                Send Message
              </Button>
            </Box>
          </form>
        </Col>
      </Row>
    </Container>
  )
}

Contact.propTypes = {
  children: PropTypes.node,
}

export default Contact
