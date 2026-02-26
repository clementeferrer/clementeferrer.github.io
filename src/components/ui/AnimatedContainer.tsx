"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function AnimatedContainer({
  children,
  variants = defaultVariants,
  className = "",
  delay = 0,
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
