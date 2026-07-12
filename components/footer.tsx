import { socialLinks } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <p className="text-sm text-muted">
          © {year} {siteConfig.name}. Crafted with Next.js &amp; Tailwind.
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted transition-colors hover:text-foreground"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
