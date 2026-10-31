import { Footer } from "./components/footer";
import { Navigation } from "./components/navigation";
import { About } from "./components/sections/about";
import { Contact } from "./components/sections/contact";
import { Hero } from "./components/sections/hero";
import { Projects } from "./components/sections/projects";
import { Skills } from "./components/sections/skills";

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-bg text-fg">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
