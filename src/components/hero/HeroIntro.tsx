"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { site } from "@/config/site";

export function HeroIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const targets = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
      if (prefersReducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(targets, { opacity: 0, y: 24 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <p
        data-hero-item
        className="text-sm font-medium uppercase tracking-[0.25em] text-accent"
      >
        {site.title} · {site.experienceYears} Years Experience
      </p>

      <h1
        data-hero-item
        className="mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
      >
        {site.tagline}
      </h1>

      <p
        data-hero-item
        className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-secondary"
      >
        {site.shortBio} I&apos;m {site.name}, and I work across the stack — React and
        Next.js on the front end, Node.js and PostgreSQL underneath, and AI APIs and
        n8n automation wherever they genuinely make a product smarter.
      </p>
    </div>
  );
}
