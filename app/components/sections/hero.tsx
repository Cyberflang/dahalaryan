"use client";

import { useEffect, useState } from "react";
import { hero, person, socials } from "../../lib/site-data";
import { usePrefersReducedMotion } from "../../lib/use-media-query";
import {
  ArrowRightIcon,
  DiscordIcon,
  GithubIcon,
  MailIcon,
  TwitterIcon,
} from "../icons";
import { Badge, Button, SocialLink } from "../ui";

const iconMap = {
  github: GithubIcon,
  discord: DiscordIcon,
  twitter: TwitterIcon,
  mail: MailIcon,
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <HeroBackground />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
        <div>
          <div className="mb-6">
            <Badge dot>{person.availability.label}</Badge>
          </div>

          <p className="mb-4 font-mono text-sm text-accent">{hero.eyebrow}</p>

          <h1 className="max-w-2xl text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-fg sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
            {hero.subtext}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="#work">
              Explore my work
              <ArrowRightIcon width={16} height={16} />
            </Button>
            <Button href="#contact" variant="secondary">
              Get in touch
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-3">
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

        <TerminalPanel />
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full hero-glow" />
      <div className="absolute inset-0 hero-noise" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}

function TerminalPanel() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [lineIndex, setLineIndex] = useState(prefersReducedMotion ? hero.terminalLines.length : 0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (lineIndex >= hero.terminalLines.length) return;

    const currentOutput = hero.terminalLines[lineIndex].output;

    if (charIndex < currentOutput.length) {
      const timeout = setTimeout(() => setCharIndex((c) => c + 1), 18);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, 420);
    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex, prefersReducedMotion]);

  return (
    <div className="w-full rounded-2xl border border-line bg-surface/80 shadow-2xl shadow-black/20 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e05a4a]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e0b34a]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#4ae08a]/70" />
        <span className="ml-3 font-mono text-xs text-muted">aryan@portfolio ~ </span>
      </div>

      <div className="min-h-[220px] space-y-4 px-5 py-6 font-mono text-[13px] leading-6 sm:text-sm">
        {hero.terminalLines.map((line, i) => {
          const isCurrent = i === lineIndex;
          const isDone = i < lineIndex || prefersReducedMotion;
          if (!isDone && !isCurrent) return null;

          const output = prefersReducedMotion
            ? line.output
            : isCurrent
              ? line.output.slice(0, charIndex)
              : line.output;

          return (
            <div key={line.command}>
              <p className="text-fg">
                <span className="text-accent">$</span> {line.command}
              </p>
              <p className="mt-1 text-muted">
                {output}
                {isCurrent && !prefersReducedMotion ? (
                  <span className="cursor-blink ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] bg-accent align-middle" />
                ) : null}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
