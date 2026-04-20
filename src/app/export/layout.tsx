import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Export & Logistics | Tree India Global Reach",
  description: "Tree India's export desk provides seamless logistics, competitive pricing, and reliable delivery of confectionery products to over 15 countries worldwide.",
  keywords: ["confectionery export logistics", "shipping food from india", "bulk orders international", "Tree India supply chain"],
};

export default function ExportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
