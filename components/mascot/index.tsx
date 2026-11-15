"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState } from "react";
import type { ReactNode } from "react";

// three.js loads after the page has hydrated. On phones it waits until the
// page has fully loaded, so it never competes with the first paint.
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
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setEnabled(true);
      return;
    }
    let timer = 0;
    const later = () => {
      timer = window.setTimeout(() => setEnabled(true), 1200);
    };
    if (document.readyState === "complete") later();
    else window.addEventListener("load", later, { once: true });
    return () => {
      window.removeEventListener("load", later);
      window.clearTimeout(timer);
    };
  }, []);

  return enabled ? (
    <MascotBoundary>
      <Mascot />
    </MascotBoundary>
  ) : null;
}
