import type { Metadata } from "next";
import { PrivacyView } from "@/components/PrivacyView";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Privacy policy | Reset Pilates Studio",
    description:
      "How Reset Pilates Studio uses and protects your personal data (UK GDPR and Data Protection Act 2018): contact form, email sign-up, studio tools, cookies, and your rights.",
    openGraph: {
      title: "Privacy policy | Reset Pilates Studio",
      description:
        "Privacy notice for resetpilatesstudio.co.uk: purposes, lawful bases, retention, processors, and your rights under UK law.",
    },
  };
}

export default function PrivacyPage() {
  return <PrivacyView />;
}
