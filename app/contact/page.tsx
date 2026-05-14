import type { Metadata } from "next";
import { ContactView } from "@/components/ContactView";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact | Reset Pilates Studio",
    description:
      "Message Reset Pilates in Nailsea — enquiry form, studio address, hours, email, and directions. Reformer, hot mat & mat Pilates opening June 2026.",
    openGraph: {
      title: "Contact | Reset Pilates Studio",
      description:
        "Get in touch with Reset Pilates at Crown Glass, Nailsea — North Somerset.",
    },
  };
}

export default function ContactPage() {
  return <ContactView />;
}
