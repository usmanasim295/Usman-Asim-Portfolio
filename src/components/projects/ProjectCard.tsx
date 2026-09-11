import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon } from "@/components/ui/icons";

export function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const hasLinks = Boolean(project.links.live || project.links.github);

  return (
    <Reveal delay={delay}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-border-strong">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            unoptimized={project.image.endsWith(".svg")}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className=" transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
            {project.category}
          </span>
          <h3 className="mt-3 text-lg font-semibold text-ink">{project.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-secondary">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-surface-elevated px-2.5 py-1 text-[11px] text-ink-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          {hasLinks && (
            <div className="mt-5 flex gap-4 border-t border-border pt-4">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                  View live
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                  <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  Source
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}
