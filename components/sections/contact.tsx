"use client";

import { ArrowUpRight, Check, Copy, FileText, Phone } from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/lib/site";

const links = [
  { label: "LinkedIn", href: siteConfig.handles.linkedin },
  { label: "GitHub", href: siteConfig.handles.github },
  { label: "LeetCode", href: siteConfig.handles.leetcode },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  };

  return (
    <section
      id="contact"
      className="lines gutter relative flex min-h-svh scroll-mt-0 flex-col bg-cobalt pt-32 text-paper"
      data-mascot="right"
      data-mood="wave"
      data-say="Psst. You can *click me*."
    >
      <p className="text-[.8rem] font-medium uppercase tracking-[0.14em] text-paper/60">
        Contact
      </p>
      <h2 className="display mt-6 text-[clamp(3.4rem,10.4vw,10rem)]">
        Got a role
        <span className="block font-light">in mind?</span>
      </h2>

      <button
        type="button"
        onClick={copy}
        className="group mt-12 flex w-fit items-center gap-4 text-left"
        aria-label={`Copy email address ${siteConfig.email}`}
      >
        <span className="display break-all text-[clamp(1.5rem,3.4vw,3rem)] tracking-[-0.03em] underline decoration-paper/30 decoration-2 underline-offset-[0.2em] transition-colors group-hover:decoration-paper">
          {siteConfig.email}
        </span>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-ink">
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        </span>
      </button>
      <p className="mt-3 h-5 text-sm text-paper/60" aria-live="polite">
        {copied ? "Copied to clipboard" : "Click to copy"}
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pill"
          >
            <span className="pill__face">
              {l.label}
              <ArrowUpRight className="arrow h-4 w-4" aria-hidden />
            </span>
          </a>
        ))}
        <a href={siteConfig.resume} download className="pill pill--ink">
          <span className="pill__face">
            <FileText className="h-4 w-4" aria-hidden /> Resume
          </span>
        </a>
      </div>

      <footer className="mt-auto flex flex-col gap-2 border-t border-white/20 py-8 text-sm text-paper/60 sm:flex-row sm:justify-between sm:pr-16 lg:justify-start lg:gap-12 lg:pr-0">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <a
          href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
          className="inline-flex items-center gap-2 font-medium text-paper underline-offset-4 hover:underline"
        >
          <Phone className="h-4 w-4" aria-hidden />
          {siteConfig.phone}
        </a>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("mascot:dress"))}
            className="underline-offset-4 hover:text-paper hover:underline"
          >
            Dress me up
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("mascot:trick"))}
            className="underline-offset-4 hover:text-paper hover:underline"
          >
            Do a trick
          </button>
          <p>{siteConfig.location}</p>
        </div>
      </footer>
    </section>
  );
}
