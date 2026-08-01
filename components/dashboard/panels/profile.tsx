"use client";

import { BadgeCheck, Code2, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { PanelHeader } from "@/components/dashboard/primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/dashboard-data";
import { siteConfig } from "@/lib/site";

const links = [
  { label: "GitHub", href: siteConfig.handles.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.handles.linkedin, icon: Linkedin },
  { label: "LeetCode", href: siteConfig.handles.leetcode, icon: Code2 },
];

export function ProfilePanel() {
  return (
    <div className="flex flex-col gap-6">
      <PanelHeader title="Profile" description="Who I am and how to reach me." />

      {/* Identity header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="h-28 bg-gradient-to-r from-brand/30 via-brand-secondary/25 to-transparent" />
        <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <span className="-mt-10 grid h-20 w-20 place-items-center rounded-2xl border-4 border-card bg-gradient-to-tr from-brand to-brand-secondary text-2xl font-bold text-white shadow-glow">
              {profile.initials}
            </span>
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{profile.name}</h2>
                <BadgeCheck className="h-[1.125rem] w-[1.125rem] text-brand" />
              </div>
              <p className="text-sm text-muted">{profile.role}</p>
            </div>
          </div>
          <Badge variant="brand" className="gap-1.5">
            <MapPin className="h-3 w-3" /> {profile.location}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* About */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card lg:col-span-2">
          <h3 className="text-base font-semibold">About</h3>
          <p className="mt-3 text-pretty font-medium leading-relaxed">{profile.headline}</p>
          <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-muted">
            {profile.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Contact + links */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="text-base font-semibold">Contact</h3>
            <ul className="mt-4 flex flex-col gap-4 text-sm">
              {[
                { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
                { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
                { icon: MapPin, label: profile.location },
              ].map(({ icon: Icon, label, href }) => {
                const content = (
                  <>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-white/[0.02] text-muted">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 truncate">{label}</span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="flex items-center gap-3 transition-colors hover:text-brand">
                        {content}
                      </a>
                    ) : (
                      <span className="flex items-center gap-3">{content}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <h3 className="text-base font-semibold">Links</h3>
            <div className="mt-4 flex flex-col gap-2">
              {links.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.02] px-3 py-2.5 text-sm transition-colors hover:border-white/15 hover:text-brand"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{label}</span>
                  <span className="text-xs text-muted">↗</span>
                </a>
              ))}
            </div>
            <Button variant="primary" size="sm" className="mt-4 w-full" asChild>
              <a href={profile.resume} download>
                Download résumé
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
