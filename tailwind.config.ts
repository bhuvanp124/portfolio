import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        // Core palette (see styles/globals.css for the CSS variables)
        background: "hsl(var(--background))",
        surface: "hsl(var(--surface))",
        card: "hsl(var(--card))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        // Light "paper" palette used by the home page.
        paper: "#f7f7f2",
        mist: "#ebebe5",
        ink: "#0b0b0c",
        navy: "#0b2740",
        cobalt: {
          DEFAULT: "#2457f5",
          light: "#6f93ff",
        },
        brand: {
          DEFAULT: "#3B82F6", // primary accent
          secondary: "#7C3AED", // secondary accent
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-funnel)", "Helvetica Neue", "Arial", "sans-serif"],
        grotesk: ["var(--font-grotesk)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.04), 0 8px 40px -12px rgba(59,130,246,0.35)",
        "glow-violet": "0 0 0 1px rgba(255,255,255,0.04), 0 8px 40px -12px rgba(124,58,237,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(0,0,0,0.7)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "intro-out": {
          to: { opacity: "0", visibility: "hidden" },
        },
        rise: {
          from: { transform: "translateY(105%)" },
          to: { transform: "translateY(0)" },
        },
        "drop-in": {
          from: { opacity: "0", transform: "translateY(-80px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 8s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        shimmer: "shimmer 2s infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        "intro-out": "intro-out 0.35s ease-in-out 0.15s forwards",
        rise: "rise 1.1s cubic-bezier(0.16, 1, 0.3, 1) both",
        "drop-in": "drop-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
