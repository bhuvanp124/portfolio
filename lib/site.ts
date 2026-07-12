/**
 * Central site configuration used across metadata, SEO, and the UI.
 */
export const siteConfig = {
  name: "Bhuvan Prakash",
  role: "Software Engineer",
  // Used for SEO/OpenGraph absolute URLs.
  // TODO: set this to your real domain once deployed (e.g. your Vercel URL).
  url: "https://bhuvanprakash.dev",
  description:
    "Software Engineer with strong foundations in DSA and system design. I build Android apps, AI-driven platforms, and high-performance systems.",
  locale: "en_US",
  email: "bhuvanpdocs@gmail.com",
  phone: "+91 7411127981",
  location: "Bangalore, India",
  handles: {
    github: "https://github.com/bhuvanp124",
    linkedin: "https://www.linkedin.com/in/bhuvan-p-77168925a/",
    leetcode: "https://leetcode.com/u/Bhuvan_Prakash/",
  },
  // Path (in /public) to your resume PDF.
  resume: "/resume.pdf",
  keywords: [
    "Bhuvan Prakash",
    "Software Engineer",
    "Android Developer",
    "Kotlin",
    "Machine Learning",
    "Data Science",
    "Python",
    "AWS",
    "DSA",
    "System Design",
    "Portfolio",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
