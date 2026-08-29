"use client";

import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import { allCategories, searchForum, type ForumSearchResult } from "../../lib/forum-data";
import { MessageIcon, SearchIcon, UsersIcon } from "../icons";
import { CategoryIcon } from "./forum-ui";
import { Link } from "../ui";

const typeIcon: Record<ForumSearchResult["type"], ComponentType<SVGProps<SVGSVGElement>>> = {
  thread: MessageIcon,
  user: UsersIcon,
  category: MessageIcon,
};

export function ForumSearch({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = searchForum(query);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2.5 transition-colors focus-within:border-accent/60">
        <SearchIcon width={16} height={16} className="shrink-0 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search threads, categories, members…"
          aria-label="Search the forum"
          className="w-full bg-transparent text-sm text-fg placeholder:text-muted focus:outline-none"
        />
      </div>

      {open && query.trim() ? (
        <div className="absolute inset-x-0 top-full z-30 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-line bg-surface p-2 shadow-xl">
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted">
              No results for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            <ul className="flex flex-col gap-0.5">
              {results.map((result, i) => {
                const category = allCategories.find((c) => result.href.startsWith(`/forums/${c.slug}`));
                const Icon = typeIcon[result.type];
                return (
                  <li key={`${result.href}-${i}`}>
                    <Link
                      href={result.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-bg/60"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-accent">
                        {result.type === "category" && category ? (
                          <CategoryIcon icon={category.icon} size={15} />
                        ) : (
                          <Icon width={15} height={15} />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-fg">
                          {result.title}
                        </span>
                        <span className="block truncate text-xs text-muted">
                          {result.subtitle}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
