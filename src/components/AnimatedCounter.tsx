"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 70,
    damping: 22,
    mass: 1,
  });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString("pt-BR"),
  );

  useEffect(() => {
    if (reduce) {
      motionValue.set(value);
      return;
    }
    if (inView) motionValue.set(value);
  }, [inView, motionValue, reduce, value]);

  return (
    <span className={className}>
      {prefix}
      <motion.span ref={ref}>{display}</motion.span>
      {suffix}
    </span>
  );
}
