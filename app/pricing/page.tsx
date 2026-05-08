import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pricing | Reset Pilates Studio",
    description: "Coming soon.",
    robots: { index: false, follow: true },
  };
}

export default function PricingPage() {
  return <ComingSoon label="Pricing" />;
}
