"use client";

import { MessageSquareQuote, Plus } from "lucide-react";

import { PanelHeader } from "@/components/dashboard/primitives";
import { achievements } from "@/lib/data";
import { testimonials } from "@/lib/dashboard-data";

export function RecognitionPanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Recognition"
        description="Achievements, certifications, and recommendations."
      />

      {/* Achievements & certifications (real data) */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {achievements.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:border-white/15"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand-secondary/30 bg-brand-secondary/10 text-violet-300">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="font-semibold leading-tight">{title}</h3>
            <p className="text-sm text-muted">{description}</p>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="text-lg font-semibold">Recommendations</h2>
        {testimonials.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <MessageSquareQuote className="h-5 w-5 text-brand" />
                <blockquote className="mt-3 text-sm leading-relaxed text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-medium">{t.name}</span>
                  <span className="block text-xs text-muted">{t.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-12 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-white/[0.02] text-muted">
              <MessageSquareQuote className="h-5 w-5" />
            </span>
            <p className="font-medium">No recommendations added yet</p>
            <p className="max-w-md text-sm text-muted">
              Add real, attributable recommendations (e.g. from LinkedIn) in{" "}
              <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs">
                lib/dashboard-data.ts
              </code>{" "}
              — they&apos;ll appear here automatically.
            </p>
            <a
              href="https://www.linkedin.com/in/bhuvan-p-77168925a/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-sm text-brand hover:underline"
            >
              <Plus className="h-4 w-4" /> Request a recommendation on LinkedIn
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
