import { communities, contact, person } from "../../lib/site-data";
import { ContactForm } from "../contact-form";
import { ArrowUpRightIcon, DiscordIcon, MailIcon } from "../icons";
import { Container, Reveal, Section } from "../ui";

const rowClasses =
  "group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent";

export function Contact() {
  const email = person.email;

  return (
    <Section id="contact" index="04">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="flex flex-col items-start gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
              <h2 className="max-w-md text-3xl font-medium tracking-[-0.02em] text-fg sm:text-5xl">
                {contact.headline}
              </h2>
              <p className="max-w-md text-base leading-7 text-muted">{contact.subtext}</p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <ul className="flex flex-col divide-y divide-line border-y border-line">
              {email ? (
                <li>
                  <a href={`mailto:${email}`} className={rowClasses}>
                    <span className="flex items-center gap-3 text-sm text-fg group-hover:text-accent">
                      <MailIcon width={16} height={16} className="text-muted group-hover:text-accent" />
                      Email
                    </span>
                    <span className="font-mono text-sm text-muted group-hover:text-accent">
                      {email}
                    </span>
                  </a>
                </li>
              ) : null}

              {communities.map((c) => (
                <li key={c.href}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className={rowClasses}>
                    <span className="flex items-center gap-3 text-sm text-fg group-hover:text-accent">
                      <DiscordIcon width={16} height={16} className="text-muted group-hover:text-accent" />
                      {c.label} Discord
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-sm text-muted group-hover:text-accent">
                      Join
                      <ArrowUpRightIcon width={14} height={14} />
                    </span>
                  </a>
                </li>
              ))}

              <li className="flex items-center justify-between gap-4 py-4 text-sm">
                <span className="text-fg">Location</span>
                <span className="font-mono text-muted">{person.location}</span>
              </li>
            </ul>

            {email ? (
              <div className="mt-10">
                <h3 className="mb-4 text-sm font-medium text-fg">Send a message</h3>
                <ContactForm to={email} />
              </div>
            ) : null}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
