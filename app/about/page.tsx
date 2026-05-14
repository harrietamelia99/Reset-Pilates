import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About | Reset Pilates Studio",
    description:
      "The story behind Reset Pilates in Nailsea — founder note, ethos, and studio philosophy coming soon ahead of our June 2026 opening.",
    openGraph: {
      title: "About | Reset Pilates Studio",
      description:
        "Learn about Reset Pilates — boutique reformer, hot mat, and mat Pilates in North Somerset.",
    },
  };
}

export default function AboutPage() {
  return (
    <ComingSoon
      label="About"
      headline="Our story — on the way"
      description="Founder note, ethos, and the thinking behind Reset will live here alongside studio imagery — we're drafting with care so it matches the experience you get in the room."
    />
  );
}
