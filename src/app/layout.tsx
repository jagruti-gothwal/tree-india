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
  title: "Tree India | Premium Confectionery & Beverage Export",
  description: "Global leader in confectionery export. Tree India delivers high-quality candies, biscuits, chocolates, and beverages to international markets with consistency and competitive pricing.",
  alternates: {
    canonical: "https://www.treeindiaexports.com",
  },
  keywords: ["confectionery export", "india candy exporter", "biscuit manufacturers india", "lollipop export", "bulk candy wholesale", "beverage export", "Tree India products"],
  authors: [{ name: "Tree India" }],
  creator: "Tree India",
  publisher: "Tree India",
  openGraph: {
    title: "Tree India | Premium Confectionery & Beverage Export",
    description: "Delivering joy globally with high-quality snacks and confectionery.",
    url: "https://tree-india.com",
    siteName: "Tree India",
    images: [
      {
        url: "/tree.png",
        width: 800,
        height: 600,
        alt: "Tree India Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tree India | Premium Confectionery & Beverage Export",
    description: "Delivering joy globally with high-quality snacks and confectionery.",
    images: ["/tree.png"],
  },
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Tree India",
                "url": "https://www.treeindiaexports.com",
                "logo": "https://www.treeindiaexports.com/tree.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-9408436732",
                  "contactType": "sales",
                  "areaServed": "Worldwide",
                  "availableLanguage": ["en", "pt", "es", "fr"]
                },
                "sameAs": [
                  "https://www.facebook.com/treeindiaexports",
                  "https://twitter.com/treeindiaexports",
                  "https://www.instagram.com/treeindiaexports",
                  "https://www.linkedin.com/company/treeindiaexports"
                ]
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Tree India",
                "image": "https://www.treeindiaexports.com/tree.png",
                "@id": "https://www.treeindiaexports.com",
                "url": "https://www.treeindiaexports.com",
                "telephone": "+919408436732",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Plot No 45, GIDC Estate",
                  "addressLocality": "Ahmedabad",
                  "addressRegion": "Gujarat",
                  "postalCode": "380001",
                  "addressCountry": "IN"
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                  ],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              })
            }}
          />
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
