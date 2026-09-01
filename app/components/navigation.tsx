"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, person } from "../lib/site-data";
import { CloseIcon, MenuIcon } from "./icons";
import { ThemeToggle } from "./theme";
import { Link } from "./ui";

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const onHomePage = pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-bg/90 backdrop-blur-md">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight text-fg hover:opacity-70">
          {person.name}
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-6 text-sm text-muted">
            {nav.map((item) => {
              const isPageLink = !item.href.startsWith("#");
              const href = onHomePage || isPageLink ? item.href : `/${item.href}`;
              return (
                <li key={item.href}>
                  <Link href={href} className="transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg"
          >
            {menuOpen ? <CloseIcon width={16} height={16} /> : <MenuIcon width={16} height={16} />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="border-t border-line bg-bg md:hidden">
          <ul className="mx-auto max-w-5xl px-5 py-3 sm:px-8">
            {nav.map((item) => {
              const isPageLink = !item.href.startsWith("#");
              const href = onHomePage || isPageLink ? item.href : `/${item.href}`;
              return (
                <li key={item.href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-line py-3 text-sm text-fg last:border-b-0"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
