import { Button, Heading, Hr, Img, Text } from "@react-email/components";
import * as React from "react";
import { ResetDocument } from "./components/ResetDocument";
import type { NewsletterContent } from "../lib/emails/newsletter-types";
import { getExampleOpeningNewsletterContent } from "../lib/emails/example-newsletter";
import { getSiteUrl } from "../lib/emails/site-url";

export type NewsletterEmailProps = {
  content?: NewsletterContent;
  /** Small caps line above headline; defaults to "From Mari at Reset". */
  eyebrow?: string;
};

const previewContent = (site: string): NewsletterContent => getExampleOpeningNewsletterContent(site);

function mergeNewsletterContent(site: string, raw?: NewsletterContent): NewsletterContent {
  const d = previewContent(site);
  if (!raw || typeof raw !== "object") return d;
  return {
    headline: typeof raw.headline === "string" && raw.headline.trim() ? raw.headline : d.headline,
    intro: typeof raw.intro === "string" && raw.intro.trim() ? raw.intro : d.intro,
    heroImageUrl: typeof raw.heroImageUrl === "string" && raw.heroImageUrl.trim() ? raw.heroImageUrl.trim() : undefined,
    heroImageAlt: typeof raw.heroImageAlt === "string" && raw.heroImageAlt.trim() ? raw.heroImageAlt.trim() : undefined,
    sections: Array.isArray(raw.sections) ? raw.sections : d.sections,
    closing: typeof raw.closing === "string" && raw.closing.trim() ? raw.closing : d.closing,
    ctaLabel: typeof raw.ctaLabel === "string" && raw.ctaLabel.trim() ? raw.ctaLabel : d.ctaLabel,
    ctaUrl: typeof raw.ctaUrl === "string" && raw.ctaUrl.trim() ? raw.ctaUrl : d.ctaUrl,
  };
}

export default function NewsletterEmail({ content, eyebrow = "From Mari at Reset" }: NewsletterEmailProps) {
  const site = getSiteUrl();
  const c = mergeNewsletterContent(site, content);
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
        {eyebrow}
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
      {c.heroImageUrl ? (
        <Img
          src={c.heroImageUrl}
          alt={c.heroImageAlt || "Newsletter image"}
          width={600}
          style={{
            display: "block",
            margin: "0 auto 20px",
            border: 0,
            outline: "none",
            width: "100%",
            maxWidth: "600px",
            height: "auto",
          }}
        />
      ) : null}
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
          {s.imageUrl ? (
            <Img
              src={s.imageUrl}
              alt={(s.imageAlt || s.heading).slice(0, 200)}
              width={600}
              style={{
                display: "block",
                margin: "0 auto 12px",
                border: 0,
                outline: "none",
                width: "100%",
                maxWidth: "600px",
                height: "auto",
              }}
            />
          ) : null}
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
