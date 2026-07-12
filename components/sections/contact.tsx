"use client";

import { motion } from "framer-motion";
import { Check, Github, Linkedin, Mail, Send } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "sending" | "sent";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");

    // TODO: Wire this to a real backend (e.g. Resend, Formspree, or a Next.js
    // Route Handler at app/api/contact/route.ts). For now we open the user's
    // email client with a prefilled message — works with zero backend.
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;

    setTimeout(() => setStatus("sent"), 600);
  };

  return (
    <section id="contact" className="container scroll-mt-24 py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something"
            description="Have a role, a project, or just want to say hi? My inbox is always open."
          />

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="glass group flex items-center gap-3 rounded-xl p-4 transition-colors hover:border-brand/40"
            >
              <Mail className="h-5 w-5 text-brand" />
              <span className="text-sm text-foreground">{siteConfig.email}</span>
            </a>
            <div className="flex gap-3">
              <a
                href={siteConfig.handles.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex flex-1 items-center gap-3 rounded-xl p-4 transition-colors hover:border-brand/40"
              >
                <Github className="h-5 w-5 text-brand" />
                <span className="text-sm text-foreground">GitHub</span>
              </a>
              <a
                href={siteConfig.handles.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex flex-1 items-center gap-3 rounded-xl p-4 transition-colors hover:border-brand/40"
              >
                <Linkedin className="h-5 w-5 text-brand" />
                <span className="text-sm text-foreground">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <Reveal>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" name="name" required placeholder="Ada Lovelace" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="ada@example.com"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell me about your project…"
                />
              </div>
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                disabled={status === "sending"}
                className="mt-1 w-full"
              >
                {status === "sent" ? (
                  <>
                    <Check className="h-4 w-4" /> Opening your email…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send message
                  </>
                )}
              </Button>
              <motion.p
                initial={false}
                animate={{ opacity: status === "sent" ? 1 : 0 }}
                className="text-center text-xs text-muted"
              >
                Thanks! Your email client should have opened.
              </motion.p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
