import type { Metadata } from "next";
import { Big_Shoulders, Manrope } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";

const display = Big_Shoulders({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

const description =
  "Andrea Cassini, junior software developer in Turin, Italy. Computer Engineering graduate with full-stack skills, AI projects, code and live demos.";

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
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
