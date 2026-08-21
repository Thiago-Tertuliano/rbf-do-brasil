"use client";

import { easeOut } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  blur?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  blur = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const offset =
    direction === "up"
      ? { y: 40 }
      : direction === "down"
        ? { y: -40 }
        : direction === "left"
          ? { x: 48 }
          : direction === "right"
            ? { x: -48 }
            : {};

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...offset,
        ...(blur ? { filter: "blur(8px)" } : {}),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-12% 0px", amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
