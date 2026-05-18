import Link from "next/link";
import { StudioSignOutButton } from "@/components/StudioSignOutButton";

export default function StudioHomePage() {
  return (
    <div className="rounded-sm border border-light-grey bg-white p-8 shadow-sm md:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-accent text-[10px] uppercase tracking-[0.16em] text-warm-grey">Reset team</p>
          <h1 className="mt-2 text-2xl font-bold uppercase tracking-heading text-charcoal md:text-3xl">Emails</h1>
        </div>
        <StudioSignOutButton />
      </div>
      <p className="mt-4 max-w-xl font-accent text-sm leading-relaxed text-mid-grey">
        Draft emails in Reset’s tone from your notes and photos. Send a test only to an address you choose — your full list
        is never contacted from here.
      </p>
      <div className="rule-section my-8 max-w-xs" aria-hidden />
      <ul className="space-y-6 font-accent text-sm text-charcoal">
        <li>
          <Link
            href="/studio/newsletter"
            className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-charcoal px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:opacity-95"
          >
            Monthly newsletter
          </Link>
          <p className="mt-2 max-w-xl text-mid-grey">
            Round-up style: what’s been happening, timetable news, offers, photos — the longer read.
          </p>
        </li>
        <li>
          <Link
            href="/studio/updates"
            className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-white px-8 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition hover:bg-charcoal hover:text-white"
          >
            Updates & alerts
          </Link>
          <p className="mt-2 max-w-xl text-mid-grey">
            Shorter one-off emails: closures, last-minute changes, reminders, or anything people need to know quickly.
          </p>
        </li>
      </ul>
      <p className="mt-10 font-accent text-xs text-warm-grey">
        <Link href="/" className="text-charcoal underline-offset-2 hover:underline">
          Return to the main website
        </Link>
      </p>
    </div>
  );
}
