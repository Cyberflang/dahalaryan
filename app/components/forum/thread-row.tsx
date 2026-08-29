import {
  getCategory,
  getLastActivity,
  getReplyCount,
  getUser,
  type ForumThread,
} from "../../lib/forum-data";
import { EyeIcon, LockIcon, MessageIcon, PinIcon } from "../icons";
import { Link } from "../ui";
import { Avatar, formatRelativeTime } from "./forum-ui";

const prefixColors: Record<string, string> = {
  Announcement: "text-accent border-accent/40",
  Changelog: "text-[#7fb2e0] border-[#7fb2e0]/40",
  Guide: "text-[#8fd0b0] border-[#8fd0b0]/40",
  Suggestion: "text-[#c07fe0] border-[#c07fe0]/40",
  Bug: "text-[#e08f7f] border-[#e08f7f]/40",
  Showcase: "text-[#e0d67f] border-[#e0d67f]/40",
  Event: "text-[#e0a94a] border-[#e0a94a]/40",
  Discussion: "text-muted border-line",
  Question: "text-muted border-line",
};

export function ThreadRow({
  thread,
  showCategory = false,
}: {
  thread: ForumThread;
  showCategory?: boolean;
}) {
  const author = getUser(thread.authorUsername);
  const activity = getLastActivity(thread.slug);
  const replyCount = getReplyCount(thread.slug);
  const category = showCategory ? getCategory(thread.categorySlug) : undefined;

  return (
    <div className="group relative flex items-center gap-4 border-b border-line px-1 py-4 transition-colors last:border-b-0 hover:bg-surface/50 sm:px-3">
      <Link
        href={`/forums/${thread.categorySlug}/${thread.slug}`}
        className="absolute inset-0"
        aria-label={thread.title}
      />

      {author ? (
        <div className="relative z-10 hidden shrink-0 sm:block">
          <Avatar user={author} size={38} />
        </div>
      ) : null}

      <div className="relative z-10 min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {thread.pinned ? (
            <PinIcon width={13} height={13} className="shrink-0 text-accent" />
          ) : null}
          {thread.locked ? (
            <LockIcon width={13} height={13} className="shrink-0 text-muted" />
          ) : null}
          {thread.prefix ? (
            <span
              className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
                prefixColors[thread.prefix] ?? "text-muted border-line"
              }`}
            >
              {thread.prefix}
            </span>
          ) : null}
          <h3 className="truncate text-sm font-medium text-fg transition-colors group-hover:text-accent">
            {thread.title}
          </h3>
        </div>
        <p className="mt-1 text-xs text-muted">
          by <span className="text-fg/80">{author?.displayName ?? thread.authorUsername}</span>
          {" · "}
          {formatRelativeTime(thread.createdAt)}
          {category ? (
            <>
              {" · "}
              <span className="text-muted/80">{category.name}</span>
            </>
          ) : null}
        </p>
      </div>

      <div className="relative z-10 hidden shrink-0 items-center gap-5 text-xs text-muted sm:flex">
        <span className="flex items-center gap-1.5 font-mono">
          <MessageIcon width={13} height={13} />
          {replyCount}
        </span>
        <span className="flex items-center gap-1.5 font-mono">
          <EyeIcon width={13} height={13} />
          {thread.views}
        </span>
      </div>

      {activity ? (
        <div className="relative z-10 hidden w-36 shrink-0 text-right lg:block">
          <p className="truncate text-xs font-medium text-fg">{activity.author.displayName}</p>
          <p className="text-[11px] text-muted">{formatRelativeTime(activity.createdAt)}</p>
        </div>
      ) : null}
    </div>
  );
}
