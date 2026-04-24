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

interface YouTubeVideo {
  title: string
  description: string
  url: string
  date: string
  videoId: string
  platform: "YouTube"
}

const CHANNEL_ID = "UCLKKfZvlPkyJGVRO3IIUPRg"
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
const RSS_TO_JSON_API = "https://api.rss2json.com/v1/api.json"

const MicroMediaCard: React.FC<{ item: YouTubeVideo }> = ({ item }) => {
  return (
    <Card
      sx={{
        minWidth: 240,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "transparent",
        border: 0,
        boxShadow: 0,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={1} mb={1}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Chip label="YouTube Short" color="error" size="small" />
            <Typography variant="body2" color="text.secondary">
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
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${item.videoId}`}
              title={item.title}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>

          <Typography variant="h6" component="h3">
            {item.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          size="small"
          endIcon={<OpenInNewIcon />}
          href={item.url}
          target="_blank"
          rel="noreferrer"
        >
          View
        </Button>
      </CardActions>
    </Card>
  )
}

export const MicroMedia: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `${RSS_TO_JSON_API}?rss_url=${encodeURIComponent(RSS_FEED_URL)}`
        )
        const data = await response.json()

        if (data.status === "ok" && data.items) {
          const fetchedVideos: YouTubeVideo[] = data.items
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
                    .slice(0, 100),
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
          setVideos(fetchedVideos)
        } else {
          setError("Failed to fetch videos")
        }
      } catch (err) {
        setError("Failed to fetch videos")
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return (
    <Box py={6}>
      <Container maxWidth="lg">
        <Box mb={3} textAlign="center">
          <Title variant="segment">Micro-Media</Title>
          <Typography color="text.secondary">
            Frequent short-form insights—YouTube Shorts—highlight how authority
            still matters inside every automation patrol.
          </Typography>
        </Box>
        {loading ? (
          <Typography color="text.secondary" textAlign="center">
            Loading latest videos...
          </Typography>
        ) : error ? (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {videos.map(video => (
              <Grid item key={video.url} xs={12} sm={6} md={4}>
                <MicroMediaCard item={video} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}
