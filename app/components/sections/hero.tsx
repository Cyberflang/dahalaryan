import { hero, socials } from "../../lib/site-data";
import { SocialIconRow } from "../social-links";
import { Button } from "../ui";
import { HeroPanel } from "./hero-panel";

export function Hero() {
  return (
    <section className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div className="flex flex-col items-center text-center lg:order-2 lg:items-end lg:text-right">
            <HeroPanel />
          </div>

          <div className="flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            <p className="font-mono text-sm text-accent">{hero.subhead}</p>

            <h1 className="mt-4 text-5xl font-medium leading-[1.05] tracking-[-0.03em] text-fg sm:text-6xl">
              {hero.headline}
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg">
              {hero.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button href={socials.telegram.href}>
                Contact on Telegram
              </Button>
              <Button href="#work" variant="secondary">
                View work
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-3 border-t border-line pt-8">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                Elsewhere
              </span>
              <SocialIconRow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
