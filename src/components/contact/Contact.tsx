import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div
        aria-hidden="true"
        className="section-glow pointer-events-none absolute inset-0"
      />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                <span aria-hidden className="h-px w-6 bg-accent" />
                Contact
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Have a product in mind?
                <br />
                Let&apos;s build it.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-ink-secondary">
                Whether it&apos;s a full-time role, a contract build, or an
                AI/automation project — I usually reply within a day.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 space-y-4 text-sm">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-ink-secondary transition-colors hover:text-ink"
                >
                  <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                  {site.email}
                </a>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-3 text-ink-secondary transition-colors hover:text-ink"
                >
                  <LinkedinIcon className="h-4 w-4 text-accent" aria-hidden="true" />
                  LinkedIn
                </a>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-3 text-ink-secondary transition-colors hover:text-ink"
                >
                  <GithubIcon className="h-4 w-4 text-accent" aria-hidden="true" />
                  GitHub
                </a>
                <p className="flex items-center gap-3 text-ink-secondary">
                  <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                  {site.location}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal from="right">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
