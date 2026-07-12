"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="container scroll-mt-24 py-24 md:py-32">
      <SectionHeading
        eyebrow="Skills"
        title="My toolkit"
        description="Technologies I reach for to design, build, and ship products."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-colors hover:border-brand/40"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-tr from-brand/20 to-brand-secondary/20 text-brand ring-1 ring-inset ring-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold">{cat.title}</h3>
              </div>

              <div className="relative mt-5 flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="transition-transform duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:text-foreground"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
