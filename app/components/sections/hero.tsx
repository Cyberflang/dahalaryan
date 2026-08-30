import { hero } from "../../lib/site-data";
import { SocialIconRow } from "../social-links";
import { ArrowRightIcon } from "../icons";
import { Button } from "../ui";

export function Hero() {
  return (
    <section className="pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <p className="font-mono text-sm text-accent">{hero.subhead}</p>

        <h1 className="mt-4 text-5xl font-medium leading-[1.05] tracking-[-0.03em] text-fg sm:text-6xl lg:text-7xl">
          {hero.headline}
        </h1>

        <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg">
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
    </section>
  );
}
