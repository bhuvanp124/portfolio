"use client";

import { Code2, Download, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { PanelHeader } from "@/components/dashboard/primitives";
import { Button } from "@/components/ui/button";
import { availability, profile } from "@/lib/dashboard-data";
import { siteConfig } from "@/lib/site";

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Location", value: profile.location },
];

const socials = [
  { icon: Github, label: "GitHub", href: siteConfig.handles.github },
  { icon: Linkedin, label: "LinkedIn", href: siteConfig.handles.linkedin },
  { icon: Code2, label: "LeetCode", href: siteConfig.handles.leetcode },
];

export function ContactPanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHeader
        title="Contact"
        description="The fastest ways to reach me."
      />

      {/* CTA banner */}
      <div className="gradient-border relative overflow-hidden rounded-2xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/20 blur-3xl" />
        <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Let&apos;s build something.</h2>
            <p className="mt-1 text-sm text-muted">
              {availability.status} · start date: {availability.availableFrom}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="gradient" size="md" asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail className="h-4 w-4" /> Email me
              </a>
            </Button>
            <Button variant="secondary" size="md" asChild>
              <a href={profile.resume} download>
                <Download className="h-4 w-4" /> Résumé
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Direct channels */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-base font-semibold">Direct</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {channels.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-white/[0.02] text-brand">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">{label}</span>
                    <span className="block truncate text-sm font-medium">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      className="flex items-center gap-3 rounded-xl border border-transparent px-1 py-1 transition-colors hover:border-border hover:bg-white/[0.02]"
                    >
                      {inner}
                    </a>
                  ) : (
                    <span className="flex items-center gap-3 px-1 py-1">{inner}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Social */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-base font-semibold">Around the web</h3>
          <div className="mt-4 grid gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-sm transition-colors hover:border-white/15 hover:text-brand"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 font-medium">{label}</span>
                <span className="text-xs text-muted">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
