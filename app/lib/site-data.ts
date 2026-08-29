// ============================================================================
// SITE DATA
// Central place for editable portfolio content. Update this file to change
// copy, projects, skills, timeline, and links across the whole site.
// ============================================================================

export const person = {
  name: "Aryan Dahal",
  shortName: "Aryan",
  role: "Developer & Builder",
  domain: "dahalaryan.com.np",
  location: "Nepal",
  // TODO: replace with your real email before launch.
  email: "TODO@replace-me.com",
  availability: {
    isAvailable: true,
    label: "Open to interesting projects",
  },
};

export const socials = [
  // TODO: replace href values with your real profile URLs.
  { label: "GitHub", href: "https://github.com/TODO", icon: "github" as const },
  { label: "Discord", href: "https://discord.com/users/TODO", icon: "discord" as const },
  { label: "Twitter", href: "https://twitter.com/TODO", icon: "twitter" as const },
  { label: "Email", href: "mailto:TODO@replace-me.com", icon: "mail" as const },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Hello, I'm Aryan",
  headline: "I build digital experiences, software, and communities.",
  subtext:
    "I enjoy building software, creating useful products, and experimenting with technology — from web applications to the communities that grow around them. Most of what I make starts as a small idea that I keep pulling at until it becomes something real.",
  terminalLines: [
    { command: "whoami", output: "aryan-dahal — developer & builder" },
    { command: "status --check", output: "available for new projects" },
    { command: "projects --list", output: "cyflixel-bot · cyflixel-forums · minecraft-systems" },
  ],
};

export const stats = [
  { value: "12+", label: "Projects" },
  { value: "3+", label: "Years exploring tech" },
  { value: "∞", label: "Ideas" },
  { value: "24/7", label: "Curiosity" },
];

export type ProjectCategory = "Web" | "Discord" | "Minecraft" | "Experiments";

export const projectFilters: Array<"All" | ProjectCategory> = [
  "All",
  "Web",
  "Discord",
  "Minecraft",
  "Experiments",
];

export const projects: Array<{
  title: string;
  type: string;
  year: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  visual: "discord" | "minecraft" | "terminal";
  // TODO: add a real link when available.
  href?: string;
}> = [
  {
    title: "Cyflixel Bot",
    type: "Discord Bot",
    year: "2026",
    description:
      "A community and support bot with moderation, tickets, automation, and server management tools.",
    category: "Discord",
    tags: ["Discord.js", "Node.js", "Automation"],
    visual: "discord",
  },
  {
    title: "Cyflixel Forums",
    type: "Web Application",
    year: "2026",
    description:
      "A community forum platform focused on discussion, profiles, and a clean user experience.",
    category: "Web",
    tags: ["Next.js", "TypeScript", "Community"],
    visual: "terminal",
  },
  {
    title: "Minecraft Projects",
    type: "Server Development",
    year: "2026",
    description:
      "Minecraft server systems and infrastructure built for community-based gameplay.",
    category: "Minecraft",
    tags: ["Java", "Server Infra", "Gameplay Systems"],
    visual: "minecraft",
  },
];

export const about = {
  eyebrow: "About",
  lead:
    "I'm a developer who likes figuring out how things work, then building better versions of them.",
  paragraphs: [
    "Most of my time goes into software — web apps, bots, and the systems that hold communities together. I like the process of taking a rough idea and turning it into something people can actually use, even if it starts small and rough around the edges.",
    "Communities are a big part of what I build. I'm interested in the technical and social sides of that — moderation tools, infrastructure, and the small details that make an online space feel well put together.",
    "I learn mostly by building. When something interests me, I tend to dig in, break it, and rebuild it until I understand it properly.",
  ],
  currentlyExploring: [
    "Modern web architecture with Next.js and React",
    "Backend systems and server infrastructure",
    "Discord bot ecosystems and automation",
    "Community platform design",
  ],
};

export const skillGroups = [
  {
    title: "Development",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "JavaScript",
      "HTML & CSS",
    ],
  },
  {
    title: "Backend & Systems",
    items: [
      "Node.js",
      "REST APIs",
      "Git & GitHub",
      "Linux",
      "Databases",
      "Server Deployment",
    ],
  },
  {
    title: "Gaming & Community",
    items: [
      "Discord.js",
      "Bot Automation",
      "Minecraft Server Dev",
      "Community Moderation",
      "Server Infrastructure",
      "Plugin Systems",
    ],
  },
];

export const marqueeItems = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "Discord.js",
  "Git",
  "Linux",
  "Java",
  "REST APIs",
];

export const journey = {
  eyebrow: "Journey",
  entries: [
    {
      year: "Early days",
      title: "First lines of code",
      description:
        "Started tinkering with computers and small scripts out of curiosity — figuring out how things worked by taking them apart.",
    },
    {
      year: "Learning",
      title: "Diving into web development",
      description:
        "Moved from small experiments into building real web pages and applications, learning HTML, CSS, and JavaScript along the way.",
    },
    {
      year: "Building",
      title: "Community tools & bots",
      description:
        "Started building Discord bots and community infrastructure, focusing on moderation, automation, and server management.",
    },
    {
      year: "Now",
      title: "Full projects & systems",
      description:
        "Working across web applications, bots, and server systems — building complete projects rather than isolated scripts.",
    },
  ],
  currentlyBuilding: {
    title: "Currently building",
    description:
      "This portfolio, alongside ongoing work on Cyflixel Bot, Cyflixel Forums, and Minecraft server systems.",
  },
};

export const contact = {
  eyebrow: "Contact",
  headline: "Have something worth building?",
  subtext:
    "I'm always interested in good ideas, interesting projects, and meaningful collaborations.",
};

export const footer = {
  description:
    "Developer building software, tools, and communities — one project at a time.",
  tagline: "Built with curiosity and too much coffee.",
};
