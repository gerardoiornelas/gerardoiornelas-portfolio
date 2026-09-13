import React from "react"
import { renderToString } from "react-dom/server"
import createCache from "@emotion/cache"
import createEmotionServer from "@emotion/server/create-instance"
import { PageStyleCacheContext } from "./site"

/** Extract critical CSS into the head, matching the original Emotion rendering.
 * Inline body style tags can cause hydration mismatches after a client route swap
 * when the previous page has already registered the same CSS in the cache.
 */
export function getPageStyles<P extends object>(Page: React.ComponentType<P>, props: P) {
  const cache = createCache({ key: "css", prepend: true })
  const { extractCriticalToChunks } = createEmotionServer(cache)
  const html = renderToString(
    <PageStyleCacheContext.Provider value={cache}>
      <Page {...props} />
    </PageStyleCacheContext.Provider>
  )
  return extractCriticalToChunks(html).styles
}
