import { siteConfig } from "@/lib/site";

/**
 * A brief brand veil shown over the first paint.
 *
 * This is deliberately a server component with a pure-CSS exit animation: it
 * must never wait for React to hydrate. An earlier version held the overlay
 * open with a `useEffect` timer, which meant the page stayed blank for the
 * whole JS download + hydrate cost *plus* ~1.9s of timer and fade. The veil
 * now clears ~0.5s after first paint regardless of how slow the JS is, and
 * collapses to nothing under `prefers-reduced-motion`.
 */
export function Loader() {
  const initials = siteConfig.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] grid animate-intro-out place-items-center bg-background"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative grid h-20 w-20 place-items-center">
          <span className="absolute inset-0 animate-spin-slow rounded-2xl bg-gradient-to-tr from-brand to-brand-secondary opacity-70 blur-md" />
          <span className="relative grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-card text-2xl font-bold tracking-tight text-gradient">
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
}
