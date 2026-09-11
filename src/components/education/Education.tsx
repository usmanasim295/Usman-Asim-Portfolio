import { GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="relative border-b border-border py-20">
      <Container>
        <SectionHeading eyebrow="Education" title="Academic background" />

        <div className="mt-10 max-w-2xl space-y-4">
          {education.map((entry) => (
            <Reveal key={entry.id}>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-accent">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink">{entry.degree}</h3>
                  <p className="mt-1 text-sm text-ink-secondary">
                    {entry.institution} · {entry.location}
                  </p>
                  <p className="mt-1 font-mono text-xs text-ink-muted">
                    {entry.startDate} — {entry.endDate}
                    {entry.gpa && ` · GPA ${entry.gpa}`}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
