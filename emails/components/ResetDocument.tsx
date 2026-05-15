import { Body, Container, Head, Html, Preview } from "@react-email/components";
import * as React from "react";
import { ResetEmailChrome } from "./ResetEmailChrome";

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
      <Body style={{ margin: 0, backgroundColor: "#e8e6e4" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", width: "100%" }}>
          <ResetEmailChrome>{children}</ResetEmailChrome>
        </Container>
      </Body>
    </Html>
  );
}
