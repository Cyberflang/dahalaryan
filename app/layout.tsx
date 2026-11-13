import type { Metadata, Viewport } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import SitePreferences from "./components/site-preferences";
import "./globals.css";

const siteUrl = "https://dahalaryan.com.np";
const description = "Aryan Dahal — Nepal.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Aryan Dahal",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aryan Dahal",
    description,
    url: siteUrl,
    siteName: "Aryan Dahal",
    type: "website",
    images: [{ url: "/images/og-card.png", width: 1200, height: 630, alt: "Aryan Dahal" }],
  },
  twitter: { card: "summary_large_image", title: "Aryan Dahal", description, images: ["/images/og-card.png"] },
  robots: { index: true, follow: true },
  referrer: "strict-origin-when-cross-origin",
};

export const viewport: Viewport = {
  themeColor: "#17191c",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="system" data-accent="copper">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <header className="site-header">
          <div className="wrap header-inner">
            <Link className="wordmark" href="/" aria-label="Aryan Dahal, home">AD<span>/</span></Link>
            <nav aria-label="Main navigation">
              <a href="#about">About</a>
              <a href="#elsewhere">Elsewhere</a>
              <SitePreferences />
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="wrap footer-inner">
            <p>© {new Date().getFullYear()} Aryan Dahal</p>
            <a href="#main">Back to top ↑</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
