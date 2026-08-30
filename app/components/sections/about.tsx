import { about } from "../../lib/site-data";
import { Container, Reveal, Section, SectionHeading } from "../ui";

export function About() {
  return (
    <Section id="about">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading eyebrow="About" title={about.lead} />

          <div className="space-y-5">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className="text-base leading-7 text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
