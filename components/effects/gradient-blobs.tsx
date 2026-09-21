import { cn } from "@/lib/utils";

/**
 * Soft gradient blobs used as ambient background lighting.
 *
 * A `blur()` of this radius over an element this large is one of the most
 * expensive things a mobile GPU can be asked to composite, and these used to
 * run an infinite `float` animation — which keeps repainting even once the
 * hero has scrolled away, making every section below it scroll badly. Phones
 * now get a cheap static radial wash instead; the animated blobs are reserved
 * for `md` and up, where there is GPU budget for them.
 */
export function GradientBlobs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* Phones: one flat, unblurred gradient wash. No filter, no animation. */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "radial-gradient(60% 40% at 15% 0%, rgba(59,130,246,0.18), transparent 70%), radial-gradient(55% 35% at 90% 25%, rgba(124,58,237,0.16), transparent 70%)",
        }}
      />

      {/* md+: the full effect. */}
      <div className="absolute -left-40 top-[-10%] hidden h-[36rem] w-[36rem] animate-float rounded-full bg-brand/20 blur-[120px] md:block" />
      <div
        className="absolute right-[-15%] top-[20%] hidden h-[32rem] w-[32rem] animate-float rounded-full bg-brand-secondary/20 blur-[130px] md:block"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="absolute bottom-[-20%] left-1/3 hidden h-[30rem] w-[30rem] animate-float rounded-full bg-indigo-500/10 blur-[120px] md:block"
        style={{ animationDelay: "-6s" }}
      />
    </div>
  );
}
