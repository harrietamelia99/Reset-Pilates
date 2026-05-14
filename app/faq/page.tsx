import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FAQs | Reset Pilates Studio",
    description:
      "Frequently asked questions about classes, booking, memberships, and opening week at Reset Pilates in Nailsea — page in progress.",
    openGraph: {
      title: "FAQs | Reset Pilates Studio",
      description:
        "Answers about reformer, hot mat, mat Pilates, founding memberships, and the Nailsea studio.",
    },
  };
}

export default function FaqPage() {
  return (
    <ComingSoon
      label="FAQ"
      headline="FAQs — compiling answers"
      description="We're collecting the questions we hear most — from what to wear to how founding membership works — so you have straight answers on opening day."
    />
  );
}
