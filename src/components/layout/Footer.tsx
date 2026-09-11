import { Mail } from "lucide-react";
import { navItems } from "@/data/nav";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background-secondary">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--glow-accent)" }}
      />

      <Container className="relative py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight text-ink">
              {site.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              {site.title} building scalable web platforms and AI-powered products.
              Currently based in {site.location}.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-ink-secondary transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-start gap-4">
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink-secondary transition-colors hover:border-border-strong hover:text-ink"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink-secondary transition-colors hover:border-border-strong hover:text-ink"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Send an email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink-secondary transition-colors hover:border-border-strong hover:text-ink"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Designed &amp; built from scratch with Next.js, Three.js, and GSAP.</p>
        </div>
      </Container>
    </footer>
  );
}
