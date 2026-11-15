"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { ExperienceItem, ExperienceScene } from "@/types";


/** How long each highlight stays up before the next one plays. */
const CYCLE_MS = 2500;

const INTRO = "Tap a role to see what I *actually did*.";

function Mark({ mark, size }: { mark: ExperienceItem["mark"]; size: "sm" | "lg" }) {
  if (!mark) return null;
  return (
    <span
      aria-hidden
      className={cn(
        "display grid shrink-0 place-items-center",
        size === "sm"
          ? "h-12 w-12 rounded-xl text-[1.5rem]"
          : "h-[5.5rem] w-[5.5rem] rounded-2xl text-[3rem] shadow-[0_18px_30px_-18px_rgba(11,11,12,0.6)]",
      )}
      style={{ background: mark.bg, color: mark.fg }}
    >
      {mark.letter}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Illustrations — small SVG scenes, one per highlight                       */
/* -------------------------------------------------------------------------- */

const PAPER = "#f7f7f2";
const SKY = "#6f93ff";
const GREEN = "#4ade80";

function Phone({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="96" height="176" rx="16" fill="#0f3354" stroke={PAPER} strokeOpacity="0.35" strokeWidth="2" />
      <rect x={x + 36} y={y + 8} width="24" height="5" rx="2.5" fill={PAPER} fillOpacity="0.3" />
    </g>
  );
}

function Chip({ x, y, w, label, tone = "dim", delay = 0 }: {
  x: number; y: number; w: number; label: string; tone?: "dim" | "sky" | "ok"; delay?: number;
}) {
  const fill = tone === "ok" ? "#123d2a" : tone === "sky" ? "#1b3f8f" : "#163c5e";
  const text = tone === "ok" ? GREEN : tone === "sky" ? "#cfdcff" : PAPER;
  return (
    <g className="xp-pop" style={{ animationDelay: `${delay}s` }}>
      <rect x={x} y={y} width={w} height="26" rx="13" fill={fill} />
      <text x={x + w / 2} y={y + 17.5} textAnchor="middle" fontSize="13" fontFamily="ui-monospace, monospace" fill={text}>
        {label}
      </text>
    </g>
  );
}

/** Kotlin features: screens assemble on a phone, then ride a pipeline to release. */
function ArtShip() {
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" aria-hidden>
      <Phone x={44} y={37} />
      {[0, 1, 2].map((i) => (
        <g key={i} className="xp-pop" style={{ animationDelay: `${0.2 + i * 0.35}s` }}>
          <rect x="56" y={62 + i * 46} width="72" height="36" rx="7" fill={PAPER} fillOpacity="0.14" />
          <rect x="64" y={71 + i * 46} width="38" height="6" rx="3" fill={PAPER} fillOpacity="0.55" />
          <rect x="64" y={83 + i * 46} width="52" height="5" rx="2.5" fill={PAPER} fillOpacity="0.25" />
        </g>
      ))}
      <path d="M150 125 H370" stroke={SKY} strokeOpacity="0.5" strokeWidth="2" strokeDasharray="4 6" />
      <Chip x={160} y={112} w={64} label="Kotlin" tone="sky" delay={0.4} />
      <Chip x={236} y={112} w={58} label="build" delay={0.8} />
      <Chip x={306} y={112} w={78} label="✓ release" tone="ok" delay={1.4} />
      <circle cx="160" cy="125" r="5" fill={SKY} className="xp-ride" style={{ "--ride": "212px", animationDelay: "0.6s" } as CSSProperties} />
    </svg>
  );
}

/** REST APIs: requests and responses travel between the app and its server. */
function ArtApi() {
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" aria-hidden>
      <Phone x={34} y={37} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="282" y={62 + i * 44} width="86" height="34" rx="7" fill="#0f3354" stroke={PAPER} strokeOpacity="0.3" strokeWidth="1.5" />
          <circle cx="296" cy={79 + i * 44} r="3.5" fill={GREEN} className="xp-blink" style={{ animationDelay: `${i * 0.4}s` }} />
          <rect x="308" y={76 + i * 44} width="46" height="5" rx="2.5" fill={PAPER} fillOpacity="0.25" />
        </g>
      ))}
      <path d="M136 110 H276" stroke={SKY} strokeOpacity="0.5" strokeWidth="2" strokeDasharray="4 6" />
      <path d="M136 140 H276" stroke={PAPER} strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 6" />
      <circle cx="136" cy="110" r="5" fill={SKY} className="xp-ride" style={{ "--ride": "140px" } as CSSProperties} />
      <circle cx="276" cy="140" r="5" fill={GREEN} className="xp-ride" style={{ "--ride": "-140px", animationDelay: "0.9s" } as CSSProperties} />
      <Chip x={160} y={72} w={92} label="POST /api" tone="sky" delay={0.2} />
      <Chip x={166} y={152} w={80} label="200 OK" tone="ok" delay={1.0} />
      <Chip x={148} y={200} w={116} label="✓ validated" delay={1.6} />
    </svg>
  );
}

/** Performance: an issue curve that trends down until the app is stable. */
function ArtPerf() {
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" aria-hidden>
      <text x="34" y="40" fontSize="13" fontFamily="ui-monospace, monospace" fill={PAPER} fillOpacity="0.55">
        issues
      </text>
      <path d="M34 196 H370" stroke={PAPER} strokeOpacity="0.2" strokeWidth="1.5" />
      <path d="M34 56 V196" stroke={PAPER} strokeOpacity="0.2" strokeWidth="1.5" />
      <path
        d="M40 64 L80 92 L108 74 L148 122 L186 104 L226 150 L262 140 L300 172 L344 180"
        fill="none"
        stroke={SKY}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="xp-draw"
        style={{ "--len": 420, strokeDasharray: 420 } as CSSProperties}
      />
      <circle cx="344" cy="180" r="6" fill={GREEN} className="xp-pop" style={{ animationDelay: "1.5s" }} />
      <Chip x={268} y={130} w={96} label="✓ stable" tone="ok" delay={1.7} />
    </svg>
  );
}

/** Education: a score drawn around a ring. */
function ArtRing({ ring }: { ring: NonNullable<ExperienceScene["ring"]> }) {
  const r = 74;
  const c = 2 * Math.PI * r;
  const to = c * (1 - ring.value / ring.max);
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" aria-hidden>
      <circle cx="200" cy="118" r={r} fill="none" stroke={PAPER} strokeOpacity="0.14" strokeWidth="14" />
      <circle
        cx="200"
        cy="118"
        r={r}
        fill="none"
        stroke={SKY}
        strokeWidth="14"
        strokeLinecap="round"
        transform="rotate(-90 200 118)"
        className="xp-ring"
        style={{ strokeDasharray: c, strokeDashoffset: to, "--c": c, "--to": to } as CSSProperties}
      />
      <text x="200" y="124" textAnchor="middle" fontSize="40" fontWeight="600" fill={PAPER} style={{ fontFamily: "var(--font-funnel)", letterSpacing: "-0.04em" }}>
        {ring.display}
      </text>
      <text x="200" y="146" textAnchor="middle" fontSize="13" fontFamily="ui-monospace, monospace" fill={PAPER} fillOpacity="0.6">
        {ring.label}
      </text>
    </svg>
  );
}

function Art({ item, scene }: { item: ExperienceItem; scene: ExperienceScene }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy text-paper shadow-[0_30px_60px_-34px_rgba(11,39,64,0.9)]">
      {item.mark && (
        <span className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-paper px-2.5 py-1 text-[0.72rem] font-medium text-ink">
          <span
            className="display grid h-4 w-4 place-items-center rounded-[5px] text-[0.65rem]"
            style={{ background: item.mark.bg, color: item.mark.fg }}
          >
            {item.mark.letter}
          </span>
          {item.short ?? item.company}
        </span>
      )}
      <div className="absolute inset-x-2 bottom-10 top-12">
        {scene.art === "ship" && <ArtShip />}
        {scene.art === "api" && <ArtApi />}
        {scene.art === "perf" && <ArtPerf />}
        {scene.art === "ring" && scene.ring && <ArtRing ring={scene.ring} />}
      </div>
      <p className="absolute bottom-4 left-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-paper/60">
        {scene.caption}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const item = open === null ? null : experience[open];
  const scenes = item?.scenes ?? [];
  const cycling = scenes.length > 1;
  const sceneIndex = Math.min(active, Math.max(0, scenes.length - 1));
  const say = scenes[sceneIndex]?.say ?? INTRO;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Walk through the open role's highlights while the section is on screen.
  useEffect(() => {
    if (!cycling || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % scenes.length), CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [active, open, inView, cycling, scenes.length]);

  return (
    <section
      ref={ref}
      id="experience"
      className="lines lines--dark gutter relative scroll-mt-0 border-t border-ink/10 bg-paper pb-32 pt-28 text-ink md:pt-36"
      data-mascot="badge"
      data-bubble="dark"
      data-say={say}
    >
      <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-5">
        <div className="lg:col-span-4">
          <h2 className="display text-[clamp(2.8rem,6.2vw,6rem)]">Experience</h2>
          <p className="mt-5 text-[1.05rem] text-ink/60">Click any role for the details.</p>
        </div>

        <div className="min-w-0 lg:col-span-7 lg:col-start-6">
          <ol className="border-t border-ink/15">
            {experience.map((it, i) => {
              const isOpen = open === i;
              const panelId = `xp-panel-${i}`;
              const itScenes = it.scenes ?? [];
              const itCycling = itScenes.length > 1;
              return (
                <li key={it.company} className="border-b border-ink/15">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => {
                      setOpen(isOpen ? null : i);
                      setActive(0);
                    }}
                    className={cn(
                      "group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 px-3 py-4 text-left transition-colors duration-300 md:grid-cols-[auto_minmax(0,1.1fr)_minmax(0,1fr)_auto] md:gap-x-6",
                      isOpen ? "bg-cobalt text-paper" : "hover:bg-ink/[0.03]",
                    )}
                  >
                    <Mark mark={it.mark} size="sm" />
                    <span className="min-w-0">
                      <span className="display block text-[clamp(1.35rem,2.1vw,1.9rem)] leading-[1] tracking-[-0.03em]">
                        {it.short ?? it.company}
                      </span>
                      <span className={cn("mt-1 block text-sm md:hidden", isOpen ? "text-paper" : "text-ink/60")}>
                        {it.role}
                      </span>
                    </span>
                    <span className={cn("hidden text-[0.95rem] md:block", isOpen ? "text-paper" : "text-ink/65")}>
                      {it.role}
                    </span>
                    <span className="flex items-center gap-4">
                      <span className={cn("hidden font-mono text-xs sm:inline", isOpen ? "text-paper" : "text-ink/65")}>
                        {it.years}
                      </span>
                      {isOpen ? <Minus className="h-5 w-5" aria-hidden /> : <Plus className="h-5 w-5" aria-hidden />}
                    </span>
                  </button>

                  <div
                    id={panelId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-smooth",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      {isOpen && (
                        <div className="grid gap-8 px-3 pb-10 pt-7 md:grid-cols-2 md:gap-10">
                          <div className="min-w-0">
                            <div className="flex items-center gap-5">
                              <Mark mark={it.mark} size="lg" />
                              <div>
                                <p className="display text-[1.55rem] leading-[1.02] tracking-[-0.03em]">{it.role}</p>
                                <p className="mt-1.5 text-sm text-ink/60">
                                  {it.period} · {it.location.split(",")[0]}
                                </p>
                                <p className="mt-1 text-sm font-medium text-cobalt">{it.summary}</p>
                              </div>
                            </div>

                            <ul className="mt-6 space-y-1.5">
                              {it.highlights.map((h, j) => {
                                const lit = itCycling && j === sceneIndex;
                                const body = (
                                  <>
                                    <span
                                      className={cn(
                                        "mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                                        lit ? "bg-cobalt" : "bg-cobalt/40",
                                      )}
                                    />
                                    <span>{h}</span>
                                  </>
                                );
                                return (
                                  <li key={h}>
                                    {itCycling ? (
                                      <button
                                        type="button"
                                        onClick={() => setActive(j)}
                                        className={cn(
                                          "flex w-full gap-3 rounded-xl px-3 py-2.5 text-left text-[0.95rem] leading-snug transition-colors duration-300",
                                          lit ? "bg-cobalt/10 text-ink" : "text-ink/65 hover:bg-ink/[0.04]",
                                        )}
                                      >
                                        {body}
                                      </button>
                                    ) : (
                                      <p className="flex gap-3 px-3 py-2 text-[0.95rem] leading-snug text-ink/70">{body}</p>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>

                            {it.tech && (
                              <ul className="mt-6 flex flex-wrap gap-2">
                                {it.tech.map((t) => (
                                  <li
                                    key={t}
                                    className="rounded-full border border-ink/15 bg-paper px-3.5 py-1.5 text-[0.82rem] font-medium text-ink/75"
                                  >
                                    {t}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          {itScenes.length > 0 && (
                            <div className="min-w-0">
                              <div key={`${i}-${sceneIndex}`} className="animate-fade-up">
                                <Art item={it} scene={itScenes[sceneIndex]} />
                              </div>
                              {itCycling && (
                                <div className="mt-3 flex gap-2" aria-hidden>
                                  {itScenes.map((_, j) => (
                                    <span key={j} className="h-[3px] flex-1 overflow-hidden rounded-full bg-ink/10">
                                      <span
                                        key={j === sceneIndex ? `on-${active}` : "off"}
                                        className={cn(
                                          "block h-full bg-cobalt",
                                          j < sceneIndex && "w-full",
                                          j > sceneIndex && "w-0",
                                          j === sceneIndex && (inView ? "xp-fill" : "w-0"),
                                        )}
                                        style={j === sceneIndex ? { animationDuration: `${CYCLE_MS}ms` } : undefined}
                                      />
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {["400+ DSA problems", "NPTEL Elite", "Salesforce Agentblazer"].map((b) => (
              <li
                key={b}
                className="flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2 text-[0.88rem] font-medium"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cobalt" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
