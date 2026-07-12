import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "@/styles/globals.css";

import { BackToTop } from "@/components/back-to-top";
import { CommandPalette } from "@/components/command-palette";
import { Loader } from "@/components/loader";
import { MouseSpotlight } from "@/components/effects/mouse-spotlight";
import { ScrollProgress } from "@/components/scroll-progress";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: `${siteConfig.name} — Portfolio`,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // JSON-LD structured data describing the person/site.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
    email: siteConfig.email,
    address: { "@type": "PostalAddress", addressLocality: siteConfig.location },
    sameAs: [
      siteConfig.handles.github,
      siteConfig.handles.linkedin,
      siteConfig.handles.leetcode,
    ],
  };

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans">
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:shadow-glow"
        >
          Skip to content
        </a>

        <Loader />
        <ScrollProgress />
        <MouseSpotlight />
        <CommandPalette />

        {children}

        <BackToTop />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
