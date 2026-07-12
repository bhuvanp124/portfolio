import dynamic from "next/dynamic";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";

// Below-the-fold sections are dynamically imported to trim the initial JS
// payload and improve time-to-interactive.
const Experience = dynamic(() =>
  import("@/components/sections/experience").then((m) => m.Experience),
);
const Projects = dynamic(() =>
  import("@/components/sections/projects").then((m) => m.Projects),
);
const Achievements = dynamic(() =>
  import("@/components/sections/achievements").then((m) => m.Achievements),
);
const Resume = dynamic(() =>
  import("@/components/sections/resume").then((m) => m.Resume),
);
const Contact = dynamic(() =>
  import("@/components/sections/contact").then((m) => m.Contact),
);

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
