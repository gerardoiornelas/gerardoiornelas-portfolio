/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import(`gatsby`).GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Lostwun Portfolio Site`,
    description: `Hardhat portfolio project on Gatsby.js`,
    author: `@lostwun`,
    siteUrl: `https://www.lostwun.com/`,
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
