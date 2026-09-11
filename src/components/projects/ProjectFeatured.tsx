import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/ui/icons";

interface ProjectFeaturedProps {
  project: Project;
  /** Alternates the image/content order for visual rhythm down the page. */
  reverse?: boolean;
  /** Renders as a full-width, stacked case-study layout instead of a split row. */
  fullWidth?: boolean;
}

export function ProjectFeatured({ project, reverse, fullWidth }: ProjectFeaturedProps) {
  const hasLinks = Boolean(project.links.live || project.links.github);

  const media = (
    <Reveal from={reverse ? "right" : "left"} className="w-full">
      <div className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-surface">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          unoptimized={project.image.endsWith(".svg")}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
    </Reveal>
  );

  const content = (
    <Reveal from={reverse ? "left" : "right"} className="w-full">
      <div className={cn("flex flex-col", fullWidth && "max-w-2xl")}>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {project.category}
          </span>
          {project.status && (
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-ink-muted">
              {project.status}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {project.title}
        </h3>

        <p className="mt-4 text-pretty text-base leading-relaxed text-ink-secondary">
          {project.detailedDescription}
        </p>

        <ul className="mt-6 space-y-2.5">
          {project.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-3 text-sm leading-relaxed text-ink-secondary"
            >
              <span
                aria-hidden="true"
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
              />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        {hasLinks && (
          <div className="mt-7 flex flex-wrap gap-4">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
              >
                View live
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
              >
                <GithubIcon className="h-4 w-4" aria-hidden="true" />
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </Reveal>
  );

  if (fullWidth) {
    return (
      <div className="flex flex-col gap-10">
        {media}
        {content}
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
      {reverse ? (
        <>
          <div className="lg:order-2">{media}</div>
          <div className="lg:order-1">{content}</div>
        </>
      ) : (
        <>
          {media}
          {content}
        </>
      )}
    </div>
  );
}
