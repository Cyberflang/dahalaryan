// ============================================================================
// FORUM DATA LAYER
// ----------------------------------------------------------------------------
// This module is the single source of truth for forum content. Every page
// and component reads through the functions at the bottom of this file
// instead of importing the raw arrays directly.
//
// Today these functions read from static, hand-written mock data (the site
// is statically exported with no backend yet). When a real backend/database
// is introduced, only the bodies of the functions in the "QUERIES" section
// need to change (e.g. to fetch calls or DB queries) — every component and
// page that consumes this module stays untouched. Keep that boundary intact.
// ============================================================================

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

export type CommunityRank =
  | "MEMBER"
  | "CYFLIXEL BRONZE"
  | "CYFLIXEL SILVER"
  | "CYFLIXEL GOLD"
  | "CYFLIXEL DIAMOND"
  | "CYFLIXEL MYTHIC";

export type StaffRank = "HELPER" | "SUPPORT" | "ADMIN" | "MAIN ADMIN" | "OWNER";

export interface ForumUser {
  username: string;
  displayName: string;
  rank: CommunityRank;
  staffRank?: StaffRank;
  avatarColor: string; // used to render a deterministic initials avatar
  joinDate: string; // ISO date
  postCount: number;
  threadCount: number;
  reactionScore: number;
  online: boolean;
  bio: string;
  badges: string[];
}

export interface ForumCategory {
  slug: string;
  name: string;
  description: string;
  icon: ForumCategoryIcon;
  staffOnly?: boolean;
}

export type ForumCategoryIcon =
  | "announcement"
  | "info"
  | "changelog"
  | "shield"
  | "chat"
  | "suggestion"
  | "bug"
  | "help"
  | "server"
  | "bedwars"
  | "skywars"
  | "survival"
  | "games"
  | "intro"
  | "events"
  | "guilds"
  | "creations"
  | "offtopic"
  | "media";

export interface ForumCategoryGroup {
  id: string;
  label: string;
  categories: ForumCategory[];
}

export interface ForumReaction {
  type: "like" | "love" | "funny" | "helpful";
  count: number;
}

export interface ForumPost {
  id: string;
  threadSlug: string;
  postNumber: number;
  authorUsername: string;
  createdAt: string; // ISO date
  editedAt?: string;
  content: string[]; // paragraphs
  reactions: ForumReaction[];
}

export interface ForumThread {
  slug: string;
  categorySlug: string;
  title: string;
  prefix?: string;
  authorUsername: string;
  createdAt: string;
  pinned: boolean;
  locked: boolean;
  featured?: boolean;
  views: number;
  tags: string[];
}

// ----------------------------------------------------------------------------
// Category taxonomy
// ----------------------------------------------------------------------------

export const categoryGroups: ForumCategoryGroup[] = [
  {
    id: "information",
    label: "Cyflixel Information",
    categories: [
      {
        slug: "news-announcements",
        name: "News & Announcements",
        description: "Official news from the Cyflixel team.",
        icon: "announcement",
        staffOnly: true,
      },
      {
        slug: "rules-information",
        name: "Rules & Information",
        description: "Community rules, guidelines, and how things work here.",
        icon: "info",
      },
      {
        slug: "updates-changelogs",
        name: "Updates & Changelogs",
        description: "What changed, what shipped, and what's next.",
        icon: "changelog",
        staffOnly: true,
      },
      {
        slug: "staff-announcements",
        name: "Staff Announcements",
        description: "Applications, promotions, and staff-team updates.",
        icon: "shield",
        staffOnly: true,
      },
    ],
  },
  {
    id: "network",
    label: "Cyflixel Network",
    categories: [
      {
        slug: "general-discussion",
        name: "General Discussion",
        description: "Talk about anything related to the Cyflixel network.",
        icon: "chat",
      },
      {
        slug: "suggestions-feedback",
        name: "Suggestions & Feedback",
        description: "Pitch ideas and tell us what could be better.",
        icon: "suggestion",
      },
      {
        slug: "bug-reports",
        name: "Bug Reports",
        description: "Found something broken? Report it here.",
        icon: "bug",
      },
      {
        slug: "community-help",
        name: "Community Help",
        description: "Ask questions, get help from staff and members.",
        icon: "help",
      },
      {
        slug: "server-discussion",
        name: "Server Discussion",
        description: "Status, performance, and infrastructure talk.",
        icon: "server",
      },
    ],
  },
  {
    id: "gaming",
    label: "Gaming",
    categories: [
      {
        slug: "bedwars",
        name: "BedWars",
        description: "Strategy, clips, and discussion for BedWars.",
        icon: "bedwars",
      },
      {
        slug: "skywars",
        name: "SkyWars",
        description: "Kits, maps, and everything SkyWars.",
        icon: "skywars",
      },
      {
        slug: "survival-smp",
        name: "Survival / SMP",
        description: "Builds, bases, and long-term survival worlds.",
        icon: "survival",
      },
      {
        slug: "other-games",
        name: "Other Games",
        description: "Every other gamemode on the network.",
        icon: "games",
      },
    ],
  },
  {
    id: "community",
    label: "Community",
    categories: [
      {
        slug: "introductions",
        name: "Introductions",
        description: "New here? Say hello.",
        icon: "intro",
      },
      {
        slug: "events",
        name: "Events",
        description: "Tournaments, giveaways, and community events.",
        icon: "events",
      },
      {
        slug: "guilds",
        name: "Guilds",
        description: "Find, recruit for, or promote a guild.",
        icon: "guilds",
      },
      {
        slug: "community-creations",
        name: "Community Creations",
        description: "Builds, art, music, and other original work.",
        icon: "creations",
      },
      {
        slug: "off-topic",
        name: "Off Topic",
        description: "Anything outside of Cyflixel.",
        icon: "offtopic",
      },
      {
        slug: "media-screenshots",
        name: "Media & Screenshots",
        description: "Clips, screenshots, and highlight reels.",
        icon: "media",
      },
    ],
  },
];

export const allCategories: ForumCategory[] = categoryGroups.flatMap(
  (group) => group.categories
);

// ----------------------------------------------------------------------------
// Users
// ----------------------------------------------------------------------------

export const users: ForumUser[] = [
  {
    username: "aryan",
    displayName: "Aryan",
    rank: "CYFLIXEL MYTHIC",
    staffRank: "OWNER",
    avatarColor: "#e0a94a",
    joinDate: "2023-11-02",
    postCount: 1842,
    threadCount: 214,
    reactionScore: 5320,
    online: true,
    bio: "Builder of Cyflixel. If something's broken, it's probably my fault.",
    badges: ["Founder", "Network Architect", "Early Supporter"],
  },
  {
    username: "nyxel",
    displayName: "Nyxel",
    rank: "CYFLIXEL DIAMOND",
    staffRank: "MAIN ADMIN",
    avatarColor: "#7fb2e0",
    joinDate: "2024-01-14",
    postCount: 963,
    threadCount: 88,
    reactionScore: 2410,
    online: true,
    bio: "Keeps the network running. BedWars main, terrible at SkyWars.",
    badges: ["Lead Moderator", "Event Host"],
  },
  {
    username: "verabyte",
    displayName: "Verabyte",
    rank: "CYFLIXEL GOLD",
    staffRank: "ADMIN",
    avatarColor: "#c07fe0",
    joinDate: "2024-02-20",
    postCount: 701,
    threadCount: 54,
    reactionScore: 1580,
    online: false,
    bio: "Community + moderation. Currently rebuilding the spawn hub.",
    badges: ["Builder Team", "Community Admin"],
  },
  {
    username: "quill_ash",
    displayName: "Quill Ash",
    rank: "CYFLIXEL SILVER",
    staffRank: "SUPPORT",
    avatarColor: "#8fd0b0",
    joinDate: "2024-05-09",
    postCount: 412,
    threadCount: 31,
    reactionScore: 860,
    online: true,
    bio: "Answers tickets faster than you can type them.",
    badges: ["Support Team"],
  },
  {
    username: "brinkley",
    displayName: "Brinkley",
    rank: "CYFLIXEL BRONZE",
    staffRank: "HELPER",
    avatarColor: "#e0a17f",
    joinDate: "2024-07-01",
    postCount: 205,
    threadCount: 19,
    reactionScore: 340,
    online: false,
    bio: "New to staff, long-time SMP player.",
    badges: ["Helper"],
  },
  {
    username: "kestrelfox",
    displayName: "KestrelFox",
    rank: "CYFLIXEL GOLD",
    avatarColor: "#e0d67f",
    joinDate: "2024-03-11",
    postCount: 588,
    threadCount: 47,
    reactionScore: 1290,
    online: true,
    bio: "Top 10 BedWars, allegedly.",
    badges: ["Tournament Winner"],
  },
  {
    username: "mossle",
    displayName: "Mossle",
    rank: "MEMBER",
    avatarColor: "#9a9a95",
    joinDate: "2025-01-22",
    postCount: 34,
    threadCount: 4,
    reactionScore: 22,
    online: false,
    bio: "Still figuring out where everything is.",
    badges: [],
  },
  {
    username: "ravensong",
    displayName: "Ravensong",
    rank: "CYFLIXEL SILVER",
    avatarColor: "#e07f9a",
    joinDate: "2024-09-15",
    postCount: 276,
    threadCount: 22,
    reactionScore: 610,
    online: true,
    bio: "SMP builder, screenshot hoarder.",
    badges: ["Community Creations Featured"],
  },
  {
    username: "delvinoak",
    displayName: "Delvinoak",
    rank: "CYFLIXEL BRONZE",
    avatarColor: "#7fe0c2",
    joinDate: "2024-10-30",
    postCount: 128,
    threadCount: 11,
    reactionScore: 190,
    online: false,
    bio: "Guild leader of Ember Company.",
    badges: ["Guild Leader"],
  },
  {
    username: "pixelwren",
    displayName: "Pixelwren",
    rank: "MEMBER",
    avatarColor: "#b0e07f",
    joinDate: "2025-04-02",
    postCount: 12,
    threadCount: 2,
    reactionScore: 6,
    online: true,
    bio: "Just joined, excited to be here!",
    badges: [],
  },
];

export function getUser(username: string): ForumUser | undefined {
  return users.find((u) => u.username === username);
}

// ----------------------------------------------------------------------------
// Threads
// ----------------------------------------------------------------------------

export const threads: ForumThread[] = [
  {
    slug: "welcome-to-cyflixel-forums",
    categorySlug: "news-announcements",
    title: "Welcome to the Cyflixel Forums",
    prefix: "Announcement",
    authorUsername: "aryan",
    createdAt: "2026-06-01T10:00:00Z",
    pinned: true,
    locked: true,
    featured: true,
    views: 8420,
    tags: ["welcome", "meta"],
  },
  {
    slug: "season-4-launch-bedwars-rework",
    categorySlug: "news-announcements",
    title: "Season 4 Launch — BedWars Rework, New Maps, and More",
    prefix: "Announcement",
    authorUsername: "aryan",
    createdAt: "2026-08-20T14:00:00Z",
    pinned: true,
    locked: false,
    featured: true,
    views: 5310,
    tags: ["season-4", "bedwars"],
  },
  {
    slug: "forum-rules-read-before-posting",
    categorySlug: "rules-information",
    title: "Forum Rules — Read Before Posting",
    prefix: "Guide",
    authorUsername: "nyxel",
    createdAt: "2026-06-01T10:30:00Z",
    pinned: true,
    locked: true,
    views: 6120,
    tags: ["rules"],
  },
  {
    slug: "how-ranks-and-badges-work",
    categorySlug: "rules-information",
    title: "How Ranks & Badges Work on Cyflixel",
    authorUsername: "verabyte",
    createdAt: "2026-06-05T09:12:00Z",
    pinned: false,
    locked: false,
    views: 2140,
    tags: ["ranks", "guide"],
  },
  {
    slug: "changelog-v2-4-0",
    categorySlug: "updates-changelogs",
    title: "Changelog v2.4.0 — Anti-cheat improvements, SkyWars balance",
    prefix: "Changelog",
    authorUsername: "nyxel",
    createdAt: "2026-08-24T18:45:00Z",
    pinned: true,
    locked: false,
    views: 1870,
    tags: ["changelog"],
  },
  {
    slug: "staff-applications-now-open",
    categorySlug: "staff-announcements",
    title: "Staff Applications Are Now Open",
    prefix: "Announcement",
    authorUsername: "verabyte",
    createdAt: "2026-08-15T12:00:00Z",
    pinned: true,
    locked: false,
    views: 3020,
    tags: ["staff", "applications"],
  },
  {
    slug: "what-are-you-building-this-week",
    categorySlug: "general-discussion",
    title: "What are you building this week?",
    authorUsername: "ravensong",
    createdAt: "2026-08-27T08:00:00Z",
    pinned: false,
    locked: false,
    views: 640,
    tags: ["smp"],
  },
  {
    slug: "anyone-else-hyped-for-season-4",
    categorySlug: "general-discussion",
    title: "Anyone else hyped for Season 4??",
    authorUsername: "kestrelfox",
    createdAt: "2026-08-26T21:14:00Z",
    pinned: false,
    locked: false,
    views: 512,
    tags: [],
  },
  {
    slug: "add-a-trade-menu-to-survival",
    categorySlug: "suggestions-feedback",
    title: "Add a player-to-player trade menu to Survival",
    prefix: "Suggestion",
    authorUsername: "delvinoak",
    createdAt: "2026-08-22T16:30:00Z",
    pinned: false,
    locked: false,
    views: 388,
    tags: ["survival", "suggestion"],
  },
  {
    slug: "rework-the-bedwars-shop-layout",
    categorySlug: "suggestions-feedback",
    title: "Rework the BedWars shop layout — too cluttered",
    prefix: "Suggestion",
    authorUsername: "mossle",
    createdAt: "2026-08-18T11:05:00Z",
    pinned: false,
    locked: false,
    views: 275,
    tags: ["bedwars"],
  },
  {
    slug: "cant-place-blocks-in-skywars-lobby",
    categorySlug: "bug-reports",
    title: "Can't place blocks in the SkyWars lobby after last update",
    prefix: "Bug",
    authorUsername: "pixelwren",
    createdAt: "2026-08-25T13:22:00Z",
    pinned: false,
    locked: false,
    views: 190,
    tags: ["skywars", "bug"],
  },
  {
    slug: "shop-gui-closes-instantly",
    categorySlug: "bug-reports",
    title: "Shop GUI closes instantly on mobile client",
    prefix: "Bug",
    authorUsername: "brinkley",
    createdAt: "2026-08-19T09:50:00Z",
    pinned: false,
    locked: false,
    views: 233,
    tags: ["bug", "mobile"],
  },
  {
    slug: "how-do-i-appeal-a-mute",
    categorySlug: "community-help",
    title: "How do I appeal a mute?",
    authorUsername: "mossle",
    createdAt: "2026-08-21T15:40:00Z",
    pinned: false,
    locked: false,
    views: 410,
    tags: ["help", "appeal"],
  },
  {
    slug: "network-lag-eu-servers",
    categorySlug: "server-discussion",
    title: "Noticing lag spikes on EU servers tonight",
    authorUsername: "quill_ash",
    createdAt: "2026-08-28T20:05:00Z",
    pinned: false,
    locked: false,
    views: 302,
    tags: ["status"],
  },
  {
    slug: "best-bedwars-rush-strategy",
    categorySlug: "bedwars",
    title: "Best rush strategy for solo BedWars right now",
    authorUsername: "kestrelfox",
    createdAt: "2026-08-23T17:10:00Z",
    pinned: false,
    locked: false,
    featured: true,
    views: 980,
    tags: ["strategy"],
  },
  {
    slug: "bedwars-tier-list-season-4",
    categorySlug: "bedwars",
    title: "Community BedWars item tier list — Season 4",
    authorUsername: "nyxel",
    createdAt: "2026-08-24T09:30:00Z",
    pinned: false,
    locked: false,
    views: 715,
    tags: ["tier-list"],
  },
  {
    slug: "skywars-mid-fight-tips",
    categorySlug: "skywars",
    title: "Tips for winning mid-fights consistently",
    authorUsername: "verabyte",
    createdAt: "2026-08-20T10:00:00Z",
    pinned: false,
    locked: false,
    views: 540,
    tags: ["tips"],
  },
  {
    slug: "showcase-my-smp-castle",
    categorySlug: "survival-smp",
    title: "Showcase: my SMP castle build (3 months in progress)",
    prefix: "Showcase",
    authorUsername: "ravensong",
    createdAt: "2026-08-17T19:00:00Z",
    pinned: false,
    locked: false,
    featured: true,
    views: 1120,
    tags: ["build", "showcase"],
  },
  {
    slug: "duels-mode-suggestions",
    categorySlug: "other-games",
    title: "Duels mode — what kits would you want to see?",
    authorUsername: "delvinoak",
    createdAt: "2026-08-14T12:45:00Z",
    pinned: false,
    locked: false,
    views: 264,
    tags: ["duels"],
  },
  {
    slug: "hey-im-new-here",
    categorySlug: "introductions",
    title: "Hey, I'm new here!",
    authorUsername: "pixelwren",
    createdAt: "2026-08-27T22:00:00Z",
    pinned: false,
    locked: false,
    views: 88,
    tags: [],
  },
  {
    slug: "hello-from-nepal",
    categorySlug: "introductions",
    title: "Hello from Nepal 🇳🇵",
    authorUsername: "brinkley",
    createdAt: "2026-07-30T08:20:00Z",
    pinned: false,
    locked: false,
    views: 156,
    tags: [],
  },
  {
    slug: "summer-tournament-bracket",
    categorySlug: "events",
    title: "Summer BedWars Tournament — Bracket & Sign-ups",
    prefix: "Event",
    authorUsername: "nyxel",
    createdAt: "2026-08-10T10:00:00Z",
    pinned: true,
    locked: false,
    views: 2280,
    tags: ["tournament", "signup"],
  },
  {
    slug: "ember-company-recruiting",
    categorySlug: "guilds",
    title: "[EMBER] Ember Company is recruiting — active SMP guild",
    authorUsername: "delvinoak",
    createdAt: "2026-08-12T14:20:00Z",
    pinned: false,
    locked: false,
    views: 340,
    tags: ["recruiting"],
  },
  {
    slug: "pixel-art-of-the-hub",
    categorySlug: "community-creations",
    title: "Made a pixel art of the spawn hub",
    authorUsername: "ravensong",
    createdAt: "2026-08-09T16:00:00Z",
    pinned: false,
    locked: false,
    views: 410,
    tags: ["art"],
  },
  {
    slug: "unpopular-opinions-thread",
    categorySlug: "off-topic",
    title: "Unpopular Minecraft opinions — go",
    authorUsername: "kestrelfox",
    createdAt: "2026-08-11T13:15:00Z",
    pinned: false,
    locked: false,
    views: 720,
    tags: [],
  },
  {
    slug: "clutch-clip-1v3-bedwars",
    categorySlug: "media-screenshots",
    title: "Clutch 1v3 in ranked BedWars (clip inside)",
    authorUsername: "kestrelfox",
    createdAt: "2026-08-26T19:30:00Z",
    pinned: false,
    locked: false,
    featured: true,
    views: 890,
    tags: ["clip"],
  },
];

export function getThreadsByCategory(categorySlug: string): ForumThread[] {
  return threads
    .filter((t) => t.categorySlug === categorySlug)
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return posts
        .filter((p) => p.threadSlug === b.slug)
        .reduce((max, p) => (p.createdAt > max ? p.createdAt : max), b.createdAt)
        .localeCompare(
          posts
            .filter((p) => p.threadSlug === a.slug)
            .reduce((max, p) => (p.createdAt > max ? p.createdAt : max), a.createdAt)
        );
    });
}

export function getThread(
  categorySlug: string,
  threadSlug: string
): ForumThread | undefined {
  return threads.find(
    (t) => t.categorySlug === categorySlug && t.slug === threadSlug
  );
}

export function getFeaturedThreads(limit = 4): ForumThread[] {
  return threads.filter((t) => t.featured).slice(0, limit);
}

// ----------------------------------------------------------------------------
// Posts
// ----------------------------------------------------------------------------

export const posts: ForumPost[] = [
  {
    id: "p-welcome-1",
    threadSlug: "welcome-to-cyflixel-forums",
    postNumber: 1,
    authorUsername: "aryan",
    createdAt: "2026-06-01T10:00:00Z",
    content: [
      "Welcome to the official Cyflixel Forums. This is the home for network news, suggestions, bug reports, and everything the community builds together.",
      "A few things before you dive in: read the rules, be respectful, and remember every rank here was earned by someone showing up consistently — yours can be too.",
      "Glad you're here. Let's build something good.",
    ],
    reactions: [
      { type: "like", count: 214 },
      { type: "love", count: 98 },
    ],
  },
  {
    id: "p-welcome-2",
    threadSlug: "welcome-to-cyflixel-forums",
    postNumber: 2,
    authorUsername: "nyxel",
    createdAt: "2026-06-01T10:22:00Z",
    content: [
      "Pinning this. If you're new, start with the Rules & Information section before posting anywhere else.",
    ],
    reactions: [{ type: "like", count: 41 }],
  },
  {
    id: "p-season4-1",
    threadSlug: "season-4-launch-bedwars-rework",
    postNumber: 1,
    authorUsername: "aryan",
    createdAt: "2026-08-20T14:00:00Z",
    content: [
      "Season 4 is live. The headline change is a full BedWars rework: reworked shop tiers, three new maps (Ashspire, Coldreach, Marrow), and a new ranked ladder.",
      "SkyWars also gets balance passes on the top three most-picked kits, and Survival is getting a new trading outpost near spawn.",
      "Full changelog is in Updates & Changelogs. Let us know what you think in Suggestions.",
    ],
    reactions: [
      { type: "love", count: 312 },
      { type: "like", count: 190 },
      { type: "helpful", count: 44 },
    ],
  },
  {
    id: "p-season4-2",
    threadSlug: "season-4-launch-bedwars-rework",
    postNumber: 2,
    authorUsername: "kestrelfox",
    createdAt: "2026-08-20T14:40:00Z",
    content: [
      "Ashspire map is genuinely gorgeous, good job to whoever built that one.",
    ],
    reactions: [{ type: "like", count: 22 }],
  },
  {
    id: "p-season4-3",
    threadSlug: "season-4-launch-bedwars-rework",
    postNumber: 3,
    authorUsername: "ravensong",
    createdAt: "2026-08-20T15:10:00Z",
    content: [
      "Loving the rework so far, the new shop tiers make early rushes feel a lot less punishing.",
    ],
    reactions: [{ type: "like", count: 15 }],
  },
  {
    id: "p-rules-1",
    threadSlug: "forum-rules-read-before-posting",
    postNumber: 1,
    authorUsername: "nyxel",
    createdAt: "2026-06-01T10:30:00Z",
    content: [
      "1. Be respectful — no harassment, hate speech, or targeted negativity toward other members or staff.",
      "2. No spam, no self-promotion outside of designated threads, no duplicate posts.",
      "3. Keep threads in the correct category. Misplaced threads will be moved, not deleted, on first offense.",
      "4. Staff decisions can be appealed through Community Help — do not argue moderation in public threads.",
      "Breaking these rules may result in a warning, a mute, or a ban depending on severity and history.",
    ],
    reactions: [{ type: "helpful", count: 88 }],
  },
  {
    id: "p-strat-1",
    threadSlug: "best-bedwars-rush-strategy",
    postNumber: 1,
    authorUsername: "kestrelfox",
    createdAt: "2026-08-23T17:10:00Z",
    content: [
      "Since the Season 4 shop rework, I've had the most success with an early wool rush into a fast bridge — you can get to the enemy island before they've even upgraded their bed defenses.",
      "Buy shears first purchase, skip the initial armor upgrade, and prioritize the bridging block discount. It feels bad giving up early defense but the tempo advantage is worth it right now.",
    ],
    reactions: [
      { type: "helpful", count: 64 },
      { type: "like", count: 30 },
    ],
  },
  {
    id: "p-strat-2",
    threadSlug: "best-bedwars-rush-strategy",
    postNumber: 2,
    authorUsername: "nyxel",
    createdAt: "2026-08-23T18:02:00Z",
    content: [
      "Can confirm this works well in solos, a lot less reliable in squads where someone can just intercept your bridge though.",
    ],
    reactions: [{ type: "like", count: 12 }],
  },
  {
    id: "p-castle-1",
    threadSlug: "showcase-my-smp-castle",
    postNumber: 1,
    authorUsername: "ravensong",
    createdAt: "2026-08-17T19:00:00Z",
    content: [
      "Finally finished the main keep after about three months of on-and-off building. Went with a deepslate and copper theme to fit the mountain biome it's built into.",
      "Still working on the surrounding walls and a proper gatehouse, but wanted to share progress so far. Screenshots are in the Media section too.",
    ],
    reactions: [
      { type: "love", count: 140 },
      { type: "like", count: 60 },
    ],
  },
  {
    id: "p-lag-1",
    threadSlug: "network-lag-eu-servers",
    postNumber: 1,
    authorUsername: "quill_ash",
    createdAt: "2026-08-28T20:05:00Z",
    content: [
      "A few people in Discord reporting lag spikes on EU BedWars servers tonight around 8-9pm UTC. Flagging here so the team sees it — anyone else affected?",
    ],
    reactions: [{ type: "like", count: 8 }],
  },
  {
    id: "p-lag-2",
    threadSlug: "network-lag-eu-servers",
    postNumber: 2,
    authorUsername: "aryan",
    createdAt: "2026-08-28T20:30:00Z",
    content: [
      "Thanks for the report — we've identified a host-level issue on one of the EU nodes and are migrating affected servers now. Should be resolved within the hour.",
    ],
    reactions: [{ type: "helpful", count: 26 }],
  },
];

export function getPostsByThread(threadSlug: string): ForumPost[] {
  return posts
    .filter((p) => p.threadSlug === threadSlug)
    .sort((a, b) => a.postNumber - b.postNumber);
}

export function getReplyCount(threadSlug: string): number {
  const count = getPostsByThread(threadSlug).length;
  return Math.max(count - 1, 0);
}

export function getLastActivity(threadSlug: string):
  | { author: ForumUser; createdAt: string }
  | undefined {
  const threadPosts = getPostsByThread(threadSlug);
  const last = threadPosts[threadPosts.length - 1];
  if (!last) return undefined;
  const author = getUser(last.authorUsername);
  if (!author) return undefined;
  return { author, createdAt: last.createdAt };
}

// ----------------------------------------------------------------------------
// Category-level aggregates
// ----------------------------------------------------------------------------

export function getCategoryStats(categorySlug: string) {
  const categoryThreads = threads.filter((t) => t.categorySlug === categorySlug);
  const threadCount = categoryThreads.length;
  const postCount = categoryThreads.reduce(
    (sum, t) => sum + getPostsByThread(t.slug).length,
    0
  );

  let latest: { thread: ForumThread; author: ForumUser; createdAt: string } | undefined;
  for (const thread of categoryThreads) {
    const activity = getLastActivity(thread.slug);
    if (!activity) continue;
    if (!latest || activity.createdAt > latest.createdAt) {
      latest = { thread, author: activity.author, createdAt: activity.createdAt };
    }
  }

  return { threadCount, postCount, latest };
}

export function getCategory(slug: string): ForumCategory | undefined {
  return allCategories.find((c) => c.slug === slug);
}

export function getCategoryGroupFor(slug: string): ForumCategoryGroup | undefined {
  return categoryGroups.find((g) => g.categories.some((c) => c.slug === slug));
}

// ----------------------------------------------------------------------------
// Forum-wide stats (for the homepage header)
// ----------------------------------------------------------------------------

export function getForumStats() {
  const totalThreads = threads.length;
  const totalPosts = posts.length;
  const totalMembers = users.length;
  const onlineNow = users.filter((u) => u.online).length;
  return { totalThreads, totalPosts, totalMembers, onlineNow };
}

// ----------------------------------------------------------------------------
// Search (client-side/mock — swap for a real search index later)
// ----------------------------------------------------------------------------

export interface ForumSearchResult {
  type: "thread" | "user" | "category";
  title: string;
  subtitle: string;
  href: string;
}

export function searchForum(query: string, limit = 8): ForumSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: ForumSearchResult[] = [];

  for (const thread of threads) {
    if (thread.title.toLowerCase().includes(q) || thread.tags.some((t) => t.includes(q))) {
      results.push({
        type: "thread",
        title: thread.title,
        subtitle: `in ${getCategory(thread.categorySlug)?.name ?? thread.categorySlug}`,
        href: `/forums/${thread.categorySlug}/${thread.slug}`,
      });
    }
  }

  for (const category of allCategories) {
    if (category.name.toLowerCase().includes(q)) {
      results.push({
        type: "category",
        title: category.name,
        subtitle: category.description,
        href: `/forums/${category.slug}`,
      });
    }
  }

  for (const user of users) {
    if (
      user.username.toLowerCase().includes(q) ||
      user.displayName.toLowerCase().includes(q)
    ) {
      results.push({
        type: "user",
        title: user.displayName,
        subtitle: user.rank,
        href: `/forums/u/${user.username}`,
      });
    }
  }

  return results.slice(0, limit);
}

// ----------------------------------------------------------------------------
// Thread prefixes / tags available when creating a thread
// ----------------------------------------------------------------------------

export const threadPrefixes = [
  "Discussion",
  "Question",
  "Suggestion",
  "Bug",
  "Guide",
  "Showcase",
  "Event",
] as const;
