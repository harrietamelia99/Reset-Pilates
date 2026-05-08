export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const fadeItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/** Slightly softer entrance for dense grids */
export const fadeItemSoft = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/** Shared viewport presets for scroll-triggered sections */
export const scrollViewport = {
  once: true as const,
  amount: 0.15 as const,
  margin: "0px 0px -10% 0px" as const,
};

export const scrollViewportTight = {
  once: true as const,
  amount: 0.08 as const,
  margin: "0px 0px -6% 0px" as const,
};
