"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";

import { GradientBlobs } from "@/components/effects/gradient-blobs";
import { Particles } from "@/components/effects/particles";
import { Button } from "@/components/ui/button";
import { about } from "@/lib/data";
import { siteConfig } from "@/lib/site";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

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
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.span
            variants={item}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new opportunities
          </motion.span>

          <motion.h1
            variants={item}
            className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="text-gradient">Hi, I&apos;m {siteConfig.name}.</span>
            <br />
            <span className="text-gradient-brand">I build from the algorithm up.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-pretty text-lg text-muted"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
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
          </motion.div>

          {/* Quick stats */}
          <motion.dl
            variants={item}
            className="mt-14 grid w-full grid-cols-2 gap-4 sm:grid-cols-4"
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
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
