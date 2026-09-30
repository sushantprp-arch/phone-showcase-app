import type { Transition, Variants } from "framer-motion";

/** Shared easing so every reveal on the site moves with the same weight. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const softSpring: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 26,
};
