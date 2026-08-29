"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ElementType,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "../lib/use-media-query";
import { ArrowUpRightIcon } from "./icons";

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  border = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  border?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative py-20 sm:py-28 ${border ? "border-t border-line" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-12 sm:mb-16 ${align === "center" ? "text-center" : ""}`}>
      {eyebrow ? (
        <div className="mb-3">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2 className="text-3xl font-medium tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-xl text-base leading-7 text-muted ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-[#14100a] hover:bg-accent/90 border border-transparent",
  secondary:
    "bg-transparent text-fg border border-line hover:border-accent/60 hover:text-accent",
  ghost: "bg-transparent text-muted hover:text-fg border border-transparent",
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  variant?: ButtonVariant;
};

type ButtonAsLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", className = "", children, ...rest } = props;
  const classes = `${buttonBase} ${buttonVariants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const isExternal = props.href.startsWith("http") || props.href.startsWith("mailto:");
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...anchorRest}
        href={props.href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonRest} className={classes}>
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------

export function Badge({
  children,
  className = "",
  dot = false,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted ${className}`}
    >
      {dot ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      ) : null}
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      className={`group relative rounded-2xl border border-line bg-surface/60 p-6 transition-colors duration-300 hover:border-accent/40 ${className}`}
    >
      {children}
    </Tag>
  );
}

// ---------------------------------------------------------------------------
// IconButton
// ---------------------------------------------------------------------------

export function IconButton({
  children,
  label,
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// SocialLink
// ---------------------------------------------------------------------------

export function SocialLink({
  href,
  label,
  icon,
  className = "",
}: {
  href: string;
  label: string;
  icon: ReactNode;
  className?: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${className}`}
    >
      {icon}
    </a>
  );
}

// ---------------------------------------------------------------------------
// Reveal (scroll-triggered fade/translate-in, reduced-motion aware)
// ---------------------------------------------------------------------------

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Reduced-motion visibility is derived at render time below (`shouldShow`)
    // rather than set here, so this effect only needs to run the observer.
    if (prefersReducedMotion) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const shouldShow = visible || prefersReducedMotion;

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        shouldShow ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
      style={{ transitionDelay: shouldShow ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}

// ---------------------------------------------------------------------------
// External link affordance (arrow icon helper used inside cards/links)
// ---------------------------------------------------------------------------

export function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <ArrowUpRightIcon
      width={14}
      height={14}
      className={`transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${className}`}
    />
  );
}

export { Link };
