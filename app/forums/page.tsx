import type { Metadata } from "next";
import { categories, getLatestThreads, getThreadsByCategory } from "../lib/forum-data";
import { ForumShell } from "../components/forum/forum-shell";
import { ForumSearch } from "../components/forum/forum-search";
import { Breadcrumbs, DiscussCard, formatDate } from "../components/forum/forum-ui";
import { Container, Link } from "../components/ui";

export const metadata: Metadata = {
  title: "Forum",
  description: "Updates, project notes and community information from Aryan Dahal.",
};

export default function ForumsPage() {
  const latest = getLatestThreads(5);

  return (
    <ForumShell>
      <Container className="pb-24 pt-10 sm:pt-14">
        <Breadcrumbs items={[{ label: "Forum" }]} />

        <div className="mt-6 flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-fg sm:text-4xl">Forum</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-muted">
              Updates, project notes and community information. For live conversation, join us on
              Discord.
            </p>
          </div>
          <ForumSearch className="w-full sm:max-w-xs" />
        </div>

        <section aria-labelledby="categories" className="mt-10">
          <h2
            id="categories"
            className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            Categories
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {categories.map((category) => {
              const count = getThreadsByCategory(category.slug).length;
              return (
                <Link
                  key={category.slug}
                  href={`/forums/${category.slug}`}
                  className="group rounded-2xl border border-line bg-surface/60 p-5 transition-colors hover:border-accent/40"
                >
                  <h3 className="text-base font-medium text-fg group-hover:text-accent">
                    {category.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{category.description}</p>
                  <p className="mt-4 font-mono text-xs text-muted">
                    {count} {count === 1 ? "post" : "posts"}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="latest" className="mt-12">
          <h2
            id="latest"
            className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            Latest posts
          </h2>
          <ul className="divide-y divide-line border-y border-line">
            {latest.map((thread) => (
              <li key={thread.slug}>
                <Link
                  href={`/forums/${thread.categorySlug}/${thread.slug}`}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="text-sm text-fg transition-colors group-hover:text-accent">
                    {thread.title}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-muted">
                    {formatDate(thread.createdAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12">
          <DiscussCard />
        </div>
      </Container>
    </ForumShell>
  );
}
