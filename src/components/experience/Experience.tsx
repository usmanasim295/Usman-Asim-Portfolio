import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="relative border-b border-border py-28">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Where the work happened"
          description="Two-plus years across product studios and client engineering teams, moving from hands-on contributor to owning full-stack delivery."
        />

        <ol className="relative mt-16 space-y-12 border-l border-border pl-8 sm:pl-10">
          {experience.map((entry, index) => (
            <li key={entry.id} className="relative">
              <Reveal delay={index * 0.06} from="left">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.55rem] top-1.5 flex h-4 w-4 items-center justify-center sm:-left-[3.05rem]"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      entry.current ? "bg-accent" : "bg-ink-muted"
                    }`}
                  />
                  {entry.current && (
                    <span className="absolute h-4 w-4 animate-ping rounded-full bg-accent/40" />
                  )}
                </span>

                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl font-semibold text-ink">
                    {entry.position}
                    <span className="text-ink-secondary"> · {entry.company}</span>
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wide text-ink-muted">
                    {entry.startDate} — {entry.endDate}
                  </p>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {entry.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-relaxed text-ink-secondary"
                    >
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {entry.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
