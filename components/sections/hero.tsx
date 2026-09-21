import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";

import { GradientBlobs } from "@/components/effects/gradient-blobs";
import { Particles } from "@/components/effects/particles";
import { Button } from "@/components/ui/button";
import { about } from "@/lib/data";
import { siteConfig } from "@/lib/site";

/**
 * The hero is a server component on purpose.
 *
 * It previously used framer-motion with `initial="hidden"`, which serialised
 * `opacity:0` onto the markup — including the <h1>, the LCP element — so
 * nothing painted until hydration finished. The entrance is now pure CSS, and
 * the headline carries no animation at all so it paints on first frame.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <GradientBlobs />
      <Particles />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"
        aria-hidden
      />

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new opportunities
          </span>

          {/* No entrance animation here: this is the LCP element. */}
          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-gradient">Hi, I&apos;m {siteConfig.name}.</span>
            <br />
            <span className="text-gradient-brand">I build from the algorithm up.</span>
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up text-pretty text-lg text-muted">
            {siteConfig.description}
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "90ms" }}
          >
            <Button asChild size="lg" variant="gradient">
              <a href="#projects">
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={siteConfig.resume} download>
                <FileText className="h-4 w-4" /> Resume
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={siteConfig.handles.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={siteConfig.handles.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </Button>
          </div>

          {/* Quick stats */}
          <dl
            className="mt-14 grid w-full animate-fade-up grid-cols-2 gap-4 sm:grid-cols-4"
            style={{ animationDelay: "180ms" }}
          >
            {about.stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl px-4 py-5 text-center"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold text-gradient-brand">
                  {s.value}
                </dd>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
