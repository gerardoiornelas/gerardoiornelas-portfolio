import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"

const bundledReactPackages = [
  /@mui\//,
  /@emotion\//,
  "react-clamp-lines",
  "react-scrollchor",
  "html-react-parser",
]

export default defineConfig({
  site: "https://www.gerardoiornelas.com",
  publicDir: "./static",
  outDir: "./public",
  // Existing links include both slashless and trailing-slash URLs.
  trailingSlash: "ignore",
  integrations: [react(), sitemap({ filter: page => !/\/404\/?$/.test(page) })],
  vite: {
    resolve: {
      alias: [{
        find: /^@mui\/icons-material\/(?!esm\/)(.*)$/,
        replacement: "@mui/icons-material/esm/$1",
      }],
    },
    ssr: {
      external: ["@babel/runtime"],
      noExternal: bundledReactPackages,
      optimizeDeps: {
        include: ["react-clamp-lines", "html-react-parser", "@emotion/server/create-instance"],
        // This package is already ESM; prebundling it creates a second React runtime.
        exclude: ["react-scrollchor"],
      },
    },
    // Astro builds static pages in a separate Vite environment from development.
    environments: {
      prerender: { resolve: { noExternal: [...bundledReactPackages, "cookie"] } },
    },
  },
})
