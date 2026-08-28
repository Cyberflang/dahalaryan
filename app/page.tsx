const projects = [
  {
    title: "Cyflixel Bot",
    type: "Discord Bot",
    year: "2026",
    description:
      "A community and support bot with moderation, tickets, automation, and server management tools.",
  },
  {
    title: "Cyflixel Forums",
    type: "Web Application",
    year: "2026",
    description:
      "A community forum platform focused on discussion, profiles, and a clean user experience.",
  },
  {
    title: "Minecraft Projects",
    type: "Server Development",
    year: "2026",
    description:
      "Minecraft server systems and infrastructure built for community-based gameplay.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#171717]">
      {/* Header */}
      <header className="border-b border-black/10">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 lg:px-8">
          <a
            href="#"
            className="text-[15px] font-semibold tracking-tight"
          >
            Aryan Dahal
          </a>

          <nav className="flex items-center gap-6 text-sm text-black/55">
            <a
              href="#work"
              className="transition-colors hover:text-black"
            >
              Work
            </a>

            <a
              href="#about"
              className="transition-colors hover:text-black"
            >
              About
            </a>

            <a
              href="#contact"
              className="transition-colors hover:text-black"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Introduction */}
      <section>
        <div className="mx-auto max-w-6xl px-6 pb-32 pt-28 lg:px-8 lg:pb-40 lg:pt-36">
          <div className="max-w-3xl">
            <p className="mb-6 text-sm text-black/45">
              Hello, I&apos;m Aryan.
            </p>

            <h1 className="text-4xl font-medium leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-[72px]">
              I build software and digital projects with a focus on quality
              and simplicity.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-black/50">
              I&apos;m interested in building useful products, experimenting
              with technology, and turning ideas into things that actually
              work.
            </p>

            <div className="mt-10 flex items-center gap-5 text-sm">
              <a
                href="#work"
                className="border-b border-black pb-1 transition-opacity hover:opacity-50"
              >
                View my work
              </a>

              <span className="text-black/25">Based in Nepal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="border-t border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="mb-14">
            <p className="text-sm text-black/40">Selected work</p>
          </div>

          <div className="border-t border-black/10">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group grid gap-4 border-b border-black/10 py-8 transition-colors hover:bg-black/[0.015] sm:grid-cols-[1fr_160px_80px]"
              >
                <div>
                  <h2 className="text-xl font-medium tracking-tight">
                    {project.title}
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
                    {project.description}
                  </p>
                </div>

                <div className="text-sm text-black/40 sm:pt-1">
                  {project.type}
                </div>

                <div className="text-sm text-black/40 sm:pt-1 sm:text-right">
                  {project.year}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-black/10">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[220px_1fr] lg:px-8 lg:py-32">
          <p className="text-sm text-black/40">About</p>

          <div className="max-w-2xl">
            <p className="text-2xl font-medium leading-9 tracking-tight sm:text-3xl sm:leading-10">
              I enjoy working on software, online communities, and systems
              where there is something interesting to solve.
            </p>

            <p className="mt-8 text-base leading-7 text-black/50">
              Most of my projects start as an idea and gradually become
              something real through development, testing, and iteration. I
              care about making things reliable, understandable, and
              genuinely useful rather than adding complexity for no reason.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
          <p className="text-sm text-black/40">Contact</p>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-2xl text-3xl font-medium tracking-[-0.03em] sm:text-5xl">
              Have something worth building?
            </h2>

            <p className="max-w-xs text-sm leading-6 text-black/45">
              I&apos;m always interested in good ideas, interesting projects,
              and meaningful collaborations.
            </p>
          </div>

          <div className="mt-10">
            <a
              href="mailto:you@example.com"
              className="border-b border-black pb-1 text-sm transition-opacity hover:opacity-50"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7 text-xs text-black/35 lg:px-8">
          <span>© {new Date().getFullYear()} Aryan Dahal</span>
          <span>dahalaryan.com.np</span>
        </div>
      </footer>
    </main>
  );
}