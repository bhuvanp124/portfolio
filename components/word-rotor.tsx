"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through `words`, re-running the masked rise on each change.
 * Server-renders the first word so the headline is complete without JS.
 */
export function WordRotor({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      2400,
    );
    return () => window.clearInterval(id);
  }, [words.length]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="rise">
        <span key={index} className="block animate-rise text-paper/95">
          {words[index]}
        </span>
      </span>
    </>
  );
}
