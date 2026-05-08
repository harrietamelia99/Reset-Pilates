export function BookingWidget() {
  return (
    <section className="rounded-sm border border-light-grey bg-white p-8 md:p-12">
      {/* TODO: Replace this section with your Momence embed code.
          Go to your Momence dashboard > Widgets > Copy embed code > paste here */}
      <div className="momence-embed-placeholder flex min-h-[200px] flex-col items-center justify-center bg-light-grey/40 p-8 text-center">
        <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-mid-grey">
          Booking widget loading...
        </p>
        <p className="mt-2 max-w-md text-sm text-mid-grey">
          Momence embed will appear here once your studio connects scheduling.
        </p>
      </div>
    </section>
  );
}
