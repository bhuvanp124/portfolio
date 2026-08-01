import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PanelHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

/** Consistent heading for each dashboard panel. */
export function PanelHeader({ title, description, action }: PanelHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="text-gradient">{title}</span>
        </h1>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  icon?: LucideIcon;
  tone?: "brand" | "violet";
}

/** Compact KPI tile used across the dashboard. */
export function StatCard({ label, value, hint, icon: Icon, tone = "brand" }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:border-white/15">
      <div
        className={cn(
          "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40",
          tone === "brand" ? "bg-brand" : "bg-brand-secondary",
        )}
      />
      <div className="relative flex items-start justify-between">
        <p className="text-sm text-muted">{label}</p>
        {Icon && (
          <span
            className={cn(
              "grid h-9 w-9 place-items-center rounded-xl border",
              tone === "brand"
                ? "border-brand/30 bg-brand/10 text-brand"
                : "border-brand-secondary/30 bg-brand-secondary/10 text-violet-300",
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <p className="relative mt-3 text-2xl font-bold tracking-tight">{value}</p>
      {hint && <p className="relative mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
