import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Tree India | Get a Bulk Inquiry Quote",
  description: "Connect with Tree India for bulk confectionery inquiries. Our team is ready to assist with international orders, custom branding, and logistics.",
  keywords: ["contact Tree India", "bulk confectionery quote", "export inquiry", "candy wholesale contact"],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
