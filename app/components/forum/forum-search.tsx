"use client";

import { useEffect, useRef, useState } from "react";
import { searchForum } from "../../lib/forum-data";
import { SearchIcon } from "../icons";
import { Link } from "../ui";

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
      <label className="flex items-center gap-3 rounded-full border border-line bg-surface/60 px-4 py-2.5 transition-colors focus-within:border-accent">
        <SearchIcon width={16} height={16} className="shrink-0 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search the forum"
          aria-label="Search the forum"
          className="w-full bg-transparent text-sm text-fg placeholder:text-muted focus:outline-none"
        />
      </label>

      {open && query.trim() ? (
        <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-line bg-bg shadow-xl">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted">No results for “{query.trim()}”.</p>
          ) : (
            <ul>
              {results.map((result) => (
                <li key={result.href}>
                  <Link
                    href={result.href}
                    onClick={() => setOpen(false)}
                    className="flex flex-col gap-0.5 border-b border-line px-4 py-3 last:border-b-0 hover:bg-surface"
                  >
                    <span className="text-sm text-fg">{result.title}</span>
                    <span className="text-xs text-muted">{result.subtitle}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
