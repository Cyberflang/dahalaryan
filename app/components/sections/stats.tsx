import { stats } from "../../lib/site-data";
import { Container, Reveal } from "../ui";

export function Stats() {
  return (
    <section className="border-t border-line">
      <Container>
        <div className="grid grid-cols-2 divide-y divide-line sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60} className="px-4 py-8 text-center sm:px-6">
              <p className="font-mono text-2xl font-medium text-accent sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs text-muted sm:text-sm">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
