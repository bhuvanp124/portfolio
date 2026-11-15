import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string; // in-page anchor, e.g. "#projects"
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
}

export type ProjectCategory =
  | "All"
  | "AI/ML"
  | "Web"
  | "Systems"
  | "Quant"
  | "Mobile";

export interface Project {
  title: string;
  description: string;
  image: string;
  categories: Exclude<ProjectCategory, "All">[];
  tech: string[];
  features: string[];
  period?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  /** Key points shown in the showcase: a short headline and one sentence each. */
  highlights?: { title: string; text: string }[];
  /** Pinned, step-by-step showcase. Projects without one are listed compactly. */
  scene?: ProjectScene;
}

export interface SceneStep {
  /** Lines shown in the mock window for this step. */
  lines: string[];
  /** Floating callout card. */
  card: { label: string; title: string; sub?: string };
  /** What the mascot says; wrap a phrase in *asterisks* to highlight it. */
  say: string;
}

export interface ProjectScene {
  /** Background colour of the pinned scene. */
  color: string;
  /** Darker shade used for highlights on that background. */
  accent: string;
  /** Label in the mock window's title pill. */
  window: string;
  /** What the mascot wears during this project (index into OUTFITS). */
  outfit: number;
  steps: SceneStep[];
}

export interface Achievement {
  title: string;
  description: string;
  icon: LucideIcon;
  date?: string;
}
