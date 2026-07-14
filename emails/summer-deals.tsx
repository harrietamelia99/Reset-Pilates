import { Button, Heading, Hr, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import { ResetDocument } from "./components/ResetDocument";
import { SUMMER_DEALS_OFFERS } from "@/lib/emails/example-newsletter-summer-deals";
import { getSiteUrl } from "@/lib/emails/site-url";

export type SummerDealsEmailProps = {
  /** Inbox preview line */
  preview?: string;
};

const monoBody = {
  fontFamily: "IBM Plex Mono, ui-monospace, Courier New, monospace",
  fontSize: "15px" as const,
  lineHeight: 1.65,
  color: "#545456",
  margin: "0 0 16px",
};

export default function SummerDealsEmail({
  preview = "Claim your summer voucher! Enjoy 3 exclusive deals now.",
}: SummerDealsEmailProps) {
  const site = getSiteUrl().replace(/\/+$/, "");
  const bookUrl = `${site}/book`;

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
          textAlign: "center" as const,
        }}
      >
        Hot mat and reformer pilates studio
      </Text>
      <Heading
        as="h1"
        style={{
          fontFamily: '"Bethany Elingston", Georgia, serif',
          fontSize: "28px",
          fontWeight: 400,
          letterSpacing: "0.02em",
          textTransform: "none" as const,
          color: "#2b2b29",
          margin: "0 0 12px",
          textAlign: "center" as const,
        }}
      >
        reset. Summer Deals
      </Heading>
      <Text style={{ ...monoBody, textAlign: "center" as const }}>
        Claim your summer voucher! Enjoy 3 exclusive deals now.
      </Text>

      {SUMMER_DEALS_OFFERS.map((offer, i) => (
        <Section
          key={offer.detail}
          style={{
            border: "1px solid #d9d9d9",
            backgroundColor: "#ffffff",
            padding: "18px 20px",
            marginTop: i === 0 ? "20px" : "12px",
            marginBottom: i === SUMMER_DEALS_OFFERS.length - 1 ? "24px" : "0",
          }}
        >
          <Text
            style={{
              margin: "0 0 6px",
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              fontSize: "26px",
              fontWeight: 700,
              color: "#2b2b29",
              letterSpacing: "-0.02em",
            }}
          >
            {offer.price}
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
            {offer.detail}
          </Text>
        </Section>
      ))}

      <Button
        href={bookUrl}
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
        Book Now
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
