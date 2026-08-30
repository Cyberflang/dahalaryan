import { skillGroups } from "../../lib/site-data";
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
      </Container>
    </Section>
  );
}
