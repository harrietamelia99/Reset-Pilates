import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About | Reset Pilates Studio",
    description: "Coming soon.",
    robots: { index: false, follow: true },
  };
}

export default function AboutPage() {
  return <ComingSoon label="About" />;
}
