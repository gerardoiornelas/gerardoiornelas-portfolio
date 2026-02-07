import cuid from "cuid"

import ImgGenerativeNfts from "../../images/projects/generative-nft.jpg"
import ImgCrowdfunding from "../../images/projects/crowdfunding.jpg"
import ImgDao from "../../images/projects/dao.jpg"

interface ProjectData {
  id: string
  title: string
  description: string[]
  imgSrc: string
  imgAlt: string
  url: string
  github?: string
}

const projectsData: ProjectData[] = [
  {
    id: cuid(),
    title: `Crittora`,
    description: [
      "The cryptographic control point between AI agents and real systems, enforcing explicit, time-bound authority at execution.",
      "Signed Proof-of-Action receipts make every action measurable, enforceable, and auditable.",
    ],
    imgSrc: ImgGenerativeNfts,
    imgAlt: "abstract cryptographic control layer",
    url: `https://www.crittora.com/`,
  },
  {
    id: cuid(),
    title: `Agent Permission Protocol (APP)`,
    description: [
      "Execution-time authorization layer for AI agents that verifies a signed, time-bound permission envelope before any tool runs.",
      "Prevents forged calls, replays, and over-broad actions while creating portable, verifiable receipts.",
    ],
    imgSrc: ImgCrowdfunding,
    imgAlt: "execution-time authorization gate",
    url: `https://www.crittora.com/app/whitepaper`,
  },
  {
    id: cuid(),
    title: `Qripton Verify`,
    description: [
      "Enterprise-ready platform for securely sharing sensitive documents with identity-bound access control and zero setup.",
      "Only the intended recipient can decrypt and view the file, with full auditability.",
    ],
    imgSrc: ImgDao,
    imgAlt: "secure document verification",
    url: `https://qriptonverify.com/`,
  },
]

export { projectsData }
