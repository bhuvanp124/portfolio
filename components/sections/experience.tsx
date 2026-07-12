"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="container scroll-mt-24 py-24 md:py-32">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've been"
        description="A timeline of the roles and milestones that shaped how I build."
      />

      <div className="relative mt-14">
        {/* Vertical line */}
        <div
          className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-brand/60 via-border to-transparent md:left-1/2"
          aria-hidden
        />

        <ol className="space-y-10">
          {experience.map((exp, i) => {
            const alignRight = i % 2 === 1;
            return (
              <li key={`${exp.company}-${i}`} className="relative">
                {/* Node */}
                <span
                  className="absolute left-4 top-1.5 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-brand/40 bg-card text-brand shadow-glow md:left-1/2"
                  aria-hidden
                >
                  <Briefcase className="h-4 w-4" />
                </span>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                    alignRight ? "md:ml-auto" : ""
                  }`}
                >
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-card transition-colors hover:border-brand/30">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-lg font-semibold">{exp.role}</h3>
                      <span className="text-xs font-medium text-brand">
                        {exp.period}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted">
                      {exp.company} · {exp.location}
                    </p>
                    <p className="mt-3 text-sm text-foreground/80">{exp.summary}</p>
                    <ul className="mt-3 space-y-1.5">
                      {exp.highlights.map((h, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-sm text-muted"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
