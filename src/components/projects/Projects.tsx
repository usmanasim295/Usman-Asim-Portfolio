import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectFeatured } from "@/components/projects/ProjectFeatured";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export function Projects() {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="relative border-b border-border py-28">
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="A handful of the platforms I've built end to end — real-time marketplaces, prediction platforms, and AI-enabled communication tools."
        />

        <div className="mt-16 space-y-28">
          {featured.map((project, index) => (
            <ProjectFeatured
              key={project.id}
              project={project}
              reverse={index % 2 === 1}
              fullWidth={index === featured.length - 1 && featured.length > 2}
            />
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-28">
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-ink-muted">
              More projects
            </h3>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((project, index) => (
                <ProjectCard key={project.id} project={project} delay={index * 0.06} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
