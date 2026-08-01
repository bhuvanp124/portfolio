"use client";

import {
  BriefcaseBusiness,
  GraduationCap,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { PanelHeader } from "@/components/dashboard/primitives";
import { updates, type UpdateType } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const meta: Record<UpdateType, { icon: LucideIcon; tint: string }> = {
  role: { icon: BriefcaseBusiness, tint: "border-brand/30 bg-brand/10 text-brand" },
  milestone: { icon: Trophy, tint: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
  status: { icon: Sparkles, tint: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
  education: { icon: GraduationCap, tint: "border-brand-secondary/30 bg-brand-secondary/10 text-violet-300" },
};

export function UpdatesPanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHeader title="Updates" description="Latest professional milestones and news." />

      <div className="relative flex flex-col gap-4">
        {/* Rail */}
        <span
          className="absolute left-[19px] top-3 w-px bg-gradient-to-b from-brand/50 via-border to-transparent"
          style={{ height: "calc(100% - 2.5rem)" }}
          aria-hidden
        />

        {updates.map((u) => {
          const m = meta[u.type];
          const Icon = m.icon;
          return (
            <article key={u.id} className="relative flex gap-4 pl-0">
              <span className={cn("z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl border bg-card", m.tint)}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex-1 rounded-2xl border border-border bg-card p-4 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold leading-tight">{u.title}</h3>
                  <span className="shrink-0 text-xs text-muted">{u.time}</span>
                </div>
                <p className="mt-1.5 text-sm text-muted">{u.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
