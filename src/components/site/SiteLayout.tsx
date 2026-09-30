import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation, useOutlet } from "react-router";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { EASE } from "@/lib/motion";

/** Ambient stage: slow-moving colour fields plus a faint technical grid. */
function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="grid-backdrop absolute inset-0 opacity-[0.55]" />
      <div className="absolute -top-40 -left-32 size-[34rem] rounded-full bg-[var(--brand)]/18 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 size-[30rem] rounded-full bg-[var(--titanium)]/12 blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 size-[26rem] rounded-full bg-[var(--mint)]/10 blur-[130px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background" />
    </div>
  );
}

export default function SiteLayout() {
  const outlet = useOutlet();
  const location = useLocation();

  // Router swaps pages without resetting scroll; do it here so every route
  // starts at the top instead of mid-page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Backdrop />
      <SiteHeader />
      {/* Keying on the path remounts <main> per route, so each page plays its
          entrance animation. An exit animation is deliberately skipped: with
          useOutlet() the exiting copy would already hold the next page. */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, ease: EASE }}
        className="flex flex-1 flex-col pt-16"
      >
        {outlet}
      </motion.main>
      <SiteFooter />
    </div>
  );
}
