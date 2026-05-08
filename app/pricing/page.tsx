import type { Metadata } from "next";
import Link from "next/link";
import { BookingWidget } from "@/components/BookingWidget";
import { MotionSection } from "@/components/MotionSection";
import { PricingCard } from "@/components/PricingCard";
import { BOOKING_HREF } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pricing & Memberships | Reset Pilates Studio",
    description:
      "Intro deals, founding memberships, class packs and drop-ins — transparent pricing at Reset Pilates Studio.",
    openGraph: {
      title: "Pricing & Memberships | Reset Pilates Studio",
      description: "Intro deals, founding memberships, class packs and drop-ins.",
    },
  };
}

function PriceTable({
  rows,
  caption,
}: {
  caption: string;
  rows: { label: string; price: string; per: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[320px] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-light-grey">
            <th className="py-3 pr-4 font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
              Pack
            </th>
            <th className="py-3 pr-4 font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
              Price
            </th>
            <th className="py-3 font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
              Per class
            </th>
          </tr>
        </thead>
        <tbody className="text-charcoal">
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-light-grey/80">
              <td className="py-4 font-medium">{r.label}</td>
              <td className="py-4 text-mid-grey">{r.price}</td>
              <td className="py-4 text-mid-grey">{r.per}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
        Valid 3 months from purchase.
      </p>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="bg-white">
      <header className="border-b border-light-grey bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-heading text-charcoal md:text-5xl">
              Simple, honest pricing.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-mid-grey">
              No hidden fees. Class packs, memberships and intro deals all in one place.
            </p>
          </div>
        </div>
      </header>

      <MotionSection className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="border border-charcoal bg-white p-8 md:p-12">
          <div>
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
              New to Reset? Start here.
            </p>
            <h2 className="mt-4 text-2xl font-bold uppercase tracking-heading text-charcoal">Intro deals</h2>
          </div>
          <ul className="mt-6 space-y-2 text-mid-grey">
            <li>3 reformer or hot mat classes for £45</li>
            <li>3 mat classes for £30</li>
          </ul>
          <Link
            href={BOOKING_HREF}
            className="mt-8 inline-flex items-center justify-center border border-charcoal bg-charcoal px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-charcoal/90"
          >
            Claim intro deal
          </Link>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="bg-mid-grey p-8 text-white md:p-12">
          <div>
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-white/55">
              Founding memberships
            </p>
            <h2 className="mt-4 text-2xl font-bold uppercase tracking-heading">First 30 members only</h2>
          </div>
          <p className="mt-3 max-w-2xl text-white/85">
            Lock in this rate for 12 months. 3-month minimum commitment.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <PricingCard
              emphasis
              title="Reformer"
              price="£65/month"
              detail="4 classes/month (£16.25 per class)"
            />
            <PricingCard emphasis title="Mat" price="£35/month" detail="4 classes/month (£8.75 per class)" />
          </div>
          <Link
            href={BOOKING_HREF}
            className="mt-10 inline-flex items-center justify-center border border-white bg-white px-8 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition hover:bg-light-grey"
          >
            Secure your founding membership
          </Link>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="border-b border-charcoal pb-4">
          <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal">Class packs — Reformer</h2>
        </div>
        <div className="mt-8 rounded-sm border border-light-grey bg-white p-8">
          <PriceTable
            caption="Reformer class packs"
            rows={[
              { label: "3 classes", price: "£58", per: "£19.33" },
              { label: "5 classes", price: "£95", per: "£19.00" },
              { label: "10 classes", price: "£180", per: "£18.00" },
            ]}
          />
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="border-b border-charcoal pb-4">
          <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal">
            Class packs — Hot Mat Pilates
          </h2>
        </div>
        <div className="mt-8 rounded-sm border border-light-grey bg-white p-8">
          <PriceTable
            caption="Hot mat class packs"
            rows={[{ label: "4 classes", price: "£50", per: "£12.50" }]}
          />
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="border-b border-charcoal pb-4">
          <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal">Class packs — Mat Pilates</h2>
        </div>
        <div className="mt-8 rounded-sm border border-light-grey bg-white p-8">
          <PriceTable
            caption="Mat class packs"
            rows={[
              { label: "5 classes", price: "£55", per: "£11.00" },
              { label: "10 classes", price: "£95", per: "£9.50" },
            ]}
          />
        </div>
      </MotionSection>

      <MotionSection className="border-y border-light-grey bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <div className="border-b border-charcoal pb-4">
            <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal">Standard memberships</h2>
            <p className="mt-2 font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
              After founding period · 3-month minimum commitment
            </p>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Reformer</p>
              <ul className="mt-4 space-y-2 text-mid-grey">
                <li>4×/month £73</li>
                <li>8×/month £136</li>
              </ul>
            </div>
            <div>
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Mat</p>
              <ul className="mt-4 space-y-2 text-mid-grey">
                <li>4×/month £40</li>
                <li>8×/month £72</li>
              </ul>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="border-b border-charcoal pb-4">
          <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal">Drop-in prices</h2>
        </div>
        <ul className="mt-6 space-y-2 text-mid-grey">
          <li>Mat: £12</li>
          <li>Reformer: £21</li>
          <li>Hot Mat: £16</li>
        </ul>
      </MotionSection>

      <MotionSection className="mx-auto max-w-6xl px-4 pb-24 md:px-6">
        <div className="border border-light-grey bg-white p-8 md:p-10">
          <p className="text-sm text-mid-grey">All classes are booked through Momence.</p>
          <Link
            href={BOOKING_HREF}
            className="mt-6 inline-flex items-center justify-center border border-charcoal bg-charcoal px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-charcoal/90"
          >
            Book now
          </Link>
        </div>
        <div id="book" className="mt-12 scroll-mt-28">
          <BookingWidget />
        </div>
      </MotionSection>
    </div>
  );
}
