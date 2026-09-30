import { motion } from "framer-motion";
import {
  BatteryCharging,
  Camera,
  Cpu,
  HardDrive,
  Monitor,
  Ruler,
} from "lucide-react";
import { SaveDeviceButtonWide } from "@/components/phones/SaveDeviceButton";
import { DeviceImage } from "@/components/phones/PhoneCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Phone } from "@/data/phones";
import { EASE } from "@/lib/motion";

const SPEC_ROWS = [
  { key: "display", label: "Display", icon: Monitor },
  { key: "chip", label: "Chipset", icon: Cpu },
  { key: "camera", label: "Camera", icon: Camera },
  { key: "battery", label: "Battery", icon: BatteryCharging },
  { key: "storage", label: "Storage", icon: HardDrive },
  { key: "weight", label: "Weight", icon: Ruler },
] as const;

export function PhoneDetailDialog({
  phone,
  onClose,
}: {
  phone: Phone | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={Boolean(phone)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto border-edge bg-stage p-0 sm:max-w-3xl">
        {phone && (
          <div className="grid gap-0 md:grid-cols-2">
            <div className="relative border-b border-edge bg-black/30 md:border-r md:border-b-0">
              <DeviceImage phone={phone} className="aspect-[4/5] w-full p-8 md:h-full" />
              <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-5">
                <span className="rounded-full border border-white/12 bg-black/45 px-2.5 py-1 text-[10px] tracking-[0.14em] text-white/80 uppercase backdrop-blur-sm">
                  {phone.brand}
                </span>
                <span className="rounded-full border border-white/12 bg-black/45 px-2.5 py-1 text-[10px] text-white/70 backdrop-blur-sm">
                  {phone.released}
                </span>
              </div>
            </div>

            <div className="flex flex-col p-6">
              <DialogHeader className="text-left">
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  {phone.name}
                </DialogTitle>
                <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                  {phone.blurb}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {phone.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-edge bg-white/[0.04] px-2.5 py-1 text-[11px] text-muted-foreground"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <dl className="mt-5 divide-y divide-white/10 border-y border-edge">
                {SPEC_ROWS.map((row, index) => {
                  const Icon = row.icon;
                  return (
                    <motion.div
                      key={row.key}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 + index * 0.05, ease: EASE }}
                      className="flex gap-3 py-2.5"
                    >
                      <Icon className="mt-0.5 size-4 shrink-0 text-brand" />
                      <div className="min-w-0">
                        <dt className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                          {row.label}
                        </dt>
                        <dd className="text-sm text-foreground">
                          {phone.specs[row.key]}
                        </dd>
                      </div>
                    </motion.div>
                  );
                })}
              </dl>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <SaveDeviceButtonWide
                  deviceId={phone.id}
                  deviceName={phone.name}
                  className="w-full sm:w-auto"
                />
                <Button
                  variant="outline"
                  className="flex-1 rounded-full border-edge bg-white/[0.03]"
                  onClick={onClose}
                >
                  Keep browsing
                </Button>
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                Launch price {phone.launchPrice}. Figures come from the
                manufacturer&apos;s published specifications.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
