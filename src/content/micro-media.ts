export type MicroMediaPlatform = "YouTube" | "X"

export interface MicroMediaItem {
  title: string
  description: string
  platform: MicroMediaPlatform
  url: string
  date: string
  videoId: string
  thumbnailUrl?: string
}

export const microMediaItems: MicroMediaItem[] = [
  {
    title: "One breached app is a breach of everything that app could read.",
    description: "Why ambient authority expands the blast radius of connected tools and automated agents.",
    platform: "YouTube",
    url: "https://www.youtube.com/shorts/YC8-xHJaGN8",
    date: "Jun 11, 2026",
    videoId: "YC8-xHJaGN8",
    thumbnailUrl: "https://i.ytimg.com/vi/YC8-xHJaGN8/hqdefault.jpg",
  },
  {
    title: "When Your Connected Tool Gets Hacked, What Gets Exposed?",
    description: "How connected integrations become unintended privilege escalations in AI workflows.",
    platform: "YouTube",
    url: "https://www.youtube.com/shorts/zMDbil4yr00",
    date: "Jun 10, 2026",
    videoId: "zMDbil4yr00",
    thumbnailUrl: "https://i.ytimg.com/vi/zMDbil4yr00/hqdefault.jpg",
  },
  {
    title: "Read Access Can Mean Your Entire Communication History",
    description: "Understanding the hidden reach of standing data permissions and why execution-time checks matter.",
    platform: "YouTube",
    url: "https://www.youtube.com/shorts/i29qA340zSs",
    date: "Jun 9, 2026",
    videoId: "i29qA340zSs",
    thumbnailUrl: "https://i.ytimg.com/vi/i29qA340zSs/hqdefault.jpg",
  },
]
