import cuid from "cuid"

import LogoAmfam from "../../images/cv/logo-amfam.png"
import LogoOrnelasTech from "../../images/cv/logo-ornelastechnologies.png"

const roles = [
  {
    id: cuid(),
    logo: LogoAmfam,
    imgAlt: `american family insurance logo`,
    title: `UI Architect`,
    employer: `American Family Insurance - Full Time`,
    dates: `May 2020 - Present`,
    location: `Madison, Wisconsin`,
    description: ``,
  },
  {
    id: cuid(),
    logo: LogoOrnelasTech,
    imgAlt: `ornelas technologies, llc logo`,
    title: `Principal`,
    employer: `Ornelas Technologies, LLC - Consulting`,
    dates: ` July 2017 - Present`,
    location: ` Austin, TX`,
    description: ``,
  },
]

export { roles }
