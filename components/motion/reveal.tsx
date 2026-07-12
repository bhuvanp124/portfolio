"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger index — multiplies the entrance delay. */
  delayIndex?: number;
  as?: "div" | "section" | "li" | "article";
}

/** Fades + lifts its children into view once, respecting reduced motion. */
export function Reveal({
  children,
  className,
  delayIndex = 0,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      custom={delayIndex}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}
