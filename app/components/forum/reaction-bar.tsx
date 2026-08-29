"use client";

import { useState } from "react";
import type { ForumReaction } from "../../lib/forum-data";

const emoji: Record<ForumReaction["type"], string> = {
  like: "👍",
  love: "❤️",
  funny: "😂",
  helpful: "💡",
};

export function ReactionBar({
  reactions,
  postId,
}: {
  reactions: ForumReaction[];
  postId: string;
}) {
  // Local-only optimistic state — a real backend would persist this per user.
  const [active, setActive] = useState<Set<string>>(new Set());
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(reactions.map((r) => [r.type, r.count]))
  );

  function toggle(type: ForumReaction["type"]) {
    const key = `${postId}:${type}`;
    setActive((prev) => {
      const next = new Set(prev);
      const wasActive = next.has(key);
      if (wasActive) {
        next.delete(key);
        setCounts((c) => ({ ...c, [type]: (c[type] ?? 0) - 1 }));
      } else {
        next.add(key);
        setCounts((c) => ({ ...c, [type]: (c[type] ?? 0) + 1 }));
      }
      return next;
    });
  }

  const types: ForumReaction["type"][] = ["like", "love", "helpful", "funny"];

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {types.map((type) => {
        const count = counts[type] ?? 0;
        if (count === 0 && !reactions.some((r) => r.type === type)) return null;
        const isActive = active.has(`${postId}:${type}`);
        return (
          <button
            key={type}
            type="button"
            onClick={() => toggle(type)}
            aria-pressed={isActive}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
              isActive
                ? "border-accent/60 bg-accent/10 text-accent"
                : "border-line text-muted hover:border-accent/40 hover:text-fg"
            }`}
          >
            <span aria-hidden>{emoji[type]}</span>
            <span className="font-mono">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
