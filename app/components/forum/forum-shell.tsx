import type { ReactNode } from "react";
import { BackToTop } from "../back-to-top";
import { Footer } from "../footer";
import { Navigation } from "../navigation";
import { ScrollProgress } from "../scroll-progress";

// Reuses the exact chrome the homepage uses (nav, footer, scroll progress,
// back-to-top) so every /forums route feels like part of the same site
// rather than a bolted-on section.
export function ForumShell({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Navigation />

      <main className="min-h-screen bg-bg pt-16 text-fg">{children}</main>

      <Footer />
      <BackToTop />
    </>
  );
}
