import React from "react"
import cuid from "cuid"
import { IconButton } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

interface SocialData {
  id: string
  url: string
  icon: keyof typeof SocialIconMap
  title: string
}

const SocialIconMap = {
  github: GitHubIcon,
  twitter: TwitterIcon,
  linkedin: LinkedInIcon,
}

const socialData: SocialData[] = [
  {
    id: cuid(),
    url: "https://www.github.com/gerardoiornelas",
    icon: "github",
    title: "Github",
  },
  {
    id: cuid(),
    url: "https://x.com/gerardoiornelas",
    icon: "twitter",
    title: "X",
  },
  {
    id: cuid(),
    url: "https://www.linkedin.com/in/gerardo-i-ornelas/",
    icon: "linkedin",
    title: "LinkedIn",
  },
]

export const Social: React.FC = ({ ...props }) => {
  return (
    <>
      {socialData.map(({ id, url, icon }) => (
        <IconButton
          href={url}
          target="_blank"
          rel="noreferrer"
          key={id}
          color="primary"
          size="large"
        >
          {React.createElement(SocialIconMap[icon])}
        </IconButton>
      ))}
    </>
  )
}
