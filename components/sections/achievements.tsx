import { Reveal } from "@/components/motion/reveal";
import { achievements } from "@/lib/data";

export function Achievements() {
  return (
    <section
      id="achievements"
      className="lines gutter relative scroll-mt-0 border-t border-white/10 bg-ink pb-32 pt-24 text-paper"
      data-mascot="right"
      data-mood="thumbs"
      data-say="A few things I'm *proud of*."
    >
      <h2 className="display text-[clamp(2.8rem,6.2vw,6rem)]">Recognition</h2>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:w-[66%]">
        {achievements.map(({ title, description, icon: Icon }, i) => (
          <Reveal key={title} delayIndex={i} className="bg-ink p-7">
            <Icon className="h-6 w-6 text-cobalt-light" aria-hidden />
            <h3 className="mt-6 display text-[1.6rem] leading-[1] tracking-[-0.03em]">
              {title}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/55">{description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
