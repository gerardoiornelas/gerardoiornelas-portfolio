import cuid from "cuid"

interface NavElement {
  id: string
  route: string
  title: string
  anchor: string
  isActiveLink: boolean
  subNav?: boolean
}

export const navElements: NavElement[] = [
  {
    id: cuid(),
    route: "/projects",
    title: "Practices",
    anchor: "#projects",
    isActiveLink: false,
  },
  {
    id: cuid(),
    route: "/blog",
    title: "Writing",
    anchor: "#blog",
    isActiveLink: false,
    subNav: false,
  },
  // {
  //   id: cuid(),
  //   route: "/cv",
  //   title: "CV",
  //   anchor: "#cv",
  //   isActiveLink: false,
  // },
  {
    id: cuid(),
    route: "/authority-layer",
    title: "Research",
    anchor: "/authority-layer",
    isActiveLink: false,
    subNav: false,
  },
  {
    id: cuid(),
    route: "/contact",
    title: "Connect",
    anchor: "#contact",
    isActiveLink: false,
    subNav: false,
  },
]
