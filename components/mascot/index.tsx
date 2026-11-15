"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState } from "react";
import type { ReactNode } from "react";

// three.js only loads on screens wide enough to show the character beside the
// content, and only after the page itself has hydrated.
const Mascot = dynamic(() => import("@/components/mascot/mascot"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** The character is decoration: if it ever fails, drop it, never the page. */
class MascotBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function MascotLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!supportsWebGL()) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return enabled ? (
    <MascotBoundary>
      <Mascot />
    </MascotBoundary>
  ) : null;
}
