import { FAQ_GROUPS } from "@/lib/faq-data";
import { hasMomenceScheduleEmbed } from "@/lib/booking-config";
import {
  BOOKING_HREF,
  CONTACT,
  MAP_EXTERNAL_URL,
  OPENING_DATE_LABEL,
  SITE_NAME,
} from "@/lib/constants";

export type ChatbotReply = {
  text: string;
  cta?: { href: string; label: string; external?: boolean };
};

const STOP = new Set([
  "the",
  "and",
  "you",
  "for",
  "are",
  "what",
  "how",
  "when",
  "with",
  "this",
  "that",
  "from",
  "have",
  "can",
  "will",
  "your",
  "our",
  "any",
  "get",
  "got",
  "does",
  "did",
  "about",
  "into",
  "need",
  "want",
  "know",
  "tell",
  "more",
  "some",
]);

function words(q: string): string[] {
  return q
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

function scoreFaqItem(query: string, question: string, answer: string): number {
  const ws = words(query);
  const blob = `${question} ${answer}`.toLowerCase();
  let s = 0;
  for (const w of ws) {
    if (blob.includes(w)) s += 2;
  }
  const qParts = question.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
  for (const p of qParts) {
    if (query.includes(p)) s += 3;
  }
  return s;
}

function bestFaqAnswer(query: string): { answer: string; score: number } | null {
  let best: { answer: string; score: number } | null = null;
  for (const group of FAQ_GROUPS) {
    for (const item of group.items) {
      const score = scoreFaqItem(query, item.q, item.a);
      if (!best || score > best.score) {
        best = { answer: item.a, score };
      }
    }
  }
  return best;
}

/**
 * Friendly FAQ + routing helper for the floating chat. Uses {@link FAQ_GROUPS} plus studio facts from constants.
 */
export function getChatbotReply(raw: string): ChatbotReply {
  const q = raw.trim().toLowerCase();

  if (!q) {
    return {
      text: "Ask about classes, booking, or the studio. I can point you to a page, or to email if it needs a human.",
    };
  }

  if (/^(hi|hey|hello|hiya|yo)\b|^good (morning|afternoon|evening)\b/.test(q)) {
    return {
      text: `Hi! I’m here for quick answers about ${SITE_NAME}. What would you like to know?`,
    };
  }

  if (/\b(thanks|thank you|cheers|ty)\b/.test(q)) {
    return {
      text: "You’re welcome. Anything else?",
    };
  }

  if (/\b(bye|goodbye|see you)\b/.test(q)) {
    return {
      text: "Take care. Hope to see you on the mat soon.",
    };
  }

  /** Explicit “talk to a human”, offer contact */
  if (
    /\b(contact|email us|speak to someone|talk to someone|human|call me|phone number)\b/.test(q)
  ) {
    return {
      text: `Drop us a line and we’ll get back as soon as we can.`,
      cta: {
        href: `mailto:${CONTACT.email}`,
        label: `Email ${CONTACT.email}`,
        external: true,
      },
    };
  }

  if (/\b(where|address|location|find you|directions|map|nailsea|based)\b/.test(q)) {
    return {
      text: `We’re at ${CONTACT.addressLine.replace(/\n/g, ", ")}. ${CONTACT.locationNote}`,
      cta: { href: MAP_EXTERNAL_URL, label: "Open in Google Maps", external: true },
    };
  }

  /** Day-to-day hours (must run before “opening” launch heuristics so “opening times” isn’t misread as launch). */
  if (
    /\b(opening times|opening hours|open times|studio hours|business hours)\b/.test(q) ||
    (/\bhours\b/.test(q) && /\b(open|close|studio|you)\b/.test(q)) ||
    /\b(what time|what hours)\b.*\b(open|close|studio)\b/.test(q)
  ) {
    return {
      text: `Planned hours: ${CONTACT.hours}. We’ll confirm nearer to opening.`,
    };
  }

  /** First day / memberships (single line; founding detail is already in OPENING_DATE_LABEL) */
  if (
    /\bwhen do you open\b/.test(q) ||
    /\b(opening date|launch day|opening day|grand opening)\b/.test(q) ||
    /\b(pre-?launch|launch)\b/.test(q) ||
    /\b(june\s*1|1st\s*june|june\s*6|6th\s*june|june\s*2026)\b/.test(q) ||
    (/\b(june|2026)\b/.test(q) && /\b(open|launch|start)\b/.test(q)) ||
    (/\bwhen\b/.test(q) && /\b(open|launch|start)\b/.test(q) && !/\b(times|hours)\b/.test(q))
  ) {
    return {
      text: `${OPENING_DATE_LABEL}.`,
      cta: { href: "/pricing", label: "View pricing" },
    };
  }

  if (/\b(instagram|social|follow)\b/.test(q)) {
    return {
      text: `We’re on Instagram: ${CONTACT.instagram.handle}.`,
      cta: { href: CONTACT.instagram.url, label: "Instagram", external: true },
    };
  }

  if (/\b(price|pricing|cost|how much|£|membership|memberships)\b/.test(q)) {
    return {
      text: "Memberships and class packs are on our Pricing page. Email us if something isn't there yet.",
      cta: { href: "/pricing", label: "Go to pricing" },
    };
  }

  if (/\b(book|booking|momence|schedule|class times)\b/.test(q) || /\bhow do i book\b/.test(q)) {
    return {
      text: hasMomenceScheduleEmbed()
        ? "You can book through our live scheduler (Momence) on the Book page."
        : "Booking will be through Momence. Use Book in the nav when it’s live.",
      cta:
        BOOKING_HREF.startsWith("http")
          ? { href: BOOKING_HREF, label: "Book", external: true }
          : hasMomenceScheduleEmbed()
            ? { href: BOOKING_HREF, label: "Book" }
            : { href: BOOKING_HREF, label: "Booking info" },
    };
  }

  if (/\b(parking|park|car park)\b/.test(q)) {
    return {
      text:
        "Crown Glass Car Park (£1/hr, free evenings and Sundays) and Station Road Car Park (50p/hr, same hours) are both close by.",
    };
  }

  if (/\b(grip sock|socks|grip socks)\b/.test(q)) {
    return {
      text: "Grip socks are required for safety. We sell them in the studio if you forget yours.",
    };
  }

  if (/\b(cancel|cancellation)\b/.test(q)) {
    return {
      text: "Cancel at least 24 hours before class to get your credit back. Late cancels may be charged so we can be fair to the waitlist.",
    };
  }

  if (/\b(reformer|hot mat|classes offered|what classes)\b/.test(q)) {
    return {
      text: "We teach Reformer and Hot Mat Pilates, different levels welcome.",
    };
  }

  const faqHit = bestFaqAnswer(q);
  if (faqHit && faqHit.score >= 4) {
    return {
      text: faqHit.answer,
    };
  }

  if (faqHit && faqHit.score >= 2) {
    return {
      text: `${faqHit.answer} For something more personal, our team can help.`,
      cta: { href: "/contact", label: "Contact us" },
    };
  }

  return {
    text: "I’m not sure on that one. Email us and we’ll get you a proper answer.",
    cta: { href: `mailto:${CONTACT.email}`, label: `Email ${CONTACT.email}`, external: true },
  };
}
