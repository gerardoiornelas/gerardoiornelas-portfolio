import React from "react"
import PropTypes from "prop-types"
import { Container, Typography } from "@mui/material"

import { StyledHome } from "./Home.styled"

const Home = ({ children }) => {
  return (
    <StyledHome>
      <Container>
        <Typography>Home Page</Typography>
      </Container>
    </StyledHome>
  )
}

Home.propTypes = {
  children: PropTypes.node,
}

export default Home
