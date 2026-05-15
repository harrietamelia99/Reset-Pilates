import Link from "next/link";
import { StudioNewsletterBuilder } from "@/components/StudioNewsletterBuilder";
import { StudioSignOutButton } from "@/components/StudioSignOutButton";

export default function StudioNewsletterPage() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/studio"
          className="font-accent text-xs font-bold uppercase tracking-wide text-charcoal underline-offset-2 hover:underline"
        >
          ← Studio home
        </Link>
        <StudioSignOutButton />
      </div>
      <StudioNewsletterBuilder />
    </div>
  );
}
