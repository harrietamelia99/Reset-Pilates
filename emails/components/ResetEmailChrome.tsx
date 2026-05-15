import { Hr, Img, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import { getEmailAssetBaseUrl } from "../../lib/emails/email-asset-base-url";
import { getSiteUrl } from "../../lib/emails/site-url";
import { CONTACT } from "../../lib/constants";

const charcoal = "#2b2b29";
const midGrey = "#545456";
const warmGrey = "#8E898A";
const lightGrey = "#C6C5C4";

/** Panoramic header (`public/brand/reset-email-header.png`) — must be reachable at this HTTPS URL when sent (see EMAIL_ASSET_BASE_URL). */
function emailHeaderSrc(assetBase: string): string {
  return `${assetBase}/brand/reset-email-header.png`;
}

function instagramIconSrc(assetBase: string): string {
  return `${assetBase}/brand/instagram-email.png`;
}

type Props = {
  children: React.ReactNode;
};

/**
 * Shared header / footer for transactional mail - matches Reset palette
 * (charcoal, mid-grey, light rules; web-safe stacks).
 */
export function ResetEmailChrome({ children }: Props) {
  const site = getSiteUrl();
  const assetBase = getEmailAssetBaseUrl();
  const headerUrl = emailHeaderSrc(assetBase);
  const instagramIconUrl = instagramIconSrc(assetBase);

  /** Native 1024×341; match 600px mail container (explicit px for consistent letterboxing). */
  const headerW = 600;
  const headerH = Math.round((341 / 1024) * headerW);

  return (
    <>
      <Section style={{ padding: 0, margin: 0, lineHeight: 0, backgroundColor: "#2b2b29", textAlign: "center" as const }}>
        <Img
          src={headerUrl}
          alt="Reset Pilates. A calm movement moment in the studio, with the reset wordmark."
          width={headerW}
          height={headerH}
          style={{
            display: "block",
            margin: "0 auto",
            border: 0,
            outline: "none",
            textDecoration: "none",
            width: `${headerW}px`,
            height: `${headerH}px`,
            maxWidth: "100%",
          }}
        />
      </Section>
      <Section style={{ padding: "16px 24px 8px", backgroundColor: "#ffffff" }}>
        <Text
          style={{
            margin: 0,
            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            color: warmGrey,
            textAlign: "center" as const,
          }}
        >
          Pilates studio · Nailsea
        </Text>
        <Hr style={{ border: "none", borderTop: `1px solid ${lightGrey}`, margin: "20px 0 0" }} />
      </Section>
      <Section style={{ padding: "8px 24px 32px", backgroundColor: "#ffffff" }}>{children}</Section>
      <Section style={{ padding: "24px", backgroundColor: "#f7f6f5", borderTop: `1px solid ${lightGrey}` }}>
        <Text
          style={{
            margin: "0 0 8px",
            fontFamily: "IBM Plex Mono, ui-monospace, Courier New, monospace",
            fontSize: "12px",
            lineHeight: 1.6,
            color: midGrey,
          }}
        >
          Reset Pilates · Crown Glass, Nailsea
        </Text>
        <Text style={{ margin: "0 0 12px", fontSize: "12px", fontFamily: "IBM Plex Mono, ui-monospace, monospace" }}>
          <Link href={`mailto:${CONTACT.email}`} style={{ color: charcoal }}>
            {CONTACT.email}
          </Link>
          {" · "}
          <Link href={CONTACT.instagram.url} style={{ color: charcoal, textDecoration: "none" }}>
            <Img
              src={instagramIconUrl}
              width={16}
              height={16}
              alt=""
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: "6px",
                border: 0,
                outline: "none",
              }}
            />
            Instagram
          </Link>
          {" · "}
          <Link href={site} style={{ color: charcoal }}>
            Website
          </Link>
        </Text>
        <Text style={{ margin: 0, fontSize: "11px", color: warmGrey, fontFamily: "IBM Plex Mono, ui-monospace, monospace" }}>
          You&apos;re getting this because you&apos;ve been in touch with us online, joined the waitlist, or booked a
          class. Just drop me a message if anything looks off.
        </Text>
      </Section>
    </>
  );
}
