"use client";

import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";
import { PaperSheet } from "@/components/PaperSheet";
import { CONTACT } from "@/lib/constants";

const LAST_UPDATED = "8 May 2026";

export function PrivacyView() {
  return (
    <>
      <MotionSection className="relative border-b border-light-grey bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Legal</p>
          <h1 className="mt-3 text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl lg:text-[2.5rem]">
            Privacy policy
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mid-grey md:text-base">
            How Reset Pilates Studio collects, uses, and protects your personal information when you use this
            website and related services. This notice is written for visitors and is aligned with UK data
            protection law (the UK GDPR and the Data Protection Act 2018).
          </p>
          <p className="mt-3 font-accent text-xs text-warm-grey">Last updated: {LAST_UPDATED}</p>
          <div className="rule-section mt-10 max-w-xs" aria-hidden />
        </div>
      </MotionSection>

      <MotionSection className="bg-white pb-16 md:pb-24" delay={0.05}>
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <PaperSheet flat pin={false} className="space-y-10 p-6 md:p-8 lg:p-10">
            <section className="space-y-3">
              <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
                Who we are
              </h2>
              <p className="font-accent text-sm leading-relaxed text-mid-grey">
                For the purposes of UK data protection law, the controller is <strong className="font-medium text-charcoal">Reset Pilates Studio</strong>,{" "}
                <span className="whitespace-pre-line">{CONTACT.addressLine}</span>. You can contact us
                about privacy at{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-medium text-charcoal underline-offset-4 hover:underline"
                >
                  {CONTACT.email}
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
                What we collect and why
              </h2>
              <p className="font-accent text-sm leading-relaxed text-mid-grey">
                We only collect personal information we reasonably need to run the studio, respond to you, or
                operate this site. The main categories are:
              </p>
              <ul className="list-disc space-y-2 pl-5 font-accent text-sm leading-relaxed text-mid-grey marker:text-charcoal/40">
                <li>
                  <strong className="font-medium text-charcoal">Contact form.</strong> When you send an
                  enquiry, we collect the details you provide (such as name, email address, optional phone
                  number, and your message) so we can reply. We do this under{" "}
                  <strong className="font-medium text-charcoal">legitimate interests</strong> in responding
                  to prospective and existing clients, or where needed to take steps at your request before
                  entering a contract.
                </li>
                <li>
                  <strong className="font-medium text-charcoal">Email updates and alerts.</strong> If you sign
                  up for studio updates, we collect your email address and any name you choose to provide, and
                  we send service emails relating to that sign-up (for example a confirmation). Where the
                  sign-up is clearly for marketing or general updates, we rely on{" "}
                  <strong className="font-medium text-charcoal">consent</strong>, which you can withdraw at
                  any time (use the unsubscribe link in our emails or contact us).
                </li>
                <li>
                  <strong className="font-medium text-charcoal">Studio tools (password-protected area).</strong>{" "}
                  If you access our internal studio pages, we use a short-lived, secure session cookie so you
                  stay signed in, and we process the content you submit there (for example newsletter drafts,
                  audience data you use with our email tools, and optional images you upload for emails). We do
                  this to run our business and communicate with our mailing list, under{" "}
                  <strong className="font-medium text-charcoal">legitimate interests</strong> and (where
                  applicable) to perform a contract or take steps you ask us to take. If you use optional{" "}
                  <strong className="font-medium text-charcoal">AI-assisted drafting</strong>, the prompts
                  and text you send for that feature are processed to generate suggestions; only use it with
                  content you are comfortable submitting for that purpose.
                </li>
                <li>
                  <strong className="font-medium text-charcoal">Technical and security data.</strong> Our
                  hosting provider and email delivery services process limited technical data (such as IP
                  address and device signals) when you use the site or when emails are sent. This helps us
                  deliver the site, prevent abuse, and troubleshoot issues, based on{" "}
                  <strong className="font-medium text-charcoal">legitimate interests</strong> and, where
                  applicable, our legal obligations.
                </li>
                <li>
                  <strong className="font-medium text-charcoal">Device storage on your browser.</strong> Some
                  parts of the site remember choices in your browser (for example if you dismiss a promo
                  banner). This is stored on your device; we don&apos;t receive that data unless you also
                  submit a form or similar.
                </li>
              </ul>
              <p className="font-accent text-sm leading-relaxed text-mid-grey">
                The on-site assistant answers common questions using information already published on this
                site; it does not send your chats to a third-party AI service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
                Who we share data with (processors)
              </h2>
              <p className="font-accent text-sm leading-relaxed text-mid-grey">
                We use trusted service providers who process data only on our instructions. They may include:
              </p>
              <ul className="list-disc space-y-2 pl-5 font-accent text-sm leading-relaxed text-mid-grey marker:text-charcoal/40">
                <li>
                  <strong className="font-medium text-charcoal">Hosting and infrastructure</strong> (for
                  example Vercel) to run this website and related APIs.
                </li>
                <li>
                  <strong className="font-medium text-charcoal">Email delivery</strong> (for example Resend)
                  to send contact notifications, subscriber messages, and studio emails.
                </li>
                <li>
                  <strong className="font-medium text-charcoal">Optional file storage</strong> for assets you
                  upload for newsletters (for example Vercel Blob or local storage in development), where
                  enabled.
                </li>
                <li>
                  <strong className="font-medium text-charcoal">Optional AI drafting</strong> (for example
                  OpenAI) only when that feature is enabled and you choose to use it in the studio tools.
                </li>
              </ul>
              <p className="font-accent text-sm leading-relaxed text-mid-grey">
                We do not sell your personal information. We may disclose information if we are required to
                by law or to protect our rights, customers, or the public.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
                International transfers
              </h2>
              <p className="font-accent text-sm leading-relaxed text-mid-grey">
                Some of our providers may process data outside the UK. Where that happens, we rely on
                appropriate safeguards recognised under UK law (such as the UK extension to the EU-US Data
                Privacy Framework where a provider is certified, standard contractual clauses approved for the
                UK, or other permitted transfer mechanisms).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
                How long we keep information
              </h2>
              <p className="font-accent text-sm leading-relaxed text-mid-grey">
                We keep personal data only as long as needed for the purposes above, including legal,
                accounting, or reporting requirements. Enquiry and operational records are typically kept for
                a limited period after the last contact unless we need to keep them longer (for example
                ongoing membership). Marketing lists are kept until you unsubscribe or we remove inactive
                contacts in line with our policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
                Cookies and similar technologies
              </h2>
              <p className="font-accent text-sm leading-relaxed text-mid-grey">
                We use a strictly necessary session cookie for the password-protected studio area so the server
                recognises your signed-in session. We do not use optional analytics or advertising cookies on
                this site as part of the standard build; if we add them later, we will update this policy and,
                where required, ask for your consent before non-essential cookies run.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
                Security
              </h2>
              <p className="font-accent text-sm leading-relaxed text-mid-grey">
                We use appropriate technical and organisational measures to protect personal data. No method
                of transmission over the internet is completely secure; please use a strong password for studio
                access and avoid sending unnecessary sensitive information by email.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
                Your rights
              </h2>
              <p className="font-accent text-sm leading-relaxed text-mid-grey">
                Under UK data protection law you have rights including, in summary:
              </p>
              <ul className="list-disc space-y-2 pl-5 font-accent text-sm leading-relaxed text-mid-grey marker:text-charcoal/40">
                <li>Access to your personal data.</li>
                <li>Rectification of inaccurate data.</li>
                <li>Erasure in certain circumstances.</li>
                <li>Restriction of processing in certain circumstances.</li>
                <li>Data portability where processing is based on consent or contract and is automated.</li>
                <li>Object to processing based on legitimate interests or for direct marketing.</li>
                <li>Withdraw consent at any time where we rely on consent (without affecting earlier lawful use).</li>
              </ul>
              <p className="font-accent text-sm leading-relaxed text-mid-grey">
                To exercise your rights, contact us at{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-medium text-charcoal underline-offset-4 hover:underline"
                >
                  {CONTACT.email}
                </a>
                . We may need to verify your identity before responding.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
                Complaints
              </h2>
              <p className="font-accent text-sm leading-relaxed text-mid-grey">
                If you are unhappy with how we handle personal data, please contact us first. You also have the
                right to lodge a complaint with the UK Information Commissioner&apos;s Office (ICO):{" "}
                <a
                  href="https://ico.org.uk/make-a-complaint/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-charcoal underline-offset-4 hover:underline"
                >
                  ico.org.uk/make-a-complaint
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
                Children
              </h2>
              <p className="font-accent text-sm leading-relaxed text-mid-grey">
                This website is not aimed at children. If you believe we have collected information from a
                child without appropriate consent, please contact us and we will take steps to delete it.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
                Changes
              </h2>
              <p className="font-accent text-sm leading-relaxed text-mid-grey">
                We may update this policy from time to time. The &quot;Last updated&quot; date at the top will
                change when we do; for significant changes we will also use reasonable means to draw them to
                your attention where appropriate.
              </p>
            </section>

            <p className="border-t border-charcoal/10 pt-8 font-accent text-sm text-mid-grey">
              <Link href="/contact" className="font-medium text-charcoal underline-offset-4 hover:underline">
                Contact us
              </Link>{" "}
              for studio enquiries, or email{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-medium text-charcoal underline-offset-4 hover:underline"
              >
                {CONTACT.email}
              </a>{" "}
              for privacy questions.
            </p>
          </PaperSheet>
        </div>
      </MotionSection>
    </>
  );
}
