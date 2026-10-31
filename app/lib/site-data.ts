// ============================================================================
// SITE DATA — edit this file to change what the whole website says.
// Hero, about, projects, skills, contact and footer all read from here.
// ============================================================================

export const person = {
  name: "Aryan Dahal",
  shortName: "Aryan",
  role: "Developer & Founder of Altermium",
  domain: "dahalaryan.com.np",
  location: "Nepal",

  // ➜ ADD YOUR REAL EMAIL HERE, e.g. email: "you@example.com".
  //   Until it is set, the email button and the contact form stay hidden
  //   automatically, so nothing fake is ever shown to visitors.
  email: undefined as string | undefined,
};

export const siteUrl = "https://dahalaryan.com.np";

/** Community links (Discord). Add more entries and they appear everywhere. */
export const communities = [
  {
    label: "Creativity",
    description: "Join the Creativity Discord community",
    href: "https://discord.gg/Au4Mx7CaCq",
  },
  {
    label: "Cyflixel",
    description: "Join the Cyflixel Discord community",
    href: "https://discord.gg/KwAmfyJsKp",
  },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
  { label: "Forum", href: "/forums" },
];

export const hero = {
  eyebrow: "Developer & Founder · Nepal",
  headline: "Aryan Dahal",
  description:
    "I build web applications, Discord bots and Minecraft server systems — and I run Altermium, the organization behind the Creativity and Cyflixel communities.",
  stack: ["TypeScript", "Next.js", "Node.js", "Discord.js", "Java"],
};

export type Project = {
  title: string;
  type: string;
  description: string;
  tech: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Altermium",
    type: "Organization",
    description:
      "The organization I founded. It brings the Creativity and Cyflixel Discord communities together under one professional home.",
    tech: ["Community", "Web", "Brand"],
  },
  {
    title: "Creativity Bot",
    type: "Discord bot",
    description:
      "A public Discord bot with slash commands, built for the Creativity community.",
    tech: ["Discord.js", "Node.js"],
  },
  {
    title: "Cyflixel BedWars",
    type: "Minecraft plugin",
    description:
      "A custom Hypixel-style BedWars plugin for Minecraft 1.8.8, developed in phases.",
    tech: ["Java", "Spigot"],
  },
  {
    title: "Yuna",
    type: "Discord bot",
    description:
      "A love-themed Discord bot with a virtual economy, plus its Terms of Service and Privacy Policy website.",
    tech: ["Discord.js", "Vercel"],
  },
];

export const skillGroups: Array<{ title: string; items: string[] }> = [
  {
    title: "Web",
    items: ["TypeScript", "JavaScript", "Next.js", "React", "Tailwind CSS", "Vercel"],
  },
  {
    title: "Bots & Backend",
    items: ["Node.js", "Discord.js", "Slash commands", "Supabase"],
  },
  {
    title: "Minecraft",
    items: ["Java", "Spigot plugins", "Server systems"],
  },
];

export const about = {
  lead: "Developer from Nepal. I turn ideas into things people actually use.",
  paragraphs: [
    "I'm Aryan Dahal, a developer based in Nepal. Most of what I build is web applications, Discord bots and Minecraft server software.",
    "I'm the founder of Altermium, the organization behind the Creativity and Cyflixel Discord communities. Running communities means I care about both sides of the work: the code, and the experience people have when they use it.",
    "I learn by building and fixing what breaks. If you have an idea you'd like to build, or a project that needs a developer, get in touch.",
  ],
};

export const facts: Array<{ label: string; value: string }> = [
  { label: "Name", value: person.name },
  { label: "Based in", value: person.location },
  { label: "Role", value: "Founder, Altermium" },
  { label: "Works with", value: "TypeScript, Next.js, Node.js, Discord.js, Java" },
];

export const contact = {
  headline: "Let's work together.",
  subtext:
    "Have a project, a question or an idea? Reach out — or come say hello in one of the communities.",
};

export const footer = {
  description: "Developer and founder building software, tools and communities.",
};
