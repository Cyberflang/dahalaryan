import { contact } from "../../lib/site-data";
import { ContactMethods } from "../social-links";
import { Container, Reveal, Section } from "../ui";

export function Contact() {
  return (
    <Section id="contact">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
            <h2 className="max-w-2xl text-3xl font-medium tracking-[-0.02em] text-fg sm:text-5xl">
              {contact.headline}
            </h2>
            <p className="max-w-md text-base leading-7 text-muted">{contact.subtext}</p>
          </div>
        </Reveal>

        <Reveal delay={90} className="mt-10 max-w-xl">
          <ContactMethods />
        </Reveal>
      </Container>
    </Section>
  );
}
