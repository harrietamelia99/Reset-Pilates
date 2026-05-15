import Link from "next/link";
import { EditorialVideoBackdrop } from "@/components/EditorialVideoBackdrop";

export default function NotFound() {
  return (
    <div className="surface-editorial-dark relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center text-white">
      <EditorialVideoBackdrop variant="mid" preload="metadata" />
      <div className="grain-layer z-[1] opacity-25" aria-hidden />
      <div className="relative z-10 max-w-md">
        <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-white/55">404</p>
        <h1 className="mt-4 font-sans text-2xl font-bold uppercase tracking-heading md:text-3xl">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/75">
          That URL isn&apos;t part of this site. Open the homepage or use the menu above.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-white bg-white px-8 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition hover:bg-light-grey"
          >
            Back to home
          </Link>
          <Link
            href="/classes"
            className="inline-flex items-center justify-center border border-white/40 bg-transparent px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            Classes
          </Link>
        </div>
      </div>
    </div>
  );
}
