"use client";

import { useEffect, useState } from "react";
import { contact, person, socials } from "../../lib/site-data";
import {
  CheckIcon,
  CopyIcon,
  DiscordIcon,
  GithubIcon,
  MailIcon,
  TwitterIcon,
} from "../icons";
import { Button, Container, Reveal, Section, SocialLink } from "../ui";

const iconMap = {
  github: GithubIcon,
  discord: DiscordIcon,
  twitter: TwitterIcon,
  mail: MailIcon,
};

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
    } catch {
      // Clipboard API unavailable — the mailto link below still works.
    }
  };

  return (
    <Section id="contact">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {contact.eyebrow}
            </p>
            <h2 className="max-w-2xl text-3xl font-medium tracking-[-0.02em] text-fg sm:text-5xl">
              {contact.headline}
            </h2>
            <p className="max-w-md text-base leading-7 text-muted">{contact.subtext}</p>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={`mailto:${person.email}`}>
              <MailIcon width={16} height={16} />
              {person.email}
            </Button>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-fg transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              {copied ? <CheckIcon width={16} height={16} /> : <CopyIcon width={16} height={16} />}
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
        </Reveal>

        <Reveal delay={150}>
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
        </Reveal>

        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-line bg-surface px-4 py-2.5 font-mono text-xs text-fg shadow-xl transition-all duration-300 ${
            copied ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <CheckIcon width={14} height={14} className="text-accent" />
            Email copied to clipboard
          </span>
        </div>
      </Container>
    </Section>
  );
}
