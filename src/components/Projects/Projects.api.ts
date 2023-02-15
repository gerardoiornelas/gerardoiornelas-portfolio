import cuid from "cuid"

import ImgGenerativeNfts from "../../images/projects/generative-nft.jpg"
import ImgCrowdfunding from "../../images/projects/crowdfunding.jpg"
import ImgDao from "../../images/projects/dao.jpg"

const GITHUB_GERARDOIORNELAS = `https://github.com/gerardoiornelas`

const projectsData = [
  {
    id: cuid(),
    title: `AI NFT Minter`,
    description: [
      "An AI-powered NFT project bringing creativity to the blockchain with unique, generated digital art assets.",
    ],
    imgSrc: ImgGenerativeNfts,
    imgAlt: "dj boombox remix crew",
    url: `https://ai-nft-minter.netlify.app/`,
    github: `${GITHUB_GERARDOIORNELAS}/ai-nft-minter`,
  },
  {
    id: cuid(),
    title: `Crowdfunding App`,
    description: [
      "Revolutionary blockchain crowdfunding app connecting entrepreneurs with backers for secure, decentralized funding.",
    ],
    imgSrc: ImgCrowdfunding,
    imgAlt: "dj boombox remix crew",
    url: `https://extraordinary-bombolone-9dadc0.netlify.app/`,
    github: `${GITHUB_GERARDOIORNELAS}/crowdsale`,
  },
  {
    id: cuid(),
    title: `DAO`,
    description: [
      "Empowering community decision making with decentralized, transparent governance through a blockchain-based DAO.",
    ],
    imgSrc: ImgDao,
    imgAlt: "dj boombox remix crew",
    url: `https://reliable-froyo-10b5cd.netlify.app/`,
    github: `${GITHUB_GERARDOIORNELAS}/dao`,
  },
]

export { projectsData }
