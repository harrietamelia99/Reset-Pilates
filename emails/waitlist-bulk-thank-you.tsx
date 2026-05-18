import { Heading, Text } from "@react-email/components";
import * as React from "react";
import { ResetDocument } from "./components/ResetDocument";
import { getSiteUrl } from "../lib/emails/site-url";

export type WaitlistBulkThankYouEmailProps = {
  firstName: string;
};

export default function WaitlistBulkThankYouEmail({ firstName }: WaitlistBulkThankYouEmailProps) {
  const site = getSiteUrl();
  const preview = `Thank you for your interest in Reset Pilates, ${firstName}.`;

  return (
    <ResetDocument preview={preview}>
      <Heading
        as="h1"
        style={{
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          fontSize: "20px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          color: "#2b2b29",
          margin: "0 0 16px",
        }}
      >
        Thank you for your interest
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
        Hi {firstName},
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
        Thank you for your interest in <strong style={{ color: "#2b2b29" }}>Reset Pilates</strong>. You&apos;re on our
        list, and we&apos;ll email you with updates as we head towards opening — including news on{" "}
        <strong style={{ color: "#2b2b29" }}>booking</strong>, timetable, and everything you need to get started at our
        Crown Glass studio in Nailsea.
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
        We won&apos;t flood your inbox; when there&apos;s something worth sharing, you&apos;ll hear from us.
      </Text>
      <Text
        style={{
          fontFamily: "IBM Plex Mono, ui-monospace, monospace",
          fontSize: "14px",
          lineHeight: 1.65,
          color: "#545456",
          margin: "0 0 8px",
        }}
      >
        With thanks,
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
        Mari and the Reset team 🤍
      </Text>
      <Text style={{ margin: 0 }}>
        <a
          href={site}
          style={{
            fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            color: "#2b2b29",
          }}
        >
          resetpilates.co.uk
        </a>
      </Text>
    </ResetDocument>
  );
}
