import {
  Award,
  BriefcaseBusiness,
  CalendarCheck,
  LayoutDashboard,
  Mail,
  Newspaper,
  Rocket,
  User,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { about, experience } from "@/lib/data";
import { siteConfig } from "@/lib/site";

/* -------------------------------------------------------------------------- */
/*  Recruiter snapshot dashboard — a public, at-a-glance professional view.   */
/*  Content is sourced from the real portfolio data in lib/data.ts.           */
/* -------------------------------------------------------------------------- */

export type DashboardViewId =
  | "overview"
  | "profile"
  | "projects"
  | "experience"
  | "availability"
  | "skills"
  | "recognition"
  | "updates"
  | "contact";

export interface DashboardNavItem {
  id: DashboardViewId;
  label: string;
  icon: LucideIcon;
}

export const dashboardNav: DashboardNavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: User },
  { id: "projects", label: "Projects", icon: Rocket },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "availability", label: "Availability", icon: CalendarCheck },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "recognition", label: "Recognition", icon: Award },
  { id: "updates", label: "Updates", icon: Newspaper },
  { id: "contact", label: "Contact", icon: Mail },
];

/* -------------------------------------------------------------------------- */
/*  Profile summary                                                            */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: siteConfig.name,
  role: siteConfig.role,
  location: siteConfig.location,
  email: siteConfig.email,
  phone: siteConfig.phone,
  resume: siteConfig.resume,
  initials: siteConfig.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase(),
  tagline: "Software engineer, graduating 2026 — building from the algorithm up.",
  headline: about.headline,
  paragraphs: about.paragraphs,
  /** Headline KPI tiles, reused from the portfolio's About stats. */
  stats: about.stats,
} as const;

/* -------------------------------------------------------------------------- */
/*  Availability                                                               */
/* -------------------------------------------------------------------------- */

export const availability = {
  open: true,
  status: "Open to full-time roles",
  availableFrom: "Immediate",
  current: {
    role: experience[0].role,
    company: experience[0].company,
    note: "Most recent role · completed June 2026",
  },
  roles: [
    "Software Engineer",
    "Android Developer",
    "Backend Engineer",
    "ML Engineer",
  ],
  workModes: ["On-site", "Hybrid", "Remote"],
  locations: ["Bangalore, India", "Open to relocation", "Remote (India)"],
  preferences: [
    { label: "Employment", value: "Full-time · New grad" },
    { label: "Start date", value: "Immediate" },
    { label: "Notice", value: "None — available to start now" },
    { label: "Visa", value: "India — no sponsorship needed locally" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Recognition — real achievements/certifications from the portfolio.        */
/*  (Genuine LinkedIn recommendations can be dropped into `testimonials`.)    */
/* -------------------------------------------------------------------------- */

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

/** Intentionally empty: add real, attributable recommendations here. */
export const testimonials: Testimonial[] = [];

/* -------------------------------------------------------------------------- */
/*  Updates — latest professional news, derived from real facts.              */
/* -------------------------------------------------------------------------- */

export type UpdateType = "role" | "milestone" | "status" | "education";

export interface Update {
  id: string;
  type: UpdateType;
  title: string;
  body: string;
  time: string;
}

export const updates: Update[] = [
  {
    id: "u1",
    type: "status",
    title: "Open to full-time SWE roles for 2026",
    body: "Actively interviewing for software engineering positions starting July 2026.",
    time: "This month",
  },
  {
    id: "u2",
    type: "role",
    title: "Joined MindMatrix as a Software Engineer Intern",
    body: "Shipped production Kotlin features and built REST-API-backed application workflows through June 2026.",
    time: "Jan 2026",
  },
  {
    id: "u3",
    type: "milestone",
    title: "Crossed 400+ DSA problems solved",
    body: "Across LeetCode, Codeforces, and CSES, with a focus on dynamic programming and graphs.",
    time: "2025",
  },
  {
    id: "u4",
    type: "milestone",
    title: "Built a Layer-7 load balancer handling 10k+ req/s",
    body: "A high-throughput C++ systems project using non-blocking I/O and multithreaded request handling.",
    time: "Mar 2026",
  },
  {
    id: "u5",
    type: "education",
    title: "Graduating B.E. Computer Science (Data Science)",
    body: "RNS Institute of Technology · CGPA 8.20 / 10 · expected June 2026.",
    time: "June 2026",
  },
];
