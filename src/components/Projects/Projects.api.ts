import cuid from "cuid"

import ImgCrittora from "../../images/projects/crittora.png"
import ImgAPP from "../../images/projects/app.png"
import ImgWUN from "../../images/projects/wun.png"

interface ProjectData {
  id: string
  title: string
  description: string[]
  signal: string
  imgSrc: string
  imgAlt: string
  url: string
  imgWidth?: number
  imgHeight?: number
  anchor?: string
  github?: string
}

const projectsData: ProjectData[] = [
  {
    id: cuid(),
    title: `Mortgage AI Governance`,
    description: [
      "Through Crittora: define who or what may act in consequential mortgage workflows, under which limits, and what evidence proves the result.",
    ],
    signal:
      "Crittora is the control and evidence layer for mortgage AI—designed to govern approved actions, stop actions outside the rules, and retain defensible proof.",
    imgSrc: ImgCrittora,
    imgAlt: "Crittora mortgage AI governance logo",
    imgWidth: 128,
    imgHeight: 84,
    url: `https://www.crittora.com/`,
  },
  {
    id: cuid(),
    title: `AI Visibility & Cross-Engine Strategy`,
    description: [
      "Through WUN AEO Director and XEO Labs: make businesses legible, credible, and findable across search, AI answers, content, and conversion surfaces.",
    ],
    signal:
      "Cross-engine strategy joins business performance, SEO, and answer-engine optimization into one visibility system.",
    imgSrc: ImgWUN,
    imgAlt: "WUN AI visibility systems logo",
    imgWidth: 128,
    imgHeight: 84,
    url: `https://xeolabs.ai/`,
  },
  {
    id: cuid(),
    title: `Agent Permission Protocol`,
    description: [
      "The Agent Permission Protocol, essays, briefings, and speaking on governed action and trustworthy public understanding.",
    ],
    signal:
      "A doctrine for high-trust AI: authority must be explicit in execution, and evidence must be trustworthy in operations and public information.",
    imgSrc: ImgAPP,
    imgAlt: "execution-time authorization gate",
    imgWidth: 128,
    imgHeight: 84,
    url: `/authority-layer/`,
    anchor: "#app-visualization",
  },
]

export { projectsData }
