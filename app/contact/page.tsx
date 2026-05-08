import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact | Reset Pilates Studio",
    description: "Coming soon.",
    robots: { index: false, follow: true },
  };
}

export default function ContactPage() {
  return <ComingSoon label="Contact" />;
}
