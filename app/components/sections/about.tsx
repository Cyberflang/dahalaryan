import { about } from "../../lib/site-data";
import { CheckIcon } from "../icons";
import { Container, Reveal, Section, SectionHeading } from "../ui";

export function About() {
  return (
    <Section id="about">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow={about.eyebrow} title={about.lead} />

            <div className="space-y-5">
              {about.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p className="text-base leading-7 text-muted">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="rounded-2xl border border-line bg-surface/60 p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Currently exploring
              </p>
              <ul className="mt-5 space-y-4">
                {about.currentlyExploring.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-fg">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <CheckIcon width={12} height={12} />
                    </span>
                    <span className="leading-6 text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
