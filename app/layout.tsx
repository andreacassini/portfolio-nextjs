import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/Header";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: "Andrea Cassini - Full Stack Developer",
  description: "Portfolio of Andrea Cassini - Full stack developer specialized in React, Node.js, and modern web technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-body bg-gradient-to-br from-[#667eea] to-[#764ba2] min-h-screen text-white antialiased">
        <ParticlesBackground />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
