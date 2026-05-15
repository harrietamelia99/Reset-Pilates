import { Button, Heading, Text } from "@react-email/components";
import * as React from "react";
import { ResetDocument } from "./components/ResetDocument";
import { getSiteUrl } from "../lib/emails/site-url";

export type WelcomeBookingEmailProps = {
  firstName: string;
  /** e.g. "Reformer, Tuesday 10:00" */
  bookingSummary?: string;
};

export default function WelcomeBookingEmail({ firstName, bookingSummary }: WelcomeBookingEmailProps) {
  const site = getSiteUrl();
  const preview = `You're in, ${firstName}. See you at Reset soon.`;

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
        Hi {firstName}. Thanks for booking with us. Honestly can&apos;t wait to see you in the studio.
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
            Your class
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
          margin: "0 0 16px",
        }}
      >
        Come a few minutes early if you can. Wear layers you can move in. Grip socks if you have them (no stress if
        not, we&apos;ve got you).
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
        If plans shift, just use the link in your confirmation email to sort it. ✨
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
        Speak soon, Mari 🤍
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
        Have a look at classes
      </Button>
    </ResetDocument>
  );
}
