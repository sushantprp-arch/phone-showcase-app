import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { EASE } from "@/lib/motion";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="max-w-md"
      >
        <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          This page is not in the catalog
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The link may be out of date. The device gallery and your dashboard are
          both one click away.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="group rounded-full">
            <Link to="/gallery">
              Browse the catalog
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-edge bg-white/[0.03]"
          >
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
