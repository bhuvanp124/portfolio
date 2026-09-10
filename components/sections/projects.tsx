"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Github } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";
import type { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

const FILTERS: ProjectCategory[] = ["All", "AI/ML", "Web", "Systems", "Quant"];

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(filter)),
    [filter],
  );

  return (
    <section id="projects" className="container scroll-mt-24 py-24 md:py-32">
      <SectionHeading
        eyebrow="Projects"
        title="Featured work"
        description="A selection of products and experiments I'm proud of."
      />

      {/* Filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm transition-colors",
              filter === f ? "text-white" : "text-muted hover:text-foreground",
            )}
          >
            {filter === f && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-brand to-brand-secondary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{f}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-colors hover:border-brand/40"
            >
              {/* Gradient hover glow */}
              <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(600px circle at var(--x,50%) var(--y,0%), rgba(59,130,246,0.10), transparent 40%)",
                }}
              />

              {/* Cover image */}
              <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
                <Image
                  src={p.image}
                  alt={`${p.title} preview`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                {p.featured && (
                  <Badge variant="brand" className="absolute left-3 top-3">
                    Featured
                  </Badge>
                )}
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    {p.period && (
                      <p className="mt-1 text-xs uppercase tracking-wide text-muted">
                        {p.period}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} source code`}
                        className="text-muted transition-colors hover:text-foreground"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} live demo`}
                        className="text-muted transition-colors hover:text-foreground"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.description}
                </p>

                {/* Features */}
                <ul className="mt-4 grid gap-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Check className="h-4 w-4 shrink-0 text-brand" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="mt-5 flex flex-wrap gap-2 pt-1">
                  {p.tech.map((t) => (
                    <Badge key={t} variant="solid">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
