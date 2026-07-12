import { cn } from "@/lib/utils";

/** Soft, slowly floating gradient blobs used as ambient background lighting. */
export function GradientBlobs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute -left-40 top-[-10%] h-[36rem] w-[36rem] animate-float rounded-full bg-brand/20 blur-[120px]" />
      <div
        className="absolute right-[-15%] top-[20%] h-[32rem] w-[32rem] animate-float rounded-full bg-brand-secondary/20 blur-[130px]"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="absolute bottom-[-20%] left-1/3 h-[30rem] w-[30rem] animate-float rounded-full bg-indigo-500/10 blur-[120px]"
        style={{ animationDelay: "-6s" }}
      />
    </div>
  );
}
