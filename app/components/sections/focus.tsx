import { focus } from "../../lib/site-data";
import { Container, Reveal, Section, SectionHeading } from "../ui";

const entries = [focus.building, focus.learning, focus.interested];

export function Focus() {
  return (
    <Section id="focus">
      <Container>
        <SectionHeading eyebrow="Focus" title="What I'm working on right now" />

        <div className="grid gap-8 sm:grid-cols-3 sm:gap-10">
          {entries.map((entry, i) => (
            <Reveal key={entry.title} delay={i * 90}>
              <div className="border-t border-line pt-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                  {entry.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{entry.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
