"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, person } from "../lib/site-data";
import { CloseIcon, MenuIcon } from "./icons";
import { ThemeToggle } from "./preferences";
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
    // Scroll-spy only applies to on-page anchors (e.g. "#projects").
    if (!onHomePage) return;

    const sections = nav
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(`#${entry.target.id}`);
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

  const hrefFor = (href: string) =>
    onHomePage || !href.startsWith("#") ? href : `/${href}`;

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
        className="mx-auto flex h-16 max-w-[var(--content-w)] items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-medium tracking-tight text-fg transition-opacity hover:opacity-80"
        >
          <Image
            src="/images/logo-a.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-lg"
          />
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
                    href={hrefFor(item.href)}
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
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={hrefFor(item.href)}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-base text-fg transition-colors hover:bg-surface"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
