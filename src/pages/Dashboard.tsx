import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookmarkCheck,
  Cpu,
  Layers,
  Loader2,
  LogOut,
  Smartphone,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { PhoneCard } from "@/components/phones/PhoneCard";
import { PhoneDetailDialog } from "@/components/phones/PhoneDetailDialog";
import { Eyebrow, Reveal, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { phones, type Phone } from "@/data/phones";
import { useAuth } from "@/hooks/use-auth";
import { useSavedDevices } from "@/hooks/use-saved-devices";
import { EASE } from "@/lib/motion";

/** Most recent entries, used for the "newest in the catalog" list. */
const newest = [...phones].sort((a, b) => b.released - a.released).slice(0, 3);

const families = new Set(phones.map((phone) => phone.series)).size;

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { savedIds, isLoading } = useSavedDevices();
  const clearSaved = useMutation(api.savedDevices.clearSaved);
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Phone | null>(null);
  const [clearing, setClearing] = useState(false);

  const displayName =
    user?.name ?? user?.email?.split("@")[0] ?? user?.email ?? null;

  const savedPhones = savedIds
    .map((id) => phones.find((phone) => phone.id === id))
    .filter((phone): phone is Phone => Boolean(phone));

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleClear = async () => {
    setClearing(true);
    try {
      await clearSaved({});
    } finally {
      setClearing(false);
    }
  };

  return (
    <>
      {/* ----------------------------------------------------------- Header */}
      <Section className="pt-14 pb-10 md:pt-20">
        <Reveal>
          <Eyebrow>
            <Smartphone className="size-3.5" />
            Dashboard
          </Eyebrow>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
                Welcome back
                {displayName ? (
                  <>
                    , <span className="text-gradient">{displayName}</span>
                  </>
                ) : null}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                Everything you have starred from the catalog, plus the entries
                that changed most recently. Saved devices live here until you
                remove them.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {user?.email && (
                <span className="hidden text-sm text-muted-foreground sm:block">
                  {user.email}
                </span>
              )}
              <Button
                variant="outline"
                className="rounded-full border-edge bg-white/[0.03]"
                onClick={handleSignOut}
              >
                <LogOut className="size-4" />
                Sign out
              </Button>
            </div>
          </div>
        </Reveal>

        {/* --------------------------------------------------------- Stats */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              icon: Star,
              label: "Saved devices",
              value: isLoading ? "—" : String(savedPhones.length),
            },
            { icon: Smartphone, label: "In the catalog", value: String(phones.length) },
            { icon: Layers, label: "Model families", value: String(families) },
            {
              icon: BookmarkCheck,
              label: "Brands covered",
              value: String(new Set(phones.map((phone) => phone.brand)).size),
            },
          ].map((tile, index) => (
            <Reveal key={tile.label} delay={index * 0.06}>
              <div className="h-full rounded-3xl border border-edge bg-card/50 p-5">
                <tile.icon className="size-4 text-brand" />
                <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                  {tile.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{tile.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------- Saved devices */}
      <Section className="pt-0">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight">
            Saved devices
          </h2>
          {savedPhones.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              disabled={clearing}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-60"
            >
              {clearing ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Trash2 className="size-3.5" />
              )}
              Clear all
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((key) => (
              <div
                key={key}
                className="h-80 animate-pulse rounded-3xl border border-edge bg-card/40"
              />
            ))}
          </div>
        ) : savedPhones.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="rounded-3xl border border-dashed border-edge bg-card/40 px-6 py-14 text-center"
          >
            <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-edge bg-white/[0.04] text-brand">
              <Star className="size-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">
              Nothing saved yet
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Open any device in the catalog and use the star. It will appear
              here the next time you visit.
            </p>
            <Button asChild className="mt-6 rounded-full">
              <Link to="/gallery">
                Browse the catalog
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedPhones.map((phone, index) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                index={index}
                onOpen={setSelected}
              />
            ))}
          </div>
        )}
      </Section>

      {/* ------------------------------------------------ Recent additions */}
      <Section className="border-t border-edge pt-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>Recently added</Eyebrow>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              The newest entries in the catalog
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Ordered by release date. Open any entry for the full
              specification sheet.
            </p>
            <Link
              to="/gallery"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand"
            >
              Browse all {phones.length} devices
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="divide-y divide-white/10 border-y border-edge">
              {newest.map((phone) => (
                <li key={phone.id}>
                  <Link
                    to="/gallery"
                    className="group flex items-center gap-4 py-4 transition-colors"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-edge bg-white/[0.04] text-[10px] font-medium text-muted-foreground">
                      {phone.released}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {phone.brand} {phone.name}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Cpu className="size-3" />
                        {phone.specs.chip}
                      </span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <PhoneDetailDialog phone={selected} onClose={() => setSelected(null)} />
    </>
  );
}
