import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Resume } from "@/components/sections/resume";
import { Skills } from "@/components/sections/skills";

// These were previously `next/dynamic` imports to "trim the initial JS
// payload". On a fully static page that mostly bought a chunk-fetch waterfall
// after hydration; importing them directly lets the whole page ship in one pass.
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
