"use client";

import { ArrowUpRight, Check, Laptop, MapPin } from "lucide-react";

import { PanelHeader } from "@/components/dashboard/primitives";
import { Button } from "@/components/ui/button";
import { availability, profile } from "@/lib/dashboard-data";

export function AvailabilityPanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Availability"
        description="What I'm looking for and when I can start."
      />

      {/* Status banner */}
      <div className="gradient-border relative overflow-hidden rounded-2xl p-6">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
              </span>
            </span>
            <div>
              <p className="text-lg font-semibold text-emerald-200">{availability.status}</p>
              <p className="text-sm text-muted">
                Available from {availability.availableFrom} ·{" "}
                {availability.current.role} at {availability.current.company}
              </p>
            </div>
          </div>
          <Button variant="gradient" size="sm" asChild>
            <a href={`mailto:${profile.email}`}>
              Reach out <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Roles */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-base font-semibold">Roles I&apos;m open to</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {availability.roles.map((r) => (
              <span
                key={r}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-sm text-brand"
              >
                <Check className="h-3.5 w-3.5" /> {r}
              </span>
            ))}
          </div>

          <h3 className="mt-6 text-base font-semibold">Work mode</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {availability.workModes.map((m) => (
              <span
                key={m}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.02] px-3 py-1.5 text-sm text-muted"
              >
                <Laptop className="h-3.5 w-3.5" /> {m}
              </span>
            ))}
          </div>

          <h3 className="mt-6 text-base font-semibold">Locations</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {availability.locations.map((l) => (
              <span
                key={l}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.02] px-3 py-1.5 text-sm text-muted"
              >
                <MapPin className="h-3.5 w-3.5" /> {l}
              </span>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-base font-semibold">Preferences</h3>
          <dl className="mt-4 flex flex-col divide-y divide-border/60">
            {availability.preferences.map((p) => (
              <div key={p.label} className="flex items-center justify-between gap-4 py-3.5 first:pt-0">
                <dt className="text-sm text-muted">{p.label}</dt>
                <dd className="text-right text-sm font-medium">{p.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 rounded-xl border border-border bg-surface/60 p-4">
            <p className="text-sm text-muted">
              Prefer email for opportunities? Reach me at{" "}
              <a href={`mailto:${profile.email}`} className="text-brand hover:underline">
                {profile.email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
