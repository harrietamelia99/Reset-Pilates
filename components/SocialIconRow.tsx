"use client";

import { CONTACT } from "@/lib/constants";
import { FacebookGlyph, InstagramGlyph } from "@/components/icons/SocialBrandIcons";
import { cn } from "@/lib/cn";

const tones = {
  dark:
    "border-white/45 bg-transparent text-white shadow-none ring-0 hover:border-white hover:bg-transparent hover:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60",
  light:
    "border-light-grey bg-transparent text-charcoal shadow-none ring-0 hover:border-charcoal/45 hover:bg-transparent hover:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal/30",
} as const;

type Tone = keyof typeof tones;

type Props = {
  tone?: Tone;
  className?: string;
};

export function SocialIconRow({ tone = "light", className }: Props) {
  const ring = tones[tone];

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <a
        href={CONTACT.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
          ring
        )}
      >
        <InstagramGlyph className="h-[18px] w-[18px]" />
        <span className="sr-only">Instagram ({CONTACT.instagram.handle})</span>
      </a>
      <a
        href={CONTACT.facebook.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
          ring
        )}
      >
        <FacebookGlyph className="h-[18px] w-[18px]" />
        <span className="sr-only">Facebook</span>
      </a>
    </div>
  );
}
