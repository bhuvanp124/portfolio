"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";
import { achievements } from "@/lib/data";

export function Achievements() {
  return (
    <section id="achievements" className="container scroll-mt-24 py-24 md:py-32">
      <SectionHeading
        eyebrow="Achievements"
        title="Milestones & recognition"
        description="A few highlights I'm proud of along the way."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="gradient-border group rounded-2xl p-6 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-tr from-brand/20 to-brand-secondary/20 text-brand ring-1 ring-inset ring-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                {a.date && <span className="text-xs text-muted">{a.date}</span>}
              </div>
              <h3 className="mt-4 text-base font-semibold">{a.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {a.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
