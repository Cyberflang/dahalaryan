// ============================================================================
// FORUM DATA
// A simple, read-only board of updates and project notes written by the site
// owner. Conversation happens on Discord (see `communities` in site-data.ts).
// To add a post, add an entry to `threads` below — pages are generated
// automatically.
// ============================================================================

export interface ForumCategory {
  slug: string;
  name: string;
  description: string;
}

export interface ForumThread {
  slug: string;
  categorySlug: string;
  title: string;
  createdAt: string; // ISO date
  content: string[]; // paragraphs
}

export const categories: ForumCategory[] = [
  {
    slug: "announcements",
    name: "Announcements",
    description: "News and updates about this website.",
  },
  {
    slug: "projects",
    name: "Projects",
    description: "Notes on what I build.",
  },
  {
    slug: "community",
    name: "Community",
    description: "Where to find me and how to get in touch.",
  },
];

export const threads: ForumThread[] = [
  {
    slug: "welcome",
    categorySlug: "announcements",
    title: "Welcome to the forum",
    createdAt: "2026-10-30",
    content: [
      "This is a simple place for updates, project notes and community information from me, Aryan Dahal.",
      "Day-to-day conversation happens on Discord. If you want to chat, ask a question or share feedback, join the Creativity or Cyflixel community.",
      "You can also reach me through the contact section on the home page.",
    ],
  },
  {
    slug: "customize-this-website",
    categorySlug: "announcements",
    title: "You can customize this website",
    createdAt: "2026-10-30",
    content: [
      "Use the Customize button in the bottom-left corner of any page to change the theme, accent colour, font, text size, corners, spacing, page width, background and animations.",
      "Your choices are saved only on your own device, and you can reset everything with one click.",
    ],
  },
  {
    slug: "what-is-altermium",
    categorySlug: "projects",
    title: "What is Altermium?",
    createdAt: "2026-10-30",
    content: [
      "Altermium is the organization I founded. It is the umbrella behind the Creativity and Cyflixel Discord communities.",
      "The bots, plugins and websites I build for those communities are listed in the Projects section of the home page.",
    ],
  },
  {
    slug: "creativity-bot",
    categorySlug: "projects",
    title: "Creativity Bot",
    createdAt: "2026-10-30",
    content: [
      "Creativity Bot is a public Discord bot with slash commands, built with discord.js for the Creativity community.",
    ],
  },
  {
    slug: "cyflixel-bedwars",
    categorySlug: "projects",
    title: "Cyflixel BedWars plugin",
    createdAt: "2026-10-30",
    content: [
      "Cyflixel BedWars is a custom Hypixel-style BedWars plugin for Minecraft 1.8.8, written in Java for Spigot and developed in phases.",
    ],
  },
  {
    slug: "how-to-get-in-touch",
    categorySlug: "community",
    title: "How to get in touch",
    createdAt: "2026-10-30",
    content: [
      "For project enquiries or questions, use the contact section on the home page, or message me in one of the Discord communities.",
    ],
  },
];

// ----------------------------------------------------------------------------
// Queries
// ----------------------------------------------------------------------------

export function getCategory(slug: string): ForumCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getThreadsByCategory(categorySlug: string): ForumThread[] {
  return threads
    .filter((t) => t.categorySlug === categorySlug)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getThread(
  categorySlug: string,
  threadSlug: string
): ForumThread | undefined {
  return threads.find(
    (t) => t.categorySlug === categorySlug && t.slug === threadSlug
  );
}

export function getLatestThreads(limit = 5): ForumThread[] {
  return [...threads]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export interface ForumSearchResult {
  title: string;
  subtitle: string;
  href: string;
}

export function searchForum(query: string, limit = 8): ForumSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: ForumSearchResult[] = [];

  for (const thread of threads) {
    const haystack = `${thread.title} ${thread.content.join(" ")}`.toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        title: thread.title,
        subtitle: getCategory(thread.categorySlug)?.name ?? thread.categorySlug,
        href: `/forums/${thread.categorySlug}/${thread.slug}`,
      });
    }
  }

  for (const category of categories) {
    if (category.name.toLowerCase().includes(q)) {
      results.push({
        title: category.name,
        subtitle: "Category",
        href: `/forums/${category.slug}`,
      });
    }
  }

  return results.slice(0, limit);
}
