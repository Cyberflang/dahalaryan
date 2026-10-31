import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, getThreadsByCategory } from "../../lib/forum-data";
import { ForumShell } from "../../components/forum/forum-shell";
import { Breadcrumbs, formatDate } from "../../components/forum/forum-ui";
import { Container, Link } from "../../components/ui";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const threads = getThreadsByCategory(category.slug);

  return (
    <ForumShell>
      <Container className="pb-24 pt-10 sm:pt-14">
        <Breadcrumbs items={[{ label: "Forum", href: "/forums" }, { label: category.name }]} />

        <div className="mt-6 border-b border-line pb-8">
          <h1 className="text-3xl font-medium tracking-tight text-fg sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-3 text-base leading-7 text-muted">{category.description}</p>
        </div>

        {threads.length === 0 ? (
          <p className="mt-10 text-sm text-muted">No posts here yet.</p>
        ) : (
          <ul className="divide-y divide-line border-b border-line">
            {threads.map((thread) => (
              <li key={thread.slug}>
                <Link
                  href={`/forums/${thread.categorySlug}/${thread.slug}`}
                  className="group block py-5"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-base font-medium text-fg transition-colors group-hover:text-accent">
                      {thread.title}
                    </h2>
                    <span className="shrink-0 font-mono text-xs text-muted">
                      {formatDate(thread.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted">
                    {thread.content[0]}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </ForumShell>
  );
}
