import React, { useEffect, ReactNode } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

const boxVariant: Variants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 1 },
};

interface AnimateOnScrollProps {
  children: ReactNode;
  animateIn?: string;
  delay?: number;
  [key: string]: any;
}

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animateIn, // currently unused but reserved for future variant selection
  delay,
  ...otherProps
}) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.div
      variants={boxVariant}
      initial="hidden"
      animate={control}
      transition={delay ? { delay: delay / 1000 } : undefined}
      ref={ref}
      {...otherProps}
    >
      {children}
    </motion.div>
  );
};
