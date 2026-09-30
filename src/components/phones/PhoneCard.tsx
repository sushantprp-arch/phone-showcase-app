import { motion } from "framer-motion";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { useState } from "react";
import { SaveDeviceButton } from "@/components/phones/SaveDeviceButton";
import type { Phone } from "@/data/phones";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Photo stage for a device. Photos arrive with wildly different aspect ratios
 * (portrait press shots, landscape hands-on shots), so the image is contained
 * inside a fixed frame with the accent glow doing the framing work. If the
 * remote photo ever fails, we fall back to a drawn silhouette instead of a
 * broken image icon.
 */
export function DeviceImage({
  phone,
  className,
  imgClassName,
}: {
  phone: Phone;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div
        aria-hidden
        className="absolute inset-x-6 bottom-6 top-10 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(closest-side, ${phone.accent}40, transparent 72%)`,
        }}
      />
      {failed ? (
        <div className="relative flex flex-col items-center gap-3 text-muted-foreground">
          <ImageOff className="size-6" />
          <div className="h-40 w-24 rounded-[1.4rem] border border-edge bg-white/[0.04]" />
          <span className="text-xs">{phone.name}</span>
        </div>
      ) : (
        <img
          src={phone.image}
          alt={`${phone.brand} ${phone.name}`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={cn(
            "relative z-10 h-full w-full object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-out",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}

export function PhoneCard({
  phone,
  index,
  onOpen,
}: {
  phone: Phone;
  index: number;
  onOpen: (phone: Phone) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4), ease: EASE }}
      whileHover={{ y: -8 }}
      exit={{ opacity: 0, scale: 0.94 }}
      onClick={() => onOpen(phone)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(phone);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View specifications for ${phone.brand} ${phone.name}`}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-edge bg-[var(--stage)]/80 outline-none transition-colors duration-300 hover:border-white/25 focus-visible:border-brand"
    >
      {/* brand chip + save toggle */}
      <div className="absolute inset-x-4 top-4 z-20 flex items-center justify-between">
        <span className="rounded-full border border-white/12 bg-black/40 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-white/80 uppercase backdrop-blur-sm">
          {phone.brand}
        </span>
        <SaveDeviceButton deviceId={phone.id} deviceName={phone.name} />
      </div>

      <div className="relative overflow-hidden">
        <DeviceImage
          phone={phone}
          className="aspect-[4/5] w-full p-8 pt-12"
          imgClassName="group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-sheen absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col gap-3 border-t border-edge p-5">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {phone.name}
          </h3>
          <p className="mt-0.5 text-xs tracking-[0.12em] text-muted-foreground uppercase">
            {phone.series} · {phone.released}
          </p>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {phone.blurb}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
          {phone.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-edge bg-white/[0.04] px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View specs
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
