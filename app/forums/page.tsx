import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  categoryGroups,
  getFeaturedThreads,
  getForumStats,
  getUser,
} from "../lib/forum-data";
import { ForumShell } from "../components/forum/forum-shell";
import { CategoryGroup } from "../components/forum/category-group";
import { ForumSearch } from "../components/forum/forum-search";
import { Breadcrumbs } from "../components/forum/forum-ui";
import { ArrowRightIcon, EyeIcon, MessageIcon, PlusIcon, SparkIcon, UsersIcon } from "../components/icons";
import { Badge, Button, Card, Container, Link, Reveal } from "../components/ui";

export const metadata: Metadata = {
  title: "Cyflixel Forums",
  description:
    "News, discussion, suggestions, and community threads for the Cyflixel network.",
};

export default function ForumsPage() {
  const stats = getForumStats();
  const featured = getFeaturedThreads(3);

  return (
    <ForumShell>
      <Container className="pb-24 pt-10 sm:pt-14">
        <Breadcrumbs items={[{ label: "Forums" }]} />

        <div className="mt-5 flex flex-col gap-8 border-b border-line pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge dot className="mb-4">
              {stats.onlineNow} online now
            </Badge>
            <h1 className="text-3xl font-medium tracking-tight text-fg sm:text-4xl">
              Cyflixel Forums
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-muted">
              News, discussion, and everything the Cyflixel community is building —
              organized, searchable, and open to everyone on the network.
            </p>
          </div>

          <div className="flex shrink-0 gap-3">
            <Button href="/forums/new" variant="primary">
              <PlusIcon width={15} height={15} />
              Create Thread
            </Button>
            <Button href="/forums/new-posts" variant="secondary">
              New Posts
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          <ForumSearch className="w-full lg:max-w-xl" />

          <div className="flex flex-wrap gap-6 text-sm sm:gap-8">
            <StatBlock icon={<MessageIcon width={15} height={15} />} value={stats.totalThreads} label="Threads" />
            <StatBlock icon={<SparkIcon width={15} height={15} />} value={stats.totalPosts} label="Posts" />
            <StatBlock icon={<UsersIcon width={15} height={15} />} value={stats.totalMembers} label="Members" />
          </div>
        </div>

        {featured.length > 0 ? (
          <Reveal className="mt-12">
            <h2 className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Featured Discussions
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {featured.map((thread) => {
                const author = getUser(thread.authorUsername);
                return (
                  <Card key={thread.slug} className="p-4">
                    <Link
                      href={`/forums/${thread.categorySlug}/${thread.slug}`}
                      className="absolute inset-0 z-0 rounded-2xl"
                      aria-label={thread.title}
                    />
                    <p className="relative z-10 line-clamp-2 text-sm font-medium text-fg group-hover:text-accent">
                      {thread.title}
                    </p>
                    <div className="relative z-10 mt-3 flex items-center justify-between text-xs text-muted">
                      <span>{author?.displayName ?? thread.authorUsername}</span>
                      <span className="flex items-center gap-1.5">
                        <EyeIcon width={12} height={12} />
                        {thread.views}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Reveal>
        ) : null}

        <div className="mt-14 flex flex-col gap-12">
          {categoryGroups.map((group) => (
            <Reveal key={group.id}>
              <CategoryGroup group={group} />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface/40 p-8 text-center">
          <p className="text-sm text-muted">
            Looking for a specific member? Every profile lives at{" "}
            <span className="font-mono text-fg">/forums/u/[username]</span>.
          </p>
          <Link
            href="/forums/u/aryan"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-opacity hover:opacity-70"
          >
            View an example profile
            <ArrowRightIcon width={13} height={13} />
          </Link>
        </div>
      </Container>
    </ForumShell>
  );
}

function StatBlock({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-accent">{icon}</span>
      <div>
        <p className="font-mono text-sm font-medium text-fg">{value.toLocaleString()}</p>
        <p className="text-[11px] text-muted">{label}</p>
      </div>
    </div>
  );
}
