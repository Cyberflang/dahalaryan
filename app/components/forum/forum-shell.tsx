import type { ReactNode } from "react";
import { BackToTop } from "../back-to-top";
import { Footer } from "../footer";
import { Navigation } from "../navigation";

// Reuses the homepage chrome so /forums feels like part of the same site.
export function ForumShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-bg pt-16 text-fg">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
