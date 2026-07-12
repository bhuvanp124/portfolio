/**
 * Central site configuration used across metadata, SEO, and the UI.
 * TODO: Replace every value below with your own details.
 */
export const siteConfig = {
  name: "Your Name",
  role: "Software Engineer",
  // Used for SEO/OpenGraph absolute URLs. TODO: set to your real domain before deploy.
  url: "https://your-domain.com",
  description:
    "Software engineer crafting fast, elegant, human-centered products for the web.",
  locale: "en_US",
  email: "you@example.com",
  handles: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    x: "https://x.com/yourusername",
  },
  // Twitter/X username for twitter card metadata (with @).
  twitter: "@yourusername",
  // Path (in /public) to your resume PDF. TODO: drop your resume.pdf into /public.
  resume: "/resume.pdf",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
