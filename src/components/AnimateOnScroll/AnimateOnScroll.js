import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const boxVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 1 },
}

const AnimateOnScroll = ({ children, ...otherProps }) => {
  const control = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      control.start("visible")
    } else {
      control.start("hidden")
    }
  }, [control, inView])
  return (
    <motion.div
      variants={boxVariant}
      initial="hidden"
      animate={control}
      ref={ref}
    >
      {children}
    </motion.div>
  )
}

AnimateOnScroll.propTypes = {
  children: PropTypes.node,
}

export default AnimateOnScroll
