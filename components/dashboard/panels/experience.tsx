"use client";

import { BriefcaseBusiness, MapPin } from "lucide-react";

import { PanelHeader } from "@/components/dashboard/primitives";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/lib/data";

export function ExperiencePanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Experience"
        description="Work and education, most recent first."
      />

      <div className="relative flex flex-col gap-6">
        {/* Vertical rail */}
        <span
          className="absolute left-[19px] top-2 hidden w-px bg-gradient-to-b from-brand/60 via-border to-transparent sm:block"
          style={{ height: "calc(100% - 2rem)" }}
          aria-hidden
        />

        {experience.map((item, index) => (
          <article key={`${item.company}-${index}`} className="relative sm:pl-14">
            {/* Node */}
            <span className="absolute left-0 top-1 hidden h-10 w-10 place-items-center rounded-xl border border-border bg-card text-brand shadow-card sm:grid">
              <BriefcaseBusiness className="h-4 w-4" />
            </span>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold">{item.role}</h3>
                  <p className="text-sm text-brand">{item.company}</p>
                </div>
                <div className="flex flex-col gap-1 sm:items-end">
                  {index === 0 && <Badge variant="brand">Most recent</Badge>}
                  <span className="text-xs text-muted">{item.period}</span>
                </div>
              </div>

              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                <MapPin className="h-3 w-3" /> {item.location}
              </p>
              <p className="mt-3 text-sm text-muted">{item.summary}</p>

              <ul className="mt-3 flex flex-col gap-2">
                {item.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand to-brand-secondary" />
                    <span className="text-muted">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
