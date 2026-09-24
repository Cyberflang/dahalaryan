import { about, focus, person } from "../../lib/site-data";
import { Container, Reveal, Section, SectionHeading } from "../ui";

const facts: Array<{ label: string; value: string }> = [
  { label: "Based in", value: person.location },
  { label: "Learning", value: focus.learning.description },
  { label: "Interested in", value: focus.interested.description },
];

export function About() {
  return (
    <Section id="about" index="03">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading eyebrow="About" title={about.lead} />

          <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr] sm:gap-8">
            <div className="space-y-5">
              {about.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p className="text-base leading-7 text-muted">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={240}>
              <dl className="divide-y divide-line border-y border-line text-sm">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="group py-4 transition-colors duration-200 sm:-mx-4 sm:px-4 sm:hover:rounded-lg sm:hover:bg-surface/50"
                  >
                    <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted">
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 rounded-full bg-line transition-colors duration-200 group-hover:bg-accent"
                      />
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 leading-6 text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
