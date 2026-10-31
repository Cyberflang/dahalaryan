import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { person, siteUrl } from "./lib/site-data";
import { CustomizeButton, prefsInitScript } from "./components/preferences";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${person.name} — Developer & Founder`;

const description =
  "Aryan Dahal is a developer from Nepal who builds web applications, Discord bots and Minecraft server systems, and founder of Altermium.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: title,
  description: description,

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: title,
    description: description,
    url: siteUrl,
    siteName: person.name,
    type: "website",
    locale: "en_US",
    images: ["/images/aryan-square.jpg"],
  },

  twitter: {
    card: "summary",
    title: title,
    description: description,
    images: ["/images/aryan-square.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

};

export const viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0b0c0e",
    },
    {
      media: "(prefers-color-scheme: light)",
      color: "#fbfaf8",
    },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  url: siteUrl,
  ...(person.role ? { jobTitle: person.role } : {}),
  image: `${siteUrl}/images/aryan-square.jpg`,
  worksFor: { "@type": "Organization", name: "Altermium" },
  address: {
    "@type": "PostalAddress",
    addressCountry: "NP",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: prefsInitScript,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
      </head>

      <body className="flex min-h-full flex-col bg-bg font-sans text-fg">
        {children}
        <CustomizeButton />
      </body>
    </html>
  );
}