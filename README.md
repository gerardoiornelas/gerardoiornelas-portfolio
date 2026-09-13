# Gerardo I. Ornelas — portfolio

An Astro static site with React 18, MUI 5, Emotion, and the existing portfolio design. Astro renders each page to HTML and hydrates its React tree for navigation, responsive controls, animations, and downloads.

## Local development

Use Node 22.12 or newer (the repository's `.nvmrc` selects Node 22):

```sh
nvm use
npm ci
npm run develop
```

Development runs at `http://localhost:8000`. Build and preview the production site with:

```sh
npm run build
npm run serve
```

Preview runs at `http://localhost:9000`. `npm run clean` removes generated output and Astro/Vite caches. Set `ASTRO_TELEMETRY_DISABLED=1` for builds in restricted environments.

## Source and publishing

- `src/pages/`: Astro routes, including generated `/blog/<slug>/` pages.
- `src/views/`: existing React page bodies and SEO metadata exports.
- `src/components/` and `src/theme/`: shared React components, MUI styles, and fonts.
- `src/content/*.md`: articles; preserve their frontmatter slugs to preserve URLs.
- `src/lib/content.ts` and `src/lib/markdown.mjs`: build-time article loading, responsive images, and the established Markdown dialect/excerpt lengths.
- `src/layouts/Document.astro`: document head, fonts, analytics, and Astro navigation.
- `static/`: unchanged public assets, manifest icons, and robots.txt.

`npm run build` produces **`public/`**, preserving the former publish-directory setting. Use Node 22.12+ and `npm run build` in hosting configuration. The contact form retains its Netlify form name, POST fields, honeypot, and `/thanks` action. A host must support that existing form service and serve `404.html` for missing routes. Deployment requires explicit approval.

## Verification

```sh
npm test
npm run typecheck
npm run okf:test
npm run build
# In a separate terminal, start npm run serve before browser tests:
npm run test:browser
```

Browser tests require Playwright Chromium (`npx playwright install chromium` if it is not already installed). Set `SITE_URL` to test another local preview port. They cover all pages at desktop and mobile widths, image decoding, hydration, metadata, navigation/history, anchors, downloads, and an intercepted contact-form submission. They do not send a message. The older component test files are retained; the executable migration checks are the scripts above.

The original Gatsby baseline and visual-comparison findings are documented in [the migration receipt](knowledge/receipts/2026-09-13-astro-react-migration.md). Repository knowledge and authority requirements start in [AGENTS.md](AGENTS.md) and [knowledge/context.md](knowledge/context.md).
