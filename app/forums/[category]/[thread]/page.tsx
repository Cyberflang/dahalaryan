import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCategory,
  getPostsByThread,
  getReplyCount,
  getThread,
  getThreadsByCategory,
  getUser,
  threads,
} from "../../../lib/forum-data";
import { ForumShell } from "../../../components/forum/forum-shell";
import { Breadcrumbs } from "../../../components/forum/forum-ui";
import { ThreadPostPager } from "../../../components/forum/thread-post-pager";
import { EyeIcon, LockIcon, MessageIcon, PinIcon } from "../../../components/icons";
import { Card, Container } from "../../../components/ui";

export function generateStaticParams() {
  return threads.map((thread) => ({
    category: thread.categorySlug,
    thread: thread.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string; thread: string };
}): Metadata {
  const thread = getThread(params.category, params.thread);
  if (!thread) return {};
  return {
    title: thread.title,
    description: `${thread.title} — Cyflixel Forums`,
  };
}

export default function ThreadPage({
  params,
}: {
  params: { category: string; thread: string };
}) {
  const category = getCategory(params.category);
  const thread = getThread(params.category, params.thread);
  if (!category || !thread) notFound();

  const author = getUser(thread.authorUsername);
  const posts = getPostsByThread(thread.slug);
  const replyCount = getReplyCount(thread.slug);

  const related = getThreadsByCategory(category.slug)
    .filter((t) => t.slug !== thread.slug)
    .slice(0, 4);

  return (
    <ForumShell>
      <Container className="pb-24 pt-10 sm:pt-14">
        <Breadcrumbs
          items={[
            { label: "Forums", href: "/forums" },
            { label: category.name, href: `/forums/${category.slug}` },
            { label: thread.title },
          ]}
        />

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {thread.pinned ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent">
              <PinIcon width={11} height={11} />
              Pinned
            </span>
          ) : null}
          {thread.locked ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
              <LockIcon width={11} height={11} />
              Locked
            </span>
          ) : null}
          {thread.prefix ? (
            <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
              {thread.prefix}
            </span>
          ) : null}
        </div>

        <h1 className="mt-3 text-2xl font-medium tracking-tight text-fg sm:text-3xl">
          {thread.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted">
          <span>
            by <span className="text-fg/80">{author?.displayName ?? thread.authorUsername}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <MessageIcon width={13} height={13} />
            {replyCount} repl{replyCount === 1 ? "y" : "ies"}
          </span>
          <span className="flex items-center gap-1.5">
            <EyeIcon width={13} height={13} />
            {thread.views} views
          </span>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_18rem]">
          <ThreadPostPager posts={posts} locked={thread.locked} />

          <aside className="flex flex-col gap-4 lg:pt-1">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
              More in {category.name}
            </h2>
            <Card className="p-2">
              {related.length > 0 ? (
                <div className="flex flex-col divide-y divide-line">
                  {related.map((t) => (
                    <a
                      key={t.slug}
                      href={`/forums/${category.slug}/${t.slug}`}
                      className="block px-2 py-3 text-sm text-fg/90 transition-colors hover:text-accent"
                    >
                      <span className="line-clamp-2">{t.title}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="px-2 py-4 text-sm text-muted">No other threads yet.</p>
              )}
            </Card>
          </aside>
        </div>
      </Container>
    </ForumShell>
  );
}
