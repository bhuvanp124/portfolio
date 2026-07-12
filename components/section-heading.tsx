import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

/** Consistent section header: eyebrow label, large title, optional description. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-glow" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delayIndex={1}>
        <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          <span className="text-gradient">{title}</span>
        </h2>
      </Reveal>
      {description && (
        <Reveal delayIndex={2}>
          <p
            className={cn(
              "max-w-xl text-pretty text-muted",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
