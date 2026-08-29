import type { ReactNode } from "react";
import type { CommunityRank, ForumCategoryIcon, ForumUser, StaffRank } from "../../lib/forum-data";
import {
  BellIcon,
  BlocksIcon,
  ChevronRightIcon,
  CodeIcon,
  MessageIcon,
  ShieldIcon,
  SparkIcon,
  TerminalIcon,
} from "../icons";
import { Link } from "../ui";

// ---------------------------------------------------------------------------
// Avatar — deterministic initials avatar (no external images required)
// ---------------------------------------------------------------------------

export function Avatar({
  user,
  size = 40,
}: {
  user: Pick<ForumUser, "displayName" | "avatarColor" | "online">;
  size?: number;
}) {
  const initials = user.displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      <span
        className="flex h-full w-full items-center justify-center rounded-full border border-line font-mono font-medium text-[#14100a]"
        style={{
          backgroundColor: user.avatarColor,
          fontSize: size * 0.38,
        }}
        aria-hidden
      >
        {initials}
      </span>
      {user.online ? (
        <span
          className="absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-bg bg-[#5fbf7a]"
          style={{ width: size * 0.3, height: size * 0.3 }}
          title="Online"
        />
      ) : null}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Rank badge
// ---------------------------------------------------------------------------

const communityRankColors: Record<CommunityRank, string> = {
  MEMBER: "#9a9a95",
  "CYFLIXEL BRONZE": "#c48a54",
  "CYFLIXEL SILVER": "#b9bcc2",
  "CYFLIXEL GOLD": "#e0a94a",
  "CYFLIXEL DIAMOND": "#7fd6e0",
  "CYFLIXEL MYTHIC": "#c07fe0",
};

const staffRankColors: Record<StaffRank, string> = {
  HELPER: "#8fd0b0",
  SUPPORT: "#7fb2e0",
  ADMIN: "#e08f7f",
  "MAIN ADMIN": "#e0607f",
  OWNER: "#e0a94a",
};

export function RankBadge({
  rank,
  className = "",
}: {
  rank: CommunityRank;
  className?: string;
}) {
  const color = communityRankColors[rank];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide ${className}`}
      style={{ borderColor: `color-mix(in srgb, ${color} 45%, transparent)`, color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {rank}
    </span>
  );
}

export function StaffBadge({
  staffRank,
  className = "",
}: {
  staffRank: StaffRank;
  className?: string;
}) {
  const color = staffRankColors[staffRank];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide ${className}`}
      style={{ borderColor: `color-mix(in srgb, ${color} 45%, transparent)`, color }}
    >
      <ShieldIcon width={11} height={11} />
      {staffRank}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Stat pill — small inline metric used on category cards / headers
// ---------------------------------------------------------------------------

export function StatPill({
  icon,
  value,
  label,
}: {
  icon?: ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-end">
      <span className="flex items-center gap-1.5 font-mono text-sm font-medium text-fg">
        {icon}
        {value}
      </span>
      <span className="text-[11px] text-muted">{label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Category icon map
// ---------------------------------------------------------------------------

export function CategoryIcon({
  icon,
  className = "",
  size = 18,
}: {
  icon: ForumCategoryIcon;
  className?: string;
  size?: number;
}) {
  const props = { width: size, height: size, className };
  switch (icon) {
    case "announcement":
      return <BellIcon {...props} />;
    case "changelog":
      return <CodeIcon {...props} />;
    case "shield":
      return <ShieldIcon {...props} />;
    case "info":
      return <MessageIcon {...props} />;
    case "chat":
      return <MessageIcon {...props} />;
    case "suggestion":
      return <SparkIcon {...props} />;
    case "bug":
      return <TerminalIcon {...props} />;
    case "help":
      return <MessageIcon {...props} />;
    case "server":
      return <TerminalIcon {...props} />;
    case "bedwars":
    case "skywars":
    case "survival":
    case "games":
      return <BlocksIcon {...props} />;
    case "intro":
      return <SparkIcon {...props} />;
    case "events":
      return <BellIcon {...props} />;
    case "guilds":
      return <ShieldIcon {...props} />;
    case "creations":
      return <BlocksIcon {...props} />;
    case "offtopic":
      return <MessageIcon {...props} />;
    case "media":
      return <CodeIcon {...props} />;
    default:
      return <MessageIcon {...props} />;
  }
}

// ---------------------------------------------------------------------------
// Breadcrumbs
// ---------------------------------------------------------------------------

export function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className="text-muted transition-colors hover:text-fg">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-fg" : "text-muted"} aria-current={isLast ? "page" : undefined}>
                {item.label}
              </span>
            )}
            {!isLast ? (
              <ChevronRightIcon width={13} height={13} className="text-muted/60" />
            ) : null}
          </span>
        );
      })}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Relative time formatting
// ---------------------------------------------------------------------------

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date("2026-08-29T12:00:00Z");
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.round(diffMs / 60000);
  const diffHr = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHr / 24);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatFullDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
