import { FAQ_GROUPS } from "@/lib/faq-data";
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
      text: "Hey! 👋 Ask me anything about classes, booking, or the studio, or I can point you to our contact page if it’s something specific. Pick a quick question below or type your own!",
    };
  }

  if (/^(hi|hey|hello|hiya|yo)\b|^good (morning|afternoon|evening)\b/.test(q)) {
    return {
      text: `Hey there! ✨ Thanks for stopping by ${SITE_NAME}. I can answer common questions or send you to the right place, what’s on your mind?`,
    };
  }

  if (/\b(thanks|thank you|cheers|ty)\b/.test(q)) {
    return {
      text: "You’re so welcome! 🙌 Anything else I can help with?",
    };
  }

  if (/\b(bye|goodbye|see you)\b/.test(q)) {
    return {
      text: "Take care! 💚 Hope to see you on the mat soon.",
    };
  }

  /** Explicit “talk to a human”, offer contact */
  if (
    /\b(contact|email us|speak to someone|talk to someone|human|call me|phone number)\b/.test(q)
  ) {
    return {
      text: `We’d love to hear from you! 💌 Drop us a note and we’ll get back as soon as we can.`,
      cta: {
        href: `mailto:${CONTACT.email}`,
        label: `Email ${CONTACT.email}`,
        external: true,
      },
    };
  }

  if (/\b(where|address|location|find you|directions|map|nailsea|based)\b/.test(q)) {
    return {
      text: `📍 You’ll find us at ${CONTACT.addressLine.replace(/\n/g, ", ")}. ${CONTACT.locationNote}`,
      cta: { href: MAP_EXTERNAL_URL, label: "Open in Google Maps", external: true },
    };
  }

  if (
    /\bwhen do you open\b/.test(q) ||
    /\b(opening|launch|pre-?launch)\b/.test(q) ||
    /\b(june|2026)\b/.test(q) ||
    /\bfounding\b/.test(q) ||
    (/\bwhen\b/.test(q) && /\b(open|launch|start)\b/.test(q))
  ) {
    return {
      text: `🗓️ ${OPENING_DATE_LABEL}. Founding memberships are limited, it’s worth checking out our pricing page for the details.`,
      cta: { href: "/pricing", label: "View pricing" },
    };
  }

  if (/\b(hours|open times|what time|opening hours)\b/.test(q)) {
    return {
      text: `🕐 We’re planning to be open ${CONTACT.hours}, final times may be confirmed closer to launch.`,
    };
  }

  if (/\b(instagram|social|follow)\b/.test(q)) {
    return {
      text: `Follow us on Instagram for studio vibes & updates! 📸 ${CONTACT.instagram.handle}`,
      cta: { href: CONTACT.instagram.url, label: "Instagram", external: true },
    };
  }

  if (/\b(price|pricing|cost|how much|£|membership|memberships|founding)\b/.test(q)) {
    return {
      text:
        "💷 We have intro bundles and founding membership tiers, the Pricing page has the latest numbers. If something isn’t listed yet, we’re happy to chat!",
      cta: { href: "/pricing", label: "Go to pricing" },
    };
  }

  if (/\b(book|booking|momence|schedule|class times)\b/.test(q) || /\bhow do i book\b/.test(q)) {
    return {
      text:
        "🗓️ Bookings will run through Momence, use Book Now in the nav when scheduling goes live. Until then, stay tuned for the link update!",
      cta:
        BOOKING_HREF.startsWith("http")
          ? { href: BOOKING_HREF, label: "Book", external: true }
          : { href: BOOKING_HREF, label: "Booking info" },
    };
  }

  if (/\b(parking|park|car park)\b/.test(q)) {
    return {
      text:
        "🅿️ Yes, Crown Glass Car Park (£1/hr, free evenings and Sundays) and Station Road Car Park (50p/hr, same hours) are both handy.",
    };
  }

  if (/\b(grip sock|socks|grip socks)\b/.test(q)) {
    return {
      text: "🧦 Grip socks are mandatory for safety, and we sell them in-studio if you forget to pack a pair!",
    };
  }

  if (/\b(cancel|cancellation)\b/.test(q)) {
    return {
      text: "⏰ Cancel at least 24 hours before class to get your credit back. Late cancellations may be charged, we keep it fair for everyone on the waitlist.",
    };
  }

  if (/\b(reformer|hot mat|mat pilates|classes offered|what classes)\b/.test(q)) {
    return {
      text:
        "✨ We offer Reformer, Hot Mat, and Mat Pilates, something for different moods and levels. Beginners are welcome!",
    };
  }

  const faqHit = bestFaqAnswer(q);
  if (faqHit && faqHit.score >= 4) {
    return {
      text: `${faqHit.answer} ✨`,
    };
  }

  if (faqHit && faqHit.score >= 2) {
    return {
      text: `Here’s what I know: ${faqHit.answer} 💬 If you need something more personal, our team is happy to help.`,
      cta: { href: "/contact", label: "Contact us" },
    };
  }

  return {
    text:
      "That’s a great question, I want to make sure you get the right answer! 🙌 Our team can help with anything personal or detailed. Send us an email and we’ll get back to you.",
    cta: { href: `mailto:${CONTACT.email}`, label: `Email ${CONTACT.email}`, external: true },
  };
}
