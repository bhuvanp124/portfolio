import { Download, FileText } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function Resume() {
  return (
    <section id="resume" className="container scroll-mt-24 py-12">
      <Reveal>
        <div className="gradient-border relative overflow-hidden rounded-3xl p-8 text-center shadow-card sm:p-12">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden />
          <div className="relative mx-auto flex max-w-xl flex-col items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-tr from-brand to-brand-secondary text-white shadow-glow">
              <FileText className="h-6 w-6" />
            </span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Want the full picture?
            </h2>
            <p className="text-pretty text-muted">
              Grab my résumé for a detailed look at my experience, projects, and
              education.
            </p>
            <Button asChild size="lg" variant="gradient" className="mt-2">
              <a href={siteConfig.resume} download>
                <Download className="h-4 w-4" /> Download résumé
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
