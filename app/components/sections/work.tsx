import { projects } from "../../lib/site-data";
import { ArrowUpRightIcon } from "../icons";
import { Container, Link, Reveal, Section, SectionHeading } from "../ui";

export function Work() {
  return (
    <Section id="work">
      <Container>
        <SectionHeading
          eyebrow="Work"
          title="Selected projects"
          description="What I've built and what I'm currently maintaining, mostly around the Cyflixel community."
        />

        <ol className="divide-y divide-line border-y border-line">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 70} as="li">
              <ProjectRow project={project} index={i} />
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const content = (
    <div className="group flex flex-col gap-4 py-7 transition-colors duration-200 sm:flex-row sm:items-center sm:gap-8 sm:-mx-5 sm:px-5 sm:hover:bg-surface/50 sm:rounded-xl">
      <span className="font-mono text-sm text-muted transition-colors duration-200 group-hover:text-accent sm:w-16 sm:shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-lg font-medium tracking-tight text-fg transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <span className="font-mono text-xs text-muted">{project.category}</span>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 font-mono text-xs text-muted sm:w-32 sm:shrink-0 sm:justify-end">
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full ${
            project.status === "Active" ? "bg-accent" : "bg-muted"
          }`}
        />
        {project.status}
        {project.href ? (
          <ArrowUpRightIcon
            width={14}
            height={14}
            className="text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        ) : null}
      </div>
    </div>
  );

  if (project.href) {
    return (
      <Link href={project.href} className="block focus-visible:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
