export type MicroMediaPlatform = "YouTube" | "X"

export interface MicroMediaItem {
  title: string
  description: string
  platform: MicroMediaPlatform
  url: string
  date: string
  context?: string
  videoId?: string
}

export const microMediaItems: MicroMediaItem[] = [
  {
    title: "They printed $80 million from thin air.",
    description: "How execution authority failures led to an 8-figure exploit.",
    platform: "YouTube",
    url: "https://www.youtube.com/shorts/fdUo0VjmUU4",
    date: "Apr 8, 2026",
    videoId: "fdUo0VjmUU4",
  },
  {
    title: "One spreadsheet could make Copilot send your data away.",
    description: "Ambient authority in productivity tools - the hidden risk.",
    platform: "YouTube",
    url: "https://www.youtube.com/shorts/NhUn4iLZgQg",
    date: "Apr 7, 2026",
    videoId: "NhUn4iLZgQg",
  },
  {
    title: "It worked for 11 days. Then it quietly wrecked the data.",
    description: "How stale authorization contexts create silent failures.",
    platform: "YouTube",
    url: "https://www.youtube.com/shorts/hI1K66i00fA",
    date: "Apr 6, 2026",
    videoId: "hI1K66i00fA",
  },
]
