/**
 * Central site configuration used across metadata, SEO, and the UI.
 */
export const siteConfig = {
  name: "Bhuvan Prakash",
  role: "Software Engineer",
  // Used for SEO/OpenGraph absolute URLs. Must be a domain that actually
  // resolves: canonical tags, the sitemap and the OG/Twitter image URLs are all
  // built from it, so a dead value breaks link previews and misdirects
  // indexing. Override with NEXT_PUBLIC_SITE_URL once a custom domain is live.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://portfolio-bhuvanp124s-projects.vercel.app",
  description:
    "Software engineer with strong foundations in data structures, algorithms, and system design — building Android apps, AI-driven platforms, and high-performance systems.",
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
  resume: "/Bhuvan-Prakash-Resume.pdf",
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
