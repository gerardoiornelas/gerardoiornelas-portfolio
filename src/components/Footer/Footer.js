import React from "react"
import PropTypes from "prop-types"
import { Box, Container, Typography, Divider, Link } from "@mui/material"

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
                <Link>Privacy & Terms</Link>
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
