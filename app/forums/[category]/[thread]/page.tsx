import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getThread, threads } from "../../../lib/forum-data";
import { person } from "../../../lib/site-data";
import { ForumShell } from "../../../components/forum/forum-shell";
import {
  Avatar,
  Breadcrumbs,
  DiscussCard,
  formatDate,
} from "../../../components/forum/forum-ui";
import { ArrowRightIcon } from "../../../components/icons";
import { Container, Link } from "../../../components/ui";

export function generateStaticParams() {
  return threads.map((t) => ({ category: t.categorySlug, thread: t.slug }));
}

type Params = Promise<{ category: string; thread: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category, thread: slug } = await params;
  const thread = getThread(category, slug);
  if (!thread) return {};
  return { title: thread.title, description: thread.content[0] };
}

export default async function ThreadPage({ params }: { params: Params }) {
  const { category: categorySlug, thread: threadSlug } = await params;
  const category = getCategory(categorySlug);
  const thread = getThread(categorySlug, threadSlug);
  if (!category || !thread) notFound();

  return (
    <ForumShell>
      <Container className="pb-24 pt-10 sm:pt-14">
        <Breadcrumbs
          items={[
            { label: "Forum", href: "/forums" },
            { label: category.name, href: `/forums/${category.slug}` },
            { label: thread.title },
          ]}
        />

        <article className="mt-8 max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-fg sm:text-4xl">
            {thread.title}
          </h1>

          <div className="mt-5 flex items-center gap-3 border-b border-line pb-6">
            <Avatar size={40} />
            <div>
              <p className="text-sm font-medium text-fg">{person.name}</p>
              <p className="text-xs text-muted">{formatDate(thread.createdAt)}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-5 text-base leading-8 text-fg/90">
            {thread.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>

        <div className="mt-12 max-w-2xl">
          <DiscussCard />
          <Link
            href={`/forums/${category.slug}`}
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowRightIcon width={14} height={14} className="rotate-180" />
            Back to {category.name}
          </Link>
        </div>
      </Container>
    </ForumShell>
  );
}
