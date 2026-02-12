import React, { useRef, useState, useLayoutEffect } from "react"
import { Box } from "@mui/material"

import { Segment } from "../Segment"
import { Layout } from "../Layout"
import { Home } from "../Home"
import { About } from "../About"
import { Projects } from "../Projects"
import { CurriculumVitae } from "../CurriculumVitae"
import { Blog } from "../Blog"
import { RobotGallery } from "../RobotGallery"
import { Contact } from "../Contact"

export const ScrollContainer: React.FC = () => {
  const refHome = useRef<HTMLElement>(null)
  const refProjects = useRef<HTMLElement>(null)
  const refBlog = useRef<HTMLElement>(null)
  const refCv = useRef<HTMLElement>(null)
  const refContact = useRef<HTMLElement>(null)

  const [posHome, setPosHome] = useState<number | null>(null)
  const [posProjects, setPosProjects] = useState<number | null>(null)
  const [posCv, setPosCv] = useState<number | null>(null)
  const [posBlog, setPosBlog] = useState<number | null>(null)
  const [posContact, setPosContact] = useState<number | null>(null)

  useLayoutEffect(() => {
    function updatePosition() {
      if (refHome.current) setPosHome(refHome.current.offsetTop)
      if (refProjects.current) setPosProjects(refProjects.current.offsetTop)
      if (refCv.current) setPosCv(refCv.current.offsetTop)
      if (refBlog.current) setPosBlog(refBlog.current.offsetTop)
      if (refContact.current) setPosContact(refContact.current.offsetTop)
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
        yAxisCv={posCv}
        yAxisBlog={posBlog}
        yAxisContact={posContact}
      >
        <Segment>
          <Home />
        </Segment>
        <Segment variant="gradient" segmentDecorationAlt>
          <About />
        </Segment>
        <Segment noPadding>
          <Box sx={{ position: "relative" }} ref={refProjects}>
            <Box id="projects" sx={{ position: "absolute", top: topPos }}></Box>
            <Projects />
          </Box>
        </Segment>
        <Segment>
          <Box id="app-visualization" sx={{ position: "relative" }}>
            <Box sx={{ maxWidth: 800, margin: "0 auto" }}>
              <Box
                component="div"
                sx={{ color: "text.secondary", textAlign: "center" }}
              >
                Watch the Agent Permission Protocol in motion — animated flow of
                Key Exchange → Scoped Permit → Revocation. (Placeholder anchor
                for visualization.)
              </Box>
            </Box>
          </Box>
        </Segment>
        <Segment>
          <Box
            id="blog"
            sx={{ position: "absolute", top: topPos }}
            ref={refBlog}
          ></Box>
          <Blog />
        </Segment>
        <Segment>
          <Box
            id="cv"
            sx={{ position: "absolute", top: topPos }}
            ref={refCv}
          ></Box>
          <CurriculumVitae />
        </Segment>
        <RobotGallery />

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
