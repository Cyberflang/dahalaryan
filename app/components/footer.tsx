import { footer, nav, person, socials } from "../lib/site-data";
import { DiscordIcon, GithubIcon, MailIcon, TwitterIcon } from "./icons";
import { Container, SocialLink } from "./ui";

const iconMap = {
  github: GithubIcon,
  discord: DiscordIcon,
  twitter: TwitterIcon,
  mail: MailIcon,
};

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-mono text-sm font-medium text-fg">{person.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
              {footer.description}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Navigate
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Elsewhere
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {socials.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <SocialLink
                    key={social.label}
                    href={social.href}
                    label={social.label}
                    icon={<Icon width={16} height={16} />}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {person.name}. {footer.tagline}
          </span>
          <span className="font-mono text-muted/80">{person.domain}</span>
        </div>
      </Container>
    </footer>
  );
}
