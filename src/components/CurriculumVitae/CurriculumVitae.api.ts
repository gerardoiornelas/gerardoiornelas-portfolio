import cuid from "cuid"

import LogoAmfam from "../../images/cv/logo-crittora.png"
import LogoOrnelasTech from "../../images/cv/logo-ornelastechnologies.png"

interface Role {
  id: string
  logo: string
  imgAlt: string
  title: string
  employer: string
  dates: string
  location: string
  description: string
}

const roles: Role[] = [
  {
    id: cuid(),
    logo: LogoAmfam,
    imgAlt: `crittora logo`,
    title: `Co-founder & President`,
    employer: `Crittora - Full Time`,
    dates: `Jan 2025 - Present`,
    location: `New Smyrna Beach, Florida`,
    description: `Lead strategy, design, and development of Crittora's cryptographic experience stack. Build the execution-time authorization layer that verifies agents, scopes permissions, and emits signed Proof-of-Action receipts.`,
  },
  {
    id: cuid(),
    logo: LogoOrnelasTech,
    imgAlt: `ornelas technologies, llc logo`,
    title: `Principal`,
    employer: `Ornelas.tech - Consulting`,
    dates: ` July 2017 - Present`,
    location: `San Antonio, TX`,
    description: ``,
  },
]

export { roles }
