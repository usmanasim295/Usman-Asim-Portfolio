"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in seconds applied on top of the base animation. */
  delay?: number;
  /** Direction the content travels in from. */
  from?: "up" | "left" | "right" | "none";
  className?: string;
}

const OFFSETS: Record<NonNullable<RevealProps["from"]>, gsap.TweenVars> = {
  up: { y: 32 },
  left: { x: -32 },
  right: { x: 32 },
  none: {},
};

/** Fades + slides content into view once as it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  from = "up",
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(el, { opacity: 1, x: 0, y: 0 });
        return;
      }

      gsap.set(el, { opacity: 0, ...OFFSETS[from] });

      gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
