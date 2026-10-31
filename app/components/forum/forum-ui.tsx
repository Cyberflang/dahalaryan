import Image from "next/image";
import { communities } from "../../lib/site-data";
import { ChevronRightIcon, DiscordIcon } from "../icons";
import { Button, Link } from "../ui";

export function Avatar({ size = 36 }: { size?: number }) {
  return (
    <Image
      src="/images/aryan-avatar.jpg"
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-full border border-line object-cover"
      style={{ width: size, height: size }}
    />
  );
}

export function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="transition-colors hover:text-fg">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRightIcon width={13} height={13} />
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="transition-colors hover:text-fg">
                {item.label}
              </Link>
            ) : (
              <span className="text-fg" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Points visitors to Discord, where the conversation actually happens. */
export function DiscussCard() {
  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-6">
      <h2 className="text-base font-medium text-fg">Want to discuss this?</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Conversation happens on Discord. Join a community to ask questions or share feedback.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        {communities.map((c) => (
          <Button key={c.href} href={c.href} variant="secondary">
            <DiscordIcon width={15} height={15} />
            {c.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
