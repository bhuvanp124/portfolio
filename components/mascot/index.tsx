"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState } from "react";
import type { ReactNode } from "react";

// three.js loads right after the page has hydrated, so the character greets
// visitors as the site opens. Phones wait a beat so the hero paints first.
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
    const timer = window.setTimeout(() => setEnabled(true), 300);
    return () => window.clearTimeout(timer);
  }, []);

  return enabled ? (
    <MascotBoundary>
      <Mascot />
    </MascotBoundary>
  ) : null;
}
