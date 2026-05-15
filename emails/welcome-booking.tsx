import { Button, Heading, Text } from "@react-email/components";
import * as React from "react";
import { ResetDocument } from "./components/ResetDocument";
import { getSiteUrl } from "@/lib/emails/site-url";

export type WelcomeBookingEmailProps = {
  firstName: string;
  /** e.g. "Reformer — Tuesday 10:00" */
  bookingSummary?: string;
};

export default function WelcomeBookingEmail({ firstName, bookingSummary }: WelcomeBookingEmailProps) {
  const site = getSiteUrl();
  const preview = `You’re booked — see you at Reset, ${firstName}.`;

  return (
    <ResetDocument preview={preview}>
      <Heading
        as="h1"
        style={{
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          fontSize: "22px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          color: "#2b2b29",
          margin: "0 0 16px",
        }}
      >
        You&apos;re in
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
        Hi {firstName}, thanks for booking with Reset. We can&apos;t wait to see you in the studio.
      </Text>
      {bookingSummary ? (
        <Text
          style={{
            fontFamily: "IBM Plex Mono, ui-monospace, monospace",
            fontSize: "14px",
            lineHeight: 1.6,
            color: "#2b2b29",
            margin: "0 0 20px",
            padding: "14px 16px",
            backgroundColor: "#f7f6f5",
            borderLeft: "3px solid #2b2b29",
          }}
        >
          <strong style={{ display: "block", marginBottom: "6px", fontSize: "11px", letterSpacing: "0.14em", color: "#8E898A" }}>
            YOUR CLASS
          </strong>
          {bookingSummary}
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
        Arrive a few minutes early, wear layers you can move in, and bring grip socks if you have them. If anything
        changes, you can manage your booking from the link in your confirmation.
      </Text>
      <Button
        href={`${site}/classes`}
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
        Class info
      </Button>
    </ResetDocument>
  );
}
