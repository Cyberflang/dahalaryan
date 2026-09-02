"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, person, socials } from "../lib/site-data";
import { CloseIcon, DiscordIcon, MenuIcon } from "./icons";
import { ThemeToggle } from "./theme";
import { Link } from "./ui";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();
  const onHomePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Scroll-spy only applies to on-page anchor links (e.g. "#work"), not
    // standalone routes like "/forums".
    if (!onHomePage) return;

    const sections = nav
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHomePage]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/75 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-fg transition-opacity hover:opacity-70"
        >
          {person.name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7 text-sm text-muted">
            {nav.map((item) => {
              const isPageLink = !item.href.startsWith("#");
              const isActive = isPageLink
                ? pathname?.startsWith(item.href)
                : onHomePage && activeId === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={onHomePage || isPageLink ? item.href : `/${item.href}`}
                    className={`relative py-1 transition-colors hover:text-fg ${
                      isActive ? "text-fg" : ""
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-[3px] left-0 h-px w-full bg-accent transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <a
            href={socials.discord.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent/60 hover:text-accent"
          >
            <DiscordIcon width={14} height={14} />
            Discord
          </a>

          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg"
          >
            {menuOpen ? <CloseIcon width={16} height={16} /> : <MenuIcon width={16} height={16} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-b border-line bg-bg/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {nav.map((item) => {
            const isPageLink = !item.href.startsWith("#");
            return (
              <li key={item.href}>
                <Link
                  href={onHomePage || isPageLink ? item.href : `/${item.href}`}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base text-fg transition-colors hover:bg-surface"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={socials.discord.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-base text-fg transition-colors hover:bg-surface"
            >
              <DiscordIcon width={16} height={16} />
              Discord
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
