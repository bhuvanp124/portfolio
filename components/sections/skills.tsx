import { Reveal } from "@/components/motion/reveal";
import { skillCategories } from "@/lib/data";

export function Skills() {
  return (
    <section
      id="skills"
      className="lines lines--dark gutter relative scroll-mt-0 border-t border-ink/10 bg-paper py-32 text-ink"
      data-mascot="right"
      data-mood="point"
      data-bubble="dark"
      data-say="These are the tools I *reach for*."
    >
      <div>
        <h2 className="display text-[clamp(2.8rem,6.2vw,6rem)]">What I work with</h2>
        <p className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-ink/60">
          The tools I reach for, from the phone in your pocket to the server
          behind it.
        </p>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:w-[66%]">
        {skillCategories.map(({ title, icon: Icon, skills }, i) => (
          <Reveal key={title} delayIndex={i} className="group relative">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl opacity-0 transition-opacity duration-300 [background:radial-gradient(circle,#0b0b0c_0.95px,transparent_1.15px)_0_0/3px_3px] group-hover:opacity-100"
            />
            <div className="relative h-full rounded-2xl border border-ink/10 bg-paper p-7 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <h3 className="display text-[1.9rem] tracking-[-0.035em]">{title}</h3>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-cobalt text-paper">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-mist px-3 py-1 text-[0.82rem] font-medium text-ink/75"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
