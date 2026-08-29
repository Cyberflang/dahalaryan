import type { ForumCategory } from "../../lib/forum-data";
import { getCategoryStats } from "../../lib/forum-data";
import { Card, Link } from "../ui";
import { Avatar, CategoryIcon, StatPill, formatRelativeTime } from "./forum-ui";
import { ShieldIcon } from "../icons";

export function CategoryCard({ category }: { category: ForumCategory }) {
  const { threadCount, postCount, latest } = getCategoryStats(category.slug);

  return (
    <Card
      as="article"
      className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 hover:border-accent/40"
    >
      <Link
        href={`/forums/${category.slug}`}
        className="absolute inset-0 z-0 rounded-2xl"
        aria-label={category.name}
      />

      <div className="relative z-10 flex flex-1 items-start gap-4">
        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-bg/60 text-accent transition-colors group-hover:border-accent/50">
          <CategoryIcon icon={category.icon} size={18} />
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-medium text-fg">{category.name}</h3>
            {category.staffOnly ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
                <ShieldIcon width={10} height={10} />
                Staff posts
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm leading-6 text-muted">{category.description}</p>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between gap-6 border-t border-line pt-4 sm:justify-end sm:border-t-0 sm:pt-0">
        <div className="flex items-center gap-5">
          <StatPill value={threadCount} label="Threads" />
          <StatPill value={postCount} label="Posts" />
        </div>

        {latest ? (
          <div className="hidden min-w-0 items-center gap-2.5 border-l border-line pl-5 lg:flex">
            <Avatar user={latest.author} size={32} />
            <div className="min-w-0">
              <p className="max-w-[11rem] truncate text-xs font-medium text-fg">
                {latest.thread.title}
              </p>
              <p className="text-[11px] text-muted">
                {latest.author.displayName} · {formatRelativeTime(latest.createdAt)}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

