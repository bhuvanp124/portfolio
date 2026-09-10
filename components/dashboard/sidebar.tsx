"use client";

import Link from "next/link";
import { Download } from "lucide-react";

import {
  availability,
  dashboardNav,
  profile,
  type DashboardViewId,
} from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

interface SidebarProps {
  active: DashboardViewId;
  onSelect: (id: DashboardViewId) => void;
}

/** Persistent navigation rail. Rendered inside the desktop column and the
 *  mobile drawer alike, so it stays purely presentational. */
export function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-3 px-2 py-1" aria-label="Back to portfolio">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-brand to-brand-secondary text-sm font-bold text-white shadow-glow">
          {profile.initials}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold tracking-tight">{profile.name}</span>
          <span className="truncate text-xs text-muted">{profile.role}</span>
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1" aria-label="Dashboard">
        {dashboardNav.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-white/[0.06] text-foreground"
                  : "text-muted hover:bg-white/[0.03] hover:text-foreground",
              )}
            >
              {isActive && (
                <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-gradient-to-b from-brand to-brand-secondary" />
              )}
              <Icon
                className={cn(
                  "h-[1.125rem] w-[1.125rem] shrink-0 transition-colors",
                  isActive ? "text-brand" : "text-muted group-hover:text-foreground",
                )}
              />
              <span className="flex-1 text-left">{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Availability + résumé card */}
      <div className="rounded-2xl border border-border bg-surface/60 p-4">
        {availability.open && (
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {availability.status}
          </div>
        )}
        <p className="mt-2 text-xs text-muted">
          Start date: {availability.availableFrom}. Download the resume for the full details.
        </p>
        <a
          href={profile.resume}
          download
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-3 py-2 text-sm font-medium text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-brand/90"
        >
          <Download className="h-4 w-4" /> Résumé
        </a>
      </div>
    </div>
  );
}
