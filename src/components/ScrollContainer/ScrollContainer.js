import React, { useRef, useState, useLayoutEffect } from "react"
import PropTypes from "prop-types"
import { Box } from "@mui/material"

import { Segment } from "../Segment"
import { Layout } from "../Layout"
import { Home } from "../Home"
import { Projects } from "../Projects"
import { Contact } from "../Contact"

const ScrollContainer = () => {
  const refHome = useRef()
  const refProjects = useRef()
  const refContact = useRef()

  const [posHome, setPosHome] = useState(null)
  const [posProjects, setPosProjects] = useState(null)
  const [posContact, setPosContact] = useState(null)

  useLayoutEffect(() => {
    function updatePosition() {
      setPosHome(refHome.current.offsetTop)
      setPosProjects(refProjects.current.offsetTop)
      setPosContact(refContact.current.offsetTop)
    }
    window.addEventListener("resize", updatePosition)
    updatePosition()
    return () => window.removeEventListener("resize", updatePosition)
  }, [])

  const topPos = "-135px"

  return (
    <>
      <section id="home" ref={refHome}></section>
      <Layout
        yAxisHome={posHome}
        yAxisProjects={posProjects}
        yAxisContact={posContact}
      >
        <Segment segmentDecoration>
          <Home />
        </Segment>
        <Segment variant="primary">
          <Box sx={{ position: "relative" }} ref={refProjects}>
            <Box id="projects" sx={{ position: "absolute", top: topPos }}></Box>
            <Projects />
          </Box>
        </Segment>
        <Segment variant="gradient">
          <section></section>
        </Segment>
        <Segment>
          <Box sx={{ position: "relative" }} ref={refContact}>
            <Box id="contact" sx={{ position: "absolute", top: topPos }}></Box>
            <Contact />
          </Box>
        </Segment>
      </Layout>
    </>
  )
}

ScrollContainer.propTypes = {
  children: PropTypes.node,
}

export default ScrollContainer
