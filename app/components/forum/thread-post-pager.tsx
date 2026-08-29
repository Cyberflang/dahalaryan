"use client";

import { useState } from "react";
import type { ForumPost } from "../../lib/forum-data";
import { PostCard } from "./post-card";
import { Pagination } from "./pagination";
import { ReplyComposer } from "./reply-composer";

const PAGE_SIZE = 10;

export function ThreadPostPager({
  posts,
  locked,
}: {
  posts: ForumPost[];
  locked: boolean;
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const pagePosts = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const isLastPage = page === totalPages;

  return (
    <div className="flex flex-col gap-5">
      {pagePosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {isLastPage ? <ReplyComposer locked={locked} /> : null}
    </div>
  );
}
