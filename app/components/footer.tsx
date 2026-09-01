import { footer, person, socials } from "../lib/site-data";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-fg">{person.name}</p>
          <p className="mt-1">{footer.description}</p>
        </div>
        <div className="flex items-center gap-5">
          <a href={socials.discord.href} target="_blank" rel="noopener noreferrer" className="hover:text-fg">Discord</a>
          <a href={socials.instagram.href} target="_blank" rel="noopener noreferrer" className="hover:text-fg">Instagram</a>
        </div>
      </Container>
    </footer>
  );
}
