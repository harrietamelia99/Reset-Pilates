import type { NewsletterContent } from "./newsletter-types";
import { OPENING_DATE_LABEL } from "@/lib/constants";
import { PRICING_DROP_INS, PRICING_FOUNDING, PRICING_FOUNDING_TIERS } from "@/lib/studio-content";

/**
 * Ready-to-send style template for founding membership campaigns.
 * Rates and opening line are derived from {@link OPENING_DATE_LABEL} and {@link PRICING_FOUNDING_TIERS}
 * so they stay aligned with `lib/studio-content.ts`.
 */
export function getFoundingMembershipNewsletterTemplate(site: string): NewsletterContent {
  const base = site.replace(/\/+$/, "");
  const [reformer4, reformer8, mat4] = PRICING_FOUNDING_TIERS;
  const reformerDrop =
    PRICING_DROP_INS.find((d) => d.label.trim().toLowerCase() === "reformer")?.price ?? "£22";

  const reformerFourLine =
    `${reformer4.body.replace(", founding cohort pricing.", "").replace(/\.$/, "")}: ${reformer4.price} per month.`;
  const reformerEightLine =
    `${reformer8.body.replace(", founding cohort pricing.", "").replace(/\.$/, "")}: ${reformer8.price} per month.`;
  const matLine =
    `${mat4.body.replace(", founding cohort pricing.", "").replace(/\.$/, "")}: ${mat4.price} per month.`;

  const openingPhrase = OPENING_DATE_LABEL.includes(",")
    ? OPENING_DATE_LABEL.split(",")[0]!.trim()
    : OPENING_DATE_LABEL;

  const pricingHostname = (() => {
    try {
      return new URL(base.startsWith("http") ? base : `https://${base}`).hostname;
    } catch {
      return "";
    }
  })();
  const sitePricingHint = pricingHostname ? `${pricingHostname}/pricing` : "resetpilatesstudio.co.uk/pricing";

  return {
    headline: "Founding membership: your rate locked for twelve months",
    intro:
      `${openingPhrase} is creeping closer, here's a fuller picture of founding if you've been on the fence. ` +
      `${PRICING_FOUNDING.headline.split(",")[0]!}: choose a preferential reformer or mat tier, and that monthly figure stays locked for your first twelve months once you're signed up as a founding member. ` +
      `When the thirty cohort fills, newer joiners roll onto the usual rates you'll see alongside it on pricing. Straight numbers, zero drama.`,

    sections: [
      {
        heading: "What's in it",
        body:
          "You're helping us bed the studio in properly, and we soften the tariff in exchange. Once booking is live you'll still reserve in Momence, same session quality, grip socks mandatory in the studios, cancellations as per our usual policy once you're enrolled. Totally fine too if you'd rather stroll in later on drop-in, no hard feelings.",
      },
      {
        heading: "The founding tiers (monthly)",
        body:
          `Three options currently: ${reformerFourLine} ${reformerEightLine} ${matLine} ` +
          `They're all founding, meaning that quoted monthly amount doesn't shift for twelve months whilst you stay on the tier you're on. Remember memberships carry a separate three-month commitment (spelled out on the pricing page with the mainstream tiers). ` +
          `Contrast that with today's standard reformer membership rows, packs, unlimited, and ${reformerDrop} reformer drop-in, summarised nicely at ${sitePricingHint}.`,
      },
      {
        heading: "Want a spot?",
        body:
          "Reply to this email or message us via the site contact form and tell us which tier you're leaning towards. Questions welcome on timings, timetable, grips, founder perks, and we'll get you answers. Booking will open in Momence when we're confident every detail lands smoothly; founders get first shout when slots go live.",
      },
    ],
    closing:
      "Thank you for being alongside us whilst the paint dries and the straps get tested. Means the world. If founding isn't right, you're still invited on the mats as soon as we open properly. Mari 🤍",

    ctaLabel: "View founding & pricing on the website",
    ctaUrl: `${base}/pricing`,
  };
}
