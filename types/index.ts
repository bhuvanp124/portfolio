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
}

export interface Achievement {
  title: string;
  description: string;
  icon: LucideIcon;
  date?: string;
}
