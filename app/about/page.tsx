import type { Metadata } from "next";
import { CONTACT } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About Reset | Meet Mari | Reset Pilates Studio",
    description:
      "Meet Mari, founder of Reset Pilates Studio — premium reformer and hot mat Pilates in Nailsea.",
    openGraph: {
      title: "About Reset | Meet Mari | Reset Pilates Studio",
      description: "The story behind Reset — Pilates with purpose in Nailsea.",
    },
  };
}

export default function AboutPage() {
  return (
    <div className="page-bg">
      <header className="relative min-h-[280px] overflow-hidden border-b border-light-grey bg-mid-grey text-white md:min-h-[360px]">
        <div className="absolute inset-0">
          <div className="flex h-full w-full items-center justify-center bg-light-grey text-sm text-warm-grey">
            [ Photography coming soon ]
          </div>
          <div className="absolute inset-0 bg-mid-grey/55" aria-hidden />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
          <div>
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-white/60">About</p>
            <h1 className="mt-4 text-4xl font-bold uppercase tracking-heading md:text-6xl">
              Meet Mari.
            </h1>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
        <p className="text-lg font-medium text-charcoal">Hey, I&apos;m Mari — founder of Reset.</p>
        <div className="mt-10 space-y-6 text-base leading-relaxed text-mid-grey">
          <p>
            Reset. was created to be more than just a workout. It&apos;s a space to step away, slow down,
            and reconnect with your body.
          </p>
          <p>
            Inspired by the effortless energy of Australian Pilates studios, Reset. blends dynamic
            movement with a modern, considered approach — where strength, flow, and feeling good all come
            together.
          </p>
          <p>
            Pilates changed how I move, feel, and show up. Stronger, more balanced, more in control.
            Now I&apos;ve created a space to share that.
          </p>
          <p>
            Expect dynamic, heat-infused classes using light weights and accessories to challenge your
            body and clear your mind.
          </p>
          <p>
            Reset. is your time to switch off, reset, and leave feeling stronger — every time.
          </p>
        </div>
      </section>

      <section className="border-t border-light-grey bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Studio</p>
          <h2 className="mt-4 text-2xl font-bold uppercase tracking-heading text-charcoal">Find us in Nailsea.</h2>
          <address className="mt-6 not-italic text-mid-grey">
            {CONTACT.addressLine}
          </address>
          <p className="mt-4 max-w-2xl text-mid-grey">{CONTACT.locationNote}</p>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div>
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
                Transport & parking
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-mid-grey">
                <li>
                  <span className="font-semibold text-charcoal">By bus:</span> A2, X9, X11
                </li>
                <li>
                  <span className="font-semibold text-charcoal">Crown Glass Car Park:</span> £1/hr (Mon–Sat
                  9am–6pm), free before 9am / after 6pm + all day Sunday
                </li>
                <li>
                  <span className="font-semibold text-charcoal">Station Road Car Park:</span> 50p/hr (same
                  hours as above)
                </li>
              </ul>
            </div>
            <div>
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Hours</p>
              <p className="mt-4 text-sm text-mid-grey">{CONTACT.hours}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
