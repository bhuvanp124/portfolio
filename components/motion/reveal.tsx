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

type Phase = "static" | "hidden" | "shown";

/**
 * Fades + lifts its children into view once, respecting reduced motion.
 *
 * The important property is that it renders *visible* on the server. The
 * previous framer-motion version used `initial="hidden"`, which stamped
 * `opacity:0` onto ~50 elements in the SSR markup, so the page read as blank
 * until hydration (and stayed blank entirely if JS never ran). Here the
 * element paints normally, and only after mount do we hide the ones that are
 * still below the fold — where the swap cannot be seen — before animating
 * them in on scroll.
 */
export function Reveal({
  children,
  className,
  delayIndex = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Anything already on screen keeps its painted state — never hide content
    // the visitor can see.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setPhase("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPhase("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: cn(
        phase !== "static" &&
          "transition-[opacity,transform] duration-700 ease-smooth motion-reduce:transition-none",
        phase === "hidden" && "translate-y-6 opacity-0",
        phase === "shown" && "translate-y-0 opacity-100",
        className,
      ),
      style: phase === "shown" ? { transitionDelay: `${delayIndex * 80}ms` } : undefined,
    },
    children,
  );
}
