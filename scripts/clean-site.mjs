import { rm } from "node:fs/promises"
for (const path of ["public", ".astro", "node_modules/.vite"]) {
  await rm(new URL(`../${path}`, import.meta.url), { recursive: true, force: true })
}
