import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { MotionSection } from "@/components/MotionSection";
import { CONTACT } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact Us | Reset Pilates Studio",
    description:
      "Get in touch with Reset Pilates Studio — Nailsea, North Somerset. Email, hours and enquiries.",
    openGraph: {
      title: "Contact Us | Reset Pilates Studio",
      description:
        "hello@resetpilatesstudio.co.uk — we would love to hear from you.",
    },
  };
}

export default function ContactPage() {
  return (
    <div className="page-bg">
      <header className="page-hero">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-heading text-charcoal md:text-5xl">
              Contact
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-mid-grey">
              Questions, founding memberships, group bookings — send us a note.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-16 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
        <MotionSection>
          <ContactForm />
        </MotionSection>

        <aside className="space-y-10">
          <div>
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Email</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-3 block text-lg font-medium text-charcoal hover:underline"
            >
              {CONTACT.email}
            </a>
          </div>
          <div>
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
              Instagram
            </p>
            <a
              href={CONTACT.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-lg font-medium text-charcoal hover:underline"
            >
              {CONTACT.instagram.handle}
            </a>
          </div>
          <div>
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Studio</p>
            <address className="mt-3 not-italic text-mid-grey leading-relaxed">
              {CONTACT.addressLine}
              <br />
              <span className="mt-2 block">{CONTACT.locationNote}</span>
            </address>
          </div>
          <div>
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Hours</p>
            <p className="mt-3 text-mid-grey">{CONTACT.hours}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
