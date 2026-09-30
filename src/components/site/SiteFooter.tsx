import { Smartphone } from "lucide-react";
import { Link } from "react-router";

const COLUMNS = [
  {
    title: "Browse",
    links: [
      { label: "Home", to: "/" },
      { label: "Device gallery", to: "/gallery" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Brands",
    links: [
      { label: "Apple iPhone", to: "/gallery?brand=Apple" },
      { label: "Samsung Galaxy", to: "/gallery?brand=Samsung" },
      { label: "Foldables", to: "/gallery?tag=Foldable" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Book a demo", to: "/contact" },
      { label: "Trade-in help", to: "/contact" },
      { label: "Sign in", to: "/auth" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-edge bg-[var(--stage)]/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-gradient">
              <Smartphone className="size-4 text-on-brand" />
            </span>
            <span className="text-[15px] font-semibold tracking-[0.24em]">
              MOBIUS
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A hands-on showroom for the two flagship lines that matter. Every
            device on this site is photographed, spec-checked and on the table
            for you to hold.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {column.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-edge">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Mobius Device Studio. Demo storefront.</p>
          <p>
            Product photography via Wikimedia Commons. Apple, iPhone, Samsung
            and Galaxy are trademarks of their owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
