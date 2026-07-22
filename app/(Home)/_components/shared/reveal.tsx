"use client";

import { Box } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

/* -----------------------------------------------------------------------------
 * Reveal — lightweight scroll-in animation that respects prefers-reduced-motion.
 * -------------------------------------------------------------------------- */
export default function Reveal({
  children,
  y = 18,
  delay = 0,
}: {
  children: React.ReactNode;
  y?: number;
  delay?: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const animate = !usePrefersReducedMotion();

  return (
    <Box
      ref={ref}
      opacity={animate ? (inView ? 1 : 0) : 1}
      transform={animate ? (inView ? "none" : `translateY(${y}px)`) : "none"}
      transition={
        animate
          ? `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`
          : undefined
      }
      willChange="opacity, transform"
    >
      {children}
    </Box>
  );
}
