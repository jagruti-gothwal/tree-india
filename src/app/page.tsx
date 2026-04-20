import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Tree India | Global Confectionery & Snacks Exporter",
  description: "Welcome to Tree India. We export the finest range of lollipops, candies, biscuits, and chocolates globally from India. Discover our commitment to quality and consistency.",
  keywords: ["indian snacks export", "global confectionery supplier", "Tree India home", "premium snack exporter"],
};

export default function Home() {
  return <HomeClient />;
}
