import cuid from "cuid"

import ImgCrittora from "../../images/projects/crittora.png"
import ImgQVerify from "../../images/projects/qverify.png"
import ImgAPP from "../../images/projects/app.png"

interface ProjectData {
  id: string
  title: string
  description: string[]
  signal: string
  imgSrc: string
  imgAlt: string
  url: string
  anchor?: string
  github?: string
}

const projectsData: ProjectData[] = [
  {
    id: cuid(),
    title: `Violetek`,
    description: [
      "The venture platform I founded to build products and systems around authority, verification, and execution-runtime authorization.",
    ],
    signal:
      "Institutional layer for ventures, protocols, and product development in machine permissions and runtime control.",
    imgSrc: ImgQVerify,
    imgAlt: "Violetek venture platform profile",
    url: `https://www.violetek.com/`,
  },
  {
    id: cuid(),
    title: `Crittora`,
    description: [
      "A venture focused on making authority explicit and enforceable at the moment intelligent systems act.",
    ],
    signal:
      "Selected venture applying execution-time controls and explicit permissions in production contexts.",
    imgSrc: ImgCrittora,
    imgAlt: "abstract cryptographic control layer",
    url: `https://www.crittora.com/`,
  },
  {
    id: cuid(),
    title: `Agent Permission Protocol`,
    description: [
      "A framework for defining and enforcing machine authority at execution time.",
      "Authored to make intelligent actions explicit, constrained, and verifiable.",
    ],
    signal:
      "Formal framework supporting the broader work on authority boundaries and runtime authorization.",
    imgSrc: ImgAPP,
    imgAlt: "execution-time authorization gate",
    url: `https://www.crittora.com/app/whitepaper`,
    anchor: "#app-visualization",
  },
  {
    id: cuid(),
    title: `Qripton Verify`,
    description: [
      "A venture focused on trusted verification, protected exchange, and auditable proof in digital workflows.",
    ],
    signal:
      "Selected venture extending the verification and trust layer across high-assurance document flows.",
    imgSrc: ImgQVerify,
    imgAlt: "secure document verification",
    url: `https://qriptonverify.com/`,
  },
]

export { projectsData }
