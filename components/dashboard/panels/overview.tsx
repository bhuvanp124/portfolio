"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  MapPin,
  Rocket,
  Sparkles,
} from "lucide-react";

import { PanelHeader, StatCard } from "@/components/dashboard/primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { availability, profile } from "@/lib/dashboard-data";
import { experience, projects } from "@/lib/data";

const statIcons = [Code2, GraduationCap, Rocket, BriefcaseBusiness];

export function OverviewPanel() {
  const current = experience[0];
  const highlighted = projects.slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title={profile.name}
        description={profile.tagline}
        action={
          <Badge variant="brand" className="gap-2">
            <MapPin className="h-3 w-3" /> {profile.location}
          </Badge>
        }
      />

      {/* Headline stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {profile.stats.map((s, i) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            tone={i % 2 === 0 ? "brand" : "violet"}
            icon={statIcons[i]}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Headline / about */}
        <div className="gradient-border relative overflow-hidden rounded-2xl p-6 lg:col-span-2">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-brand">
              <Sparkles className="h-4 w-4" /> At a glance
            </span>
            <p className="text-lg font-medium leading-relaxed text-pretty">
              {profile.headline}
            </p>
            <p className="text-sm leading-relaxed text-muted">{profile.paragraphs[0]}</p>
          </div>
        </div>

        {/* Most recent role */}
        <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-card">
          <div>
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
              <BriefcaseBusiness className="h-5 w-5" />
            </span>
            <p className="mt-4 text-xs uppercase tracking-wide text-muted">Most recently</p>
            <p className="mt-1 font-semibold">{current.role}</p>
            <p className="text-sm text-muted">{current.company}</p>
            <p className="mt-1 text-xs text-muted">{current.period}</p>
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2 text-sm text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {availability.status}
          </div>
        </div>
      </div>

      {/* Featured projects preview */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Featured projects</h3>
          <span className="text-sm text-muted">{projects.length} total</span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {highlighted.map((p) => (
            <div
              key={p.title}
              className="flex flex-col gap-2 rounded-xl border border-border bg-white/[0.02] p-4 transition-colors hover:border-white/15"
            >
              <Badge variant="violet" className="w-fit">
                {p.categories[0]}
              </Badge>
              <p className="font-medium leading-tight">{p.title}</p>
              <p className="line-clamp-2 text-xs text-muted">{p.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-surface/60 p-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold">Looking for a new-grad software engineer?</p>
          <p className="text-sm text-muted">
            {availability.status} · start date: {availability.availableFrom}.
          </p>
        </div>
        <Button variant="gradient" size="sm" asChild>
          <a href={`mailto:${profile.email}`}>
            Get in touch <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
