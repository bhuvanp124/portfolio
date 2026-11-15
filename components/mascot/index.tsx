"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// three.js only loads on screens wide enough to show the character beside the
// content, and only after the page itself has hydrated.
const Mascot = dynamic(() => import("@/components/mascot/mascot"), { ssr: false });

export function MascotLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return enabled ? <Mascot /> : null;
}
