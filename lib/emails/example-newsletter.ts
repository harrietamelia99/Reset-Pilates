import type { NewsletterContent } from "./newsletter-types";

/**
 * Example newsletter copy for previews and React Email dev.
 */
export function getExampleOpeningNewsletterContent(site: string): NewsletterContent {
  const base = site.replace(/\/+$/, "");
  return {
    headline: "We're open at Crown Glass, Nailsea.",
    intro:
      "Hi from Reset. The studio is up and running with reformer and hot mat Pilates. " +
      "If you've been following along since the waitlist days, thank you. It's lovely to have you here.",
    sections: [
      {
        heading: "Book your next class",
        body:
          "Timetable and booking are live in Momence. Memberships and class packs are on the pricing page if you want to browse options before you book.",
      },
      {
        heading: "Where you'll find us",
        body:
          "We're at Crown Glass in Nailsea, easy to get to before work or after school drop-off. " +
          "Classes, pricing, and practical info are all on the site when you're ready for a browse.",
      },
    ],
    closing:
      "If something's on your mind, just hit reply. Can't wait to see you on the mat. Mari 🤍",
    ctaLabel: "Book a class",
    ctaUrl: `${base}/book`,
  };
}
