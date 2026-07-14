import type { ProgressUpdateEmailProps } from "../../emails/progress-update";

/**
 * Example studio update for previews and React Email dev.
 */
export function getExampleStudioUpdateEmailContent(): ProgressUpdateEmailProps {
  const content: ProgressUpdateEmailProps = {
    issueTitle: "Studio update from Crown Glass",
    lead:
      "Quick note from Nailsea. The studio is open and classes are running. " +
      "Here's what's been happening lately, and what's coming up.",
    sections: [
      {
        title: "On the timetable",
        body:
          "Reformer and hot mat sessions are live in Momence. If you haven't booked yet, memberships and class packs are on the pricing page.",
      },
      {
        title: "In the studio",
        body:
          "We're still fine-tuning the little things that make a visit feel smooth, kit checks, room flow, and the reception area. " +
          "It's the small stuff that makes a place feel like home.",
      },
      {
        title: "What's next",
        body:
          "More timetable slots, seasonal offers, and the occasional studio update by email. " +
          "If you've got a question, reply to this or message us on Instagram.",
      },
    ],
    ctaLabel: "Book a class",
  };
  return content;
}
