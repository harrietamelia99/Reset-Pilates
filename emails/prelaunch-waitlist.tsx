import { Button, Heading, Text } from "@react-email/components";
import * as React from "react";
import { ResetDocument } from "./components/ResetDocument";
import { getSiteUrl } from "../lib/emails/site-url";

export type PreLaunchWaitlistEmailProps = {
  firstName: string;
  /** Optional extra line from Mari (merged into body) */
  personalNote?: string;
};

export default function PreLaunchWaitlistEmail({ firstName, personalNote }: PreLaunchWaitlistEmailProps) {
  const site = getSiteUrl();
  const preview = `Reset is almost here. Thanks for being early, ${firstName}.`;

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
        So glad you&apos;re here early
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
        Hi {firstName}. You raised your hand before we&apos;d even opened the doors. That means a lot.
      </Text>
      <Text
        style={{
          fontFamily: "IBM Plex Mono, ui-monospace, Courier New, monospace",
          fontSize: "15px",
          lineHeight: 1.65,
          color: "#545456",
          margin: "0 0 16px",
        }}
      >
        Reset is nearly here. Reformer, hot mat, and mat Pilates at Crown Glass in Nailsea. Founding memberships and
        timetable news will hit this list first.
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
        I&apos;ll only ping you when there&apos;s something worth your time. Opening-week bits, first-class details,
        that sort of thing. 🤍
      </Text>
      <Text
        style={{
          fontFamily: "IBM Plex Mono, ui-monospace, monospace",
          fontSize: "14px",
          lineHeight: 1.65,
          color: "#545456",
          margin: "0 0 24px",
        }}
      >
        Speak soon, Mari x
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
        Have a nosey at the site
      </Button>
    </ResetDocument>
  );
}
