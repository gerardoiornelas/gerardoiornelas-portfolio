import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Box, Container, Typography, Divider } from "@mui/material"

const Footer = ({ children }) => {
  return (
    <Box>
      <Divider />
      <Container>
        <Box display="flex" justifyContent={`space-between`} py={4}>
          <Box>
            <Typography>© Gerardo I. Ornelas</Typography>
          </Box>
          <Box></Box>
          <Box>
            <Box display="flex" justifyContent={`flex-end`}>
              <Box>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

Footer.propTypes = {
  children: PropTypes.node,
}

export default Footer
