import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Tree India | Our Story & Consistency in Quality",
  description: "Learn about Tree India's journey, our commitment to international quality standards, and how we became a trusted name in confectionery export.",
  keywords: ["about Tree India", "confectionery company india", "export quality food", "Tree India mission"],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
