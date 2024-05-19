import { motion } from "framer-motion";
import React, { ReactNode } from "react";
interface AnimatedListItemProps {
  children: ReactNode;
}
let base = 4;
let t = (d: number) => d * base;

const AnimatedListItem: React.FC<AnimatedListItemProps> = ({ children }) => {
  return (
    <motion.div
      className="relative"
      initial={{
        height: 0,
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        height: "auto",
        transition: {
          type: "spring",
          bounce: "0.3",
          opacity: { delay: t(0.025) },
        },
      }}
      exit={{ opacity: 0, height: 0 }}
      transition={{
        duration: t(0.1),
        type: "spring",
        bounce: "0.3",
        opacity: { delay: t(0.03) },
      }}
    >
      {children}
    </motion.div>
  );
};
export default AnimatedListItem;
