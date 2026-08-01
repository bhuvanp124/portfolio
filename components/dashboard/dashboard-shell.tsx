"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Download, Github, Linkedin, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Sidebar } from "@/components/dashboard/sidebar";
import { OverviewPanel } from "@/components/dashboard/panels/overview";
import { ProfilePanel } from "@/components/dashboard/panels/profile";
import { ProjectsPanel } from "@/components/dashboard/panels/projects";
import { ExperiencePanel } from "@/components/dashboard/panels/experience";
import { AvailabilityPanel } from "@/components/dashboard/panels/availability";
import { SkillsPanel } from "@/components/dashboard/panels/skills";
import { RecognitionPanel } from "@/components/dashboard/panels/recognition";
import { UpdatesPanel } from "@/components/dashboard/panels/updates";
import { ContactPanel } from "@/components/dashboard/panels/contact";
import { availability, dashboardNav, profile, type DashboardViewId } from "@/lib/dashboard-data";
import { siteConfig } from "@/lib/site";

const panels: Record<DashboardViewId, () => React.JSX.Element> = {
  overview: OverviewPanel,
  profile: ProfilePanel,
  projects: ProjectsPanel,
  experience: ExperiencePanel,
  availability: AvailabilityPanel,
  skills: SkillsPanel,
  recognition: RecognitionPanel,
  updates: UpdatesPanel,
  contact: ContactPanel,
};

export function DashboardShell() {
  const [active, setActive] = useState<DashboardViewId>("overview");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const Panel = panels[active];
  const activeLabel = dashboardNav.find((n) => n.id === active)?.label ?? "";

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const select = (id: DashboardViewId) => {
    setActive(id);
    setDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-60" aria-hidden />

      <div className="mx-auto flex w-full max-w-[1440px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-border lg:block">
          <Sidebar active={active} onSelect={select} />
        </aside>

        {/* Mobile drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 lg:hidden"
            >
              <div
                className="absolute inset-0 bg-background/80 backdrop-blur-md"
                onClick={() => setDrawerOpen(false)}
                aria-hidden
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", stiffness: 320, damping: 34 }}
                className="glass absolute inset-y-0 left-0 w-72 border-r border-border"
              >
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="absolute right-3 top-4 z-10 grid h-9 w-9 place-items-center rounded-lg text-muted hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
                <Sidebar active={active} onSelect={select} />
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                className="grid h-10 w-10 place-items-center rounded-xl border border-border text-foreground lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Breadcrumb */}
              <div className="flex min-w-0 flex-1 items-center gap-2 text-sm">
                <span className="hidden text-muted sm:inline">{profile.name}</span>
                <span className="hidden text-muted/50 sm:inline">/</span>
                <span className="truncate font-medium">{activeLabel}</span>
              </div>

              <div className="flex items-center gap-2">
                {availability.open && (
                  <span className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 sm:inline-flex">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Open to work
                  </span>
                )}
                <a
                  href={siteConfig.handles.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hidden h-10 w-10 place-items-center rounded-xl border border-border text-muted transition-colors hover:text-foreground sm:grid"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={siteConfig.handles.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hidden h-10 w-10 place-items-center rounded-xl border border-border text-muted transition-colors hover:text-foreground sm:grid"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={profile.resume}
                  download
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-medium text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-brand/90"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Résumé</span>
                </a>
              </div>
            </div>
          </header>

          {/* Panel */}
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto w-full max-w-6xl"
              >
                <Panel />
              </motion.div>
            </AnimatePresence>

            {/* Back to full site */}
            <div className="mx-auto mt-10 w-full max-w-6xl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> Back to full portfolio
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
