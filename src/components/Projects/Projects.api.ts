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
    title: `Crittora`,
    description: [
      "Cryptographic policy layer for zero-trust enterprises.",
      "Signed Proof-of-Action receipts make every autonomous decision auditable.",
    ],
    signal: "Zero-trust migration lead at Verizon; enterprise rollouts in progress.",
    imgSrc: ImgCrittora,
    imgAlt: "abstract cryptographic control layer",
    url: `https://www.crittora.com/`,
  },
  {
    id: cuid(),
    title: `Agent Permission Protocol (APP)`,
    description: [
      "Open protocol for cryptographic agent permissions at execution time.",
      "Prevents forged calls, replays, and over-broad execution with portable receipts.",
    ],
    signal: "Agent actions verified before invocation; fraud-review latency cut by 42% (placeholder).",
    imgSrc: ImgAPP,
    imgAlt: "execution-time authorization gate",
    url: `https://www.crittora.com/app/whitepaper`,
    anchor: "#app-visualization",
  },
  {
    id: cuid(),
    title: `Qripton Verify`,
    description: [
      "Human provenance and secure document authenticity pipeline for high-trust workflows.",
      "Identity-bound decryption ensures only intended recipients can access sensitive files with full auditability.",
    ],
    signal: "Adopted for regulated document flows; attestations issued per transaction (placeholder metric).",
    imgSrc: ImgQVerify,
    imgAlt: "secure document verification",
    url: `https://qriptonverify.com/`,
  },
]

export { projectsData }
