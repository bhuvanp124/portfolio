"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import { about } from "@/lib/data";

/** Words in the statement that are picked out in blue. */
const ACCENT = new Set(["Android", "AI", "high-performance", "algorithm"]);

/**
 * A large statement that "lights up" word by word as it scrolls through the
 * viewport. Without JS (or with reduced motion) every word renders at full
 * opacity, so nothing is hidden behind hydration.
 */
export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(1);
  const words = about.headline.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top hits 85% of the viewport, 1 when its bottom hits 45%.
      const p = (vh * 0.85 - r.top) / (r.height + vh * 0.4);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="about"
      className="lines lines--dark gutter relative grid min-h-[110svh] scroll-mt-0 items-center bg-paper py-32 text-ink md:grid-cols-12"
      data-mascot="left"
      data-bubble="dark"
      data-say="Android, AI, and the *whole stack*."
    >
      <div className="md:col-span-7 md:col-start-6">
        <p className="mb-8 text-[.8rem] font-medium uppercase tracking-[0.14em] text-ink/45">
          About
        </p>
        <p
          ref={ref}
          className="display text-[clamp(1.9rem,3.5vw,3.35rem)] leading-[1.06] tracking-[-0.035em]"
        >
          {words.map((word, i) => {
            const bare = word.replace(/[^\w-]/g, "");
            const lit = Math.min(1, Math.max(0.2, progress * words.length * 1.4 - i));
            return (
              <Fragment key={i}>
                <span
                  className={ACCENT.has(bare) ? "font-normal text-cobalt" : undefined}
                  style={{ opacity: lit, transition: "opacity .2s linear" }}
                >
                  {word}
                </span>{" "}
              </Fragment>
            );
          })}
        </p>
        <p className="mt-10 max-w-[30rem] text-[1.05rem] leading-relaxed text-ink/60">
          {about.paragraphs[0]}
        </p>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-4">
          {about.stats.map((s) => (
            <div key={s.label} className="bg-paper px-5 py-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="display text-[2.2rem] tracking-[-0.04em]">{s.value}</dd>
              <p className="mt-2 text-xs text-ink/55">{s.label}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
