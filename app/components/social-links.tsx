import { person, socials } from "../lib/site-data";
import { MailIcon, TelegramIcon, XIcon } from "./icons";

const iconLinkClasses =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50";

/** Compact row of icon-only links, for the hero and footer. */
export function SocialIconRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href={socials.telegram.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={socials.telegram.label}
        className={iconLinkClasses}
      >
        <TelegramIcon width={16} height={16} />
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
          href={socials.telegram.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
        >
          <span className="flex items-center gap-3 text-sm text-fg group-hover:text-accent">
            <TelegramIcon width={16} height={16} className="text-muted group-hover:text-accent" />
            {socials.telegram.label}
          </span>
          <span className="font-mono text-sm text-muted group-hover:text-accent">Message</span>
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
    </ul>
  );
}
