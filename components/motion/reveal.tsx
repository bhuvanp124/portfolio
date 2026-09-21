"use client";

import { createElement, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger index — multiplies the entrance delay. */
  delayIndex?: number;
  as?: "div" | "section" | "li" | "article";
}

/** visible → (below fold) hidden → animating → visible again, classes removed. */
type Phase = "visible" | "hidden" | "animating";

/**
 * Fades + lifts its children into view once, respecting reduced motion.
 *
 * Two properties matter here:
 *
 * 1. It renders *visible* on the server. framer-motion's `initial` stamped
 *    `opacity:0` into the markup, so everything below the hero stayed blank
 *    until hydration finished — and stayed blank forever without JS.
 * 2. The entrance is a CSS animation that is removed once it ends, rather than
 *    a lingering transition. A finished `forwards` animation keeps overriding
 *    `transform`, which would dead-lock the `hover:-translate-y` lift on the
 *    cards that wrap this.
 */
export function Reveal({
  children,
  className,
  delayIndex = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Never hide something the visitor can already see.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setPhase("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPhase("animating");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: cn(
        phase === "hidden" && "opacity-0",
        phase === "animating" && "animate-fade-up",
        className,
      ),
      style:
        phase === "animating" ? { animationDelay: `${delayIndex * 70}ms` } : undefined,
      // Drop the animation class once it has played so `transform` is free again.
      onAnimationEnd: phase === "animating" ? () => setPhase("visible") : undefined,
    },
    children,
  );
}
