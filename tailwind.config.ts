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
        brand: {
          DEFAULT: "#3B82F6", // primary accent
          secondary: "#7C3AED", // secondary accent
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
        float: "float 8s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        shimmer: "shimmer 2s infinite",
        "spin-slow": "spin-slow 14s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
