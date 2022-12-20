import React from "react"
import cuid from "cuid"
import { IconButton } from "@mui/material"

import GitHubIcon from "@mui/icons-material/GitHub"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

const SocialIconMap = {
  github: GitHubIcon,
  twitter: TwitterIcon,
  linkedin: LinkedInIcon,
}

const socialData = [
  {
    id: cuid(),
    url: "https://www.github.com/gerardoiornelas",
    icon: "github",
    title: "Github",
  },
  {
    id: cuid(),
    url: "https://www.twitter.com/gerardoiornelas",
    icon: "twitter",
    title: "Twitter",
  },
  {
    id: cuid(),
    url: "https://www.linkedin.com/in/gerardo-i-ornelas/",
    icon: "linkedin",
    title: "LinkedIn",
  },
]

const Social = ({ ...props }) => {
  return (
    <>
      {socialData.map(({ id, url, icon }) => (
        <IconButton
          href={url}
          target="_blank"
          rel="noreferrer"
          key={id}
          color="secondary"
          size="large"
        >
          {React.createElement(SocialIconMap[icon], null, null)}
        </IconButton>
      ))}
    </>
  )
}

export default Social
