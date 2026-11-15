import { ArrowDown } from "lucide-react";

import { WordRotor } from "@/components/word-rotor";
import { heroWords } from "@/lib/data";
import { siteConfig } from "@/lib/site";

/**
 * The hero is a server component on purpose.
 *
 * The <h1> is the LCP element, so it must paint without waiting for
 * hydration. Its entrance is a pure-CSS masked rise; only the rotating word
 * is a client island, and it server-renders the first word.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="lines gutter relative flex h-svh min-h-[600px] flex-col overflow-hidden bg-cobalt text-paper"
      data-mascot="right"
      data-mood="hello"
      data-phone="big"
      data-say="Hey, I'm Bhuvan. Scroll down and I'll *walk you through* it."
    >
      <header className="flex items-start justify-between pt-6 md:pt-7">
        <a
          href="#top"
          className="display text-[1.55rem] leading-[1.05] tracking-[-0.03em] md:text-[1.9rem]"
        >
          {siteConfig.name}
          <span className="block font-light">{siteConfig.role}</span>
        </a>
        <a href="#contact" className="pill pill--down">
          <span className="pill__face">
            Get in touch
            <ArrowDown className="arrow h-4 w-4" aria-hidden />
          </span>
        </a>
      </header>

      <h1 className="display mt-[16vh] text-[clamp(3.4rem,10.4vw,10rem)] md:mt-auto md:pb-[6vh]">
        <span className="rise">
          <span className="block animate-rise">I build</span>
        </span>
        <span className="rise">
          <span className="block animate-rise [animation-delay:90ms]">
            <WordRotor words={heroWords} />
          </span>
        </span>
        <span className="rise">
          <span className="block animate-rise font-light [animation-delay:180ms]">
            that ship.
          </span>
        </span>
      </h1>

      <p className="mb-16 mt-8 max-w-md animate-fade-up text-[1.05rem] leading-relaxed text-paper/75 [animation-delay:300ms] md:absolute md:bottom-[8vh] md:right-10 md:mb-0 md:mt-0 md:max-w-sm lg:hidden">
        Software engineer in {siteConfig.location.split(",")[0]}. Kotlin on
        Android, Python and LLMs on AWS, and C++ that handles 10k+ requests a
        second.
      </p>

      <div className="edge [--edge:#f7f7f2]" aria-hidden />
    </section>
  );
}
