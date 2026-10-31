import Image from "next/image";
import { communities, hero, person } from "../../lib/site-data";
import { DiscordIcon } from "../icons";
import { Button } from "../ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div aria-hidden="true" className="bg-pattern absolute inset-0 -z-10" />

      <div className="mx-auto max-w-[var(--content-w)] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            <p className="font-mono text-sm text-accent">{hero.eyebrow}</p>

            <h1 className="mt-4 text-5xl font-medium leading-[1.03] tracking-[-0.03em] text-fg sm:text-6xl lg:text-7xl">
              {hero.headline}
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg">
              {hero.description}
            </p>

            <ul className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {hero.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button href="#contact">Get in touch</Button>
              <Button href="#projects" variant="secondary">
                View projects
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 border-t border-line pt-6 lg:justify-start">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                Communities
              </span>
              {communities.map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <DiscordIcon width={14} height={14} />
                  {c.label}
                </a>
              ))}
            </div>
          </div>

          <div className="order-1 mx-auto w-full max-w-[17rem] sm:max-w-xs lg:order-2 lg:mx-0 lg:ml-auto lg:max-w-sm">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-8 -z-10 rounded-full bg-accent/[0.12] blur-3xl"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-line bg-surface">
                <Image
                  src="/images/aryan-portrait.jpg"
                  alt={`Portrait of ${person.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 17rem"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
