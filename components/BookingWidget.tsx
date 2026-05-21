import { hasMomenceScheduleEmbed, MOMENCE_SCHEDULE_EMBED_URL } from "@/lib/booking-config";

/** Momence iframe using the default studio URL or `NEXT_PUBLIC_MOMENCE_SCHEDULE_URL` when set. */
export function BookingWidget() {
  const src = hasMomenceScheduleEmbed() ? MOMENCE_SCHEDULE_EMBED_URL : null;

  return (
    <section className="rounded-sm border border-light-grey bg-white p-8 md:p-12">
      {src ? (
        <div className="relative w-full overflow-hidden rounded-sm bg-light-grey/30 shadow-inner">
          <div className="relative min-h-[min(720px,85vh)] w-full">
            {/* Momence-hosted scheduling UI */}
            <iframe
              title="Book Pilates classes — Momence"
              src={src}
              className="absolute inset-0 h-full min-h-[min(720px,85vh)] w-full border-0"
              allow="fullscreen; clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      ) : (
        <>
          {/* Fallback if the resolved URL is invalid (e.g. bad env override). */}
          <div className="momence-embed-placeholder flex min-h-[200px] flex-col items-center justify-center bg-light-grey/40 p-8 text-center">
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Booking widget</p>
            <p className="mt-2 max-w-md text-sm text-mid-grey">
              The booking URL couldn&apos;t be loaded. Check{" "}
              <span className="font-accent text-xs text-charcoal">NEXT_PUBLIC_MOMENCE_SCHEDULE_URL</span> in your
              environment, or contact whoever manages the website.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
