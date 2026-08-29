import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getUser, posts, threads, users } from "../../../lib/forum-data";
import { ForumShell } from "../../../components/forum/forum-shell";
import {
  Avatar,
  Breadcrumbs,
  RankBadge,
  StaffBadge,
  formatFullDate,
  formatRelativeTime,
} from "../../../components/forum/forum-ui";
import { ThreadRow } from "../../../components/forum/thread-row";
import { MessageIcon, SparkIcon, UsersIcon } from "../../../components/icons";
import { Card, Container } from "../../../components/ui";

export function generateStaticParams() {
  return users.map((user) => ({ username: user.username }));
}

export function generateMetadata({
  params,
}: {
  params: { username: string };
}): Metadata {
  const user = getUser(params.username);
  if (!user) return {};
  return {
    title: user.displayName,
    description: `${user.displayName}'s profile on the Cyflixel Forums.`,
  };
}

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const user = getUser(params.username);
  if (!user) notFound();

  const recentThreads = threads
    .filter((t) => t.authorUsername === user.username)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  const recentPosts = posts
    .filter((p) => p.authorUsername === user.username)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  return (
    <ForumShell>
      <Container className="pb-24 pt-10 sm:pt-14">
        <Breadcrumbs
          items={[{ label: "Forums", href: "/forums" }, { label: user.displayName }]}
        />

        <Card className="mt-5 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <Avatar user={user} size={84} />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-medium tracking-tight text-fg">
                {user.displayName}
              </h1>
              {user.online ? (
                <span className="inline-flex items-center gap-1.5 text-xs text-[#5fbf7a]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5fbf7a]" />
                  Online now
                </span>
              ) : (
                <span className="text-xs text-muted">Offline</span>
              )}
            </div>
            <p className="mt-0.5 font-mono text-sm text-muted">@{user.username}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <RankBadge rank={user.rank} />
              {user.staffRank ? <StaffBadge staffRank={user.staffRank} /> : null}
            </div>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">{user.bio}</p>
          </div>

          <div className="flex shrink-0 gap-6 border-t border-line pt-5 sm:flex-col sm:gap-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <ProfileStat icon={<MessageIcon width={14} height={14} />} value={user.postCount} label="Posts" />
            <ProfileStat icon={<SparkIcon width={14} height={14} />} value={user.threadCount} label="Threads" />
            <ProfileStat icon={<UsersIcon width={14} height={14} />} value={user.reactionScore} label="Reactions" />
          </div>
        </Card>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Card className="p-5">
            <p className="text-xs text-muted">Forum member since</p>
            <p className="mt-1 text-sm font-medium text-fg">{formatFullDate(user.joinDate)}</p>
          </Card>
          <Card className="p-5">
            <p className="text-xs text-muted">Badges</p>
            {user.badges.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {user.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-line bg-bg/60 px-2.5 py-1 text-xs text-fg/90"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-1 text-sm text-muted">No badges yet.</p>
            )}
          </Card>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Recent Threads
            </h2>
            <Card className="p-2">
              {recentThreads.length > 0 ? (
                <div className="flex flex-col">
                  {recentThreads.map((thread) => (
                    <ThreadRow key={thread.slug} thread={thread} showCategory />
                  ))}
                </div>
              ) : (
                <p className="px-3 py-6 text-sm text-muted">No threads yet.</p>
              )}
            </Card>
          </section>

          <section>
            <h2 className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Recent Activity
            </h2>
            <Card className="flex flex-col divide-y divide-line p-2">
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => {
                  const thread = threads.find((t) => t.slug === post.threadSlug);
                  if (!thread) return null;
                  return (
                    <a
                      key={post.id}
                      href={`/forums/${thread.categorySlug}/${thread.slug}#post-${post.postNumber}`}
                      className="block px-3 py-3 transition-colors hover:bg-bg/40"
                    >
                      <p className="line-clamp-1 text-sm text-fg/90">
                        replied in <span className="font-medium text-fg">{thread.title}</span>
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {formatRelativeTime(post.createdAt)}
                      </p>
                    </a>
                  );
                })
              ) : (
                <p className="px-3 py-6 text-sm text-muted">No recent activity.</p>
              )}
            </Card>
          </section>
        </div>
      </Container>
    </ForumShell>
  );
}

function ProfileStat({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 sm:justify-between">
      <span className="flex items-center gap-1.5 font-mono text-sm font-medium text-fg">
        {icon}
        {value.toLocaleString()}
      </span>
      <span className="text-[11px] text-muted">{label}</span>
    </div>
  );
}
