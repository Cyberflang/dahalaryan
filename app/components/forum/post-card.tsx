import type { ForumPost } from "../../lib/forum-data";
import { getUser } from "../../lib/forum-data";
import { MessageIcon, MoreIcon, ShareIcon, ShieldIcon } from "../icons";
import { Card } from "../ui";
import { Avatar, RankBadge, StaffBadge, formatFullDate, formatRelativeTime } from "./forum-ui";
import { ReactionBar } from "./reaction-bar";

export function PostCard({ post }: { post: ForumPost }) {
  const author = getUser(post.authorUsername);
  if (!author) return null;

  const isOriginalPost = post.postNumber === 1;

  return (
    <Card
      as="article"
      id={`post-${post.postNumber}`}
      className={`scroll-mt-24 p-0 hover:border-line ${
        isOriginalPost ? "border-accent/25" : ""
      }`}
    >
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:p-6">
        {/* Author column */}
        <div className="flex shrink-0 flex-row items-center gap-3 sm:w-40 sm:flex-col sm:items-start sm:gap-2 sm:border-r sm:border-line sm:pr-5">
          <Avatar user={author} size={44} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-fg">{author.displayName}</p>
            <p className="truncate font-mono text-[11px] text-muted">@{author.username}</p>
          </div>
          <div className="hidden flex-col gap-1.5 sm:flex">
            <RankBadge rank={author.rank} />
            {author.staffRank ? <StaffBadge staffRank={author.staffRank} /> : null}
          </div>
        </div>

        {/* Content column */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
            <div className="flex items-center gap-2 text-xs text-muted">
              <span title={formatFullDate(post.createdAt)}>
                {formatRelativeTime(post.createdAt)}
              </span>
              {post.editedAt ? <span className="italic">· edited</span> : null}
            </div>
            <a
              href={`#post-${post.postNumber}`}
              className="font-mono text-xs text-muted transition-colors hover:text-accent"
            >
              #{post.postNumber}
            </a>
          </div>

          <div className="flex flex-col gap-1.5 sm:hidden">
            <RankBadge rank={author.rank} />
            {author.staffRank ? <StaffBadge staffRank={author.staffRank} /> : null}
          </div>

          <div className="mt-4 flex flex-col gap-3 text-sm leading-7 text-fg/90">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <ReactionBar reactions={post.reactions} postId={post.id} />

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-fg"
              >
                <MessageIcon width={13} height={13} />
                Reply
              </button>
              <button
                type="button"
                aria-label="Share post"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-fg"
              >
                <ShareIcon width={14} height={14} />
              </button>
              {author.staffRank ? (
                <button
                  type="button"
                  aria-label="Moderation options"
                  title="Staff-only moderation controls"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-fg"
                >
                  <ShieldIcon width={14} height={14} />
                </button>
              ) : null}
              <button
                type="button"
                aria-label="More options"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-fg"
              >
                <MoreIcon width={14} height={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
