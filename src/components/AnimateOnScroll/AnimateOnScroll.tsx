import React from "react"
import { motion, useAnimation, Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface AnimateOnScrollProps {
  children?: React.ReactNode
  animateIn: string // Add the animateIn prop
  delay?: number
  key?: string
}

const boxVariant: Variants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 1 },
}

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animateIn, // Update the prop name here
  delay = 0,
  key,
}) => {
  const control = useAnimation()
  const [ref, inView] = useInView()

  React.useEffect(() => {
    if (inView) {
      control.start(animateIn) // Use the animateIn prop here
    } else {
      control.start("hidden")
    }
  }, [control, inView, animateIn]) // Add animateIn as a dependency

  return (
    <motion.div
      variants={boxVariant}
      initial="hidden"
      animate={control}
      ref={ref}
      {...{ key }} // Use object shorthand for key prop
    >
      {children}
    </motion.div>
  )
}
