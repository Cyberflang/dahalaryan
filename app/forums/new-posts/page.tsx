import type { Metadata } from "next";
import { getLastActivity, threads } from "../../lib/forum-data";
import { ForumShell } from "../../components/forum/forum-shell";
import { Breadcrumbs } from "../../components/forum/forum-ui";
import { ThreadRow } from "../../components/forum/thread-row";
import { Card, Container } from "../../components/ui";

export const metadata: Metadata = {
  title: "New Posts",
  description: "The latest activity across every Cyflixel Forums category.",
};

export default function NewPostsPage() {
  const sorted = [...threads].sort((a, b) => {
    const aTime = getLastActivity(a.slug)?.createdAt ?? a.createdAt;
    const bTime = getLastActivity(b.slug)?.createdAt ?? b.createdAt;
    return bTime.localeCompare(aTime);
  });

  return (
    <ForumShell>
      <Container className="pb-24 pt-10 sm:pt-14">
        <Breadcrumbs items={[{ label: "Forums", href: "/forums" }, { label: "New Posts" }]} />

        <h1 className="mt-5 text-3xl font-medium tracking-tight text-fg sm:text-4xl">
          New Posts
        </h1>
        <p className="mt-3 max-w-xl text-base leading-7 text-muted">
          Every thread on the network, ordered by most recent activity.
        </p>

        <Card className="mt-10 p-2 sm:p-3">
          <div className="flex flex-col">
            {sorted.map((thread) => (
              <ThreadRow key={thread.slug} thread={thread} showCategory />
            ))}
          </div>
        </Card>
      </Container>
    </ForumShell>
  );
}
