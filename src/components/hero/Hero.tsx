"use client";

import dynamic from "next/dynamic";
import { ArrowRight, Mail } from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { HeroIntro } from "@/components/hero/HeroIntro";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

const HeroScene = dynamic(
  () => import("@/components/hero/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden border-b border-border"
    >
      <HeroScene />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,var(--color-background)_92%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-32 sm:px-8 lg:px-10">
        <HeroIntro />

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="#contact">
            {site.cta.primary}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href="#projects" variant="secondary">
            {site.cta.secondary}
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className="flex items-center gap-2 text-sm text-ink-secondary">
            <span
              className="relative flex h-2 w-2"
              aria-hidden="true"
            >
              {site.availability.isAvailable && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  site.availability.isAvailable ? "bg-success" : "bg-ink-muted"
                }`}
              />
            </span>
            {site.availability.label}
          </div>

          <div className="flex items-center gap-4 text-ink-secondary">
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="transition-colors hover:text-ink"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className="transition-colors hover:text-ink"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Send an email"
              className="transition-colors hover:text-ink"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
