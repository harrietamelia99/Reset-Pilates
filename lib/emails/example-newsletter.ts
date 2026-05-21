import type { NewsletterContent } from "./newsletter-types";

/**
 * Rich example copy for previews and React Email dev (June opening, Nailsea, studio almost ready).
 * Voice: warm, British, short sentences, no em dashes.
 */
export function getExampleOpeningNewsletterContent(site: string): NewsletterContent {
  const base = site.replace(/\/+$/, "");
  return {
    headline: "We're opening 6th June. Nailsea, we're almost ready for you.",
    intro:
      "Hi from Crown Glass. We're in the thick of getting the studio ready so it feels just right when you walk in. " +
      "Opening day is 6th June, and we're so excited to bring a proper home for Pilates to Nailsea, reformer, hot mat, and mat, somewhere calm, strong, and a little bit lovely to spend an hour. " +
      "We've refreshed memberships, packs, and founding rates on the site so everything matches what we've confirmed for launch. ✨ If you've been with us since the waitlist days, thank you. This is for you as much as it is for us.",
    sections: [
      {
        heading: "What we're finishing off",
        body:
          "Mirrors are going up, kit is being staged, and the reformers are nearly ready for your first sessions. " +
          "We're tuning the hot mat room so the heat feels cosy, not overwhelming, and the mat space is getting the same care. " +
          "Little touches at reception too, so the whole place feels like Reset from the moment you arrive.",
      },
      {
        heading: "How to be first on the list",
        body:
          "Founding memberships are still part of the story if you want to lock things in early, reformer from £66 (four-class) or £126 (eight-class), mat four-class £36, all locked for your first twelve months while we have founding places left. " +
          "Monthly rates on the website now include unlimited reformer at £230, plus four-class and eight-class tiers, drop-in reformer is £22 and pass bundles are refreshed too. " +
          "Timetable and booking will land in your inbox once we're happy every detail is sorted, no spam, just the useful bits.",
      },
      {
        heading: "Where you'll find us",
        body:
          "We're at Crown Glass in Nailsea, right in the middle of things, easy to get to before work or after school drop-off. " +
          "If you've not peeked at the site yet, classes and pricing are all there when you're ready for a browse.",
      },
    ],
    closing:
      "I'll write again before go-live with anything you need for your first visit. " +
      "If something's on your mind, just hit reply. Can't wait to see you on the mat. Lots of love, Mari 🤍",
    ctaLabel: "Have a look at classes & pricing",
    ctaUrl: `${base}/pricing`,
  };
}
