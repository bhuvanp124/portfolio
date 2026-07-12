"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view using IntersectionObserver.
 * Returns the id (without leading "#") of the active section.
 */
export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible intersecting section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        // Bias toward the section occupying the upper-middle of the viewport.
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
