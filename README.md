<div align="center">

# ✦ Portfolio

**A world-class, production-grade developer portfolio.**
Built with Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

Dark-first · Fully responsive · Accessible · SEO-optimized · Deploy-ready for Vercel.

</div>

---

## ✨ Features

- **Premium, handcrafted design** — glassmorphism, soft gradients, animated blobs, grid backgrounds.
- **Buttery animations** — page fade-in, scroll reveals, hover lift, animated navbar underline, gradient borders (Framer Motion, reduced-motion aware).
- **Command palette** — press `⌘K` / `Ctrl K` to jump anywhere.
- **Interactive extras** — scroll progress bar, back-to-top, custom intro loader, mouse spotlight, subtle particle field.
- **Sections** — Hero, About, Skills, Experience (timeline), Featured Projects (with filtering), Achievements, Résumé CTA, Contact form.
- **SEO built-in** — metadata, Open Graph + Twitter cards, **auto-generated OG image**, `robots.txt`, `sitemap.xml`, JSON-LD structured data, web manifest.
- **Accessible** — semantic HTML, keyboard navigation, skip link, focus states, ARIA labels, AA contrast.
- **Fast** — static rendering, dynamic imports for below-the-fold sections, `next/image`, `next/font` (Geist).

## 🧱 Tech Stack

| Layer      | Choice                                    |
| ---------- | ----------------------------------------- |
| Framework  | Next.js 15 (App Router)                   |
| Language   | TypeScript (strict)                       |
| Styling    | Tailwind CSS + CSS variables              |
| Components | shadcn/ui-style primitives (hand-authored)|
| Animation  | Framer Motion                             |
| Icons      | Lucide                                    |
| Fonts      | Geist Sans + Geist Mono (`next/font`)     |

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build & run production locally:

```bash
npm run build
npm run start
```

## 🎨 Customize everything

All content lives in **two files** — edit these first:

1. **`lib/site.ts`** — your name, role, email, domain, social links, résumé path, SEO keywords.
2. **`lib/data.ts`** — nav items, about text, skills, experience, projects, achievements.

Every placeholder is marked with a `// TODO` comment. Then:

- **Résumé** — replace `public/resume.pdf` with your real PDF.
- **Project images** — drop screenshots into `public/projects/` and update the `image` paths in `lib/data.ts`. (Remove the `unoptimized` prop in `components/sections/projects.tsx` once you use real raster images to enable `next/image` optimization.)
- **Favicon / logo mark** — edit `public/icon.svg`.
- **Colors** — change the palette once in `styles/globals.css` (`:root` CSS variables) and `tailwind.config.ts` (`brand` colors). Everything updates globally.
- **Fonts** — swap Geist for another `next/font` in `app/layout.tsx`.

## 🌐 Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo. Framework is auto-detected — no config needed.
3. Click **Deploy**. You get a live `*.vercel.app` URL in ~1 minute.

**Custom domain:** Vercel dashboard → your project → **Settings → Domains** → add `yourname.com` and follow the DNS instructions. HTTPS is automatic.
After deploying, set your real domain in `lib/site.ts` (`url`) so SEO/OG tags use absolute URLs.

## 📁 Project structure

```
app/                 App Router: layout, page, and SEO route files
  layout.tsx         Root layout — fonts, metadata, global overlays, JSON-LD
  page.tsx           Home page — composes all sections
  opengraph-image.tsx / twitter-image.tsx   Dynamic social images
  robots.ts · sitemap.ts · manifest.ts      SEO route handlers
components/
  ui/                shadcn-style primitives (button, card, badge, input, textarea)
  sections/          Page sections (hero, about, skills, …, contact)
  effects/           gradient-blobs, particles, mouse-spotlight
  motion/            reveal (scroll-reveal wrapper)
  navbar · footer · scroll-progress · back-to-top · loader · command-palette
hooks/               use-active-section, use-media-query, use-mounted
lib/                 site.ts (config), data.ts (content), utils.ts (cn)
types/               shared TypeScript types
styles/              globals.css (Tailwind + design tokens)
public/              icon.svg, resume.pdf, projects/*.svg
```

## 📈 Performance & a11y

Targets 100s across the board on Lighthouse. To verify:

```bash
npm run build && npm run start
# then run Lighthouse in Chrome DevTools against http://localhost:3000
```

## 📝 License

MIT — make it yours.
