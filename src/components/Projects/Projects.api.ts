import cuid from "cuid"

import ImgCrittora from "../../images/projects/crittora.png"
import ImgQVerify from "../../images/projects/qverify.png"
import ImgAPP from "../../images/projects/app.png"

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
      "Trust infrastructure for autonomous software, where execution-time authority is explicit, bounded, and enforceable.",
      "Signed Proof-of-Action receipts make autonomous decisions measurable, verifiable, and auditable.",
    ],
    imgSrc: ImgCrittora,
    imgAlt: "abstract cryptographic control layer",
    url: `https://www.crittora.com/`,
  },
  {
    id: cuid(),
    title: `Agent Permission Protocol (APP)`,
    description: [
      "Open protocol for cryptographic agent permissions at execution time, verified before any tool invocation.",
      "Prevents forged calls, replayed actions, and over-broad execution while producing portable verification receipts.",
    ],
    imgSrc: ImgAPP,
    imgAlt: "execution-time authorization gate",
    url: `https://www.crittora.com/app/whitepaper`,
  },
  {
    id: cuid(),
    title: `Qripton Verify`,
    description: [
      "Human provenance and secure document authenticity pipeline for high-trust workflows.",
      "Identity-bound decryption ensures only intended recipients can access sensitive files with full auditability.",
    ],
    imgSrc: ImgQVerify,
    imgAlt: "secure document verification",
    url: `https://qriptonverify.com/`,
  },
]

export { projectsData }
