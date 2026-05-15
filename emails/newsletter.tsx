import { Button, Heading, Hr, Text } from "@react-email/components";
import * as React from "react";
import { ResetDocument } from "./components/ResetDocument";
import type { NewsletterContent } from "@/lib/emails/newsletter-types";

export type NewsletterEmailProps = {
  content: NewsletterContent;
};

export default function NewsletterEmail({ content }: NewsletterEmailProps) {
  const preview = content.headline.slice(0, 110);

  return (
    <ResetDocument preview={preview}>
      <Text
        style={{
          margin: "0 0 8px",
          fontFamily: "IBM Plex Mono, ui-monospace, monospace",
          fontSize: "11px",
          letterSpacing: "0.16em",
          textTransform: "uppercase" as const,
          color: "#8E898A",
        }}
      >
        From the studio
      </Text>
      <Heading
        as="h1"
        style={{
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          fontSize: "22px",
          fontWeight: 700,
          letterSpacing: "0.05em",
          textTransform: "uppercase" as const,
          color: "#2b2b29",
          margin: "0 0 16px",
        }}
      >
        {content.headline}
      </Heading>
      <Text
        style={{
          fontFamily: "IBM Plex Mono, ui-monospace, Courier New, monospace",
          fontSize: "15px",
          lineHeight: 1.65,
          color: "#545456",
          margin: "0 0 20px",
        }}
      >
        {content.intro}
      </Text>
      {content.sections.map((s, i) => (
        <div key={i}>
          {i > 0 ? <Hr style={{ border: "none", borderTop: "1px solid #C6C5C4", margin: "20px 0" }} /> : null}
          <Text
            style={{
              margin: "0 0 8px",
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "#2b2b29",
            }}
          >
            {s.heading}
          </Text>
          <Text
            style={{
              fontFamily: "IBM Plex Mono, ui-monospace, monospace",
              fontSize: "14px",
              lineHeight: 1.65,
              color: "#545456",
              margin: 0,
            }}
          >
            {s.body}
          </Text>
        </div>
      ))}
      <Hr style={{ border: "none", borderTop: "1px solid #C6C5C4", margin: "24px 0 16px" }} />
      <Text
        style={{
          fontFamily: "IBM Plex Mono, ui-monospace, monospace",
          fontSize: "14px",
          lineHeight: 1.65,
          color: "#545456",
          margin: "0 0 24px",
        }}
      >
        {content.closing}
      </Text>
      <Button
        href={content.ctaUrl}
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
        {content.ctaLabel}
      </Button>
    </ResetDocument>
  );
}
