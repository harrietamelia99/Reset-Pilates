import type { ProgressUpdateEmailProps } from "../../emails/progress-update";

/**
 * Example studio / build update for previews and React Email dev.
 * Voice: warm, British, short sentences, no em dashes (aligned with other mail).
 */
export function getExampleStudioUpdateEmailContent(): ProgressUpdateEmailProps {
  const content: ProgressUpdateEmailProps = {
    issueTitle: "Studio update: we're almost at the finish line",
    lead:
      "Quick note from Crown Glass. The space is starting to feel like Reset, not a building site, and 1st June is getting real. " +
      "Here's what's been happening this fortnight, and what we're sorting next.",
    sections: [
      {
        title: "On site",
        body:
          "Flooring is down and mirrors are going in. Reformers are built and we're testing springs and straps so everything feels smooth for your first class. " +
          "The hot mat room is next on the list, we're balancing warmth with airflow so it's lovely, not stifling.",
      },
      {
        title: "Booking and timetable",
        body:
          "We're still lining up Momence with founding memberships first, then drop-ins when we're ready to shout about dates. " +
          "You'll get a proper heads-up before anything goes live. No surprises, just clear steps when it's time to book.",
      },
      {
        title: "Little things that matter",
        body:
          "Reception is getting the same attention as the studios, hooks, shelves, somewhere to leave your shoes without it feeling cramped. " +
          "It's the small stuff that makes a place feel like home. ✨",
      },
      {
        title: "What's next",
        body:
          "Acoustic panels in hot mat, final kit checks, then a deep clean before we welcome you through the door. " +
          "If you've got a question, reply to this or message us on Instagram. I read everything.",
      },
    ],
    ctaLabel: "Catch up on the site",
  };
  return content;
}
