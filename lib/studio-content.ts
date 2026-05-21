/**
 * Studio copy sourced from the Reset Pilates onboarding form (non–design fields only).
 * Update here when the form changes.
 */

export const FOUNDER_NAME = "Mari";

export const ABOUT_STORY_PARAGRAPHS = [
  `Hey, I'm ${FOUNDER_NAME}, founder of Reset.`,
  "Reset. was created to be more than just a workout. It's a space to step away, slow down, and reconnect with your body.",
  "Inspired by the effortless energy of Australian Pilates studios, Reset. blends dynamic movement with a modern, considered approach, where strength, flow, and feeling good all come together.",
  "Pilates changed how I move, feel, and show up: stronger, more balanced, more in control. Now, I've created a space to share that.",
  "Expect dynamic, heat-infused classes using light weights and accessories to challenge your body and clear your mind.",
  "Reset. is your time to switch off, reset, and leave feeling stronger, every time.",
] as const;

/** Inclusive on-site copy for “who we’re for” (about page). */
export const IDEAL_CLIENT =
  "Anyone who wants a calm, well-taught hour of movement — first-timers, people finding their way back into fitness, and regular movers. You don't need to look or move a certain way; classes meet you where you are. On select sessions we offer Pilates-and-play with creche so parents with little ones have one less barrier — it's there if you need it, not a box you have to tick to belong here.";

/** What makes Reset different, onboarding USP */
export const STUDIO_DIFFERENTIATOR =
  "We focus on more dynamic Pilates with a touch of strength and functionality, so people can really see results.";

/** First visit / ethos, onboarding */
export const STUDIO_ETHOS_WELCOME =
  "At Reset we want every client to feel at ease whether it's their first class or their 100th. There is no pressure to be good at Pilates. Reset classes are designed to be dynamic and make you feel the difference in your body.";

export const LEVELS_OFFERED =
  "Complete beginners, mixed ability, and intermediate, beginner-friendly and intermediate reformer classes are both available.";

/** Visual grid on /classes — keep meaning aligned with {@link LEVELS_OFFERED}. */
export const LEVELS_TILES = [
  {
    id: "beginners",
    title: "Complete beginners",
    line: "Foundations-first coaching if you're new to Pilates or easing back in.",
  },
  {
    id: "mixed",
    title: "Mixed ability",
    line: "Layers and options in one room so everyone meets the work at their edge.",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    line: "More load, tempo, and coordination when you're ready to progress.",
  },
] as const;

export const REFORMER_CLASSES = [
  {
    name: "Renew",
    level: "Beginner",
    body:
      "Renew is our beginner-friendly reformer class, designed to introduce you to the foundations of Pilates. You'll learn correct alignment, breathing, and essential movements at a slower pace with clear support and guidance. Perfect for first-timers or those returning after a break, build confidence, strength, and control from the start.",
  },
  {
    name: "Rebuild",
    level: "Intermediate",
    body:
      "Rebuild is our intermediate reformer class focused on strengthening, control, and progression, building on the foundations of Pilates. You'll move through more dynamic sequences designed to challenge stability, coordination, and endurance, stronger flows, increased resistance, and purposeful movement on the reformer.",
  },
] as const;

export const HOT_MAT_CLASS = {
  name: "Reignite",
  body:
    "Reignite is our hot Pilates class: a dynamic strength × Pilates full-body flow designed to build strength, control, and endurance. Set in gentle infrared heat, the class helps muscles warm up faster and work more deeply. You'll move through a continuous, energising sequence using light weights and accessories to challenge stability, coordination, and muscle endurance, with a strong focus on core connection and controlled, intentional movement.",
};

export const MAT_CLASS = {
  name: "Reformat",
  body:
    "Reformat is our mat Pilates line, level-specific descriptions will sit alongside the timetable as schedules are finalised.",
};

export const WHAT_TO_BRING_HOT =
  "Wear comfortable activewear. Bring your own grip towel and grip socks, and a water bottle to stay hydrated.";

export const WHAT_TO_BRING_MAT = "Grip socks and a water bottle.";

export const INFRARED_BENEFITS = [
  "Infrared heat elevates every moment, challenging your body to work harder and engage deeper. Expect to sweat more and feel results sooner.",
  "This isn't only about intensity. The gentle warmth helps relax tight muscles, eases stiffness, and supports recovery by reducing inflammation.",
  "As circulation increases, wider benefits follow, including support for cardiovascular health and collagen production.",
  "The warmth can also calm the mind: heat supports serotonin release to lift mood and lower stress while you move. A total-body reset.",
] as const;

export const PRICING_INTRO = {
  reformerOrHotMat: "£45 for three reformer or hot mat Pilates classes",
  matOnly: "£30 for three mat classes",
} as const;

export const PRICING_CLASS_PACKS_NOTE =
  "Class pack bundles are to be used within three months of purchase unless otherwise stated.";

export const PRICING_CLASS_PACKS = [
  {
    label: "Hot mat Pilates, 4-class pack",
    price: "£50",
    detail: "£12.50 per class, saving £14 vs drop-in",
  },
  { label: "Mat Pilates, 5-class pack", price: "£55" },
  { label: "Mat Pilates, 10-class pack", price: "£95" },
  { label: "Reformer, 3-class pack", price: "£58" },
  {
    label: "Reformer, 5-class pass",
    price: "£95",
    detail: "£19 per class, saves £15 vs five drop-ins at £22 each",
  },
  {
    label: "Reformer, 10-class pass",
    price: "£175",
    detail: "£17.50 per class, saves £45 vs ten drop-ins at £22 each",
  },
  {
    label: "Reformer, 20-class pass",
    price: "£320",
    detail: "£16 per class, saves £120 vs twenty drop-ins at £22 each",
  },
] as const;

/** Promotional bundle referenced in onboarding email section */
export const PRICING_HOT_MAT_PROMO_PACK =
  "Hot mat, promotional 4-class pack £45 (£11.25 per class vs £16 drop-in), usable within three months of purchase.";

export const PRICING_MEMBERSHIPS_NOTE = "Monthly memberships require a three-month minimum commitment.";

export const PRICING_MEMBERSHIPS = [
  { label: "Reformer, 4 classes / month", price: "£74" },
  { label: "Reformer, 8 classes / month", price: "£140" },
  { label: "Reformer, unlimited / month", price: "£230" },
  { label: "Mat, 4 classes / month", price: "£40" },
  { label: "Mat, 8 classes / month", price: "£72" },
] as const;

/** Founding member rates (shown on Pricing and homepage). Standard layout: three cards */
export const PRICING_FOUNDING_TIERS = [
  {
    eyebrow: "Founding · Reformer",
    body: "4 reformer sessions per month, founding cohort pricing.",
    price: "£66",
    emphasis: "primary" as const,
  },
  {
    eyebrow: "Founding · Reformer",
    body: "8 reformer sessions per month, founding cohort pricing.",
    price: "£126",
    emphasis: "primary" as const,
  },
  {
    eyebrow: "Founding · Mat",
    body: "4 mat sessions per month, founding cohort pricing.",
    price: "£36",
    emphasis: "secondary" as const,
  },
] as const;

export const PRICING_FOUNDING = {
  headline: "Founding memberships, first 30 people, first 12 months",
} as const;

export const PRICING_DROP_INS = [
  { label: "Mat", price: "£12" },
  { label: "Reformer", price: "£22" },
  { label: "Hot mat", price: "£16" },
] as const;

export const OFFERS_SUMMARY =
  "Intro deals, class pack bundles, monthly memberships, and founding options, details below. Blue Light discount: coming soon.";

export const PARKING_INFO =
  "Nearby parking at Crown Glass Shopping Centre car park (typically £1/hour 9am–6pm Mon–Sat; free before 9am and after 6pm Mon–Sat; free all day Sunday) or Station Road car park (50p/hour 9am–6pm with the same before/after and Sunday rules).";

export const TRANSPORT_INFO =
  "Yes, accessible via the A2, X9, and X11 buses.";

export const GRIP_SOCKS_POLICY =
  "Grip socks are required for health and safety. They're available to purchase in the studio if you forget yours.";

export const CHANGING_INFO =
  "There are no dedicated changing rooms, but there is a WC, please arrive dressed for class.";

export const CANCELLATION_POLICY =
  "Please cancel at least 24 hours before your class starts so your credit is returned to your account for reuse. Cancellations within 24 hours of the start time are charged for the session.";

export const HEALTH_BOOKING_NOTE =
  "If you are diagnosed with any medical condition, seek approval from your GP before attending classes. If you are pregnant or postpartum, seek approval from your midwife before attending. We do not currently offer specialised pre- and postnatal classes (coming soon), tell your instructor before class starts.";

export const CORPORATE_BOOKINGS =
  "Yes, private group sessions for birthdays, hen parties, corporate events, and more.";

export const FAQ_GROUPS: readonly {
  readonly title: string;
  readonly items: readonly { readonly q: string; readonly a: string }[];
}[] = [
  {
    title: "Bookings & classes",
    items: [
      {
        q: "How do I book a class?",
        a: "Use our Book now flow, which links to Momence. You can manage and amend bookings in Momence.",
      },
      {
        q: "Do I need previous experience?",
        a: "No, we offer beginner-friendly and intermediate classes and welcome new faces. If you've never done Pilates before, we recommend starting with our beginner classes.",
      },
      {
        q: "Do I need to bring a mat or equipment?",
        a: "No. Mats and equipment are provided. Bring yourself, a water bottle, and grip socks.",
      },
      {
        q: "How long are classes?",
        a: "Around 45 minutes.",
      },
      {
        q: "What should I wear?",
        a: "Comfortable activewear you can move in. Grip socks must be worn, they're available to buy at the studio.",
      },
      {
        q: "When should I arrive?",
        a: "Please arrive about 10 minutes before class to get familiar with the kit. If you're new to the reformer, tell the instructor as soon as possible, they'll introduce the machine. Wait outside until the instructor lets you in so the current class can finish safely. Doors are locked during sessions.",
      },
      {
        q: "How old do I need to be?",
        a: "18+.",
      },
      {
        q: "Do you offer group, event, or corporate bookings?",
        a: CORPORATE_BOOKINGS,
      },
    ],
  },
  {
    title: "Health & safety",
    items: [
      {
        q: "Are grip socks mandatory?",
        a: "Yes, for health and safety.",
      },
      {
        q: "Do I need to bring a grip towel?",
        a: "Only for hot Pilates classes.",
      },
      {
        q: "What if I have a medical condition?",
        a: "Seek approval from your GP before attending any classes.",
      },
      {
        q: "What if I am pregnant or postpartum?",
        a: "Seek approval from your midwife before attending. We don't currently offer dedicated pre- and postnatal classes (coming soon). Tell your instructor before class starts.",
      },
    ],
  },
  {
    title: "What to expect",
    items: [
      {
        q: "It's my first Pilates class and I'm nervous.",
        a: "That's completely normal, we'll look after you and help you feel comfortable.",
      },
      {
        q: "Is it hard?",
        a: "It can be challenging in a good way, but everything can be adjusted so you work at your own pace.",
      },
      {
        q: "Do I need to be fit or flexible?",
        a: "No, Pilates is how you get stronger and more flexible.",
      },
      {
        q: "What happens in my first class?",
        a: "Tell your instructor before the session: they can walk you through equipment, guide each exercise, and offer hands-on support if needed.",
      },
    ],
  },
  {
    title: "Parking & travel",
    items: [
      {
        q: "Is there parking?",
        a: PARKING_INFO,
      },
      {
        q: "Is the studio accessible by public transport?",
        a: TRANSPORT_INFO,
      },
    ],
  },
  {
    title: "Policies",
    items: [
      {
        q: "What is your cancellation policy?",
        a: CANCELLATION_POLICY,
      },
      {
        q: "Do you offer a Blue Light discount?",
        a: "Coming soon, check back or ask at the desk when we're open.",
      },
    ],
  },
];
