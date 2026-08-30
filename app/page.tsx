import { BackToTop } from "./components/back-to-top";
import { Footer } from "./components/footer";
import { Navigation } from "./components/navigation";
import { ScrollProgress } from "./components/scroll-progress";
import { About } from "./components/sections/about";
import { Contact } from "./components/sections/contact";
import { Focus } from "./components/sections/focus";
import { Hero } from "./components/sections/hero";
import { Skills } from "./components/sections/skills";
import { Work } from "./components/sections/work";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navigation />

      <main className="min-h-screen bg-bg text-fg">
        <Hero />
        <Work />
        <About />
        <Skills />
        <Focus />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
