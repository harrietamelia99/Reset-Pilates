import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";
import { InstagramGlyph } from "@/components/icons/SocialBrandIcons";
import { ContactForm } from "@/components/ContactForm";
import { MotionSection } from "@/components/MotionSection";
import { SocialIconRow } from "@/components/SocialIconRow";
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
          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-light-grey bg-white">
              <Mail className="h-5 w-5 text-charcoal" strokeWidth={1.35} aria-hidden />
            </span>
            <div>
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Email</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-2 block text-lg font-medium text-charcoal hover:underline"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>

          <div>
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
              Social
            </p>
            <SocialIconRow className="mt-3" />
            <a
              href={CONTACT.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:underline"
            >
              <InstagramGlyph className="h-4 w-4 shrink-0" />
              {CONTACT.instagram.handle}
            </a>
          </div>

          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-light-grey bg-white">
              <MapPin className="h-5 w-5 text-charcoal" strokeWidth={1.35} aria-hidden />
            </span>
            <div>
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Studio</p>
              <address className="mt-2 not-italic text-mid-grey leading-relaxed">
                {CONTACT.addressLine}
                <br />
                <span className="mt-2 block">{CONTACT.locationNote}</span>
              </address>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-light-grey bg-white">
              <Clock className="h-5 w-5 text-charcoal" strokeWidth={1.35} aria-hidden />
            </span>
            <div>
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Hours</p>
              <p className="mt-2 text-mid-grey">{CONTACT.hours}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
