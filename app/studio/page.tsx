import Link from "next/link";
import { StudioSignOutButton } from "@/components/StudioSignOutButton";

export default function StudioHomePage() {
  return (
    <div className="rounded-sm border border-light-grey bg-white p-8 shadow-sm md:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-accent text-[10px] uppercase tracking-[0.16em] text-warm-grey">Studio</p>
          <h1 className="mt-2 text-2xl font-bold uppercase tracking-heading text-charcoal md:text-3xl">Email tools</h1>
        </div>
        <StudioSignOutButton />
      </div>
      <p className="mt-4 max-w-xl font-accent text-sm leading-relaxed text-mid-grey">
        Branded React Email templates live in the repo under <code className="text-charcoal">emails/</code>. Use the
        newsletter builder for AI-assisted drafts; wire booking webhooks when your scheduler is ready.
      </p>
      <ul className="mt-10 space-y-4 font-accent text-sm text-charcoal">
        <li>
          <Link href="/studio/newsletter" className="font-bold uppercase tracking-wide underline-offset-4 hover:underline">
            Monthly newsletter (notes + photos, AI)
          </Link>
          <span className="mt-1 block text-mid-grey normal-case tracking-normal">
            Mari adds bullets and images in a private form → OpenAI drafts in her voice → branded preview.
          </span>
        </li>
        <li className="text-mid-grey">
          <span className="font-bold uppercase tracking-wide text-charcoal">Welcome booking</span>
          <span className="mt-1 block normal-case tracking-normal">
            Template: <code className="text-charcoal">emails/welcome-booking.tsx</code>. Send via{" "}
            <code className="text-charcoal">POST /api/webhooks/booking</code> when Momence (or similar) supports a
            webhook — see header secret in <code className="text-charcoal">.env.example</code>.
          </span>
        </li>
        <li className="text-mid-grey">
          <span className="font-bold uppercase tracking-wide text-charcoal">Pre-launch waitlist (~400)</span>
          <span className="mt-1 block normal-case tracking-normal">
            Template: <code className="text-charcoal">emails/prelaunch-waitlist.tsx</code>. For a one-off blast, use{" "}
            <a
              href="https://resend.com/docs/dashboard/broadcasts/introduction"
              className="text-charcoal underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resend Broadcasts
            </a>{" "}
            or export contacts and merge — consent and unsubscribe rules still apply.
          </span>
        </li>
        <li className="text-mid-grey">
          <span className="font-bold uppercase tracking-wide text-charcoal">Progress updates</span>
          <span className="mt-1 block normal-case tracking-normal">
            Template: <code className="text-charcoal">emails/progress-update.tsx</code> — pass sections from your CMS or
            a future studio form.
          </span>
        </li>
      </ul>
      <p className="mt-10 font-accent text-xs text-warm-grey">
        <Link href="/" className="text-charcoal underline-offset-2 hover:underline">
          Public site
        </Link>
      </p>
    </div>
  );
}
