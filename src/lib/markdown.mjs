import matter from "gray-matter"
import remark from "remark"
import gfm from "remark-gfm"
import footnotes from "remark-footnotes"
import toHast from "mdast-util-to-hast"
import toHtml from "hast-util-to-html"
import visit from "unist-util-visit"
import prune from "underscore.string/prune.js"
import code from "mdast-util-to-hast/lib/handlers/code.js"

// Keep the established Markdown dialect and word-boundary excerpts during migration.
const parser = remark().use(gfm).use(footnotes, { inlineNotes: true })
export function parsePost(source) {
  const { data: frontmatter, content } = matter(source)
  if (!/^\/[a-z0-9-]+$/.test(frontmatter.slug ?? "")) throw new Error("Invalid blog slug")
  for (const key of ["title", "author", "date"]) {
    if (typeof frontmatter[key] !== "string" || !frontmatter[key]) throw new Error(`Missing ${key}`)
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.date) || Number.isNaN(Date.parse(frontmatter.date))) throw new Error("Invalid publication date")
  const ast = parser.parse(content)
  const text = []
  visit(ast, node => {
    if (node.type === "text" || node.type === "inlineCode") text.push(node.value)
    else if (node.type === "image") text.push(node.alt)
    else if (["paragraph", "heading", "tableCell", "break"].includes(node.type)) text.push(" ")
  })
  const plain = text.join("").trim()
  const html = toHtml(toHast(ast, {
    allowDangerousHtml: true,
    handlers: { code(h, node) {
      const result = code(h, node)
      if (node.meta && result.children[0]) result.children[0].properties.dataMeta = node.meta
      return result
    } },
  }), { allowDangerousHtml: true })
  return { frontmatter, html, excerpt: prune(plain, 160, "…"), summary: prune(plain, 200, "…"), archive: prune(plain, 180, "…") }
}
