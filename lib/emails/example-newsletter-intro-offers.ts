import type { NewsletterContent } from "./newsletter-types";

/** Production subject line for intro offers mailer (broadcasts / bulk send). */
export const INTRO_OFFERS_EMAIL_SUBJECT = "INTRO OFFERS ARE NOW LIVE 📢 | Reset Pilates";

/**
 * Intro class-pack launch mailer (aligned with Instagram / pricing page).
 * Rendered via {@link NewsletterEmail}; use for broadcasts or one-off sends.
 */
export function getIntroOffersNewsletterTemplate(site: string, firstName = "there"): NewsletterContent {
  const base = site.replace(/\/+$/, "");

  const introPriceBoxes = [
    {
      eyebrow: "3x Reformer or hot mat",
      price: "£45",
      detail: "Renew · Rebuild · Reignite",
    },
    {
      eyebrow: "3x Mat",
      price: "£30",
      detail: "Reformat Lvl I & II",
    },
  ] as const;

  return {
    headline: "Intro offers are now live",
    intro: `Hi ${firstName}. Intro class packs are live.`,

    sections: [
      {
        heading: "The bundles",
        body: " ",
        priceBoxes: [...introPriceBoxes],
      },
    ],
    closing: "Book on the website. Packs valid for three months. Questions? Just reply. Mari 🤍",

    ctaLabel: "Pricing & book",
    ctaUrl: `${base}/pricing`,
  };
}
