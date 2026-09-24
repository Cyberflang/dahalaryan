import { skillGroups } from "../../lib/site-data";
import { Container, Reveal, Section, SectionHeading } from "../ui";

export function Skills() {
  return (
    <Section id="skills">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="Tools I actually use"
          description="Grouped by the kind of work each one shows up in."
        />

        <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <div className="border-t border-line pt-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-3 py-1.5 text-sm text-fg/90"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
