import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const description =
  "Andrea Cassini, full-stack developer from Bordighera, Italy. Web apps, AI tools and automation, with code and live demos.";

export const metadata: Metadata = {
  metadataBase: new URL("https://andreacassini.com"),
  title: "Andrea Cassini | Full-Stack Developer",
  description,
  openGraph: {
    title: "Andrea Cassini | Full-Stack Developer",
    description,
    url: "https://andreacassini.com",
    siteName: "Andrea Cassini",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
