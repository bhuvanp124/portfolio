"use client";

import { useEffect, useState } from "react";

/**
 * A subtle radial spotlight that follows the cursor. Disabled on touch devices
 * and for users who prefer reduced motion.
 */
export function MouseSpotlight() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(340px circle at ${pos.x}px ${pos.y}px, rgba(59,130,246,0.08), transparent 70%)`,
      }}
    />
  );
}
