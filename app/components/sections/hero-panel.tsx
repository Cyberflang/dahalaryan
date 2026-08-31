import { focus, hero, person, projects } from "../../lib/site-data";

const activeCount = projects.filter((p) => p.status === "Active").length;

/**
 * A small terminal-style panel used as the hero's visual anchor — pulls
 * only real data already defined in site-data.ts (nothing fabricated).
 */
export function HeroPanel() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full max-w-md rounded-2xl border border-line bg-surface/60 shadow-[0_0_0_1px_rgba(0,0,0,0.02)] backdrop-blur-sm"
    >
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full border border-line" />
        <span className="h-2.5 w-2.5 rounded-full border border-line" />
        <span className="h-2.5 w-2.5 rounded-full border border-line" />
        <span className="ml-2 font-mono text-[11px] text-muted">
          {person.domain}
        </span>
      </div>

      <div className="space-y-4 px-4 py-5 font-mono text-[13px] leading-6">
        <div>
          <p className="text-muted">
            <span className="text-accent">$</span> whoami
          </p>
          <p className="text-fg">
            {person.name} — {person.role}, {person.location}
          </p>
        </div>

        <div>
          <p className="text-muted">
            <span className="text-accent">$</span> status --active
          </p>
          <p className="text-fg">{focus.building.description}</p>
        </div>

        <div>
          <p className="text-muted">
            <span className="text-accent">$</span> stack
          </p>
          <p className="text-fg">{hero.stack.join(" · ")}</p>
        </div>

        <p className="text-muted">
          <span className="text-accent">$</span>{" "}
          <span className="text-fg">{activeCount} active projects</span>
          <span className="ml-1 inline-block h-3.5 w-[7px] translate-y-[2px] animate-pulse bg-accent/70 motion-reduce:animate-none" />
        </p>
      </div>
    </div>
  );
}
