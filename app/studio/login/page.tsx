import Link from "next/link";
import { StudioLoginForm } from "@/components/StudioLoginForm";

export const dynamic = "force-dynamic";

export default function StudioLoginPage({ searchParams }: { searchParams: { next?: string } }) {
  const raw = searchParams?.next;
  const next =
    typeof raw === "string" && raw.startsWith("/studio") && !raw.startsWith("/studio/login") ? raw : "/studio";

  return (
    <div className="rounded-sm border border-light-grey bg-white p-8 shadow-sm md:p-10">
      <p className="font-accent text-[10px] uppercase tracking-[0.16em] text-warm-grey">Private</p>
      <h1 className="mt-2 text-2xl font-bold uppercase tracking-heading text-charcoal md:text-3xl">Reset studio</h1>
      <p className="mt-4 max-w-md font-accent text-sm leading-relaxed text-mid-grey">
        Sign in to draft newsletters from your notes. This area is not indexed by search engines.
      </p>
      <div className="rule-section my-8 max-w-xs" aria-hidden />
      <StudioLoginForm nextPath={next} />
      <p className="mt-8 font-accent text-xs text-warm-grey">
        <Link href="/" className="text-charcoal underline-offset-2 hover:underline">
          Back to site
        </Link>
      </p>
    </div>
  );
}
