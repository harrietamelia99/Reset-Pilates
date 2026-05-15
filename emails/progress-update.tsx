import { Button, Heading, Hr, Text } from "@react-email/components";
import * as React from "react";
import { ResetDocument } from "./components/ResetDocument";
import { getExampleStudioUpdateEmailContent } from "../lib/emails/example-studio-update";
import { getSiteUrl } from "../lib/emails/site-url";

export type ProgressSection = { title: string; body: string };

export type ProgressUpdateEmailProps = {
  /** e.g. "Build update, March" */
  issueTitle?: string;
  /** Short intro paragraph */
  lead?: string;
  sections?: ProgressSection[];
  ctaLabel?: string;
};

export default function ProgressUpdateEmail(props: ProgressUpdateEmailProps) {
  const ex = getExampleStudioUpdateEmailContent();
  const issueTitle = props.issueTitle?.trim() || ex.issueTitle;
  const lead = props.lead?.trim() || ex.lead;
  const sections =
    Array.isArray(props.sections) && props.sections.length > 0 ? props.sections : ex.sections ?? [];
  const ctaLabel = props.ctaLabel?.trim() || ex.ctaLabel;
  const site = getSiteUrl();
  const sectionList = sections;
  const preview = `${issueTitle ?? "Update"}: what's happening at Reset.`;

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
        From the build
      </Text>
      <Heading
        as="h1"
        style={{
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          fontSize: "22px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase" as const,
          color: "#2b2b29",
          margin: "0 0 16px",
        }}
      >
        {issueTitle}
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
        {lead}
      </Text>
      {sectionList.map((s, i) => (
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
            {s.title}
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
      <Hr style={{ border: "none", borderTop: "1px solid #C6C5C4", margin: "28px 0 20px" }} />
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
        {ctaLabel}
      </Button>
    </ResetDocument>
  );
}
