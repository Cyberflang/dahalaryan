// ============================================================================
// SITE DATA
// Central place for editable portfolio content. Update this file to change
// copy, projects, skills, and links across the whole site.
//
// Anything left undefined (email, GitHub) is intentionally omitted rather
// than filled with a placeholder — add it here when it's real, and the UI
// will pick it up automatically.
// ============================================================================

export const person = {
  name: "Aryan Dahal",
  shortName: "Aryan",
  domain: "dahalaryan.com.np",
  location: "Nepal",
  // Set this once a real address exists — the contact section and footer
  // will show an email option automatically when it's defined.
  email: undefined as string | undefined,
};

export const socials = {
  discord: { label: "Discord", username: "james.cf" },
  x: { label: "X", username: "James_CFXL", href: "https://x.com/James_CFXL" },
  instagram: {
    label: "Instagram",
    username: "not_aryan333",
    href: "https://instagram.com/not_aryan333",
  },
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Forums", href: "/forums" },
];

export const hero = {
  headline: "Aryan Dahal",
  subhead: "Developer, based in Nepal.",
  description:
    "I build web applications, Discord bots, and the community infrastructure around them — mostly TypeScript, Next.js, and Node.js. Right now that's Cyflixel's bot, its forums, and the Minecraft server systems behind it.",
  stack: ["TypeScript", "Next.js", "Node.js", "Discord.js"],
};

export type ProjectCategory = "Web" | "Discord" | "Minecraft";

export const projects: Array<{
  title: string;
  category: ProjectCategory;
  year: string;
  description: string;
  tech: string[];
  status: "Active" | "In progress";
  href?: string;
}> = [
  {
    title: "Cyflixel Bot",
    category: "Discord",
    year: "2026",
    description:
      "A Discord bot for the Cyflixel community — moderation, ticket handling, and day-to-day server automation.",
    tech: ["Discord.js", "Node.js"],
    status: "Active",
  },
  {
    title: "Cyflixel Forums",
    category: "Web",
    year: "2026",
    description:
      "A forum platform for the Cyflixel community: categories, threads, profiles, and reactions, built as part of this site.",
    tech: ["Next.js", "TypeScript"],
    status: "Active",
    href: "/forums",
  },
  {
    title: "Minecraft Server Systems",
    category: "Minecraft",
    year: "2026",
    description:
      "Server infrastructure and gameplay systems for Cyflixel's Minecraft network.",
    tech: ["Java", "Server infrastructure"],
    status: "Active",
  },
];

export const about = {
  lead: "I'm a developer who likes figuring out how things work, then building better versions of them.",
  paragraphs: [
    "Most of my time goes into software — web applications, Discord bots, and the systems that hold communities together. I like taking a rough idea and turning it into something people can actually use, even when it starts small.",
    "Communities are a big part of what I build. That means thinking about both sides of it: the technical side — moderation tools, automation, infrastructure — and the small details that make a space feel put together.",
    "I learn mostly by building and fixing what breaks along the way.",
  ],
};

export const skillGroups = [
  {
    title: "Development",
    items: ["TypeScript", "JavaScript", "React", "Next.js", "HTML & CSS"],
  },
  {
    title: "Backend & Systems",
    items: ["Node.js", "REST APIs", "Databases", "Server deployment", "Linux"],
  },
  {
    title: "Community & Infrastructure",
    items: [
      "Discord.js",
      "Minecraft server development",
      "Automation",
      "Server infrastructure",
    ],
  },
];

export const focus = {
  building: {
    title: "Building",
    description:
      "Cyflixel Bot, Cyflixel Forums, and the Minecraft server systems behind the Cyflixel community.",
  },
  learning: {
    title: "Learning",
    description:
      "Backend architecture and server infrastructure — going deeper past the parts I already know.",
  },
  interested: {
    title: "Interested in",
    description:
      "Community platform design, automation, and the infrastructure that keeps online spaces running well.",
  },
};

export const contact = {
  headline: "Let's build something useful.",
  subtext: "Reach me through Discord, X, or Instagram.",
};

export const footer = {
  description: "Developer building software, tools, and communities.",
};
