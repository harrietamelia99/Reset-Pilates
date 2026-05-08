export const SITE_NAME = "Reset Pilates Studio";

/** OpenStreetMap embed — centred on Crown Glass / Colliers Walk, Nailsea */
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
  hours: "Mon–Fri 06:30–20:30 | Sat–Sun 08:30–12:30",
  instagram: {
    handle: "@reset_pilatesstudio",
    url: "https://www.instagram.com/reset_pilatesstudio/",
  },
  facebook: {
    url: "https://www.facebook.com/",
  },
} as const;

export const NAV_LINKS = [
  { href: "/classes", label: "Classes" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

/** In-app booking section anchor; replace with full Momence URL when live. */
export const BOOKING_HREF = "/pricing#book";

/**
 * TODO: Replace with your Formspree form endpoint after creating a form at https://formspree.io
 * Example: https://formspree.io/f/yourFormId
 */
export const FORMSPREE_ACTION =
  "https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID";

/**
 * Email alerts signup — can match {@link FORMSPREE_ACTION} or use a separate Formspree form ID.
 */
export const EMAIL_ALERTS_FORMSPREE_ACTION = FORMSPREE_ACTION;

export const OPENING_DATE_LABEL =
  "Opening 1st June 2026 — Founding memberships available for the first 30 members";
