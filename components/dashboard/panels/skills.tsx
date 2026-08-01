"use client";

import { PanelHeader } from "@/components/dashboard/primitives";
import { skillCategories } from "@/lib/data";

export function SkillsPanel() {
  const total = skillCategories.reduce((sum, c) => sum + c.skills.length, 0);

  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Skills"
        description={`${total} technologies across ${skillCategories.length} areas.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map(({ title, icon: Icon, skills }) => (
          <div
            key={title}
            className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:border-white/15"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="text-base font-semibold">{title}</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-border bg-white/[0.02] px-2.5 py-1 text-xs text-muted transition-colors hover:border-brand/30 hover:text-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
