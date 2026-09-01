export const person = {
  name: "Aryan Dahal",
  shortName: "Aryan",
  domain: "dahalaryan.com.np",
  location: "Nepal",
  email: undefined as string | undefined,
};

export const socials = {
  discord: {
    label: "Discord",
    href: "https://discord.gg/KwAmfyJsKp",
  },
  instagram: {
    label: "Instagram",
    username: "not_aryan333",
    href: "https://instagram.com/not_aryan333",
  },
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Forums", href: "/forums" },
];

export const hero = {
  subhead: "Developer based in Nepal.",
  description:
    "I build web applications, Discord bots, and community systems. Most of my current work is around Cyflixel and the software behind it.",
};

export const about = {
  lead: "I like figuring out how things work, then building something useful.",
  paragraphs: [
    "I'm a developer interested in software, communities, and the systems that connect the two. I learn mostly by building things, breaking them, and fixing what I find along the way.",
    "A lot of my work currently revolves around Cyflixel — from its Discord bot and forums to Minecraft server systems and the infrastructure behind the community.",
  ],
};

export const projects = [
  {
    title: "Cyflixel Bot",
    description:
      "A Discord bot for moderation, tickets, automation, and everyday community management.",
    tech: "Discord.js · Node.js",
  },
  {
    title: "Cyflixel Forums",
    description:
      "A forum platform with categories, threads, profiles, and reactions built with Next.js.",
    tech: "Next.js · TypeScript",
    href: "/forums",
  },
  {
    title: "Minecraft Server Systems",
    description:
      "Server infrastructure and gameplay systems built for the Cyflixel Minecraft community.",
    tech: "Java · Server infrastructure",
  },
];

export const contact = {
  headline: "Want to get in touch?",
  subtext: "The easiest way to reach me is through Discord.",
};

export const footer = {
  description: "Personal website of Aryan Dahal.",
};
