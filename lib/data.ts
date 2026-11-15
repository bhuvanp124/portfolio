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
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Recognition", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

/** Words cycled through in the hero headline: "I build ___". */
export const heroWords = [
  "Android apps",
  "AI platforms",
  "fast systems",
  "web apps",
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
    "I'm a software engineer with a strong foundation in data structures, algorithms, and system design, fresh out of a 2026 B.E. in Computer Science. Most recently I was an Android Developer intern at MindMatrix, where I shipped a Kotlin application end to end.",
    "My work spans the full stack — from crafting polished Material Design interfaces and integrating REST APIs, to architecting AI-driven platforms with Python and AWS, to squeezing performance out of low-level C++ systems that handle 10k+ requests per second.",
    "Having solved 400+ algorithmic problems and led hackathon teams, I pair engineering depth with a genuine bias for shipping. I'm drawn to mobile development, machine learning, and quantitative analysis, and I'm looking for full-time software engineering roles where I can build products people rely on.",
  ],
  stats: [
    { value: "400+", label: "DSA problems solved" },
    { value: "8.20", label: "CGPA / 10" },
    { value: "6+", label: "Flagship projects" },
    { value: "2026", label: "Graduated" },
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
    period: "Jan 2026 – Jun 2026",
    location: "Bangalore, India",
    summary:
      "Built a Kotlin-based Android application, contributing across the full development lifecycle.",
    highlights: [
      "Developed production applications using Kotlin, contributing to feature development and software delivery.",
      "Built application workflows with REST APIs, implementing data validation, error handling, and reliable client-server communication.",
      "Resolved application issues and optimized performance, improving reliability and overall system stability.",
    ],
    years: "2026",
    mark: { letter: "M", bg: "#2457f5", fg: "#f7f7f2" },
    tech: ["Kotlin", "Android", "REST APIs"],
    scenes: [
      {
        art: "ship",
        caption: "Kotlin · shipped to production",
        say: "At *MindMatrix* I shipped production Android features in Kotlin.",
      },
      {
        art: "api",
        caption: "Client ⇄ server · validated",
        say: "I wired the app to its backend with *REST APIs*, validation and error handling.",
      },
      {
        art: "perf",
        caption: "Fewer issues · steadier app",
        say: "Then I hunted down issues and made the app *faster and steadier*.",
      },
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
    short: "RNS Institute of Technology",
    years: "2022 — 2026",
    mark: { letter: "R", bg: "#0b0b0c", fg: "#f7f7f2" },
    tech: ["DSA", "System Design", "Machine Learning"],
    scenes: [
      {
        art: "ring",
        caption: "B.E. Computer Science (Data Science)",
        say: "Computer Science at *RNSIT*, graduating with an 8.20 CGPA.",
        ring: { value: 8.2, max: 10, display: "8.20", label: "CGPA / 10" },
      },
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
    years: "2020 — 2022",
    mark: { letter: "E", bg: "#f6c7a7", fg: "#0b0b0c" },
    scenes: [
      {
        art: "ring",
        caption: "Pre-university · PCMB",
        say: "Before that, *92%* in Physics, Chemistry, Maths and Biology.",
        ring: { value: 92, max: 100, display: "92%", label: "PCMB" },
      },
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
    period: "Mar 2026",
    tech: ["C++", "Socket Programming", "Multithreading", "Non-blocking I/O"],
    features: [
      "10k+ concurrent requests/second",
      "Round-Robin & Least-Connection routing",
      "Active health checks & automatic failover (99.9% availability)",
    ],
    github: siteConfig.handles.github,
    featured: true,
    highlights: [
      {
        title: "10k+ requests/sec",
        text: "Handles over ten thousand concurrent requests every second while adding minimal latency overhead to each one.",
      },
      {
        title: "Smart routing",
        text: "Round-Robin and Least-Connection algorithms spread traffic evenly across backend server clusters.",
      },
      {
        title: "99.9% availability",
        text: "Active health checks pull failing servers out of the pool and fail over automatically during outages.",
      },
    ],
    scene: {
      color: "#f6c7a7",
      accent: "#c2410c",
      window: "lb · bash",
      outfit: 2,
      steps: [
        {
          lines: [
            "$ ./lb --algo least-conn --workers 8",
            "loaded 4 upstreams from lb.conf",
            "epoll: non-blocking accept loop ready",
            "listening on :8080",
            "▲ 10,000+ concurrent req/s",
          ],
          card: {
            label: "Layer 7 · C++",
            title: "10k+ requests a second",
            sub: "non-blocking I/O, multithreaded",
          },
          say: "This is my *load balancer*, written from scratch in C++.",
        },
        {
          lines: [
            "req 4211  GET /api/cart   → 10.0.0.11  (conns 3)",
            "req 4212  GET /api/items  → 10.0.0.13  (conns 2)",
            "req 4213  POST /api/pay   → 10.0.0.12  (conns 2)",
            "req 4214  GET /api/items  → 10.0.0.13  (conns 3)",
            "algo: least-connection",
          ],
          card: {
            label: "Routing",
            title: "Round-robin & least-connection",
            sub: "chosen per pool",
          },
          say: "It spreads traffic with *round-robin* or *least-connection* routing.",
        },
        {
          lines: [
            "✓ health  10.0.0.11  200  1.2ms",
            "✗ health  10.0.0.14  timeout → removed from pool",
            "  traffic rerouted to 3 healthy upstreams",
            "✓ health  10.0.0.14  200 → restored",
            "▲ 99.9% availability",
          ],
          card: {
            label: "Failover",
            title: "99.9% availability",
            sub: "active health checks",
          },
          say: "When a server dies, it notices and *routes around it*.",
        },
      ],
    },
  },
  {
    title: "Adaptive Interview Training Platform",
    description:
      "An AI-powered interview simulator that uses LLMs to generate dynamic, context-aware technical questions tailored to each candidate's responses.",
    image: "/projects/interview-platform.svg",
    categories: ["AI/ML"],
    period: "Jul 2025",
    tech: ["Python", "NLP", "LLMs", "OpenCV", "AWS (EC2, S3)"],
    features: [
      "Context-aware question generation via LLMs",
      "Real-time sentiment & facial-expression feedback loop",
      "Deployed on AWS with low-latency REST APIs",
    ],
    github: siteConfig.handles.github,
    featured: true,
    highlights: [
      {
        title: "Adaptive questions",
        text: "Every follow-up is generated from the candidate's previous answer instead of coming from a fixed question bank.",
      },
      {
        title: "Live feedback",
        text: "A real-time loop with NLP and OpenCV reads sentiment and facial expressions during the session.",
      },
      {
        title: "Built for scale",
        text: "Deployed on AWS EC2 and S3 behind REST APIs, keeping latency low for many concurrent users.",
      },
    ],
    scene: {
      color: "#c4b5f4",
      accent: "#5b3fd1",
      window: "interview · session",
      outfit: 1,
      steps: [
        {
          lines: [
            "> candidate: \"I'd use a hash map for lookups.\"",
            "llm  reading answer…",
            "llm  → \"What happens when two keys collide?\"",
            "llm  difficulty adjusted: medium → hard",
            "✓ question 4 of 10",
          ],
          card: {
            label: "LLM",
            title: "Questions that adapt",
            sub: "each follow-up reads your last answer",
          },
          say: "An *AI interviewer* that asks follow-ups based on your answers.",
        },
        {
          lines: [
            "cv   frame 1820  face detected",
            "cv   expression: focused",
            "nlp  sentiment: confident (0.82)",
            "nlp  filler words: 2",
            "✓ feedback updated live",
          ],
          card: {
            label: "Real-time feedback",
            title: "Sentiment + expression",
            sub: "NLP and OpenCV on every answer",
          },
          say: "It reads *sentiment* and *facial expression* while you talk.",
        },
        {
          lines: [
            "$ aws ec2 describe-instances --filter app=interview",
            "i-0a3f…  running  t3.medium",
            "s3   sessions/ → 1,204 recordings",
            "api  POST /answer  → 200",
            "✓ deployed",
          ],
          card: {
            label: "Deployed on",
            title: "AWS EC2 + S3",
            sub: "behind low-latency REST APIs",
          },
          say: "And it runs on *AWS*, behind low-latency REST APIs.",
        },
      ],
    },
  },
  {
    title: "Crypto Quant Backtesting Engine",
    description:
      "An event-driven backtesting engine to simulate high-frequency trading strategies on minute-level OHLCV data, with rigorous risk validation.",
    image: "/projects/quant-engine.svg",
    categories: ["Quant"],
    period: "Oct 2025",
    tech: ["Python", "Pandas", "NumPy"],
    features: [
      "Event-driven HFT strategy simulation",
      "60% faster execution via vectorized NumPy",
      "Sharpe Ratio & Max Drawdown risk metrics",
    ],
    github: siteConfig.handles.github,
    featured: true,
    highlights: [
      {
        title: "Event-driven core",
        text: "Treats market data as a stream of events, replaying minute-level OHLCV bars the way a live strategy would see them.",
      },
      {
        title: "60% faster",
        text: "Signal generation and processing rewritten with vectorized NumPy operations instead of Python loops.",
      },
      {
        title: "Risk-validated",
        text: "Sharpe Ratio and Max Drawdown statistically test every strategy before it is trusted with live money.",
      },
    ],
    scene: {
      color: "#a9e4cf",
      accent: "#0f766e",
      window: "backtest · python",
      outfit: 4,
      steps: [
        {
          lines: [
            "$ python run.py --pair BTC-USD --tf 1m",
            "loading minute-level OHLCV … done",
            "event  BAR    09:31  close 67,412.5",
            "event  SIGNAL long   size 0.25",
            "event  FILL   09:31  67,418.0",
          ],
          card: {
            label: "Event-driven",
            title: "Minute-level OHLCV",
            sub: "HFT strategies replayed bar by bar",
          },
          say: "A *backtesting engine* for high-frequency crypto strategies.",
        },
        {
          lines: [
            "profile  loop version",
            "  ████████████████████  100%",
            "profile  vectorized NumPy",
            "  ████████              40%",
            "▲ 60% faster execution",
          ],
          card: {
            label: "Vectorized",
            title: "60% faster",
            sub: "NumPy instead of Python loops",
          },
          say: "Rewriting the hot path in NumPy made it *60% faster*.",
        },
        {
          lines: [
            "risk report",
            "  sharpe ratio      ✓ computed",
            "  max drawdown      ✓ computed",
            "  exposure by hour  ✓ computed",
            "✓ strategy validated",
          ],
          card: {
            label: "Risk",
            title: "Sharpe ratio · max drawdown",
            sub: "every strategy gets a risk report",
          },
          say: "Every strategy gets a *risk report* before I trust it.",
        },
      ],
    },
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
    github: siteConfig.handles.github,
    featured: true,
    highlights: [
      {
        title: "Search & filters",
        text: "Product listings with search and filtering, so buyers can find the right part quickly.",
      },
      {
        title: "Accounts",
        text: "User authentication and accounts for the people buying and selling parts.",
      },
      {
        title: "Cart & checkout",
        text: "A complete cart and checkout flow, built across Next.js, Express and PostgreSQL.",
      },
    ],
    scene: {
      color: "#f3e28a",
      accent: "#8a6d00",
      window: "marketplace · api",
      outfit: 3,
      steps: [
        {
          lines: [
            "GET   /api/parts?q=brake+pads&make=honda",
            "200   listings returned",
            "GET   /api/parts/1182",
            "200   { title, price, seller, photos }",
            "✓ search + filters",
          ],
          card: {
            label: "Full stack",
            title: "Next.js · Express · PostgreSQL",
            sub: "listings, search and filtering",
          },
          say: "A *marketplace* for buying and selling car parts.",
        },
        {
          lines: [
            "POST  /api/auth/login        → 200",
            "POST  /api/cart  { partId: 1182, qty: 2 }",
            "201   cart updated",
            "POST  /api/checkout          → 201",
            "✓ order created",
          ],
          card: {
            label: "Accounts & checkout",
            title: "Cart to order, end to end",
            sub: "auth, cart and checkout flow",
          },
          say: "With accounts, a cart and a *checkout flow*, end to end.",
        },
      ],
    },
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
    github: siteConfig.handles.github,
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
    github: siteConfig.handles.github,
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
