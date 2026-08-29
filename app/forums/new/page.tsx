import type { Metadata } from "next";
import { Suspense } from "react";
import { ForumShell } from "../../components/forum/forum-shell";
import { Breadcrumbs } from "../../components/forum/forum-ui";
import { NewThreadForm } from "../../components/forum/new-thread-form";
import { Container } from "../../components/ui";

export const metadata: Metadata = {
  title: "Create Thread",
  description: "Start a new thread on the Cyflixel Forums.",
};

export default function NewThreadPage() {
  return (
    <ForumShell>
      <Container className="max-w-3xl pb-24 pt-10 sm:pt-14">
        <Breadcrumbs
          items={[{ label: "Forums", href: "/forums" }, { label: "Create Thread" }]}
        />

        <h1 className="mt-5 text-2xl font-medium tracking-tight text-fg sm:text-3xl">
          Create Thread
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
          Pick a category, give it a clear title, and write your post. You can preview
          before publishing.
        </p>

        <div className="mt-8">
          <Suspense fallback={<NewThreadFormSkeleton />}>
            <NewThreadForm />
          </Suspense>
        </div>
      </Container>
    </ForumShell>
  );
}

function NewThreadFormSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-line bg-surface/40 p-6">
      <div className="h-4 w-32 rounded bg-line" />
      <div className="mt-4 h-10 rounded-xl bg-line/60" />
      <div className="mt-4 h-32 rounded-xl bg-line/60" />
    </div>
  );
}
