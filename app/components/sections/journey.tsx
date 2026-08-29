import { journey } from "../../lib/site-data";
import { Badge, Container, Reveal, Section, SectionHeading } from "../ui";

export function Journey() {
  return (
    <Section id="journey">
      <Container>
        <SectionHeading
          eyebrow={journey.eyebrow}
          title="How I got here"
          description="A general timeline of learning, building, and figuring things out along the way."
        />

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[15px] top-2 hidden h-[calc(100%-1rem)] w-px bg-line sm:block"
          />

          <ol className="space-y-8 sm:space-y-10">
            {journey.entries.map((entry, i) => (
              <Reveal key={entry.title} delay={i * 90}>
                <li className="relative flex flex-col gap-2 sm:flex-row sm:gap-8 sm:pl-12">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 hidden h-8 w-8 items-center justify-center rounded-full border border-line bg-bg font-mono text-xs text-accent sm:flex"
                  >
                    {i + 1}
                  </span>

                  <p className="w-32 shrink-0 font-mono text-xs uppercase tracking-[0.15em] text-accent sm:pt-1.5">
                    {entry.year}
                  </p>

                  <div>
                    <h3 className="text-base font-medium text-fg">{entry.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                      {entry.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={journey.entries.length * 90}>
          <div className="mt-12 flex flex-col gap-3 rounded-2xl border border-line bg-surface/60 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge dot>{journey.currentlyBuilding.title}</Badge>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
                {journey.currentlyBuilding.description}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
