import { person, socials } from "../lib/site-data";
import { ArrowUpRightIcon, DiscordIcon, InstagramIcon, MailIcon, XIcon } from "./icons";

const iconLinkClasses =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50";

/** Compact row of icon-only links, for the hero and footer. */
export function SocialIconRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href={socials.discord.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={socials.discord.label}
        className={iconLinkClasses}
      >
        <DiscordIcon width={16} height={16} />
      </a>

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
        <a
          href={socials.discord.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
        >
          <span className="flex items-center gap-3 text-sm text-fg group-hover:text-accent">
            <DiscordIcon width={16} height={16} className="text-muted group-hover:text-accent" />
            {socials.discord.label}
          </span>
          <span className="flex items-center gap-2 font-mono text-sm text-muted group-hover:text-accent">
            Join server
            <ArrowUpRightIcon width={14} height={14} />
          </span>
        </a>
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
