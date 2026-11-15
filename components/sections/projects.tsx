"use client";

import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Project, ProjectScene } from "@/types";

/** Scroll distance (in svh) each step stays pinned for. */
const STEP_SVH = 85;

/** Colour a mock line by its leading glyph. */
function lineTone(line: string) {
  if (line.startsWith("$") || line.startsWith(">")) return "text-paper";
  if (line.startsWith("✓")) return "text-emerald-400";
  if (line.startsWith("✗")) return "text-orange-400";
  if (line.startsWith("▲")) return "font-semibold text-cobalt-light";
  return "text-paper/60";
}

function Window({ scene, step }: { scene: ProjectScene; step: number }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl [background:radial-gradient(circle,#0b0b0c_0.95px,transparent_1.15px)_0_0/3px_3px]"
      />
      <div className="relative overflow-hidden rounded-2xl bg-ink shadow-[0_40px_70px_-35px_rgba(11,11,12,0.7)]">
        <div className="relative flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="absolute left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-0.5 font-mono text-[0.7rem] text-paper/60">
            {scene.window}
          </span>
        </div>
        <div
          key={step}
          className="min-h-[190px] overflow-x-auto whitespace-pre px-5 py-5 font-mono text-[0.72rem] leading-[1.85] sm:text-[0.82rem] lg:min-h-[205px]"
        >
          {scene.steps[step].lines.map((line, i) => (
            <div
              key={i}
              className={cn("animate-fade-up", lineTone(line))}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Scene({ project, index }: { project: Project; index: number }) {
  const scene = project.scene!;
  const n = scene.steps.length;
  const wrapRef = useRef<HTMLDivElement>(null);
  // Large screens pin the whole scene while the steps scroll by. Phones and
  // tablets let the title and key points flow normally and pin only the mock
  // window, card and rail (the "stage"), so the steps still follow scrolling
  // without any text being clipped.
  const stageRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stickyH, setStickyH] = useState(0);
  const step = Math.min(n - 1, Math.floor(progress * n));
  const card = scene.steps[step].card;
  const flip = index % 2 === 1;
  const href = project.demo ?? project.github;
  // Phones: the stage is tall enough to give each step half a screen of scrolling.
  const stageScroll = n * 50; // svh

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const sticky = stickyRef.current;
    if (pinned || !sticky) return;
    const ro = new ResizeObserver(() => setStickyH(sticky.offsetHeight));
    ro.observe(sticky);
    return () => ro.disconnect();
  }, [pinned]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      let p: number;
      if (pinned) {
        p = -wrap.getBoundingClientRect().top / (wrap.offsetHeight - window.innerHeight);
      } else {
        const r = stage.getBoundingClientRect();
        const top = Math.max(16, window.innerHeight / 2 - stickyH / 2);
        p = (top - r.top) / Math.max(1, r.height - stickyH);
      }
      setProgress(Math.min(0.9999, Math.max(0, p)));
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
  }, [pinned, stickyH]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{
        height: pinned ? `calc(100svh + ${n * STEP_SVH}svh)` : undefined,
        background: scene.color,
      }}
    >
      {/* Phones: one marker for the whole scene, following the current step. */}
      {!pinned && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          data-mascot="right"
          data-say={scene.steps[step].say}
          data-accent={scene.accent}
          data-mood={step === 0 ? "point" : step === n - 1 ? "thumbs" : "idle"}
          data-outfit={scene.outfit}
        />
      )}

      {/* One marker per step tells the mascot what to say. */}
      {pinned &&
        scene.steps.map((s, i) => (
          <div
            key={i}
            aria-hidden
            className="pointer-events-none absolute inset-x-0"
            data-mascot={flip ? "left" : "right"}
            data-say={s.say}
            data-accent={scene.accent}
            data-mood={i === 0 ? "point" : i === n - 1 ? "thumbs" : "idle"}
            data-outfit={scene.outfit}
            style={{
              top: i === 0 ? 0 : `calc(50svh + ${i * STEP_SVH}svh)`,
              height: i === 0 || i === n - 1 ? `calc(50svh + ${STEP_SVH}svh)` : `${STEP_SVH}svh`,
            }}
          />
        ))}

      <article
        className={cn(
          "relative text-ink",
          pinned ? "sticky top-0 h-svh overflow-hidden" : "py-20",
        )}
      >
        <div className="grain" aria-hidden />
        <div className="gutter relative grid h-full content-center lg:grid-cols-12 lg:gap-x-5">
          <div className={cn("min-w-0 lg:col-span-7", flip ? "lg:col-start-6" : "lg:col-start-1")}>
            <h3 className="display text-[clamp(2.1rem,3.6vw,3.6rem)]">
              <span className="mr-3 align-top font-grotesk text-[.8rem] font-medium tracking-normal text-ink/50">
                {String(index + 1).padStart(2, "0")}
              </span>
              {project.title}
            </h3>
            <p className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed text-ink/65 lg:[@media(max-height:820px)]:hidden">
              {project.description}
            </p>

            {project.highlights && (
              <ul className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-3">
                {project.highlights.map((h) => (
                  <li key={h.title} className="border-t border-ink/25 pt-3">
                    <p className="display text-[1.15rem] leading-[1.05] tracking-[-0.025em]">
                      {h.title}
                    </p>
                    <p className="mt-1.5 text-[0.84rem] leading-snug text-ink/70">{h.text}</p>
                  </li>
                ))}
              </ul>
            )}

            <div
              ref={stageRef}
              className="relative mt-7"
              style={pinned ? undefined : { height: `calc(${stickyH}px + ${stageScroll}svh)` }}
            >
              <div
                ref={stickyRef}
                className={cn(!pinned && "sticky")}
                style={pinned ? undefined : { top: `max(16px, calc(50svh - ${stickyH / 2}px))` }}
              >
                <div className="relative">
                  <Window scene={scene} step={step} />
                  <div
                    key={step}
                    className={cn(
                      "relative z-10 mt-5 w-[min(300px,100%)] animate-fade-up sm:absolute sm:-bottom-10 sm:mt-0",
                      flip ? "sm:-right-6" : "sm:-left-6",
                    )}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl [background:radial-gradient(circle,#0b0b0c_0.95px,transparent_1.15px)_0_0/3px_3px]"
                    />
                    <div className="relative min-h-[7.5rem] rounded-2xl bg-paper px-5 py-4 shadow-[0_24px_40px_-24px_rgba(11,11,12,0.45)] sm:min-h-0">
                      <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink/65">
                        {card.label}
                      </p>
                      <p className="display mt-1.5 text-[1.3rem] leading-[1.05] tracking-[-0.03em]">
                        {card.title}
                      </p>
                      {card.sub && <p className="mt-1 text-[0.82rem] text-ink/70">{card.sub}</p>}
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-14",
                    // Keep the button on the side away from the mascot's pointing hand.
                    flip ? "justify-between" : "justify-start",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-[2px] w-40 overflow-hidden rounded-full bg-ink/15">
                      <div
                        className="h-full bg-ink transition-[width] duration-300"
                        style={{ width: `${progress * 100}%` }}
                      />
                    </div>
                    <span className="font-mono text-[0.7rem] text-ink/50">
                      {step + 1} / {n}
                    </span>
                  </div>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn("pill shrink-0", !flip && "order-first")}
                    >
                      <span className="pill__face">
                        {project.demo ? "View project" : (
                          <>
                            <Github className="h-4 w-4" aria-hidden /> View code
                          </>
                        )}
                        <ArrowRight className="arrow h-4 w-4" aria-hidden />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export function Projects() {
  const showcased = projects.filter((p) => p.scene);
  const more = projects.filter((p) => !p.scene);

  return (
    <section id="projects" className="relative scroll-mt-0 bg-paper">
      <div
        className="lines lines--dark gutter pb-24 pt-32 text-ink"
        data-mascot="right"
        data-bubble="dark"
        data-say="Here's some of what I've *built*."
        data-mood="point"
      >
        <h2 className="display text-[clamp(2.8rem,6.2vw,6rem)]">Selected work</h2>
        <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink/60">
          Systems, AI and the web. Each one is something I designed, built and
          measured end to end.
        </p>
      </div>

      {showcased.map((project, i) => (
        <Scene key={project.title} project={project} index={i} />
      ))}

      {more.length > 0 && (
        <div
          className="lines lines--dark gutter py-28 text-ink"
          data-mascot="right"
          data-bubble="dark"
          data-say="And a couple more, built just for *fun*."
        >
          <h3 className="display text-[clamp(2rem,3.6vw,3.4rem)]">More work</h3>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:w-[66%]">
            {more.map((p) => (
              <a
                key={p.title}
                href={p.demo ?? p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl opacity-0 transition-opacity duration-300 [background:radial-gradient(circle,#0b0b0c_0.95px,transparent_1.15px)_0_0/3px_3px] group-hover:opacity-100"
                />
                <div className="relative h-full rounded-2xl border border-ink/10 bg-paper p-7 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="display text-[1.7rem] leading-[1] tracking-[-0.03em]">{p.title}</h4>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/40 transition-colors group-hover:text-cobalt" />
                  </div>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/60">{p.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <li key={t} className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-ink/70">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
