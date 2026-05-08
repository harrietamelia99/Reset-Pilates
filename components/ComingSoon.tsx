import Link from "next/link";

type Props = {
  /** Optional label for meta / subtle context — not shown if omitted */
  label?: string;
};

export function ComingSoon({ label }: Props) {
  return (
    <div className="page-bg">
      <div className="mx-auto flex min-h-[55vh] max-w-lg flex-col items-center justify-center px-4 py-24 text-center md:min-h-[60vh] md:py-32">
        {label && (
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">{label}</p>
        )}
        <h1 className="mt-4 text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl">
          Coming soon
        </h1>
        <p className="mt-5 text-mid-grey">
          We&apos;re finishing this page — check back shortly.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center border border-charcoal bg-charcoal px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
