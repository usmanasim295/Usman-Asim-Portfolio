/**
 * Central site / personal configuration.
 *
 * Components pull identity, contact, and positioning copy from here instead
 * of duplicating strings — update your details once, everywhere reflects it.
 */

export const site = {
  name: "Usman Asim",
  initials: "Usman Asim",
  title: "Full Stack Engineer",
  tagline: "Building Scalable Web & AI-Powered Products",
  shortBio:
    "I design and build production-grade web applications, real-time platforms, and AI-powered systems — from data model to deployed interface.",
  description:
    "Portfolio of Usman Asim, a Full Stack Engineer with 2+ years of experience building scalable web applications, real-time platforms, APIs, and AI-powered systems with React, Next.js, Node.js, and modern automation tooling.",

  location: "Lahore, Pakistan",
  experienceYears: "2+",
  availability: {
    isAvailable: true,
    label: "Open to new opportunities",
  },

  email: "usmanasim295@gmail.com",
  links: {
    github: "https://github.com/uasmanasim295",
    linkedin: "https://www.linkedin.com/in/usman-asim-949264300",
  },

  cta: {
    primary: "Let's Work Together",
    secondary: "View My Work",
  },

  seo: {
    url: "https://usmanasim.dev",
    keywords: [
      "Usman Asim",
      "Full Stack Engineer",
      "React Developer",
      "Next.js Developer",
      "Node.js Developer",
      "TypeScript",
      "AI Integration Engineer",
      "AI Automation",
      "n8n Workflow Automation",
      "Software Engineer Pakistan",
    ],
  },
} as const;

export type Site = typeof site;
