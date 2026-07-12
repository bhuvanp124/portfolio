import {
  Award,
  Boxes,
  Braces,
  Cloud,
  Database,
  Github,
  Linkedin,
  Mail,
  Rocket,
  Sparkles,
  Star,
  Wrench,
  BrainCircuit,
  Trophy,
} from "lucide-react";

import type {
  Achievement,
  ExperienceItem,
  NavItem,
  Project,
  SkillCategory,
  SocialLink,
} from "@/types";
import { siteConfig } from "@/lib/site";

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

/* -------------------------------------------------------------------------- */
/*  Social links                                                              */
/* -------------------------------------------------------------------------- */

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: siteConfig.handles.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.handles.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

/* -------------------------------------------------------------------------- */
/*  About                                                                     */
/* -------------------------------------------------------------------------- */

// TODO: Rewrite this to your own story.
export const about = {
  headline: "I design and build software that feels effortless.",
  paragraphs: [
    "I'm a software engineer who recently graduated in 2026, focused on building performant, accessible, and beautiful products across the full stack.",
    "I care about the details most people never notice — the easing curve on a transition, the empty state, the millisecond a page takes to feel alive. I believe great engineering and great design are the same discipline.",
    "Currently seeking full-time software engineering roles where I can ship products used by real people.",
  ],
  stats: [
    { value: "15+", label: "Projects shipped" },
    { value: "3", label: "Internships" },
    { value: "1.2k+", label: "GitHub contributions" },
    { value: "∞", label: "Cups of coffee" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Skills                                                                    */
/* -------------------------------------------------------------------------- */

// TODO: Adjust categories and skills to reflect your real stack.
export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: Braces,
    skills: ["TypeScript", "JavaScript", "Python", "Go", "Java", "SQL"],
  },
  {
    title: "Frameworks",
    icon: Boxes,
    skills: ["React", "Next.js", "Node.js", "Express", "FastAPI", "Tailwind"],
  },
  {
    title: "Cloud",
    icon: Cloud,
    skills: ["Vercel", "AWS", "Docker", "Kubernetes", "Cloudflare"],
  },
  {
    title: "AI",
    icon: BrainCircuit,
    skills: ["OpenAI", "LangChain", "RAG", "Embeddings", "PyTorch"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "Figma", "Linear", "Vitest", "Playwright", "CI/CD"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Experience                                                                */
/* -------------------------------------------------------------------------- */

// TODO: Replace with your real experience.
export const experience: ExperienceItem[] = [
  {
    role: "Software Engineering Intern",
    company: "Acme Corp",
    period: "Summer 2025",
    location: "San Francisco, CA",
    summary:
      "Owned a customer-facing feature end to end on the growth team.",
    highlights: [
      "Built a real-time analytics dashboard used by 5k+ weekly users.",
      "Cut page load time by 42% through code-splitting and caching.",
      "Shipped an A/B tested onboarding flow that lifted activation 18%.",
    ],
  },
  {
    role: "Open Source Contributor",
    company: "Various Projects",
    period: "2024 — Present",
    location: "Remote",
    summary: "Contributing to developer tooling and UI libraries.",
    highlights: [
      "Merged 30+ PRs across popular TypeScript repositories.",
      "Authored documentation and examples used by thousands of devs.",
    ],
  },
  {
    role: "B.S. in Computer Science",
    company: "Your University",
    period: "2022 — 2026",
    location: "City, Country",
    summary: "Graduated with focus on systems and human-computer interaction.",
    highlights: [
      "Relevant coursework: Distributed Systems, Algorithms, HCI, ML.",
      "President of the coding club; led 3 hackathon-winning teams.",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Projects                                                                  */
/* -------------------------------------------------------------------------- */

// TODO: Replace with your real projects and drop images into /public/projects.
export const projects: Project[] = [
  {
    title: "Nebula Analytics",
    description:
      "A real-time analytics platform with sub-second dashboards, anomaly detection, and collaborative reporting.",
    image: "/projects/project-1.svg",
    categories: ["Web", "AI"],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "OpenAI"],
    features: [
      "Real-time streaming charts",
      "AI-powered anomaly detection",
      "Role-based access control",
    ],
    github: "https://github.com/yourusername/nebula",
    demo: "https://example.com",
    featured: true,
  },
  {
    title: "Orbit Chat",
    description:
      "An end-to-end encrypted messaging app with presence, typing indicators, and offline-first sync.",
    image: "/projects/project-2.svg",
    categories: ["Web", "Mobile"],
    tech: ["React", "Node.js", "WebSocket", "MongoDB"],
    features: ["E2E encryption", "Offline-first sync", "Cross-platform"],
    github: "https://github.com/yourusername/orbit",
    demo: "https://example.com",
    featured: true,
  },
  {
    title: "Prism UI",
    description:
      "An open-source, accessible React component library with 60+ headless primitives and theming.",
    image: "/projects/project-3.svg",
    categories: ["Open Source", "Web"],
    tech: ["React", "TypeScript", "Radix", "Tailwind"],
    features: ["60+ components", "WCAG AA compliant", "Fully themeable"],
    github: "https://github.com/yourusername/prism",
    demo: "https://example.com",
    featured: true,
  },
  {
    title: "Atlas Search",
    description:
      "A semantic search engine over documents using embeddings and a hybrid ranking model.",
    image: "/projects/project-4.svg",
    categories: ["AI"],
    tech: ["Python", "FastAPI", "PyTorch", "Postgres"],
    features: ["Vector + keyword hybrid", "Streaming answers", "Citations"],
    github: "https://github.com/yourusername/atlas",
    demo: "https://example.com",
  },
];

/* -------------------------------------------------------------------------- */
/*  Achievements                                                              */
/* -------------------------------------------------------------------------- */

// TODO: Replace with your real achievements.
export const achievements: Achievement[] = [
  {
    title: "1st Place — National Hackathon",
    description: "Led a team of 4 to build an award-winning accessibility tool in 36 hours.",
    icon: Trophy,
    date: "2025",
  },
  {
    title: "Dean's List",
    description: "Recognized for academic excellence across multiple semesters.",
    icon: Award,
    date: "2023 — 2026",
  },
  {
    title: "Open Source Star",
    description: "A personal project crossed 1,000 GitHub stars from the developer community.",
    icon: Star,
    date: "2024",
  },
  {
    title: "Top Intern Award",
    description: "Recognized as a top-performing intern for shipping high-impact features.",
    icon: Rocket,
    date: "2025",
  },
  {
    title: "Published Writer",
    description: "Wrote technical articles on web performance read by 50k+ developers.",
    icon: Sparkles,
    date: "2024 — Present",
  },
  {
    title: "Certified Cloud Practitioner",
    description: "Earned cloud certification demonstrating architecture fundamentals.",
    icon: Cloud,
    date: "2025",
  },
];
