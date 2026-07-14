import { Hr, Text } from "@react-email/components";
import * as React from "react";
import NewsletterEmail from "./newsletter";
import { getSiteUrl } from "@/lib/emails/site-url";

export type PreLaunchWaitlistEmailProps = {
  firstName: string;
  /** Optional extra line from Mari (shown in a shaded callout above main content). */
  personalNote?: string;
};

const monoBody = {
  fontFamily: "IBM Plex Mono, ui-monospace, Courier New, monospace",
  fontSize: "15px" as const,
  lineHeight: 1.65,
  color: "#545456",
  margin: "0 0 16px",
};

/**
 * Waitlist signup confirmation: personalised welcome + link to pricing and booking.
 */
export default function PreLaunchWaitlistEmail({ firstName, personalNote }: PreLaunchWaitlistEmailProps) {
  const site = getSiteUrl().replace(/\/+$/, "");
  const preview = `Hi ${firstName}, thanks for joining the Reset mailing list.`;

  return (
    <NewsletterEmail
      content={{
        headline: "You're on the mailing list",
        intro: "Thanks for signing up. I'll email you when offers and studio news are worth knowing about.",
        sections: [
          {
            heading: "What's next",
            body:
              `We're at Crown Glass in Nailsea with reformer and hot mat Pilates. ` +
              `Memberships and class packs are on ${site}/pricing, and you can book at ${site}/book.`,
          },
        ],
        closing: "Thanks for staying in touch. Mari 🤍",
        ctaLabel: "Book a class",
        ctaUrl: `${site}/book`,
      }}
      eyebrow="From Mari at Reset"
      preview={preview}
      personalLead={
        <>
          <Text style={monoBody}>
            Hi {firstName}. Thanks for signing up, it means a lot.
          </Text>
          {personalNote ? (
            <Text
              style={{
                fontFamily: "IBM Plex Mono, ui-monospace, monospace",
                fontSize: "14px",
                lineHeight: 1.65,
                color: "#2b2b29",
                margin: "0 0 16px",
                padding: "14px 16px",
                backgroundColor: "#f7f6f5",
                borderLeft: "3px solid #545456",
              }}
            >
              {personalNote}
            </Text>
          ) : null}
          <Hr style={{ border: "none", borderTop: "1px solid #C6C5C4", margin: "20px 0" }} />
        </>
      }
    />
  );
}
