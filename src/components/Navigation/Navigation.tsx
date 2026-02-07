import React, { useState, useEffect, useCallback } from "react"
import { Scrollchor, easeOutQuad } from "react-scrollchor"

import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Drawer,
  ListItem,
  Typography,
  List,
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import MenuIcon from "@mui/icons-material/Menu"

import { Title } from "../Title"
import { StyledNavElement } from "./Navigation.styled"

import { navElements } from "./Navigation.api"

import type { YAxisProps } from "../Layout/Layout"

export const Navigation: React.FC<YAxisProps> = ({
  yAxisHome,
  yAxisProjects,
  yAxisCv,
  yAxisBlog,
  yAxisContact,
}) => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  const [appBarColorChange, setAppBarColorChange] = useState(false)
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [yPos, setYPos] = useState<number | null>(null)
  const [activeLink, setActiveLink] = useState("home")

  const openDrawer = () => {
    setDrawerIsOpen(true)
  }

  const handleScroll = useCallback(() => {
    const yAxis = window.pageYOffset
    setYPos(yAxis)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [handleScroll])

  useEffect(() => {
    yPos && yPos > 10 ? setAppBarColorChange(true) : setAppBarColorChange(false)
  }, [yPos])

  useEffect(() => {
    if (yPos !== null) {
      if (yAxisProjects != null && yPos < yAxisProjects) {
        setActiveLink("home")
      } else if (
        yAxisProjects != null &&
        yAxisCv != null &&
        yPos > yAxisProjects - 150 &&
        yPos < yAxisCv
      ) {
        setActiveLink("projects")
      } else if (
        yAxisCv != null &&
        yAxisBlog != null &&
        yPos > yAxisCv - 150 &&
        yPos < yAxisBlog
      ) {
        setActiveLink("cv")
      } else if (
        yAxisBlog != null &&
        yAxisContact != null &&
        yPos > yAxisBlog - 150 &&
        yPos < yAxisContact
      ) {
        setActiveLink("blog")
      } else if (yAxisBlog != null && yPos + 235 >= yAxisBlog) {
        setActiveLink("contact")
      }
    }
  }, [yAxisHome, yAxisProjects, yAxisCv, yAxisBlog, yPos, yAxisContact])

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backgroundColor: appBarColorChange
            ? "rgba(255,255,255,0.5)"
            : "initial",
          transition: "all 500ms",
          borderBottom: `1px solid ${
            appBarColorChange ? theme.palette.divider : "transparent"
          }`,
        }}
      >
        <Container disableGutters maxWidth="lg">
          <Toolbar>
            <Box
              sx={{
                flexGrow: {
                  xs: 1,
                  md: 3,
                },
                display: "flex",
                justifyContent: {
                  xs: "flex-start",
                  md: "flex-start",
                },
              }}
            >
              <Scrollchor
                to="#home"
                animate={{ duration: 1000, easing: easeOutQuad }}
                isactivelink={activeLink === "home"}
                style={{
                  color: theme.palette.text.primary,
                  textDecoration: "none",
                }}
              >
                <Title variant="segment">
                  {isSmall ? "GIOrnelas" : "Gerardo I. Ornelas"}
                </Title>
              </Scrollchor>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  sm: "none",
                  md: "block",
                  lg: "block",
                  xl: "block",
                },
              }}
            >
              <Box>
                <Box display="flex" justifyContent="space-between">
                  {navElements.map(({ id, route, anchor, title }) => (
                    <StyledNavElement
                      to={anchor}
                      key={id}
                      animate={{ duration: 1000, easing: easeOutQuad }}
                      isactivelink={activeLink === anchor.slice(1)}
                    >
                      {title}
                    </StyledNavElement>
                  ))}
                </Box>
                {/* <SocialLinks /> */}
              </Box>
            </Box>
            <Box
              sx={{
                display: {
                  xs: "flex",
                  sm: "flex",
                  md: "none",
                  lg: "none",
                },
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={openDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerIsOpen}
        onClose={() => setDrawerIsOpen(false)}
        PaperProps={{
          sx: { backgroundColor: theme.palette.primary.main, width: "50%" },
        }}
      >
        <List>
          {navElements.map(({ id, route, anchor, title }) => (
            <ListItem key={id}>
              <StyledNavElement
                to={anchor}
                animate={{ duration: 1000, easing: easeOutQuad }}
                isactivelink={activeLink === anchor.slice(1)}
                beforeAnimate={() => setDrawerIsOpen(false)}
              >
                {title}
              </StyledNavElement>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}
