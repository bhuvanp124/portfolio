"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/site";

/**
 * A brief, elegant intro overlay shown once per session on first paint.
 * Uses sessionStorage so returning navigations don't replay it.
 */
export function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("intro-played")) {
      setLoading(false);
      return;
    }
    const t = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("intro-played", "1");
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  const initials = siteConfig.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid h-20 w-20 place-items-center"
            >
              <span className="absolute inset-0 animate-spin-slow rounded-2xl bg-gradient-to-tr from-brand to-brand-secondary opacity-70 blur-md" />
              <span className="relative grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-card text-2xl font-bold tracking-tight text-gradient">
                {initials}
              </span>
            </motion.div>
            <div className="h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-brand to-brand-secondary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
