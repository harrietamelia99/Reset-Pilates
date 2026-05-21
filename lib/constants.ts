export const SITE_NAME = "Reset Pilates Studio";

/** OpenStreetMap embed, centred on Crown Glass / Colliers Walk, Nailsea */
export const MAP_IFRAME_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=-2.7615%2C51.4298%2C-2.7515%2C51.4345&layer=mapnik&marker=51.4322%2C-2.7565";

/** Opens in Google Maps app / web for directions */
export const MAP_EXTERNAL_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("10A Colliers Walk, Nailsea BS48 1RD, UK");

export const CONTACT = {
  email: "hello@resetpilatesstudio.co.uk",
  addressLine: "10A Colliers Walk, Nailsea,\nNorth Somerset, BS48 1RD",
  locationNote:
    "Located in the Crown Glass Shopping Centre, between JOI Salon and Coffee Corner Café.",
  hours: "Mon–Fri 06:30–20:30 · Sat–Sun 08:30–12:30",
  instagram: {
    handle: "@reset_pilatesstudio",
    url: "https://www.instagram.com/reset_pilatesstudio/",
  },
  facebook: {
    url: "https://www.facebook.com/share/1Jg8DSXtaY/?mibextid=wwXIfr",
  },
} as const;

import { getBookingHref, getBookingNavShowsComingSoonDialog } from "@/lib/booking-config";

export const NAV_LINKS = [
  { href: "/classes", label: "Classes" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

/** All “Book” CTAs use `/book` (Momence iframe or redirect to pricing when embed URL missing). */
export const BOOKING_HREF = getBookingHref();

/**
 * When true, navbar "Book Now" opens "coming soon" instead of navigating.
 * Auto false when Momence iframe URL is configured (`NEXT_PUBLIC_MOMENCE_SCHEDULE_URL`).
 */
export const BOOKING_NAV_SHOW_COMING_SOON_DIALOG = getBookingNavShowsComingSoonDialog();

/** Contact form posts to this API route (Resend on the server). */
export const CONTACT_API_PATH = "/api/contact";

/** Homepage email alerts form posts here (Resend on the server). */
export const EMAIL_ALERTS_API_PATH = "/api/email-alerts";

export const OPENING_DATE_LABEL =
  "Opening 6th June 2026, Founding memberships available for the first 30 members";
