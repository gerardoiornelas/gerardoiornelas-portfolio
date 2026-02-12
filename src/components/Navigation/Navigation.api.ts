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
    title: "Trust Stack",
    anchor: "#projects",
    isActiveLink: false,
  },
  {
    id: cuid(),
    route: "/blog",
    title: "Blog",
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
    route: "/contact",
    title: "Contact",
    anchor: "#contact",
    isActiveLink: false,
    subNav: false,
  },
]
