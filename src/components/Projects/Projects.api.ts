import cuid from "cuid"

import ImgCrittora from "../../images/projects/crittora.png"
import ImgQVerify from "../../images/projects/qverify.png"
import ImgAPP from "../../images/projects/app.png"
import ImgVioletek from "../../images/projects/violetek.png"
import ImgDonorOps from "../../images/projects/donorops-logo.svg"
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
    title: `Violetek`,
    description: [
      "The venture platform I founded to build products and systems around authority, verification, and execution-runtime authorization.",
    ],
    signal:
      "Institutional layer for ventures, protocols, and product development in machine permissions and runtime control.",
    imgSrc: ImgVioletek,
    imgAlt: "Violetek venture platform profile",
    imgWidth: 112,
    imgHeight: 84,
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
    imgWidth: 128,
    imgHeight: 84,
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
    imgWidth: 128,
    imgHeight: 84,
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
    imgWidth: 128,
    imgHeight: 84,
    url: `https://qriptonverify.com/`,
  },
  {
    id: cuid(),
    title: `DonorOps`,
    description: [
      "DonorOps organizes donor context, surfaces the right people to touch this week, and prepares relationship work for human connection.",
    ],
    signal:
      "The operating layer for nonprofit major donor relationships — built on the Violetek platform with Crittora-backed security.",
    imgSrc: ImgDonorOps,
    imgAlt: "DonorOps logo",
    imgWidth: 128,
    imgHeight: 84,
    url: `https://donorops.com/`,
  },
  {
    id: cuid(),
    title: `WUN.ai`,
    description: [
      "Built for teams that need to do more with less.",
      "WUN helps SMBs, nonprofits, startups, and lean teams turn manual bottlenecks into secure agent systems that improve follow-through, reduce operational drag, and create more room to grow.",
    ],
    signal:
      "Secure Agent Systems built to diagnose and solve real operational bottlenecks with Crittora-backed protection.",
    imgSrc: ImgWUN,
    imgAlt: "secure agent systems",
    imgWidth: 128,
    imgHeight: 84,
    url: `https://www.wun.ai/`,
  },
]

export { projectsData }
