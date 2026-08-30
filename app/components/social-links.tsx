"use client";

import { useEffect, useState } from "react";
import { person, socials } from "../lib/site-data";
import { CheckIcon, CopyIcon, DiscordIcon, InstagramIcon, MailIcon, XIcon } from "./icons";

// ---------------------------------------------------------------------------
// Discord has no numeric ID here to build a reliable profile deep link from,
// so instead of guessing at a URL that might 404, this offers a
// copy-to-clipboard interaction — the same pattern used anywhere the
// username itself is the thing someone actually needs.
// ---------------------------------------------------------------------------

function useCopy(value: string) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard API unavailable — nothing else to fall back to.
    }
  };

  return { copied, copy };
}

const iconLinkClasses =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50";

/** Compact row of icon-only links, for the hero and footer. */
export function SocialIconRow({ className = "" }: { className?: string }) {
  const { copied, copy } = useCopy(socials.discord.username);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={copy}
        aria-label={
          copied
            ? "Discord username copied"
            : `Copy Discord username, ${socials.discord.username}`
        }
        className={iconLinkClasses}
      >
        {copied ? <CheckIcon width={16} height={16} /> : <DiscordIcon width={16} height={16} />}
      </button>

      <a
        href={socials.x.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${socials.x.label}, @${socials.x.username}`}
        className={iconLinkClasses}
      >
        <XIcon width={16} height={16} />
      </a>

      <a
        href={socials.instagram.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${socials.instagram.label}, @${socials.instagram.username}`}
        className={iconLinkClasses}
      >
        <InstagramIcon width={16} height={16} />
      </a>
    </div>
  );
}

/** Labelled list of contact methods, for the Contact section. */
export function ContactMethods() {
  const discord = useCopy(socials.discord.username);
  const email = person.email;

  return (
    <ul className="flex flex-col divide-y divide-line border-y border-line">
      {email ? (
        <li>
          <a
            href={`mailto:${email}`}
            className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
          >
            <span className="flex items-center gap-3 text-sm text-fg group-hover:text-accent">
              <MailIcon width={16} height={16} className="text-muted group-hover:text-accent" />
              Email
            </span>
            <span className="font-mono text-sm text-muted group-hover:text-accent">{email}</span>
          </a>
        </li>
      ) : null}

      <li>
        <button
          type="button"
          onClick={discord.copy}
          className="group flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-accent"
        >
          <span className="flex items-center gap-3 text-sm text-fg group-hover:text-accent">
            <DiscordIcon width={16} height={16} className="text-muted group-hover:text-accent" />
            {socials.discord.label}
          </span>
          <span className="flex items-center gap-2 font-mono text-sm text-muted group-hover:text-accent">
            {socials.discord.username}
            {discord.copied ? (
              <CheckIcon width={14} height={14} />
            ) : (
              <CopyIcon width={14} height={14} />
            )}
          </span>
        </button>
      </li>

      <li>
        <a
          href={socials.x.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
        >
          <span className="flex items-center gap-3 text-sm text-fg group-hover:text-accent">
            <XIcon width={16} height={16} className="text-muted group-hover:text-accent" />
            {socials.x.label}
          </span>
          <span className="font-mono text-sm text-muted group-hover:text-accent">
            @{socials.x.username}
          </span>
        </a>
      </li>

      <li>
        <a
          href={socials.instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
        >
          <span className="flex items-center gap-3 text-sm text-fg group-hover:text-accent">
            <InstagramIcon width={16} height={16} className="text-muted group-hover:text-accent" />
            {socials.instagram.label}
          </span>
          <span className="font-mono text-sm text-muted group-hover:text-accent">
            @{socials.instagram.username}
          </span>
        </a>
      </li>
    </ul>
  );
}
