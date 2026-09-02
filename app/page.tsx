import { BackToTop } from "./components/back-to-top";
import { Footer } from "./components/footer";
import { Navigation } from "./components/navigation";
import { About } from "./components/sections/about";
import { Contact } from "./components/sections/contact";
import { Hero } from "./components/sections/hero";
import { Work } from "./components/sections/work";

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-bg text-fg">
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
