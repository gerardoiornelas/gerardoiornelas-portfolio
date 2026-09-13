import { getImage } from "astro:assets"
import type { ImageMetadata } from "astro"
import { parsePost } from "./markdown.mjs"
import type { BlogPost } from "./types"

const sources = import.meta.glob<string>("../content/*.md", { query: "?raw", import: "default", eager: true })
const images = import.meta.glob<ImageMetadata>("../images/blog/*.{jpg,jpeg,png,webp}", { import: "default", eager: true })
const originals = import.meta.glob<string>("../images/blog/*.{jpg,jpeg,png,webp}", { query: "?url", import: "default", eager: true })

async function loadPosts() {
  const posts = await Promise.all(Object.values(sources).map(async source => {
    const { frontmatter, html, excerpt, summary, archive } = parsePost(source)
    let featuredImage
    if (frontmatter.featuredImage) {
      const image = images[frontmatter.featuredImage]
      if (!image) throw new Error(`Missing featured image for ${frontmatter.slug}`)
      const width = Math.min(512, image.width)
      const widths = [...new Set([128, 256, width, Math.min(1024, image.width)].filter(w => w <= image.width))].sort((a,b) => a-b)
      const variants = await Promise.all(widths.map(w => getImage({ src: image, width: w, format: "webp", quality: 50 })))
      featuredImage = {
        publicURL: originals[frontmatter.featuredImage],
        src: variants[widths.indexOf(width)].src,
        srcSet: variants.map((v,i) => `${v.src} ${widths[i]}w`).join(", "),
        width,
        height: Math.round(image.height * width / image.width),
      }
    }
    const date = new Date(frontmatter.date + "T00:00:00Z").toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric", timeZone: "UTC" })
    return { html, excerpt, summary, archive, frontmatter: { ...frontmatter, datePublished: frontmatter.date, date, featuredImage } } as BlogPost & { summary: string; archive: string }
  }))
  const slugs = posts.map(p => p.frontmatter.slug)
  if (new Set(slugs).size !== slugs.length) throw new Error("Duplicate blog slug")
  return posts.sort((a,b) => b.frontmatter.datePublished.localeCompare(a.frontmatter.datePublished))
}

let posts: ReturnType<typeof loadPosts>
export const getPosts = () => posts ??= loadPosts()
export async function getSummaries(archivePage = false) {
  return (await getPosts()).map(({ html, summary, archive, ...post }) => ({ ...post, excerpt: archivePage ? archive : summary }))
}
