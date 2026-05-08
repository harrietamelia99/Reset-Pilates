import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/lib/constants";
import { LogoWordmark } from "@/components/LogoWordmark";
import { SocialIconRow } from "@/components/SocialIconRow";

export function Footer() {
  return (
    <footer className="surface-editorial-dark-deep relative border-t border-white/10">
      <div className="grain-layer opacity-20" aria-hidden />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6 lg:grid-cols-4 lg:gap-10">
        <div>
          <Link href="/" className="inline-block">
            <LogoWordmark className="text-3xl text-white" />
          </Link>
          <p className="mt-4 font-accent text-[11px] uppercase tracking-[0.15em] text-white/50">
            Pilates studio · Nailsea
          </p>
        </div>

        <div>
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-white/45">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm font-medium uppercase tracking-wide text-white/85 transition hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-white/45">
            Visit
          </p>
          <ul className="mt-4 space-y-4 text-sm leading-relaxed text-white/65">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" strokeWidth={1.5} aria-hidden />
              <address className="not-italic">{CONTACT.addressLine}</address>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/40" strokeWidth={1.5} aria-hidden />
              <a href={`mailto:${CONTACT.email}`} className="transition hover:text-white">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-white/40" strokeWidth={1.5} aria-hidden />
              <span>{CONTACT.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-white/45">
            Social
          </p>
          <SocialIconRow tone="dark" className="mt-4" />
          <p className="mt-5 font-accent text-[11px] uppercase tracking-[0.12em] text-white/45">
            Follow {CONTACT.instagram.handle}
          </p>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-6 text-xs text-white/45 md:flex-row md:items-center md:px-6">
          <span>© {new Date().getFullYear()} Reset Pilates Studio</span>
        </div>
      </div>
    </footer>
  );
}
