"use client";

import { useMemo, useState } from "react";
import { Github, Star } from "lucide-react";

import { PanelHeader } from "@/components/dashboard/primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = ["All", ...Array.from(new Set(projects.flatMap((p) => p.categories)))];

export function ProjectsPanel() {
  const [filter, setFilter] = useState("All");

  const rows = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter as never))),
    [filter],
  );

  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Projects"
        description={`${projects.length} flagship builds across systems, AI/ML, and the web.`}
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              filter === c
                ? "border-brand/40 bg-brand/10 text-brand"
                : "border-border text-muted hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((p) => (
          <article
            key={p.title}
            className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:border-white/15"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {p.categories.map((c) => (
                  <Badge key={c} variant="violet">
                    {c}
                  </Badge>
                ))}
                {p.featured && (
                  <Badge variant="brand" className="gap-1">
                    <Star className="h-3 w-3 fill-brand" /> Featured
                  </Badge>
                )}
              </div>
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title} on GitHub`}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-white/[0.05] hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
            </div>

            <h3 className="mt-3 text-lg font-semibold leading-tight">{p.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{p.description}</p>

            {/* Feature highlights */}
            <ul className="mt-4 flex flex-col gap-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand to-brand-secondary" />
                  <span className="text-muted">{f}</span>
                </li>
              ))}
            </ul>

            {/* Tech stack */}
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-4">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border bg-white/[0.02] px-2 py-0.5 text-xs text-muted"
                >
                  {t}
                </span>
              ))}
            </div>

            {(p.github || p.demo) && (
              <div className="mt-4 flex gap-2">
                {p.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={p.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> Code
                    </a>
                  </Button>
                )}
                {p.demo && (
                  <Button variant="primary" size="sm" asChild>
                    <a href={p.demo} target="_blank" rel="noopener noreferrer">
                      Live demo
                    </a>
                  </Button>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
