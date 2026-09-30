import { cn } from "@/lib/utils";

/**
 * A pure CSS phone mockup with a living "screen": gradient wallpaper, ambient
 * scan line, glass sheen and a floating widget. Used as hero furniture so the
 * landing page has moving hardware without shipping video.
 */
export function PhoneFrame({
  accent = "#7c9cff",
  variant = "ios",
  className,
  screenLabel,
  screenValue,
}: {
  accent?: string;
  variant?: "ios" | "android";
  className?: string;
  screenLabel?: string;
  screenValue?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {/* halo behind the device */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[3rem] blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${accent}55, transparent 70%)` }}
      />

      {/* titanium frame */}
      <div className="relative rounded-[2.6rem] bg-gradient-to-b from-white/30 via-white/5 to-white/20 p-[3px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="rounded-[2.45rem] bg-neutral-950 p-2">
          <div
            className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2rem]"
            style={{
              background: `linear-gradient(165deg, ${accent}4d 0%, #0b0d16 45%, #05060b 100%)`,
            }}
          >
            {/* wallpaper blooms */}
            <div
              className="absolute -top-10 -left-8 size-40 rounded-full opacity-60 blur-2xl"
              style={{ background: accent }}
            />
            <div className="absolute right-[-20%] bottom-[-10%] size-48 rounded-full bg-[var(--mint)]/25 blur-3xl" />

            {/* status bar */}
            <div className="relative flex items-center justify-between px-5 pt-4 text-[10px] font-medium tracking-wide text-white/85">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-3 rounded-sm border border-white/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              </span>
            </div>

            {/* camera cutout */}
            {variant === "ios" ? (
              <div className="absolute top-3 left-1/2 h-6 w-[72px] -translate-x-1/2 rounded-full bg-black/90" />
            ) : (
              <div className="absolute top-3.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-black/90" />
            )}

            {/* floating widget */}
            <div className="absolute inset-x-5 top-1/2 -translate-y-1/2">
              <div className="animate-float rounded-2xl border border-white/12 bg-white/[0.07] p-3.5 backdrop-blur-sm">
                <p className="text-[9px] tracking-[0.18em] text-white/55 uppercase">
                  {screenLabel ?? "Mobius Lab"}
                </p>
                <p className="mt-1.5 text-xl font-semibold text-white">
                  {screenValue ?? "A17 Pro"}
                </p>
                <div className="mt-3 space-y-1.5">
                  <div className="h-1.5 w-4/5 rounded-full bg-white/25" />
                  <div className="h-1.5 w-3/5 rounded-full bg-white/15" />
                </div>
              </div>
            </div>

            {/* app dock */}
            <div className="absolute inset-x-5 bottom-5 grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((dot) => (
                <span
                  key={dot}
                  className={cn(
                    "aspect-square rounded-xl border border-white/10 bg-white/[0.06]",
                    dot === 0 && "animate-pulse-ring",
                  )}
                />
              ))}
            </div>

            {/* scan line */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className="animate-scan absolute inset-x-0 h-24 opacity-40"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${accent}66, transparent)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* glass sheen sweeping across the display */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.6rem]">
          <div className="animate-sheen absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/18 to-transparent" />
        </div>
      </div>
    </div>
  );
}
