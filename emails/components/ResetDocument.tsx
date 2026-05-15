import { Body, Container, Head, Html, Preview, Section } from "@react-email/components";
import * as React from "react";
import { ResetEmailChrome } from "./ResetEmailChrome";
import { EMAIL_CANVAS_BG } from "../../lib/emails/email-canvas-bg";

type Props = {
  preview: string;
  children: React.ReactNode;
};

export function ResetDocument({ preview, children }: Props) {
  return (
    <Html lang="en-GB">
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <Preview>{preview}</Preview>
      <Body style={{ margin: 0, padding: 0, backgroundColor: EMAIL_CANVAS_BG }}>
        {/*
          Full-bleed table strip: some clients ignore body background; Section renders a reliable outer table.
        */}
        <Section style={{ margin: 0, padding: 0, width: "100%", backgroundColor: EMAIL_CANVAS_BG }}>
          <Container style={{ maxWidth: "600px", margin: "0 auto", width: "100%" }}>
            <ResetEmailChrome>{children}</ResetEmailChrome>
          </Container>
        </Section>
      </Body>
    </Html>
  );
}
