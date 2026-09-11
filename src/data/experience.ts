export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  location?: string;
  technologies: string[];
  highlights: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "devclan",
    company: "DevClan",
    position: "Full Stack Developer",
    startDate: "Apr 2025",
    endDate: "Present",
    current: true,
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Socket.IO",
      "AI APIs",
      "n8n",
    ],
    highlights: [
      "Own full-stack delivery on production web platforms — from schema design and API architecture to polished, responsive UI.",
      "Build and integrate AI-powered features, including chatbot and voice-agent flows backed by prompt-engineered API pipelines.",
      "Design n8n automation workflows that connect application backends to third-party services and AI providers, reducing manual operational work.",
      "Implement real-time features with WebSockets/Socket.IO for live updates across multi-user, multilingual products.",
    ],
  },
  {
    id: "technier-associate",
    company: "Technier",
    position: "Associate Software Engineer",
    startDate: "Jun 2024",
    endDate: "May 2025",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
      "Docker",
      "AWS",
    ],
    highlights: [
      "Shipped production features across the MERN/PERN stack for client platforms spanning marketplaces, prediction platforms, and travel booking.",
      "Built REST and GraphQL APIs, integrated payment gateways, KYC verification, and third-party SOAP APIs.",
      "Containerized services with Docker and deployed to AWS, improving environment consistency across staging and production.",
      "Collaborated directly with product and design to translate requirements into scalable, maintainable backend and frontend architecture.",
    ],
  },
  {
    id: "technier-intern",
    company: "Technier",
    position: "MERN / PERN Stack Intern",
    startDate: "Feb 2024",
    endDate: "May 2024",
    technologies: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "Git"],
    highlights: [
      "Learned and applied production engineering practices across the MERN and PERN stacks on real client codebases.",
      "Built and debugged REST APIs, database schemas, and React interfaces under senior engineer review.",
      "Developed strong Git workflow fundamentals working within a multi-developer codebase.",
    ],
  },
];
