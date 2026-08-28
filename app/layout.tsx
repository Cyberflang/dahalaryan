import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dahalaryan.com.np"),
  title: "Aryan Dahal",
  description:
    "Aryan Dahal builds software and digital projects with a focus on quality and simplicity.",
  openGraph: {
    title: "Aryan Dahal",
    description:
      "Aryan Dahal builds software and digital projects with a focus on quality and simplicity.",
    url: "https://dahalaryan.com.np",
    siteName: "Aryan Dahal",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Aryan Dahal",
    description:
      "Aryan Dahal builds software and digital projects with a focus on quality and simplicity.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
