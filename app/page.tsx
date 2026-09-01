import Image from "next/image";
import { Footer } from "./components/footer";
import { Navigation } from "./components/navigation";
import { ArrowUpRightIcon, DiscordIcon, InstagramIcon } from "./components/icons";
import { about, contact, hero, person, projects, socials } from "./lib/site-data";

const socialLinks = [
  { ...socials.discord, icon: DiscordIcon },
  { ...socials.instagram, icon: InstagramIcon },
];

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="bg-bg text-fg">
        <section className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-5xl items-center px-5 pb-20 pt-28 sm:px-8 sm:pt-32">
          <div className="grid w-full items-center gap-12 md:grid-cols-[1fr_auto] md:gap-20">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-accent">{hero.subhead}</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">
                Hi, I&apos;m {person.name}.
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg">
                {hero.description}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#about"
                  className="inline-flex items-center justify-center rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
                >
                  About me
                </a>
                <a
                  href={socials.discord.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent/60 hover:text-accent"
                >
                  Discord
                  <ArrowUpRightIcon width={15} height={15} />
                </a>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-fg"
                  >
                    <Icon width={15} height={15} />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="order-first md:order-last">
              <div className="relative mx-auto h-52 w-40 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm sm:h-64 sm:w-48 md:h-72 md:w-56">
                <Image
                  src="/profile.webp"
                  alt="Aryan Dahal"
                  fill
                  priority
                  sizes="(max-width: 768px) 160px, 224px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-line">
          <div className="mx-auto grid max-w-5xl gap-10 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <div>
              <p className="text-sm font-medium text-accent">About</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{about.lead}</h2>
            </div>
            <div className="space-y-5 text-base leading-7 text-muted">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="border-t border-line">
          <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-medium text-accent">Projects</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A few things I build.</h2>
              </div>
            </div>

            <div className="divide-y divide-line border-y border-line">
              {projects.map((project, index) => {
                const content = (
                  <div className="group flex gap-5 py-7 sm:gap-8">
                    <span className="pt-1 font-mono text-xs text-muted">0{index + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg font-medium tracking-tight group-hover:text-accent">{project.title}</h3>
                        {project.href ? <ArrowUpRightIcon width={16} height={16} className="shrink-0 text-muted group-hover:text-accent" /> : null}
                      </div>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{project.description}</p>
                      <p className="mt-3 text-xs text-muted">{project.tech}</p>
                    </div>
                  </div>
                );

                return project.href ? (
                  <a key={project.title} href={project.href} className="block transition-colors hover:bg-surface/50">
                    {content}
                  </a>
                ) : (
                  <div key={project.title}>{content}</div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-line">
          <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
            <p className="text-sm font-medium text-accent">Contact</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">{contact.headline}</h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted">{contact.subtext}</p>
            <a
              href={socials.discord.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              Join my Discord
              <ArrowUpRightIcon width={15} height={15} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
