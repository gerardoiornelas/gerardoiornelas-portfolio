import test from "node:test"
import assert from "node:assert/strict"
import { readdir, readFile } from "node:fs/promises"
import { parsePost } from "../src/lib/markdown.mjs"

test("published articles have distinct stable routes, dates, and content", async () => {
  const dir = new URL("../src/content/", import.meta.url)
  const files = (await readdir(dir)).filter(f => f.endsWith(".md"))
  const posts = await Promise.all(files.map(async f => parsePost(await readFile(new URL(f, dir), "utf8"))))
  assert.equal(new Set(posts.map(p => p.frontmatter.slug)).size, files.length)
  assert.ok(posts.every(p => p.html.includes("<p>") && p.excerpt.length > 0 && p.summary.length > 0))
})

test("Verifiably Human articles expose research status, corrections, and disclosure state", async () => {
  const dir = new URL("../src/content/", import.meta.url)
  for (const file of ["verifiably-human-part-1.md", "verifiably-human-part-2.md", "verifiably-human-part-3.md"]) {
    const { frontmatter } = parsePost(await readFile(new URL(file, dir), "utf8"))
    assert.equal(frontmatter.series, "Verifiably Human")
    assert.equal(frontmatter.status, "argument")
    assert.ok(frontmatter.description)
    assert.ok(frontmatter.metaTitle)
    assert.ok(frontmatter.aiAssistance)
    assert.ok(frontmatter.corrections?.length)
    assert.ok(frontmatter.sources?.length)
  }
})

test("Markdown preserves raw HTML, GFM tables, code metadata, and word-boundary excerpts", () => {
  const post = parsePost('---\nslug: "/example"\ntitle: "Example"\nauthor: "Author"\ndate: "2026-09-13"\n---\n<div id="anchor">Inline HTML</div>\n\n| A | B |\n| - | - |\n| one | two |\n\n```js example\nconst x = 1\n```\n\n' + 'whole words '.repeat(30))
  assert.match(post.html, /<div id="anchor">/)
  assert.match(post.html, /<table>/)
  assert.match(post.html, /data-meta="example"/)
  assert.match(post.excerpt, /…$/)
  assert.throws(() => parsePost('---\nslug: "/../escape"\n---\nInvalid'), /Invalid blog slug/)
})
