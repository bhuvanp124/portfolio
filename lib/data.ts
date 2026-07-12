import {
  Award,
  BadgeCheck,
  BrainCircuit,
  Braces,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Globe,
  Github,
  Linkedin,
  Mail,
  Smartphone,
  Sparkles,
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
  { label: "LeetCode", href: siteConfig.handles.leetcode, icon: Code2 },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

/* -------------------------------------------------------------------------- */
/*  About                                                                     */
/* -------------------------------------------------------------------------- */

export const about = {
  headline:
    "I build software from the algorithm up — Android apps, AI platforms, and high-performance systems.",
  paragraphs: [
    "I'm a software engineer graduating in 2026 with a strong foundation in data structures, algorithms, and system design. Currently, I'm an Android Developer intern at MindMatrix, where I ship a Kotlin application end to end.",
    "My work spans the full stack — from crafting polished Material Design interfaces and integrating REST APIs, to architecting AI-driven platforms with Python and AWS, to squeezing performance out of low-level C++ systems that handle 10k+ requests per second.",
    "Having solved 400+ algorithmic problems and led hackathon teams, I pair engineering depth with a genuine bias for shipping. Right now, I'm looking for full-time software engineering roles where I can build products people rely on.",
  ],
  stats: [
    { value: "400+", label: "DSA problems solved" },
    { value: "8.20", label: "CGPA / 10" },
    { value: "6+", label: "Flagship projects" },
    { value: "2026", label: "Graduating" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Skills                                                                    */
/* -------------------------------------------------------------------------- */

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: Braces,
    skills: ["Java", "Kotlin", "Python", "C++", "R", "SQL", "JavaScript"],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    skills: ["Android SDK", "Kotlin", "Material Design", "REST API Integration"],
  },
  {
    title: "Data Science & AI",
    icon: BrainCircuit,
    skills: [
      "TensorFlow",
      "PyTorch",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "NLP",
      "LLMs",
      "OpenCV",
    ],
  },
  {
    title: "Web & Backend",
    icon: Globe,
    skills: ["Flask", "Streamlit", "HTML5", "CSS3", "REST APIs"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS (EC2, S3)", "Docker", "Git", "GitHub", "Google AI Studio"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MySQL", "MongoDB"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Experience                                                                */
/* -------------------------------------------------------------------------- */

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer Intern",
    company: "MindMatrix",
    period: "Dec 2025 – Present",
    location: "Bangalore, India",
    summary:
      "Building a Kotlin-based Android application, contributing across the full development lifecycle.",
    highlights: [
      "Building an Android application using Kotlin, contributing across the full development lifecycle.",
      "Implementing UI/UX screens following Material Design guidelines and exploring Google AI Studio for AI-assisted features.",
      "Integrating REST APIs for backend communication and optimizing app performance by resolving crashes and improving stability.",
    ],
  },
  {
    role: "B.E. in Computer Science (Data Science)",
    company: "RNS Institute of Technology",
    period: "Dec 2022 – June 2026",
    location: "Bangalore, India",
    summary: "CGPA: 8.20 / 10.0.",
    highlights: [
      "Focus on Data Structures & Algorithms, System Design, and Machine Learning.",
      "Active hackathon participant with a strong competitive-programming record.",
    ],
  },
  {
    role: "Pre-University Education (PCMB)",
    company: "Expert PU College",
    period: "Jun 2020 – Mar 2022",
    location: "Mangalore, India",
    summary: "Scored 92% in Physics, Chemistry, Mathematics & Biology.",
    highlights: [
      "Built the mathematical and analytical foundation for an engineering career.",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Projects                                                                  */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    title: "High-Throughput Application Load Balancer",
    description:
      "A Layer 7 load balancer in C++ handling 10k+ concurrent requests/second with minimal latency using non-blocking I/O and multithreaded request handling.",
    image: "/projects/load-balancer.svg",
    categories: ["Systems"],
    tech: ["C++", "Socket Programming", "Multithreading", "Non-blocking I/O"],
    features: [
      "10k+ concurrent requests/second",
      "Round-Robin & Least-Connection routing",
      "Active health checks & automatic failover (99.9% availability)",
    ],
    // TODO: add your GitHub / live demo links.
    github: siteConfig.handles.github,
    featured: true,
  },
  {
    title: "Adaptive Interview Training Platform",
    description:
      "An AI-powered interview simulator that uses LLMs to generate dynamic, context-aware technical questions tailored to each candidate's responses.",
    image: "/projects/interview-platform.svg",
    categories: ["AI/ML"],
    tech: ["Python", "NLP", "LLMs", "OpenCV", "AWS (EC2, S3)"],
    features: [
      "Context-aware question generation via LLMs",
      "Real-time sentiment & facial-expression feedback loop",
      "Deployed on AWS with low-latency REST APIs",
    ],
    github: siteConfig.handles.github,
    featured: true,
  },
  {
    title: "Crypto Quant Backtesting Engine",
    description:
      "An event-driven backtesting engine to simulate high-frequency trading strategies on minute-level OHLCV data, with rigorous risk validation.",
    image: "/projects/quant-engine.svg",
    categories: ["Quant"],
    tech: ["Python", "Pandas", "NumPy"],
    features: [
      "Event-driven HFT strategy simulation",
      "60% faster execution via vectorized NumPy",
      "Sharpe Ratio & Max Drawdown risk metrics",
    ],
    github: siteConfig.handles.github,
    featured: true,
  },
  {
    title: "Car Parts Marketplace",
    description:
      "A full-stack marketplace for buying and selling car parts — with listings, search, user accounts, and a cart & checkout flow.",
    image: "/projects/car-marketplace.svg",
    categories: ["Web"],
    tech: ["Next.js", "Express", "PostgreSQL", "REST APIs"],
    features: [
      "Product listings with search & filtering",
      "User authentication & accounts",
      "Cart and checkout flow",
    ],
    // TODO: confirm the exact repo URL.
    github: "https://github.com/bhuvanp124/car-parts-marketplace",
    featured: true,
  },
  {
    title: "3D Car Visualizer",
    description:
      "An interactive 3D car visualizer that lets users rotate, zoom, and customize vehicles in real time, right in the browser.",
    image: "/projects/car-3d.svg",
    categories: ["Web"],
    tech: ["Three.js", "React Three Fiber", "WebGL", "TypeScript"],
    features: [
      "Real-time 3D rendering",
      "Orbit, zoom & inspect controls",
      "Customizable colors & materials",
    ],
    // TODO: confirm the exact repo URL.
    github: "https://github.com/bhuvanp124/3D_-car_visualize",
    featured: true,
  },
  {
    title: "AI Report Generator",
    description:
      "An AI tool that turns raw data and prompts into polished, structured reports automatically using large language models.",
    image: "/projects/ai-report.svg",
    categories: ["AI/ML"],
    tech: ["Python", "LLMs", "NLP", "Streamlit"],
    features: [
      "LLM-powered report generation",
      "Template-driven, structured output",
      "Export to shareable formats",
    ],
    // TODO: confirm the exact repo URL.
    github: "https://github.com/bhuvanp124/ai-report-generator",
    featured: true,
  },
];

/* -------------------------------------------------------------------------- */
/*  Achievements                                                              */
/* -------------------------------------------------------------------------- */

export const achievements: Achievement[] = [
  {
    title: "400+ DSA Problems Solved",
    description:
      "Across LeetCode, Codeforces, and CSES — with a strong focus on dynamic programming and graph algorithms.",
    icon: Code2,
  },
  {
    title: "Salesforce Agentblazer",
    description:
      "Earned Trailhead points as an Agentblazer, gaining exposure to AI agent and CRM workflows.",
    icon: Sparkles,
  },
  {
    title: "NPTEL — Data Science for Engineers",
    description:
      "Earned the Elite certification in the NPTEL Data Science for Engineers program.",
    icon: Award,
  },
  {
    title: "Google Project Management",
    description: "Completed the Google Project Management certificate on Coursera.",
    icon: BadgeCheck,
  },
  {
    title: "Team Captain & Hackathons",
    description:
      "Captained the school football team and remain an active hackathon participant.",
    icon: Trophy,
  },
  {
    title: "8.20 / 10 CGPA",
    description:
      "Maintaining a strong academic record in B.E. Computer Science (Data Science).",
    icon: GraduationCap,
  },
];
