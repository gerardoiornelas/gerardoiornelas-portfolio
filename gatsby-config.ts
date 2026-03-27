/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import(`gatsby`).GatsbyConfig}
 */
export default {
  siteMetadata: {
    title: `Gerardo I. Ornelas | Founder of Violetek`,
    description: `Gerardo I. Ornelas is the founder of Violetek and the author of the Agent Permission Protocol. His work focuses on authority systems, machine permissions, verification, and execution-runtime authorization.`,
    author: `Gerardo I. Ornelas`,
    siteUrl: `https://www.gerardoiornelas.com`,
  },
  plugins: [
    `gatsby-plugin-top-layout`,
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
        background_color: `#0d0c2b`,
        display: `minimal-ui`,
        icon: `src/images/lostwun-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://www.gerardoiornelas.com`,
        sitemap: `https://www.gerardoiornelas.com/sitemap-index.xml`,
        policy: [{ userAgent: `*`, allow: `/` }],
      },
    },
  ],
}
