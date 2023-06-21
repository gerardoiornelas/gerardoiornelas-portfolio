import React, { useEffect, ReactNode } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

const boxVariant: Variants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 1 },
};

interface AnimateOnScrollProps {
  children: ReactNode;
  [key: string]: any;
}

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
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
      ref={ref}
      {...otherProps}
    >
      {children}
    </motion.div>
  );
};
