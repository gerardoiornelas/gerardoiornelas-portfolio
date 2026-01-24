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
    description: ``,
  },
  {
    id: cuid(),
    logo: LogoOrnelasTech,
    imgAlt: `ornelas technologies, llc logo`,
    title: `Principal`,
    employer: `Violetek LLC - Consulting`,
    dates: ` July 2017 - Present`,
    location: `San Antonio, TX`,
    description: ``,
  },
]

export { roles }
