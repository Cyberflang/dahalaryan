import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  allCategories,
  getCategory,
  getCategoryGroupFor,
  getThreadsByCategory,
} from "../../lib/forum-data";
import { ForumShell } from "../../components/forum/forum-shell";
import { CategoryIcon, Breadcrumbs } from "../../components/forum/forum-ui";
import { CategoryThreadList } from "../../components/forum/category-thread-list";
import { PlusIcon } from "../../components/icons";
import { Button, Container } from "../../components/ui";

export function generateStaticParams() {
  return allCategories.map((category) => ({ category: category.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const category = getCategory(params.category);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const group = getCategoryGroupFor(category.slug);
  const threads = getThreadsByCategory(category.slug);
  const pinnedThreads = threads.filter((t) => t.pinned);
  const normalThreads = threads.filter((t) => !t.pinned);

  return (
    <ForumShell>
      <Container className="pb-24 pt-10 sm:pt-14">
        <Breadcrumbs
          items={[
            { label: "Forums", href: "/forums" },
            ...(group ? [{ label: group.label }] : []),
            { label: category.name },
          ]}
        />

        <div className="mt-5 flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-surface/60 text-accent">
              <CategoryIcon icon={category.icon} size={22} />
            </span>
            <div>
              <h1 className="text-2xl font-medium tracking-tight text-fg sm:text-3xl">
                {category.name}
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                {category.description}
              </p>
            </div>
          </div>

          {!category.staffOnly ? (
            <Button href={`/forums/new?category=${category.slug}`} className="shrink-0">
              <PlusIcon width={15} height={15} />
              Create Thread
            </Button>
          ) : null}
        </div>

        <div className="mt-8">
          <CategoryThreadList pinnedThreads={pinnedThreads} normalThreads={normalThreads} />
        </div>
      </Container>
    </ForumShell>
  );
}
