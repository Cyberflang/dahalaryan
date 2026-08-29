"use client";

import { useMemo, useState } from "react";
import {
  getLastActivity,
  getReplyCount,
  type ForumThread,
} from "../../lib/forum-data";
import { ChevronDownIcon } from "../icons";
import { Card } from "../ui";
import { Pagination } from "./pagination";
import { ThreadRow } from "./thread-row";

type SortKey = "activity" | "newest" | "replies" | "views";

const sortLabels: Record<SortKey, string> = {
  activity: "Latest activity",
  newest: "Newest",
  replies: "Most replies",
  views: "Most views",
};

const PAGE_SIZE = 8;

export function CategoryThreadList({
  pinnedThreads,
  normalThreads,
}: {
  pinnedThreads: ForumThread[];
  normalThreads: ForumThread[];
}) {
  const [sort, setSort] = useState<SortKey>("activity");
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    const list = [...normalThreads];
    switch (sort) {
      case "newest":
        return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      case "replies":
        return list.sort((a, b) => getReplyCount(b.slug) - getReplyCount(a.slug));
      case "views":
        return list.sort((a, b) => b.views - a.views);
      case "activity":
      default:
        return list.sort((a, b) => {
          const aTime = getLastActivity(a.slug)?.createdAt ?? a.createdAt;
          const bTime = getLastActivity(b.slug)?.createdAt ?? b.createdAt;
          return bTime.localeCompare(aTime);
        });
    }
  }, [normalThreads, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageThreads = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6">
      {pinnedThreads.length > 0 ? (
        <Card className="p-2 sm:p-3">
          <div className="flex flex-col">
            {pinnedThreads.map((thread) => (
              <ThreadRow key={thread.slug} thread={thread} />
            ))}
          </div>
        </Card>
      ) : null}

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">
          {sorted.length} thread{sorted.length === 1 ? "" : "s"}
        </p>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortKey);
              setPage(1);
            }}
            aria-label="Sort threads"
            className="appearance-none rounded-full border border-line bg-surface/60 py-1.5 pl-3 pr-8 font-mono text-xs text-fg focus:border-accent/60 focus:outline-none"
          >
            {(Object.keys(sortLabels) as SortKey[]).map((key) => (
              <option key={key} value={key}>
                {sortLabels[key]}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            width={12}
            height={12}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
          />
        </div>
      </div>

      <Card className="p-2 sm:p-3">
        {pageThreads.length > 0 ? (
          <div className="flex flex-col">
            {pageThreads.map((thread) => (
              <ThreadRow key={thread.slug} thread={thread} />
            ))}
          </div>
        ) : (
          <p className="px-3 py-10 text-center text-sm text-muted">
            No threads here yet — be the first to post.
          </p>
        )}
      </Card>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
