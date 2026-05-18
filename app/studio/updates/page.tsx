import Link from "next/link";
import { StudioEmailDraftBuilder } from "@/components/StudioEmailDraftBuilder";
import { StudioSignOutButton } from "@/components/StudioSignOutButton";

export default function StudioUpdatesPage() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/studio"
          className="font-accent text-xs font-bold uppercase tracking-wide text-charcoal underline-offset-2 hover:underline"
        >
          ← Back
        </Link>
        <StudioSignOutButton />
      </div>
      <StudioEmailDraftBuilder variant="alert" />
    </div>
  );
}
