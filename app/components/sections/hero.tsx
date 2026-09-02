import Image from "next/image";
import { hero, person, socials } from "../../lib/site-data";
import { SocialIconRow } from "../social-links";
import { Button } from "../ui";

export function Hero() {
  return (
    <section className="pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="flex flex-col items-start">
          <Image
            src="/images/aryan.jpg"
            alt={`Portrait of ${person.name}`}
            width={112}
            height={112}
            priority
            className="h-28 w-28 rounded-full border border-line object-cover"
          />

          <p className="mt-8 font-mono text-sm text-accent">{hero.subhead}</p>

          <h1 className="mt-4 text-5xl font-medium leading-[1.05] tracking-[-0.03em] text-fg sm:text-6xl">
            Hi, I&apos;m {person.name}.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="#about">About me</Button>
            <Button href={socials.discord.href} variant="secondary">
              Discord
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
    </section>
  );
}
