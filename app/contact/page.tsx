import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact | Reset Pilates Studio",
    description:
      "Contact Reset Pilates in Nailsea — Instagram and email are live now; full contact form and details arrive before opening.",
    openGraph: {
      title: "Contact | Reset Pilates Studio",
      description:
        "Reach Reset Pilates at Crown Glass, Nailsea — North Somerset's reformer and hot mat studio.",
    },
  };
}

export default function ContactPage() {
  return (
    <ComingSoon
      label="Contact"
      headline="Contact — expanding soon"
      description="You can always reach us on Instagram or by email from this page. A dedicated enquiries form and fuller studio details will join this section closer to opening."
    />
  );
}
