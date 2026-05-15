import { Button, Heading, Text } from "@react-email/components";
import * as React from "react";
import { ResetDocument } from "./components/ResetDocument";
import { getSiteUrl } from "@/lib/emails/site-url";

export type PreLaunchWaitlistEmailProps = {
  firstName: string;
  /** Optional extra line from Mari (merged into body) */
  personalNote?: string;
};

export default function PreLaunchWaitlistEmail({ firstName, personalNote }: PreLaunchWaitlistEmailProps) {
  const site = getSiteUrl();
  const preview = `Reset opens soon — a thank-you for being early, ${firstName}.`;

  return (
    <ResetDocument preview={preview}>
      <Heading
        as="h1"
        style={{
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          fontSize: "20px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          color: "#2b2b29",
          margin: "0 0 16px",
        }}
      >
        You helped us build the list
      </Heading>
      <Text
        style={{
          fontFamily: "IBM Plex Mono, ui-monospace, Courier New, monospace",
          fontSize: "15px",
          lineHeight: 1.65,
          color: "#545456",
          margin: "0 0 16px",
        }}
      >
        Hi {firstName}, you&apos;re one of the people who raised their hand before we even opened the doors — thank
        you. Reset is almost here: reformer, hot mat, and mat Pilates in Crown Glass, Nailsea, with founding memberships
        and timetable drops landing first to this list.
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
      <Text
        style={{
          fontFamily: "IBM Plex Mono, ui-monospace, monospace",
          fontSize: "14px",
          lineHeight: 1.65,
          color: "#545456",
          margin: "0 0 24px",
        }}
      >
        Watch this space for opening-week offers and how to grab your first classes. No spam — only what you need to
        get on the mat with us.
      </Text>
      <Button
        href={site}
        style={{
          display: "inline-block",
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          color: "#ffffff",
          backgroundColor: "#2b2b29",
          padding: "14px 28px",
          textDecoration: "none",
        }}
      >
        Visit the site
      </Button>
    </ResetDocument>
  );
}
