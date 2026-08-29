"use client";

import { useMemo, useState } from "react";
import { projectFilters, projects } from "../../lib/site-data";
import { ArrowUpRightIcon } from "../icons";
import { Card, Container, Reveal, Section, SectionHeading } from "../ui";

export function Work() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <Section id="work">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Work"
            title="Selected projects"
            description="A mix of web applications, community tools, and infrastructure I've built."
          />

          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {projectFilters.map((item) => {
              const active = item === filter;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(item)}
                  className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                    active
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-line text-muted hover:border-accent/40 hover:text-fg"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <Reveal key={project.title} delay={i * 70}>
              <Card className="flex h-full flex-col">
                <ProjectVisual variant={project.visual} />

                <div className="mt-5 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-medium tracking-tight text-fg">
                    {project.title}
                  </h3>
                  {project.href ? (
                    <ArrowUpRightIcon
                      width={16}
                      height={16}
                      className="mt-1 shrink-0 text-muted transition-colors group-hover:text-accent"
                    />
                  ) : null}
                </div>

                <p className="mt-2 text-sm leading-6 text-muted">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-xs text-muted">
                  <span>{project.type}</span>
                  <span>{project.year}</span>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ProjectVisual({ variant }: { variant: "discord" | "minecraft" | "terminal" }) {
  if (variant === "discord") {
    return (
      <div
        aria-hidden="true"
        className="flex h-32 flex-col justify-end gap-2 overflow-hidden rounded-xl border border-line bg-bg/60 p-4"
      >
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 shrink-0 rounded-full bg-accent/25" />
          <span className="h-2.5 w-2/3 rounded-full bg-line" />
        </div>
        <div className="flex items-center gap-2 pl-8">
          <span className="h-2.5 w-1/2 rounded-full bg-accent/30" />
        </div>
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 shrink-0 rounded-full bg-line" />
          <span className="h-2.5 w-1/3 rounded-full bg-line" />
        </div>
      </div>
    );
  }

  if (variant === "minecraft") {
    return (
      <div
        aria-hidden="true"
        className="grid h-32 grid-cols-6 gap-1 overflow-hidden rounded-xl border border-line bg-bg/60 p-3"
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="rounded-[3px]"
            style={{
              background:
                i % 5 === 0
                  ? "color-mix(in srgb, var(--color-accent) 45%, transparent)"
                  : i % 3 === 0
                    ? "color-mix(in srgb, var(--color-accent) 18%, transparent)"
                    : "var(--color-line)",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="h-32 overflow-hidden rounded-xl border border-line bg-bg/60 p-4 font-mono text-[11px] leading-5 text-muted"
    >
      <p>
        <span className="text-accent">$</span> build --target web
      </p>
      <p className="text-muted/70">→ compiling routes...</p>
      <p className="text-muted/70">→ optimizing assets...</p>
      <p className="text-accent">✓ ready</p>
    </div>
  );
}
