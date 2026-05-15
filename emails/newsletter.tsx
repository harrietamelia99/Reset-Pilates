import { Button, Heading, Hr, Text } from "@react-email/components";
import * as React from "react";
import { ResetDocument } from "./components/ResetDocument";
import type { NewsletterContent } from "../lib/emails/newsletter-types";
import { getSiteUrl } from "../lib/emails/site-url";

export type NewsletterEmailProps = {
  content?: NewsletterContent;
};

const previewContent = (site: string): NewsletterContent => ({
  headline: "Newsletter preview",
  intro: "Intro paragraph appears here when you send.",
  sections: [],
  closing: "Sign-off from Reset Pilates.",
  ctaLabel: "Visit website",
  ctaUrl: site,
});

export default function NewsletterEmail({ content }: NewsletterEmailProps) {
  const site = getSiteUrl();
  const c = content ?? previewContent(site);
  const preview = (c.headline || "Newsletter").slice(0, 110);

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
        {c.headline}
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
        {c.intro}
      </Text>
      {(Array.isArray(c.sections) ? c.sections : []).map((s, i) => (
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
        {c.closing}
      </Text>
      <Button
        href={c.ctaUrl}
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
        {c.ctaLabel}
      </Button>
    </ResetDocument>
  );
}
