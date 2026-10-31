import { communities, footer, nav, person } from "../lib/site-data";
import { DiscordIcon } from "./icons";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="text-sm font-medium text-fg">{person.name}</p>
            <p className="mt-1 text-sm text-muted">{person.role}</p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted">{footer.description}</p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Navigate</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Communities</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {communities.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <DiscordIcon width={14} height={14} />
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {person.name}. All rights reserved.
          </span>
          <span className="font-mono text-muted/80">{person.domain}</span>
        </div>
      </Container>
    </footer>
  );
}
