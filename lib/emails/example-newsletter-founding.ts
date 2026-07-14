import type { NewsletterContent } from "./newsletter-types";
import { PRICING_MEMBERSHIPS, PRICING_MEMBERSHIPS_NOTE } from "@/lib/studio-content";

/**
 * Membership pricing template for studio email drafts (matches current site rates).
 */
export function getFoundingMembershipNewsletterTemplate(site: string): NewsletterContent {
  const base = site.replace(/\/+$/, "");
  const sitePricingHint = `${base}/pricing`;

  const membershipPriceBoxes = PRICING_MEMBERSHIPS.map((tier) => {
    const sep = ", ";
    const idx = tier.label.indexOf(sep);
    const eyebrow = idx === -1 ? "Membership" : tier.label.slice(0, idx).trim();
    const detail = idx === -1 ? tier.label : tier.label.slice(idx + sep.length).trim();
    return {
      eyebrow,
      price: tier.price,
      priceSuffix: "/month",
      detail,
    };
  });

  return {
    headline: "Monthly memberships",
    intro:
      "Our reformer, hot mat, and combined memberships are live on the site. Credits roll over if unused for 12 months.",
    sections: [
      {
        heading: "Membership tiers",
        body: `${PRICING_MEMBERSHIPS_NOTE} Full details and class packs are on ${sitePricingHint}.`,
        priceBoxes: membershipPriceBoxes,
      },
    ],
    closing: "Questions? Reply to this email or use the contact form. Mari 🤍",
    ctaLabel: "View pricing & book",
    ctaUrl: sitePricingHint,
  };
}
