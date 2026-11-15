"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Roles as an accordion: click a row for the details. */
export function Experience() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="experience"
      className="lines gutter relative scroll-mt-0 bg-ink py-32 text-paper"
      data-mascot="right"
      data-mood="point"
      data-say="Click any role for the *details*."
    >
      <div>
        <h2 className="display text-[clamp(2.8rem,6.2vw,6rem)]">Experience</h2>
        <p className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-paper/55">
          Click any role for the details.
        </p>
      </div>

      <ol className="mt-16 border-t border-white/15 lg:w-[66%]">
        {experience.map((item, i) => {
          const isOpen = open === i;
          const panelId = `xp-panel-${i}`;
          return (
            <li key={item.role} className="border-b border-white/15">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-7 text-left md:grid-cols-12"
              >
                <span className="display text-[clamp(1.6rem,2.6vw,2.4rem)] tracking-[-0.035em] md:col-span-6">
                  {item.role}
                </span>
                <span className="col-start-1 row-start-2 text-sm text-paper/55 md:col-span-3 md:col-start-7 md:row-start-1">
                  {item.company}
                </span>
                <span className="col-start-1 row-start-3 font-mono text-xs text-paper/45 md:col-span-2 md:col-start-10 md:row-start-1">
                  {item.period}
                </span>
                <span
                  className={cn(
                    "col-start-2 row-span-3 row-start-1 grid h-10 w-10 place-items-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-cobalt-light md:col-start-12 md:row-span-1 md:justify-self-end",
                    isOpen && "rotate-45 border-cobalt bg-cobalt",
                  )}
                >
                  <Plus className="h-4 w-4" aria-hidden />
                </span>
              </button>
              <div
                id={panelId}
                className={cn(
                  "grid transition-[grid-template-rows] duration-500 ease-smooth",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-6 pb-10 md:grid-cols-12">
                    <p className="text-[1.05rem] leading-relaxed text-paper/75 md:col-span-5">
                      {item.summary}
                      <span className="mt-3 block text-sm text-paper/45">{item.location}</span>
                    </p>
                    <ul className="space-y-3 text-[0.95rem] text-paper/70 md:col-span-6 md:col-start-7">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt-light" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
