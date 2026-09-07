import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"

import { Title } from "../Title"
import { microMediaItems, type MicroMediaItem } from "../../content/micro-media"

const CHANNEL_ID = "UCLKKfZvlPkyJGVRO3IIUPRg"
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
const RSS_TO_JSON_API = "https://api.rss2json.com/v1/api.json"

const MicroMediaCard: React.FC<{ item: MicroMediaItem }> = ({ item }) => {
  return (
    <Card
      sx={{
        minWidth: 240,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "rgba(8, 18, 27, 0.6)",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        p: 1.5,
        boxShadow: 0,
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Stack spacing={1.5}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Chip
              label="YouTube Short"
              color="error"
              size="small"
              sx={{
                fontFamily: "monospace",
                fontSize: 10,
                fontWeight: 700,
                height: 22,
              }}
            />
            <Typography variant="caption" sx={{ color: "text.disabled", fontFamily: "monospace" }}>
              {item.date}
            </Typography>
          </Box>

          <Box
            sx={{
              position: "relative",
              paddingBottom: "177.77%",
              height: 0,
              borderRadius: 1,
              overflow: "hidden",
              backgroundColor: "#050b11",
              border: "1px solid",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${item.videoId}?rel=0&modestbranding=1`}
              title={item.title}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </Box>

          <Typography
            variant="subtitle1"
            component="h3"
            sx={{
              fontWeight: 600,
              lineHeight: 1.35,
              fontSize: 15,
              color: "text.primary",
            }}
          >
            {item.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            {item.description}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", px: 1.5, pt: 0 }}>
        <Button
          size="small"
          endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          color="secondary"
          sx={{
            fontFamily: "monospace",
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          Watch on YouTube
        </Button>
      </CardActions>
    </Card>
  )
}

export const MicroMedia: React.FC = () => {
  const [videos, setVideos] = useState<MicroMediaItem[]>(microMediaItems)

  useEffect(() => {
    let isMounted = true
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `${RSS_TO_JSON_API}?rss_url=${encodeURIComponent(RSS_FEED_URL)}`
        )
        if (!response.ok) return
        const data = await response.json()

        if (data.status === "ok" && Array.isArray(data.items) && data.items.length > 0) {
          const shortsOnly = data.items.filter((item: { link: string }) =>
            item.link.includes("/shorts/")
          )
          const sourceItems = shortsOnly.length >= 3 ? shortsOnly : data.items

          const fetchedVideos: MicroMediaItem[] = sourceItems
            .slice(0, 3)
            .map(
              (item: {
                title: string
                description: string
                link: string
                pubDate: string
              }) => {
                const videoIdMatch = item.link.match(
                  /(?:shorts\/|watch\?v=)([a-zA-Z0-9_-]+)/
                )
                return {
                  title: item.title,
                  description: item.description
                    .replace(/<[^>]*>/g, "")
                    .slice(0, 120),
                  url: item.link,
                  date: new Date(item.pubDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }),
                  videoId: videoIdMatch ? videoIdMatch[1] : "",
                  platform: "YouTube" as const,
                }
              }
            )
            .filter((v: MicroMediaItem) => Boolean(v.videoId))

          if (isMounted && fetchedVideos.length > 0) {
            setVideos(fetchedVideos)
          }
        }
      } catch {
        // Fallback already pre-set to microMediaItems, silent graceful resilience
      }
    }

    fetchVideos()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Box py={6}>
      <Container maxWidth="lg">
        <Box mb={4} textAlign="center">
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "secondary.main",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Field Notes & Observations
          </Typography>
          <Title variant="segment">Micro-Media</Title>
          <Typography color="text.secondary" sx={{ maxWidth: 640, mx: "auto", mt: 1.5 }}>
            Short-form video analyses exploring execution authority failures, ambient trust vulnerabilities, and AI security incidents.
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          {videos.map(video => (
            <Grid item key={video.videoId || video.url} xs={12} sm={6} md={4} sx={{ display: "flex" }}>
              <MicroMediaCard item={video} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
