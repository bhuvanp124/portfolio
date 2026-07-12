import { Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { about } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="container scroll-mt-24 py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-start">
        <SectionHeading eyebrow="About" title="A bit about me" />

        <div className="flex flex-col gap-6">
          <Reveal>
            <p className="text-balance text-2xl font-medium leading-snug text-foreground/90">
              {about.headline}
            </p>
          </Reveal>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delayIndex={i + 1}>
              <p className="text-pretty leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}
          <Reveal delayIndex={about.paragraphs.length + 1}>
            <div className="mt-2 inline-flex items-center gap-2 text-sm text-brand">
              <Sparkles className="h-4 w-4" />
              Design-minded engineer, obsessed with the details.
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
