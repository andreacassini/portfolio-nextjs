import type { Metadata } from "next";
import { IBM_Plex_Mono, Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";

const display = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "800"],
  variable: "--font-display",
});
const body = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

const description =
  "Andrea Cassini, junior software developer in Torino. Computer Engineering graduate with three years in automotive software validation. Web apps, AI tools, case studies and live demos.";

export const metadata: Metadata = {
  metadataBase: new URL("https://andreacassini.com"),
  title: "Andrea Cassini | Junior Software Developer",
  description,
  openGraph: {
    title: "Andrea Cassini | Junior Software Developer",
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
