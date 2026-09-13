import assert from "node:assert/strict"
import { readdir, readFile, mkdtemp } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { chromium } from "playwright"

const baseURL = process.env.SITE_URL || "http://127.0.0.1:9000"
const routes = ["/", "/uig/", "/compound-engineering/", "/authority-layer/", "/manifesto/", "/blog/", "/author/gerardo-i-ornelas/", "/stats/", "/privacy-policy/", "/thanks/", "/404.html"]
for (const f of (await readdir("src/content")).filter(f => f.endsWith(".md"))) {
  const source = await readFile(path.join("src/content", f), "utf8")
  routes.push(`/blog${source.match(/^slug: "([^"]+)"/m)[1]}/`)
}
const browser = await chromium.launch({ headless: true })
const result = { routes: routes.length, viewports: [1440, 390], checks: [] }
try {
  for (const width of result.viewports) {
    const context = await browser.newContext({ viewport: { width, height: 900 } })
    await context.route(/googletagmanager|google-analytics/, route => route.abort())
    const errors = []
    const page = await context.newPage()
    page.on("pageerror", e => errors.push(e.message))
    for (const route of routes) {
      const response = await page.goto(baseURL + route, { waitUntil: "networkidle" })
      assert.ok(response.status() === 200 || (route === "/404.html" && response.status() === 404), route)
      await page.waitForFunction(() => [...document.querySelectorAll("astro-island")].every(el => !el.hasAttribute("ssr")))
      assert.equal(await page.locator("head title").count(), 1, `${route}: title`)
      assert.equal(await page.locator('head link[rel="canonical"]').count(), 1, `${route}: canonical`)
      assert.ok(await page.locator('head meta[name="description"]').getAttribute("content"), `${route}: description`)
      for (const json of await page.locator('script[type="application/ld+json"]').allTextContents()) JSON.parse(json)
      assert.ok(await page.locator("h1,h2,h3,h4,h5,h6").count(), `${route}: server-rendered content`)
      for (const image of await page.locator("img:not([aria-hidden])").all()) {
        await image.scrollIntoViewIfNeeded()
        await image.evaluate(img => img.decode())
      }
      assert.deepEqual(errors, [], `${width}px ${route}: browser errors`)
    }
    result.checks.push(`${width}px: all routes hydrate, metadata parses, and all images decode`)

    await page.goto(baseURL, { waitUntil: "networkidle" })
    if (width === 390) {
      await page.getByRole("button", { name: "open drawer" }).click()
      await page.getByRole("presentation").getByText("Research", { exact: true }).click()
    } else {
      await page.getByRole("link", { name: "Research", exact: true }).first().click()
    }
    await page.waitForURL(url => /^\/authority-layer\/?$/.test(url.pathname))
    await page.goBack()
    await page.waitForURL(baseURL + "/")
    await page.waitForFunction(() => [...document.querySelectorAll("astro-island")].every(el => !el.hasAttribute("ssr")))
    if (width === 390) await page.getByRole("button", { name: "open drawer" }).click()
    await page.getByRole("link", { name: "Connect", exact: true }).last().click()
    await page.waitForFunction(() => window.scrollY > 1000)
    result.checks.push(`${width}px: navigation, history, and contact anchor work`)

    await page.goto(baseURL + "/blog/", { waitUntil: "networkidle" })
    await page.getByRole("link", { name: "The Provenance Spectrum: Why a Label Cannot Protect Human Creativity by Itself", exact: true }).click()
    await page.waitForURL(url => /^\/blog\/trust-stack-provenance-spectrum-pol-c2pa\/?$/.test(url.pathname))
    await page.getByRole("button", { name: "Back", exact: true }).click()
    await page.waitForURL("**/#blog")
    await page.waitForFunction(() => window.scrollY > 1000)
    result.checks.push(`${width}px: article navigation and Back restore the blog anchor`)

    const downloads = await mkdtemp(path.join(tmpdir(), "portfolio-downloads-"))
    for (const [route, name] of [["/uig/", "uig-skill.md"], ["/compound-engineering/", "compound-engineering-skill.md"]]) {
      await page.goto(baseURL + route, { waitUntil: "networkidle" })
      const pending = page.waitForEvent("download")
      await page.getByRole("button", { name: `Download ${name}`, exact: true }).click()
      const download = await pending
      assert.equal(download.suggestedFilename(), name)
      const file = path.join(downloads, name)
      await download.saveAs(file)
      assert.ok((await readFile(file, "utf8")).includes("UI-GATE"))
    }
    result.checks.push(`${width}px: both Markdown skill downloads work`)

    await page.goto(baseURL + "/#contact", { waitUntil: "networkidle" })
    const form = page.locator('form[name="contact"]')
    assert.equal(await form.getAttribute("method"), "POST")
    assert.equal(await form.getAttribute("data-netlify"), "true")
    assert.equal(await form.evaluate(el => el.checkValidity()), false)
    for (const [name, value] of Object.entries({ name: "Local test", email: "test@example.com", organization: "Local test", reason: "Migration verification", message: "Intercepted locally; never submitted." })) {
      await form.locator(`[name="${name}"]`).fill(value)
    }
    const values = await form.evaluate(el => Object.fromEntries(new FormData(el)))
    assert.equal(values["form-name"], "contact")
    assert.equal(values["bot-field"], "")
    // Intercept the POST so verification never sends a real message.
    let submitted
    await page.route("**/thanks", async route => {
      submitted = route.request().postData()
      await route.fulfill({ status: 200, contentType: "text/html", body: "<title>Intercepted local form</title>" })
    })
    await form.getByRole("button", { name: "Send Message" }).click()
    await page.waitForURL("**/thanks")
    assert.equal(new URLSearchParams(submitted).get("email"), "test@example.com")
    result.checks.push(`${width}px: validation and POST payload preserved; submission intercepted`)
    await page.unroute("**/thanks")
    for (const [route, button] of [["/thanks/", "Back to Home"], ["/404.html", "Take me Home"]]) {
      await page.goto(baseURL + route, { waitUntil: "networkidle" })
      await page.getByRole("button", { name: button }).click()
      await page.waitForURL(baseURL + "/")
    }
    assert.deepEqual(errors, [], "Navigation introduced a browser error")
    await context.close()
  }
  console.log(JSON.stringify(result, null, 2))
} finally {
  await browser.close()
}
