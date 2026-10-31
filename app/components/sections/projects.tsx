import { projects } from "../../lib/site-data";
import { Container, Reveal, Section, SectionHeading } from "../ui";

export function Projects() {
  return (
    <Section id="projects" index="02">
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="A selection of the software and communities I work on."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 70}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-6 transition-colors duration-300 hover:border-accent/40">
                <p className="font-mono text-xs text-accent">{project.type}</p>
                <h3 className="mt-2 text-xl font-medium tracking-tight text-fg">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">{project.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
