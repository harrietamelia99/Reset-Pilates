export const SITE_NAME = "Reset Pilates Studio";

export const COLORS = {
  charcoal: "#2b2b29",
  midGrey: "#545456",
  warmGrey: "#8E898A",
  lightGrey: "#C6C5C4",
  cream: "#FFFAF3",
  white: "#FFFFFF",
} as const;

export const CONTACT = {
  email: "hello@resetpilatesstudio.co.uk",
  addressLine: "10A Colliers Walk, Nailsea, North Somerset, BS48 1RD",
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

export const OPENING_DATE_LABEL =
  "Opening 1st June 2026 — Founding memberships available for the first 30 members";
