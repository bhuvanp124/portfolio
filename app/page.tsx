import { MascotLoader } from "@/components/mascot";
import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";

// Sections are imported directly (not `next/dynamic`): on a fully static page
// that lets the whole page ship in one pass instead of a chunk waterfall.
export default function HomePage() {
  return (
    <main id="main" className="bg-paper font-grotesk text-ink">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Achievements />
      <Contact />
      <MascotLoader />
    </main>
  );
}
