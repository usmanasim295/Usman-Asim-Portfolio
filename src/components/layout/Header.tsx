"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/data/nav";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link
          href="#home"
          className="text-sm font-semibold tracking-tight text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          {site.initials}
          <span className="text-accent">.</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border border-border bg-surface/60 px-1.5 py-1.5 backdrop-blur md:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                activeSection === item.href
                  ? "bg-surface-elevated text-ink"
                  : "text-ink-secondary hover:text-ink"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="#contact" variant="secondary" className="!px-5 !py-2 text-sm">
            {site.cta.primary}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-x-0 top-18.25 bottom-0 overflow-y-auto border-t border-border bg-background transition-opacity duration-300 ease-out md:hidden",
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-6 py-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                activeSection === item.href
                  ? "bg-surface text-ink"
                  : "text-ink-secondary hover:bg-surface hover:text-ink"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
