import React, { createContext, useContext } from "react"
import { CacheProvider } from "@emotion/react"
import createCache, { type EmotionCache } from "@emotion/cache"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { theme } from "../theme"
import type { BlogSummary } from "./types"

export type PageProps<T = unknown> = { data: T }
export type HeadFC<T = unknown> = React.FC<PageProps<T>>

export const PageStyleCacheContext = createContext<EmotionCache | null>(null)

const PostsContext = createContext<BlogSummary[]>([])
export const usePosts = () => useContext(PostsContext)

/** A page is one hydrated React tree so MUI context and responsive state stay shared. */
export function withPage<P extends object>(Page: React.ComponentType<P>) {
  return function ThemedPage({ posts = [], ...props }: P & { posts?: BlogSummary[] }) {
    const suppliedCache = useContext(PageStyleCacheContext)
    const [cache] = React.useState(() => {
      const value = suppliedCache ?? createCache({ key: "css", prepend: true })
      value.compat = true
      return value
    })
    return (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PostsContext.Provider value={posts}>
            <Page {...props as P} />
          </PostsContext.Provider>
        </ThemeProvider>
      </CacheProvider>
    )
  }
}

/** Native anchors work before hydration; Astro's router also handles modified clicks. */
export const Link = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }>(
  ({ to, ...props }, ref) => <a {...props} href={to} ref={ref} />
)
Link.displayName = "Link"

export async function navigate(to: string) {
  const { navigate: visit } = await import("astro:transitions/client")
  return visit(to)
}
