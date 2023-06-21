import React, { useRef, useState, useLayoutEffect } from "react"
import { Box } from "@mui/material"

import { Segment } from "../Segment"
import { Layout } from "../Layout"
import { Home } from "../Home"
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
        <Segment segmentDecoration>
          <Home />
        </Segment>
        <Segment variant="primary" noPadding>
          <Box sx={{ position: "relative" }} ref={refProjects}>
            <Box id="projects" sx={{ position: "absolute", top: topPos }}></Box>
            <Projects />
          </Box>
        </Segment>
        <Segment variant="gradient">
          <Box
            id="blog"
            sx={{ position: "absolute", top: topPos }}
            ref={refBlog}
          ></Box>
          <Blog />
        </Segment>
        <Segment variant="accent">
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
