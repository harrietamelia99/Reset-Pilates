import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pricing | Reset Pilates Studio",
    description:
      "Founding memberships and intro bundles for Reset Pilates — full pricing hub and FAQs arriving before our Nailsea opening.",
    openGraph: {
      title: "Pricing | Reset Pilates Studio",
      description:
        "Membership tiers, intro offers, and founding rates for reformer, hot mat, and mat Pilates in Nailsea.",
    },
  };
}

export default function PricingPage() {
  return (
    <ComingSoon
      label="Pricing"
      headline="Pricing hub — almost there"
      description="Founding membership and intro bundles are highlighted on the homepage. Tier comparisons and membership FAQs will appear here in one place before booking opens fully."
    />
  );
}
