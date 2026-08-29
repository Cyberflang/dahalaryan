"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "../icons";

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1.5 pt-2"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-fg disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeftIcon width={15} height={15} />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-2 font-mono text-xs transition-colors ${
            p === page
              ? "border-accent bg-accent text-[#14100a]"
              : "border-line text-muted hover:border-accent/60 hover:text-fg"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-fg disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRightIcon width={15} height={15} />
      </button>
    </nav>
  );
}
