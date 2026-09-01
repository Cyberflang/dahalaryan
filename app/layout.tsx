import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { person } from "./lib/site-data";
import { ThemeProvider, themeInitScript } from "./components/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://dahalaryan.com.np";

const title = person.name;

const description =
  "I build digital experiences, software, and communities — web applications, Discord bots, and the systems that hold it all together.";

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
  },

  twitter: {
    card: "summary",
    title: title,
    description: description,
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
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
  jobTitle: person.role,
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
            __html: themeInitScript,
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}