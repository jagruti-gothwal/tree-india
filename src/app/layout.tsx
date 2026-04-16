import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

import { LanguageProvider } from "@/context/LanguageContext";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700", "800", "900"] });
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-outfit", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Tree India | High-Quality Confectionery Export",
  description: "Tree India delivers high-quality confectionery products to international markets with consistency, reliability, and competitive pricing.",
  icons: {
    icon: "/tree.png",
    shortcut: "/tree.png",
    apple: "/tree.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${nunito.variable} ${fredoka.variable} font-sans antialiased flex flex-col min-h-screen bg-slate-50 text-slate-900`}>
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
