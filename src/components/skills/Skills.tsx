import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="relative border-b border-border py-28">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="A stack built for shipping, not slides"
          description="Grouped by what each layer is responsible for — from interface to infrastructure."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <Reveal key={category.id} delay={(index % 3) * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.5)]">
                <h3 className="text-base font-semibold text-ink">{category.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                  {category.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-ink-secondary transition-colors duration-200 group-hover:border-border-strong hover:!border-accent hover:!text-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
