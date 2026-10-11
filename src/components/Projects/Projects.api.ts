import cuid from "cuid"

import ImgCrittora from "../../images/projects/crittora.png?url"
import ImgWUN from "../../images/projects/wun.png?url"
import ImgXEOLabs from "../../images/projects/xeo-labs-wordmark.svg?url"

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
    title: `XEO Director`,
    description: [
      "Through XEO Director, by XEO Labs: make businesses legible, credible, and findable across search, AI answers, content, and conversion surfaces.",
    ],
    signal:
      "Cross-engine strategy joins business performance, SEO, and answer-engine optimization into one visibility system.",
    imgSrc: ImgXEOLabs,
    imgAlt: "XEO Labs wordmark logo",
    imgWidth: 200,
    imgHeight: 84,
    url: `https://xeolabs.ai/`,
  },
  {
    id: cuid(),
    title: `WUN.ai Ecosystem Engineering`,
    description: [
      "Through WUN.ai: govern how AI work ships - Shortcake governed releases, MCP tooling, and execution-time authorization behind the WUN ecosystem.",
    ],
    signal:
      "The WUN ecosystem pairs governed release workflows with MCP-native agent infrastructure so AI-assisted work ships with evidence, not guesswork.",
    imgSrc: ImgWUN,
    imgAlt: "WUN AI visibility systems logo",
    imgWidth: 128,
    imgHeight: 84,
    url: `https://wun.ai/`,
  },
]

export { projectsData }
