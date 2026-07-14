import { Button, Heading, Hr, Img, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import { ResetDocument } from "./components/ResetDocument";
import type { NewsletterContent } from "../lib/emails/newsletter-types";
import { getExampleOpeningNewsletterContent } from "../lib/emails/example-newsletter";
import { getSiteUrl } from "../lib/emails/site-url";

export type NewsletterEmailProps = {
  content?: NewsletterContent;
  /** Small caps line above headline; defaults to "From Mari at Reset". */
  eyebrow?: string;
  /** Inbox preview line; defaults to first ~110 chars of headline. */
  preview?: string;
  /** Rendered after eyebrow, before headline (e.g. personalised waitlist welcome). */
  personalLead?: React.ReactNode;
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

export default function NewsletterEmail({
  content,
  eyebrow = "From Mari at Reset",
  preview: previewOverride,
  personalLead,
}: NewsletterEmailProps) {
  const site = getSiteUrl();
  const c = mergeNewsletterContent(site, content);
  const preview = previewOverride ?? (c.headline || "Newsletter").slice(0, 110);

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
      {personalLead}
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
        <React.Fragment key={i}>
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
          {Array.isArray(s.priceBoxes) && s.priceBoxes.length > 0 ? (
            <>
              {(s.priceBoxes ?? []).map((box, tierIdx) => {
                const last = tierIdx === (s.priceBoxes?.length ?? 0) - 1;
                return (
                  <Section
                    key={tierIdx}
                    style={{
                      border: "1px solid #d9d9d9",
                      backgroundColor: "#ffffff",
                      padding: "16px 18px",
                      marginTop: tierIdx === 0 ? "14px" : "12px",
                      marginBottom: last ? "18px" : "0",
                    }}
                  >
                    <Text
                      style={{
                        margin: "0 0 8px",
                        fontFamily: "IBM Plex Mono, ui-monospace, monospace",
                        fontSize: "10px",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase" as const,
                        color: "#545456",
                      }}
                    >
                      {box.eyebrow}
                    </Text>
                    <Text style={{ margin: "0 0 6px" }}>
                      <span
                        style={{
                          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                          fontSize: "22px",
                          fontWeight: 700,
                          color: "#2b2b29",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {box.price}
                      </span>
                      {box.priceSuffix ? (
                        <span
                          style={{
                            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                            fontSize: "15px",
                            fontWeight: 500,
                            color: "#8E898A",
                          }}
                        >
                          {box.priceSuffix}
                        </span>
                      ) : null}
                    </Text>
                    <Text
                      style={{
                        margin: 0,
                        fontFamily: "IBM Plex Mono, ui-monospace, monospace",
                        fontSize: "13px",
                        lineHeight: 1.55,
                        color: "#545456",
                      }}
                    >
                      {box.detail}
                    </Text>
                  </Section>
                );
              })}
            </>
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
        </React.Fragment>
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
      <Hr style={{ border: "none", borderTop: "1px solid #C6C5C4", margin: "28px 0 16px" }} />
      <Text
        style={{
          margin: 0,
          fontFamily: "IBM Plex Mono, ui-monospace, monospace",
          fontSize: "11px",
          lineHeight: 1.55,
          color: "#8E898A",
        }}
      >
        You&apos;re receiving this because you&apos;re on the Reset Pilates mailing list.{" "}
        <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={{ color: "#2b2b29", textDecoration: "underline" }}>
          Unsubscribe
        </Link>
      </Text>
    </ResetDocument>
  );
}
