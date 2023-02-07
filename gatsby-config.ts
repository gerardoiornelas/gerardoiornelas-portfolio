require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gerardo I. Ornelas Portfolio Site`,
    description: `Hardhat portfolio project on Gatsby.js`,
    author: `@gerardoiornelas`,
    siteUrl: `https://www.gerardoiornelas.com/`,
  },
  plugins: [
    `gatsby-plugin-top-layout`,
    `gatsby-plugin-react-helmet`,
    // If you want to use styled components you should add the plugin here.
    // `gatsby-plugin-styled-components`,
    `gatsby-plugin-mui-emotion`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `lostwun-portfolio`,
        short_name: `lostwun`,
        start_url: `/`,
        background_color: `#03002d`,
        display: `minimal-ui`,
        icon: `src/images/lostwun-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
