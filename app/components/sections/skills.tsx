import { marqueeItems, skillGroups } from "../../lib/site-data";
import { BlocksIcon, CodeIcon, TerminalIcon } from "../icons";
import { Card, Container, Reveal, Section, SectionHeading } from "../ui";

const groupIcons = [CodeIcon, TerminalIcon, BlocksIcon];

export function Skills() {
  return (
    <Section id="skills">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="What I work with"
          description="Tools and technologies I reach for regularly, grouped by where they show up most."
        />

        <div className="grid gap-5 sm:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = groupIcons[i % groupIcons.length];
            return (
              <Reveal key={group.title} delay={i * 90}>
                <Card className="h-full">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon width={16} height={16} />
                  </span>
                  <h3 className="mt-4 text-base font-medium text-fg">{group.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Marquee />
      </Container>
    </Section>
  );
}

function Marquee() {
  // Duplicate the list so the CSS-driven scroll can loop seamlessly.
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div
      aria-hidden="true"
      className="group relative mt-14 overflow-hidden rounded-2xl border border-line bg-surface/40 py-5"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent sm:w-24" />

      <div className="marquee-track flex w-max items-center gap-10 group-hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono text-sm tracking-tight text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
