export interface ProjectLinks {
  live?: string;
  github?: string;
  caseStudy?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  status?: "Live" | "In Development" | "Completed";
  description: string;
  detailedDescription: string;
  technologies: string[];
  features: string[];
  image: string;
  imageAlt: string;
  featured: boolean;
  links: ProjectLinks;
}

/**
 * Add a new project by appending an object to this array — the Projects
 * section renders entirely from this data, so no component changes are
 * needed. Place the corresponding image in `public/projects/`.
 */
export const projects: Project[] = [
  {
    id: "jaar",
    title: "JAAR Platform",
    category: "Full Stack · Marketplace",
    status: "Live",
    description:
      "Multilingual RFQ home-services marketplace for Saudi Arabia with live bidding between customers and providers.",
    detailedDescription:
      "JAAR connects homeowners in Saudi Arabia with vetted service providers through a request-for-quote model. Customers post a job, providers submit competing bids in real time, and the whole experience runs natively in both English and Arabic — including full RTL layout support.",
    technologies: ["Next.js", "React", "Node.js", "Express", "Socket.IO", "PostgreSQL", "i18n"],
    features: [
      "Real-time RFQ bidding between customers and service providers via Socket.IO",
      "In-conversation text, image, video, and voice-note messaging",
      "Full English/Arabic multilingual architecture with RTL support",
      "Role-based dashboards for customers, providers, and admins",
    ],
    image: "/projects/jaar.webp",
    imageAlt: "JAAR platform interface showing a bilingual RFQ bidding dashboard",
    featured: true,
    links: { live: "http://jaar.sa/" },
  },
  {
    id: "plotpicks",
    title: "PlotPicks",
    category: "Full Stack · Prediction Platform",
    status: "Live",
    description:
      "TV-show based prediction platform with automated reward distribution, an influencer portal, and integrated KYC.",
    detailedDescription:
      "PlotPicks lets users make predictions ('Plots') on TV-show outcomes and compete for points and cash rewards. It includes an influencer portal with referral tracking and commissions, automated points/cash payout logic, and identity verification before cash withdrawals.",
    technologies: ["Next.js", "Node.js", "Express", "PostgreSQL", "SOAP APIs", "KYC"],
    features: [
      "Automated points and cash reward distribution engine",
      "Influencer portal with referral tracking and commission payouts",
      "KYC identity verification integrated into the withdrawal flow",
      "Payment gateway and third-party SOAP API integrations",
    ],
    image: "/projects/plotpick.webp",
    imageAlt: "PlotPicks prediction platform showing active TV-show plots and leaderboard",
    featured: true,
    links: { live: "https://www.plotpicks.com/" },
  },
  {
    id: "txt2solutions",
    title: "Txt2Solutions.ai",
    category: "AI-Enabled Platform",
    status: "Live",
    description:
      "AI-enabled SMS platform with real-time messaging, delivery tracking, and automated scheduling.",
    detailedDescription:
      "An SMS communication platform that layers AI-assisted messaging on top of reliable delivery infrastructure — giving businesses real-time delivery tracking, automated send scheduling, and a responsive dashboard for managing high-volume conversations.",
    technologies: ["React", "TypeScript", "Redux", "Ruby on Rails APIs"],
    features: [
      "Real-time messaging with live delivery status tracking",
      "Automated scheduling for outbound SMS campaigns",
      "AI-assisted message workflows integrated with Rails APIs",
      "Type-safe frontend architecture with Redux state management",
    ],
    image: "/projects/txt2solutions.webp",
    imageAlt: "Txt2Solutions.ai dashboard showing real-time SMS delivery tracking",
    featured: true,
    links: { live: "https://txt2give.co/" },
  },
  {
    id: "falcon-tour",
    title: "Falcon Tour Travel Platform",
    category: "Full Stack · Travel",
    status: "Completed",
    description:
      "Travel booking platform with Stripe payments, media management, and secure authenticated bookings.",
    detailedDescription:
      "A travel and tour booking platform covering package browsing, secure checkout, and media-rich tour listings, built with a JWT-authenticated Express API and Stripe-powered payments.",
    technologies: ["Next.js", "Express", "PostgreSQL", "Stripe", "Cloudinary", "JWT"],
    features: [
      "Stripe-powered checkout for tour and travel package bookings",
      "Cloudinary-backed media management for tour listings",
      "JWT-authenticated API with role-based access",
    ],
    image: "/projects/falcon-tour.webp",
    imageAlt: "Falcon Tour travel platform showing tour package listings",
    featured: false,
    links: { live: "https://falcontourtravel.com/" },
  },
  {
    id: "itqan",
    title: "Itqan",
    category: "Full Stack",
    status: "Completed",
    description:
      "Full-stack web platform built on React and Node.js with AWS-backed infrastructure.",
    detailedDescription:
      "A full-stack application built with React and Redux Toolkit on the frontend and a Node.js API backed by AWS infrastructure, focused on maintainable state management and reliable deployment.",
    technologies: ["React", "Redux Toolkit", "Node.js", "AWS"],
    features: [
      "Centralized Redux Toolkit state architecture",
      "Node.js API deployed on AWS infrastructure",
      "Modular component architecture for long-term maintainability",
    ],
    image: "/projects/itqan.webp",
    imageAlt: "Itqan platform interface",
    featured: false,
    links: { live: "https://itqan.dev/en" },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
