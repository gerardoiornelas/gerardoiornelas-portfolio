import React from "react"
import PropTypes from "prop-types"

import UIShellHeader from "./UIShellHeader"
import UIShellHeaderAlt from "./UIShellHeaderAlt"
import UIShellFooter from "./UIShellFooter"

const UIShell = ({ variant, children }) => {
  function headerVariant(_variant) {
    let v
    switch (_variant) {
      case "blog":
        v = null
        break
      case "alt":
        v = <UIShellHeaderAlt />
        break
      default:
        v = <UIShellHeader />
        break
    }
    return v
  }
  return (
    <>
      {headerVariant(variant)}
      <main>{children}</main>
      <UIShellFooter />
    </>
  )
}

UIShell.propTypes = {
  children: PropTypes.node,
}

export default UIShell
