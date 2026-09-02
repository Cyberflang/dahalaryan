import { hero } from "../../lib/site-data";
import { ArrowRightIcon } from "../icons";
import { SocialIconRow } from "../social-links";
import { Button } from "../ui";
import { HeroPanel } from "./hero-panel";

export function Hero() {
  return (
    <section className="pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div className="order-2 max-w-xl lg:order-1">
          <p className="font-mono text-sm text-accent">{hero.subhead}</p>

          <h1 className="mt-4 text-5xl font-medium leading-[1.05] tracking-[-0.03em] text-fg sm:text-6xl lg:text-7xl">
            {hero.headline}
          </h1>

          <p className="mt-7 text-base leading-7 text-muted sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="#work">
              View my work
              <ArrowRightIcon width={16} height={16} />
            </Button>
            <Button href="#contact" variant="secondary">
              Get in touch
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-3 border-t border-line pt-8">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
              Elsewhere
            </span>
            <SocialIconRow />
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <HeroPanel />
        </div>
      </div>
    </section>
  );
}
