import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Camera,
  Handshake,
  MapPin,
  Repeat,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { PhoneCard } from "@/components/phones/PhoneCard";
import { PhoneDetailDialog } from "@/components/phones/PhoneDetailDialog";
import { PhoneFrame } from "@/components/phones/PhoneFrame";
import { Eyebrow, Reveal, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { phones, type Phone } from "@/data/phones";
import { EASE, staggerParent, fadeUp } from "@/lib/motion";

const FEATURED_IDS = ["iphone-15-pro-max", "galaxy-s24-ultra", "galaxy-z-fold-4"];
const featured = FEATURED_IDS.map(
  (id) => phones.find((phone) => phone.id === id)!,
).filter(Boolean);

const MARQUEE = phones.map((phone) => `${phone.brand} ${phone.name}`);

const PILLARS = [
  {
    icon: Camera,
    title: "Spec-checked, not screenshot-checked",
    body: "Every listing carries the display, silicon, sensor and battery figures we verified against the manufacturer's sheet.",
  },
  {
    icon: ShieldCheck,
    title: "24-month Mobius cover",
    body: "Battery health guarantee, one accidental-damage repair and a loaner device while yours is in service.",
  },
  {
    icon: Repeat,
    title: "Trade-in valued in minutes",
    body: "Bring your current phone. We grade it on the spot and credit the value straight against your new device.",
  },
  {
    icon: Wrench,
    title: "Set up before you leave",
    body: "Data migration, eSIM activation, carrier transfer and a walkthrough of the camera you actually paid for.",
  },
];

const COMPARISON = [
  {
    brand: "Apple",
    title: "iPhone",
    tone: "var(--brand)",
    points: [
      "Titanium Pro bodies with the A17 Pro platform",
      "Tightest video pipeline in the business",
      "Long, predictable software support windows",
    ],
    meta: "4 models on display",
  },
  {
    brand: "Samsung",
    title: "Galaxy",
    tone: "var(--titanium)",
    points: [
      "200MP sensors and 5x periscope zoom on Ultra",
      "S Pen and true split-screen multitasking",
      "Foldables that still feel like the future",
    ],
    meta: "7 models on display",
  },
];

const STATS = [
  { value: 11, suffix: "", label: "Devices on the table", decimals: 0 },
  { value: 42, suffix: "min", label: "Average trade-in visit", decimals: 0 },
  { value: 4.9, suffix: "/5", label: "Studio rating", decimals: 1 },
  { value: 24, suffix: "mo", label: "Cover on every device", decimals: 0 },
];

/** Counts up once the number scrolls into view. */
function Counter({
  value,
  suffix,
  decimals,
}: {
  value: number;
  suffix: string;
  decimals: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const totalFrames = 46;
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setDisplay(value * progress);
      if (frame < totalFrames) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Hero hardware: three mockups that lean toward the cursor. */
function HeroDevices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-16, 16]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [12, -12]), {
    stiffness: 120,
    damping: 20,
  });

  return (
    <div
      ref={containerRef}
      onPointerMove={(event) => {
        const bounds = containerRef.current?.getBoundingClientRect();
        if (!bounds) return;
        pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
        pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      className="relative mx-auto flex h-[26rem] w-full max-w-lg items-center justify-center [perspective:1400px] sm:h-[32rem]"
    >
      <PhoneFrame
        variant="android"
        accent="#c9a86a"
        screenLabel="Galaxy S24 Ultra"
        screenValue="200 MP"
        className="absolute left-0 hidden w-[8.5rem] rotate-[-14deg] opacity-80 sm:block sm:w-[9.5rem] lg:w-[10.5rem]"
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-20 w-[11rem] sm:w-[13rem] lg:w-[14rem]"
      >
        <PhoneFrame
          accent="#7c9cff"
          screenLabel="iPhone 15 Pro Max"
          screenValue="A17 Pro"
        />
      </motion.div>

      <PhoneFrame
        variant="android"
        accent="#79d8b8"
        screenLabel="Galaxy Z Fold"
        screenValue='7.6"'
        className="absolute right-0 hidden w-[8.5rem] rotate-[13deg] opacity-80 sm:block sm:w-[9.5rem] lg:w-[10.5rem]"
      />

      {/* floating labels */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="glass-panel absolute top-6 right-2 z-30 hidden items-center gap-2 rounded-2xl border border-edge px-3 py-2 text-xs shadow-xl md:flex"
      >
        <Sparkles className="size-3.5 text-titanium" />
        <span>Hands-on in store</span>
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="glass-panel absolute bottom-10 left-0 z-30 hidden items-center gap-2 rounded-2xl border border-edge px-3 py-2 text-xs shadow-xl md:flex"
      >
        <Star className="size-3.5 text-titanium" />
        <span>4.9 / 5 from 612 visitors</span>
      </motion.div>
    </div>
  );
}

export default function Landing() {
  const [selected, setSelected] = useState<Phone | null>(null);

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <Section className="relative overflow-hidden pt-14 pb-16 md:pt-20 md:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <motion.div variants={staggerParent} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <Eyebrow>
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
                </span>
                Mobius Device Studio
              </Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.6rem]"
            >
              Every iPhone and Galaxy,
              <br />
              <span className="text-gradient">under one roof.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              A curated gallery of the two flagship lines worth caring about.
              Real photography, verified specifications, and a showroom where you
              can hold all eleven before you decide.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="group rounded-full px-6">
                <Link to="/gallery">
                  Explore the gallery
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-edge bg-white/[0.03] px-6"
              >
                <Link to="/contact">
                  <MapPin className="size-4" />
                  Visit the studio
                </Link>
              </Button>
            </motion.div>

            <motion.dl
              variants={fadeUp}
              className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-edge pt-6"
            >
              {[
                { value: "11", label: "Devices in stock" },
                { value: "2", label: "Flagship lines" },
                { value: "24mo", label: "Cover included" },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-2xl font-semibold tracking-tight text-foreground">
                    {item.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">
                    {item.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            <HeroDevices />
          </motion.div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Marquee */}
      <div className="relative border-y border-edge bg-[var(--stage)]/50 py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee flex w-max shrink-0 items-center gap-10 pr-10">
            {[...MARQUEE, ...MARQUEE].map((label, index) => (
              <span
                key={`${label}-${index}`}
                className="flex items-center gap-10 text-sm tracking-[0.16em] text-muted-foreground/80 uppercase"
              >
                {label}
                <span className="size-1 rounded-full bg-[var(--brand)]/70" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ Featured */}
      <Section id="featured">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Eyebrow>Featured this month</Eyebrow>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              The three devices visitors ask for first
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/gallery"
              className="group inline-flex items-center gap-2 text-sm font-medium text-brand"
            >
              See all {phones.length} devices
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((phone, index) => (
            <PhoneCard
              key={phone.id}
              phone={phone}
              index={index}
              onOpen={setSelected}
            />
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ Compare */}
      <Section className="border-y border-edge bg-[var(--stage)]/40">
        <Reveal className="max-w-2xl">
          <Eyebrow>Pick a side</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Two philosophies, one showroom
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Apple optimises for the tightest possible integration. Samsung
            optimises for the widest possible capability. We stock both so you
            can feel the difference instead of reading about it.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {COMPARISON.map((panel, index) => (
            <Reveal key={panel.brand} delay={index * 0.12}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-edge bg-card/60 p-7">
                <div
                  aria-hidden
                  className="absolute -top-24 -right-16 size-56 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-45"
                  style={{ background: panel.tone }}
                />
                <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  {panel.brand}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  {panel.title}
                </h3>
                <ul className="mt-6 space-y-3">
                  {panel.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full"
                        style={{ background: panel.tone }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex items-center justify-between border-t border-edge pt-5">
                  <span className="text-xs text-muted-foreground">
                    {panel.meta}
                  </span>
                  <Link
                    to={`/gallery?brand=${panel.brand}`}
                    className="group/link inline-flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    Browse {panel.title}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------------- Pillars */}
      <Section>
        <Reveal className="max-w-2xl">
          <Eyebrow>Why Mobius</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            A showroom that behaves like a service
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.08} className="h-full">
              <div className="group h-full rounded-3xl border border-edge bg-card/50 p-6 transition-colors duration-300 hover:border-white/25">
                <span className="grid size-11 place-items-center rounded-2xl border border-edge bg-white/[0.04] text-brand transition-transform duration-500 group-hover:-translate-y-1">
                  <pillar.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------- Stats */}
      <Section className="border-y border-edge bg-[var(--stage)]/40 py-16 md:py-20">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <dt className="text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </dt>
              <dd className="mt-2 text-xs leading-snug text-muted-foreground sm:text-sm">
                {stat.label}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* --------------------------------------------------------------- CTA */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-edge bg-gradient-to-br from-white/[0.07] via-card/40 to-card/10 p-8 sm:p-12">
            <div
              aria-hidden
              className="absolute -top-32 left-1/4 size-72 rounded-full bg-[var(--brand)]/25 blur-3xl"
            />
            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <Eyebrow>
                  <Handshake className="size-3.5" />
                  Hands-on, no pressure
                </Eyebrow>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  Come hold all eleven devices
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Book a 30-minute slot and we will have the phones you care
                  about charged, wiped and waiting on the table.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button asChild size="lg" className="group rounded-full px-6">
                  <Link to="/contact">
                    Book a demo
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-edge bg-white/[0.03] px-6"
                >
                  <Link to="/gallery">Browse gallery</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <PhoneDetailDialog phone={selected} onClose={() => setSelected(null)} />
    </>
  );
}
