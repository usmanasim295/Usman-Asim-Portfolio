import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
          <span aria-hidden className="h-px w-6 bg-accent" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.14}>
          <p className="mt-4 text-pretty text-base leading-relaxed text-ink-secondary">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
