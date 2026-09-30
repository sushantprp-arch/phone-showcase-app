import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useSaveAction } from "@/hooks/use-saved-devices";
import { cn } from "@/lib/utils";

/** Star toggle used on gallery cards. Sits inside a clickable card, so it
 *  stops propagation and keeps the keyboard handler from opening the dialog. */
export function SaveDeviceButton({
  deviceId,
  deviceName,
  className,
}: {
  deviceId: string;
  deviceName: string;
  className?: string;
}) {
  const { saved, pending, onClick } = useSaveAction(deviceId);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.88 }}
      onClick={onClick}
      onKeyDown={(event) => event.stopPropagation()}
      disabled={pending}
      aria-pressed={saved}
      title={
        saved
          ? `Remove ${deviceName} from your dashboard`
          : `Save ${deviceName} to your dashboard`
      }
      className={cn(
        "grid size-8 place-items-center rounded-full border backdrop-blur-sm transition-colors duration-300 disabled:opacity-60",
        saved
          ? "border-brand/60 bg-brand/20 text-brand"
          : "border-white/12 bg-black/40 text-white/70 hover:border-white/30 hover:text-white",
        className,
      )}
    >
      <Star
        className={cn("size-3.5", saved && "fill-current", pending && "animate-pulse")}
      />
      <span className="sr-only">
        {saved ? "Remove from dashboard" : "Save to dashboard"}
      </span>
    </motion.button>
  );
}

/** Labelled variant for the spec dialog footer. */
export function SaveDeviceButtonWide({
  deviceId,
  deviceName,
  className,
}: {
  deviceId: string;
  deviceName: string;
  className?: string;
}) {
  const { saved, pending, onClick } = useSaveAction(deviceId);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={pending}
      aria-pressed={saved}
      title={
        saved
          ? `Remove ${deviceName} from your dashboard`
          : `Save ${deviceName} to your dashboard`
      }
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors duration-300 disabled:opacity-60",
        saved
          ? "border-brand/60 bg-brand/20 text-brand"
          : "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        className,
      )}
    >
      <Star className={cn("size-4", saved && "fill-current", pending && "animate-pulse")} />
      {saved ? "Saved to your dashboard" : "Save to your dashboard"}
    </motion.button>
  );
}
