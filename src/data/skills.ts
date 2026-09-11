export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces that feel fast, accessible, and considered.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux",
      "Redux Toolkit",
      "Tailwind CSS",
      "shadcn/ui",
      "HTML",
      "CSS",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs and services designed to scale with the product.",
    skills: ["Node.js", "Express", "REST APIs", "GraphQL"],
  },
  {
    id: "database",
    title: "Database",
    description: "Relational and document data, modeled deliberately.",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "SQL", "NoSQL", "NeonDB"],
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    description: "Applied AI — chatbots, voice agents, and automated workflows.",
    skills: [
      "AI Chatbots",
      "Voice Agents",
      "AI API Integration",
      "Prompt Engineering",
      "n8n",
      "LLM-Powered Applications",
      "AI Workflows",
    ],
  },
  {
    id: "realtime",
    title: "Real-Time Systems",
    description: "Live, multi-user experiences that stay in sync.",
    skills: ["WebSockets", "Socket.IO"],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Shipping and running software reliably.",
    skills: ["Docker", "AWS", "Git", "GitHub", "GitLab", "Cloudinary", "Heroku"],
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "The connective tissue production systems depend on.",
    skills: ["JWT", "RBAC", "KYC", "Payment Gateways", "SOAP APIs", "i18n"],
  },
];
