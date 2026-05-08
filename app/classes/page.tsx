import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Our Classes | Reset Pilates Studio",
    description: "Coming soon.",
    robots: { index: false, follow: true },
  };
}

export default function ClassesPage() {
  return <ComingSoon label="Classes" />;
}
