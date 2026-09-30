import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { PhoneCard } from "@/components/phones/PhoneCard";
import { PhoneDetailDialog } from "@/components/phones/PhoneDetailDialog";
import { Eyebrow, Reveal, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  brandFilters,
  countByBrand,
  phones,
  type BrandFilter,
  type Phone,
} from "@/data/phones";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SORTS = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "name", label: "A–Z" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

function isBrandFilter(value: string | null): value is BrandFilter {
  return value === "All" || value === "Apple" || value === "Samsung";
}

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("newest");
  const [selected, setSelected] = useState<Phone | null>(null);

  const brandParam = searchParams.get("brand");
  const brand: BrandFilter = isBrandFilter(brandParam) ? brandParam : "All";
  const tag = searchParams.get("tag");

  const updateParams = (mutate: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams);
    mutate(params);
    setSearchParams(params, { replace: true });
  };

  const setBrand = (next: BrandFilter) =>
    updateParams((params) => {
      if (next === "All") params.delete("brand");
      else params.set("brand", next);
      params.delete("tag");
    });

  const clearFilters = () => {
    setQuery("");
    updateParams((params) => {
      params.delete("brand");
      params.delete("tag");
    });
  };

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return phones
      .filter((phone) => (brand === "All" ? true : phone.brand === brand))
      .filter((phone) =>
        tag ? phone.tags.some((item) => item.toLowerCase() === tag.toLowerCase()) : true,
      )
      .filter((phone) => {
        if (!needle) return true;
        return [
          phone.name,
          phone.brand,
          phone.series,
          ...phone.tags,
          phone.specs.chip,
        ]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      })
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "oldest") return a.released - b.released;
        return b.released - a.released;
      });
  }, [brand, tag, query, sort]);

  const hasFilters = brand !== "All" || Boolean(tag) || query.trim().length > 0;

  return (
    <>
      {/* ------------------------------------------------------ Page header */}
      <Section className="pt-14 pb-10 md:pt-20">
        <Reveal className="max-w-3xl">
          <Eyebrow>
            <LayoutGrid className="size-3.5" />
            {phones.length} devices catalogued
          </Eyebrow>
          <h1 className="mt-6 text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
            The full{" "}
            <span className="text-gradient">iPhone &amp; Galaxy</span> gallery
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Filter by brand, search by chipset or jump straight to the
            foldables. Tap any device to see the display, silicon, camera and
            battery figures we verified in store.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
          {(["Apple", "Samsung"] as const).map((item) => (
            <span
              key={item}
              className="flex items-center gap-2.5 rounded-full border border-edge bg-white/[0.03] px-4 py-2 text-sm"
            >
              <span
                className={cn(
                  "size-2 rounded-full",
                  item === "Apple" ? "bg-brand" : "bg-titanium",
                )}
              />
              {item}
              <span className="text-muted-foreground">{countByBrand(item)} models</span>
            </span>
          ))}
          <span className="flex items-center gap-2.5 rounded-full border border-edge bg-white/[0.03] px-4 py-2 text-sm">
            <span className="size-2 rounded-full bg-mint" />
            Foldables
            <span className="text-muted-foreground">
              {phones.filter((phone) => phone.tags.includes("Foldable")).length} models
            </span>
          </span>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------- Controls */}
      <div className="sticky top-16 z-30 border-y border-edge bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="hide-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1">
            {brandFilters.map((item) => {
              const active = brand === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setBrand(item)}
                  className={cn(
                    "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="brand-chip"
                      transition={{ duration: 0.35, ease: EASE }}
                      className="absolute inset-0 -z-10 rounded-full bg-primary"
                    />
                  )}
                  {item}
                  <span className={cn("ml-2 text-xs", active ? "opacity-70" : "opacity-60")}>
                    {item === "All" ? phones.length : countByBrand(item)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative sm:w-64">
              <Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search model or chipset"
                className="border-edge bg-white/[0.03] pl-9"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="absolute top-2.5 right-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 rounded-full border border-edge bg-white/[0.03] p-1">
              <SlidersHorizontal className="mx-2 size-3.5 text-muted-foreground" />
              {SORTS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSort(option.id)}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    sort === option.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {sort === option.id && (
                    <motion.span
                      layoutId="sort-chip"
                      transition={{ duration: 0.3, ease: EASE }}
                      className="absolute inset-0 -z-10 rounded-full border border-edge bg-white/[0.08]"
                    />
                  )}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------- Grid */}
      <Section className="pt-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Showing <span className="text-foreground">{results.length}</span> of{" "}
            {phones.length} devices
            {tag && (
              <>
                {" "}
                tagged{" "}
                <span className="text-foreground">{tag}</span>
              </>
            )}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-3.5" />
              Clear filters
            </button>
          )}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((phone, index) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                index={index}
                onOpen={setSelected}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-dashed border-edge bg-card/40 px-6 py-16 text-center"
          >
            <h2 className="text-lg font-semibold tracking-tight">
              Nothing matches that combination
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              We stock eleven devices across iPhone and Galaxy. Try a different
              brand, or clear the search and browse everything.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button className="rounded-full" onClick={clearFilters}>
                Clear filters
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-edge bg-white/[0.03]"
              >
                <Link to="/contact">Ask us to source it</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </Section>

      <PhoneDetailDialog phone={selected} onClose={() => setSelected(null)} />
    </>
  );
}
