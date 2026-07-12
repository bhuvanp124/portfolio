"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CornerDownLeft,
  FileText,
  Github,
  Home,
  Linkedin,
  Mail,
  Search,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { navItems } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
};

/** A ⌘K / Ctrl+K command palette for fast navigation. */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = useCallback((hash: string) => {
    setOpen(false);
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const openLink = useCallback((href: string) => {
    setOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  const commands = useMemo<Command[]>(
    () => [
      { id: "top", label: "Go to top", icon: Home, run: () => go("body") },
      ...navItems.map((n) => ({
        id: n.href,
        label: `Go to ${n.label}`,
        icon: Search,
        run: () => go(n.href),
      })),
      {
        id: "resume",
        label: "Download resume",
        hint: "PDF",
        icon: FileText,
        run: () => openLink(siteConfig.resume),
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "External",
        icon: Github,
        run: () => openLink(siteConfig.handles.github),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "External",
        icon: Linkedin,
        run: () => openLink(siteConfig.handles.linkedin),
      },
      {
        id: "email",
        label: "Send an email",
        hint: siteConfig.email,
        icon: Mail,
        run: () => openLink(`mailto:${siteConfig.email}`),
      },
    ],
    [go, openLink],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  // Global keyboard shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl"
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted sm:inline">
                ESC
              </kbd>
            </div>
            <ul className="max-h-[320px] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">
                  No results found.
                </li>
              )}
              {filtered.map((c, i) => {
                const Icon = c.icon;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => c.run()}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        active === i
                          ? "bg-white/[0.06] text-foreground"
                          : "text-muted",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{c.label}</span>
                      {c.hint && (
                        <span className="text-xs text-muted/70">{c.hint}</span>
                      )}
                      {active === i ? (
                        <CornerDownLeft className="h-3.5 w-3.5 text-muted" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
