"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { id: "user", label: "User" },
  { id: "ai", label: "AI Layer" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "automation", label: "Automation" },
  { id: "output", label: "Output" },
];

/**
 * Animated system diagram: draws the connecting line between each stage and
 * fades the stage nodes in as the section scrolls into view, visualizing how
 * a request actually flows through an AI-powered product.
 */
export function AiFlowDiagram() {
  const containerRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = containerRef.current;
      if (!svg) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const path = svg.querySelector<SVGPathElement>("[data-flow-path]");
      const nodes = gsap.utils.toArray<SVGGElement>("[data-flow-node]");

      if (prefersReducedMotion || !path) {
        gsap.set(nodes, { opacity: 1, scale: 1 });
        return;
      }

      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(nodes, { opacity: 0, scale: 0.85, transformOrigin: "center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.to(path, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }).to(
        nodes,
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.18, ease: "back.out(1.6)" },
        "-=1.2"
      );
    },
    { scope: containerRef }
  );

  const nodeCount = stages.length;
  const margin = 90;
  const width = 1000;
  const usableWidth = width - margin * 2;
  const spacing = usableWidth / (nodeCount - 1);
  const points = stages.map((stage, index) => ({
    ...stage,
    x: margin + index * spacing,
  }));

  const pathD = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} 130`)
    .join(" ");

  return (
    <div className="overflow-x-auto">
      <svg
        ref={containerRef}
        viewBox={`0 0 ${width} 260`}
        role="img"
        aria-label="Diagram showing data flowing from the user through an AI layer, backend, database, automation, and finally output"
        className="h-56 w-full min-w-160"
      >
        <path
          data-flow-path
          d={pathD}
          fill="none"
          stroke="var(--color-accent-secondary)"
          strokeWidth="2"
        />
        {points.map((point) => (
          <g key={point.id} data-flow-node transform={`translate(${point.x}, 130)`}>
            <circle r="26" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="2" />
            <circle r="8" fill="var(--color-accent)" />
            <text
              x="0"
              y="52"
              textAnchor="middle"
              fontSize="18"
              fill="var(--color-ink-secondary)"
              className="font-sans"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
