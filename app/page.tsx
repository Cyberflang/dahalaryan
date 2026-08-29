import { BackToTop } from "./components/back-to-top";
import { Cursor } from "./components/cursor";
import { Footer } from "./components/footer";
import { Navigation } from "./components/navigation";
import { ScrollProgress } from "./components/scroll-progress";
import { About } from "./components/sections/about";
import { Contact } from "./components/sections/contact";
import { Hero } from "./components/sections/hero";
import { Journey } from "./components/sections/journey";
import { Skills } from "./components/sections/skills";
import { Stats } from "./components/sections/stats";
import { Work } from "./components/sections/work";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Navigation />

      <main className="min-h-screen bg-bg text-fg">
        <Hero />
        <Stats />
        <Work />
        <About />
        <Skills />
        <Journey />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
