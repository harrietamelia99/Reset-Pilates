import Link from "next/link";
import { CONTACT, NAV_LINKS } from "@/lib/constants";
import { LogoWordmark } from "@/components/LogoWordmark";

export function Footer() {
  return (
    <footer className="surface-editorial-dark relative border-t border-white/10">
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
          <address className="mt-4 not-italic text-sm leading-relaxed text-white/65">
            {CONTACT.addressLine}
          </address>
          <p className="mt-3 text-sm text-white/65">
            <a href={`mailto:${CONTACT.email}`} className="transition hover:text-white">
              {CONTACT.email}
            </a>
          </p>
          <p className="mt-2 text-sm text-white/65">{CONTACT.hours}</p>
        </div>

        <div>
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-white/45">
            Social
          </p>
          <ul className="mt-4 flex gap-4">
            <li>
              <a
                href={CONTACT.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium uppercase tracking-wide text-white/85 transition hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={CONTACT.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium uppercase tracking-wide text-white/85 transition hover:text-white"
              >
                Facebook
              </a>
            </li>
          </ul>
          <p className="mt-6 font-accent text-[11px] uppercase tracking-[0.12em] text-white/45">
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
